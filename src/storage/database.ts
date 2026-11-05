import * as SQLite from 'expo-sqlite';
import type { TheoryQuestion } from '../data/questions';
import { summarizeProgress } from '../domain/progress';
import type { ProgressSummary } from '../domain/progress';

type StoredProgressRow = {
  question_id: string;
  attempts: number;
  correct_attempts: number;
};

type ProgressRow = {
  questions_answered: number;
  total_attempts: number;
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
