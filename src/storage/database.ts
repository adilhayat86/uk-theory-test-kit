import * as SQLite from 'expo-sqlite';
import { isMockSession } from '../domain/mockExam';
import type { MockSession, MockResult } from '../domain/mockExam';
import type { TheoryQuestion } from '../data/questions';
import { summarizeProgress } from '../domain/progress';
import type { ProgressSummary } from '../domain/progress';

type StoredProgressRow = {
  question_id: string;
  attempts: number;
  correct_attempts: number;
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
