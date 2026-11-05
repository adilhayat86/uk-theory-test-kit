import * as SQLite from 'expo-sqlite';
import { isMockSession } from '../domain/mockExam';
import type { MockSession, MockResult } from '../domain/mockExam';
import type { TheoryQuestion } from '../data/questions';
import { summarizeProgress } from '../domain/progress';
import type { ProgressSummary } from '../domain/progress';
import type { QuestionProgressDetail } from '../domain/revision';
import { answerPractice, isPracticeSession, nextPractice } from '../domain/practiceSession';
import type { PracticeSession } from '../domain/practiceSession';

type StoredProgressRow = {
  question_id: string;
  attempts: number;
  correct_attempts: number;
};

type StoredProgressDetailRow = StoredProgressRow & {
  last_selected_index: number;
};

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync('uk-theory-test-kit.db')
      .then(async (db) => {
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS question_progress (
            question_id TEXT PRIMARY KEY NOT NULL,
            attempts INTEGER NOT NULL DEFAULT 0,
            correct_attempts INTEGER NOT NULL DEFAULT 0,
            last_selected_index INTEGER NOT NULL,
            last_answered_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS bookmarks (
            question_id TEXT PRIMARY KEY NOT NULL,
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS active_practice (
            slot INTEGER PRIMARY KEY CHECK (slot = 1),
            payload TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS saved_signs (
            sign_id TEXT PRIMARY KEY NOT NULL,
            created_at TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS mock_exam_sessions (
            id TEXT PRIMARY KEY NOT NULL,
            payload TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            completed_at TEXT
          );
          CREATE INDEX IF NOT EXISTS mock_sessions_active_idx
            ON mock_exam_sessions(completed_at, updated_at);
          CREATE TABLE IF NOT EXISTS mock_exam_results (
            id TEXT PRIMARY KEY NOT NULL,
            payload TEXT NOT NULL,
            completed_at TEXT NOT NULL
          );
        `);
        return db;
      })
      .catch((error) => {
        databasePromise = null;
        throw error;
      });
  }

  return databasePromise;
}

/**
 * One active practice snapshot lives in local SQLite. The queue guarantees
 * that a stale answer write cannot replace a later session after navigation.
 */
let practiceWriteTail: Promise<void> = Promise.resolve();

function enqueuePracticeWrite<T>(task: () => Promise<T>): Promise<T> {
  const operation = practiceWriteTail.then(task, task);
  practiceWriteTail = operation.then(() => undefined, () => undefined);
  return operation;
}

export async function getSavedPracticeSession(): Promise<PracticeSession | null> {
  await practiceWriteTail;
  const db = await openDatabase();
  const row = await db.getFirstAsync<{ payload: string }>(
    'SELECT payload FROM active_practice WHERE slot = 1',
  );
  if (!row) return null;
  try {
    const parsed: unknown = JSON.parse(row.payload);
    return isPracticeSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function replaceSavedPractice(session: PracticeSession): Promise<void> {
  if (!isPracticeSession(session) || Object.keys(session.answers).length !== 0 ||
      session.currentIndex !== 0) throw new Error('Invalid new practice session.');
  return enqueuePracticeWrite(async () => {
    const db = await openDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO active_practice (slot, payload) VALUES (1, ?)',
      JSON.stringify(session),
    );
  });
}

export async function clearSavedPractice(): Promise<void> {
  return enqueuePracticeWrite(async () => {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM active_practice WHERE slot = 1');
  });
}

/** A committed choice changes both the snapshot and its accuracy counter, once. */
export async function recordSavedPracticeAnswer(
  session: PracticeSession,
  question: TheoryQuestion,
  selectedIndex: number,
): Promise<PracticeSession> {
  return enqueuePracticeWrite(async () => {
    const db = await openDatabase();
    let updated: PracticeSession | null = null;
    await db.withExclusiveTransactionAsync(async (txn) => {
      const row = await txn.getFirstAsync<{ payload: string }>(
        'SELECT payload FROM active_practice WHERE slot = 1',
      );
      if (!row) throw new Error('No active practice to save the answer.');
      const existing: unknown = JSON.parse(row.payload);
      if (!isPracticeSession(existing) || existing.id !== session.id ||
          existing.currentIndex !== session.currentIndex) {
        throw new Error('Practice session changed; answer not saved.');
      }
      updated = answerPractice(existing, question.id, selectedIndex);
      const correct = selectedIndex === question.correctIndex ? 1 : 0;
      await txn.runAsync('UPDATE active_practice SET payload = ? WHERE slot = 1',
        JSON.stringify(updated));
      await txn.runAsync(
        `INSERT INTO question_progress (
           question_id, attempts, correct_attempts, last_selected_index, last_answered_at
         ) VALUES (?, 1, ?, ?, ?)
         ON CONFLICT(question_id) DO UPDATE SET
           attempts = question_progress.attempts + 1,
           correct_attempts = question_progress.correct_attempts + excluded.correct_attempts,
           last_selected_index = excluded.last_selected_index,
           last_answered_at = excluded.last_answered_at`,
        question.id, correct, selectedIndex, new Date().toISOString(),
      );
    });
    if (!updated) throw new Error('Unable to commit answer.');
    return updated as PracticeSession;
  });
}

/** Persist the NEXT position before allowing a learner to leave a question. */
export async function advanceSavedPractice(session: PracticeSession): Promise<PracticeSession> {
  return enqueuePracticeWrite(async () => {
    const db = await openDatabase();
    let advanced: PracticeSession | null = null;
    await db.withExclusiveTransactionAsync(async (txn) => {
      const row = await txn.getFirstAsync<{ payload: string }>(
        'SELECT payload FROM active_practice WHERE slot = 1',
      );
      if (!row) throw new Error('Practice session is missing.');
      const existing: unknown = JSON.parse(row.payload);
      if (!isPracticeSession(existing) || existing.id !== session.id ||
          existing.currentIndex !== session.currentIndex) {
        throw new Error('Practice session changed during navigation.');
      }
      advanced = nextPractice(existing);
      await txn.runAsync('UPDATE active_practice SET payload = ? WHERE slot = 1',
        JSON.stringify(advanced));
    });
    if (!advanced) throw new Error('Unable to advance practice.');
    return advanced as PracticeSession;
  });
}

export async function recordAnswer(question: TheoryQuestion, selectedIndex: number): Promise<void> {
  const db = await openDatabase();
  const isCorrect = selectedIndex === question.correctIndex ? 1 : 0;

  await db.runAsync(
    `INSERT INTO question_progress (
      question_id, attempts, correct_attempts, last_selected_index, last_answered_at
    ) VALUES (?, 1, ?, ?, ?)
    ON CONFLICT(question_id) DO UPDATE SET
      attempts = question_progress.attempts + 1,
      correct_attempts = question_progress.correct_attempts + excluded.correct_attempts,
      last_selected_index = excluded.last_selected_index,
      last_answered_at = excluded.last_answered_at`,
    question.id,
    isCorrect,
    selectedIndex,
    new Date().toISOString(),
  );
}

export async function getProgressSummary(): Promise<ProgressSummary> {
  const db = await openDatabase();
  const rows = await db.getAllAsync<StoredProgressRow>(
    'SELECT question_id, attempts, correct_attempts FROM question_progress',
  );
  return summarizeProgress(rows.map((row) => ({
    questionId: row.question_id,
    attempts: row.attempts,
    correctAttempts: row.correct_attempts,
  })));
}

/** Keep all revision decisions on the device, using data already in SQLite. */
export async function getQuestionProgressRecords(): Promise<QuestionProgressDetail[]> {
  const db = await openDatabase();
  const rows = await db.getAllAsync<StoredProgressDetailRow>(
    'SELECT question_id, attempts, correct_attempts, last_selected_index FROM question_progress',
  );
  return rows.map((row) => ({
    questionId: row.question_id,
    attempts: row.attempts,
    correctAttempts: row.correct_attempts,
    lastSelectedIndex: row.last_selected_index,
  }));
}

export async function getBookmarkedQuestionIds(): Promise<string[]> {
  const db = await openDatabase();
  const rows = await db.getAllAsync<{ question_id: string }>(
    'SELECT question_id FROM bookmarks ORDER BY created_at DESC',
  );
  return rows.map((row) => row.question_id);
}

export async function toggleBookmark(questionId: string): Promise<boolean> {
  const db = await openDatabase();
  const existing = await db.getFirstAsync<{ question_id: string }>(
    'SELECT question_id FROM bookmarks WHERE question_id = ?',
    questionId,
  );

  if (existing) {
    await db.runAsync('DELETE FROM bookmarks WHERE question_id = ?', questionId);
    return false;
  }

  await db.runAsync(
    'INSERT INTO bookmarks (question_id, created_at) VALUES (?, ?)',
    questionId,
    new Date().toISOString(),
  );
  return true;
}

/** Offline saved road-sign notes use their own table, separate from question bookmarks. */
export async function getSavedSignIds(): Promise<string[]> {
  const db = await openDatabase();
  const rows = await db.getAllAsync<{ sign_id: string }>(
    'SELECT sign_id FROM saved_signs ORDER BY created_at DESC',
  );
  return rows.map((row) => row.sign_id);
}

export async function toggleSavedSign(signId: string): Promise<boolean> {
  const db = await openDatabase();
  const existing = await db.getFirstAsync<{ sign_id: string }>(
    'SELECT sign_id FROM saved_signs WHERE sign_id = ?',
    signId,
  );
  if (existing) {
    await db.runAsync('DELETE FROM saved_signs WHERE sign_id = ?', signId);
    return false;
  }
  await db.runAsync(
    'INSERT INTO saved_signs (sign_id, created_at) VALUES (?, ?)',
    signId, new Date().toISOString(),
  );
  return true;
}

export async function closeDatabaseForTests(): Promise<void> {
  if (databasePromise) {
    const db = await databasePromise;
    await db.closeAsync();
    databasePromise = null;
  }
}

/**
 * Serialize mock writes: an answer-save arriving after a submit must not recreate
 * an active session. This queue also keeps rapid answer/flag updates in order.
 */
let mockWriteTail: Promise<void> = Promise.resolve();

function enqueueMockWrite(task: () => Promise<void>): Promise<void> {
  const operation = mockWriteTail.then(task, task);
  mockWriteTail = operation.catch(() => undefined);
  return operation;
}

export async function saveMockSession(session: MockSession): Promise<void> {
  if (!isMockSession(session)) throw new Error('Invalid mock session.');
  return enqueueMockWrite(async () => {
    const db = await openDatabase();
    await db.runAsync(
      `INSERT INTO mock_exam_sessions (id, payload, updated_at, completed_at)
        VALUES (?, ?, ?, NULL)
        ON CONFLICT(id) DO UPDATE SET
          payload = excluded.payload,
          updated_at = excluded.updated_at`,
      session.id,
      JSON.stringify(session),
      new Date().toISOString(),
    );
  });
}

export async function getActiveMockSession(): Promise<MockSession | null> {
  await mockWriteTail;
  const db = await openDatabase();
  const row = await db.getFirstAsync<{ payload: string }>(
    'SELECT payload FROM mock_exam_sessions WHERE completed_at IS NULL ORDER BY updated_at DESC LIMIT 1',
  );
  if (!row) return null;
  try {
    const parsed: unknown = JSON.parse(row.payload);
    return isMockSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function getMockResults(limit: number = 10): Promise<MockResult[]> {
  await mockWriteTail;
  const db = await openDatabase();
  const rows = await db.getAllAsync<{ payload: string }>(
    'SELECT payload FROM mock_exam_results ORDER BY completed_at DESC LIMIT ?',
    Math.max(1, Math.min(50, Math.trunc(limit))),
  );
  return rows.flatMap((row) => {
    try {
      const data: MockResult = JSON.parse(row.payload);
      return typeof data.id === 'string' && typeof data.correct === 'number' ? [data] : [];
    } catch {
      return [];
    }
  });
}

export async function finishStoredMock(session: MockSession, result: MockResult): Promise<void> {
  if (session.id !== result.id) throw new Error('Mock result does not match its session.');
  return enqueueMockWrite(async () => {
    const db = await openDatabase();
    await db.withExclusiveTransactionAsync(async (txn) => {
      await txn.runAsync(
        'INSERT OR REPLACE INTO mock_exam_results (id, payload, completed_at) VALUES (?, ?, ?)',
        result.id, JSON.stringify(result), new Date(result.finishedAt).toISOString(),
      );
      await txn.runAsync(
        'UPDATE mock_exam_sessions SET payload = ?, completed_at = ? WHERE id = ?',
        JSON.stringify(session),
        new Date(result.finishedAt).toISOString(),
        session.id,
      );
    });
  });
}

export async function discardActiveMock(id: string): Promise<void> {
  return enqueueMockWrite(async () => {
    const db = await openDatabase();
    await db.runAsync(
      'DELETE FROM mock_exam_sessions WHERE id = ? AND completed_at IS NULL',
      id,
    );
  });
}
