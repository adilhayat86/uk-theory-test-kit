import { questions } from '../data/questions';
import { beginPractice } from '../domain/practiceSession';
import { answerQuestion, beginMock, finishMock } from '../domain/mockExam';
import {
  advanceSavedPractice, closeDatabaseForTests, getCheckpointResults, getLessonProgress,
  getProgressSummary, getSavedPracticeSession, markLessonRead, recordSavedPracticeAnswer,
  replaceSavedPractice, saveLessonPosition,
  finishStoredMock, getActiveMockSession, getMockResults, saveMockSession,
  getBookmarkedQuestionIds, getQuestionProgressRecords, getSavedSignIds,
  toggleBookmark, toggleSavedSign, resetLearningData, recordAnswer,
} from './database';
import { loadLearningData } from './loadLearningData';

let mockFailCheckpointInsert = false;
let mockFailMockInsert = false;
let mockFailResetTable: string | null = null;
let mockFailBookmarkRead = false;
let mockFailOpenOnce = false;
let mockBeforeWrite: ((sql: string) => Promise<void>) | null = null;
let mockSqlite: {
  prepare: (sql: string) => { run: (...params: unknown[]) => unknown };
} | null = null;

// Run the actual storage SQL against SQLite. Only the Expo transport is replaced.
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: async () => {
    if (mockFailOpenOnce) {
      mockFailOpenOnce = false;
      throw new Error('Simulated opening failure');
    }
    const { DatabaseSync } = jest.requireActual('node:sqlite');
    const database = new DatabaseSync(':memory:');
    mockSqlite = database;
    const bridge = {
      execAsync: async (sql: string) => { database.exec(sql); },
      runAsync: async (sql: string, ...params: unknown[]) => {
        if (mockBeforeWrite) await mockBeforeWrite(sql);
        if (mockFailResetTable && sql === 'DELETE FROM ' + mockFailResetTable) {
          mockFailResetTable = null;
          throw new Error('Simulated reset failure');
        }
        if (mockFailCheckpointInsert && sql.includes('INSERT OR IGNORE INTO checkpoint_results')) {
          mockFailCheckpointInsert = false;
          throw new Error('Simulated storage failure');
        }
        if (mockFailMockInsert && sql.includes('INSERT OR IGNORE INTO mock_exam_results')) {
          mockFailMockInsert = false;
          throw new Error('Simulated exam storage failure');
        }
        return database.prepare(sql).run(...params);
      },
      getFirstAsync: async (sql: string, ...params: unknown[]) => database.prepare(sql).get(...params) ?? null,
      getAllAsync: async (sql: string, ...params: unknown[]) => {
        if (mockFailBookmarkRead && sql.includes('FROM bookmarks')) {
          mockFailBookmarkRead = false;
          throw new Error('Simulated bookmark read failure');
        }
        return database.prepare(sql).all(...params);
      },
      withExclusiveTransactionAsync: async (task: (transaction: unknown) => Promise<void>) => {
        database.exec('BEGIN EXCLUSIVE');
        try {
          await task(bridge);
          database.exec('COMMIT');
        } catch (error) {
          database.exec('ROLLBACK');
          throw error;
        }
      },
      closeAsync: async () => { database.close(); },
    };
    return bridge;
  },
}));

const bank = questions.slice(0, 10);
const context = { moduleId: 'module-a', moduleVersion: 1, lessonVersions: { 'lesson-a': 1 } };

afterEach(async () => {
  mockFailCheckpointInsert = false;
  mockFailMockInsert = false;
  mockFailResetTable = null;
  mockFailBookmarkRead = false;
  mockFailOpenOnce = false;
  mockBeforeWrite = null;
  mockSqlite = null;
  jest.restoreAllMocks();
  await closeDatabaseForTests();
});

test('reading position and confirmation persist independently, with no practice attempts', async () => {
  jest.spyOn(Date, 'now').mockReturnValue(10);
  await saveLessonPosition('lesson-a', 1, 'section-2');
  expect(await getLessonProgress()).toEqual([{
    lessonId: 'lesson-a', contentVersion: 1, lastSectionId: 'section-2', readConfirmedAt: null, updatedAt: 10,
  }]);
  jest.spyOn(Date, 'now').mockReturnValue(20);
  await markLessonRead('lesson-a', 1);
  jest.spyOn(Date, 'now').mockReturnValue(30);
  await saveLessonPosition('lesson-a', 1, 'section-3');
  await markLessonRead('lesson-a', 1);
  expect(await getLessonProgress()).toEqual([{
    lessonId: 'lesson-a', contentVersion: 1, lastSectionId: 'section-3', readConfirmedAt: 20, updatedAt: 30,
  }]);
  expect((await getProgressSummary()).totalAttempts).toBe(0);
  expect(await getCheckpointResults()).toEqual([]);
});

test('a content update needs a fresh read and delayed old-version writes cannot downgrade it', async () => {
  await markLessonRead('lesson-a', 1);
  await saveLessonPosition('lesson-a', 2, 'new-introduction');
  await Promise.all([markLessonRead('lesson-a', 1), saveLessonPosition('lesson-a', 1, 'old-section')]);
  expect((await getLessonProgress())[0]).toMatchObject({
    contentVersion: 2, lastSectionId: 'new-introduction', readConfirmedAt: null,
  });
  await markLessonRead('lesson-a', 2);
  expect((await getLessonProgress())[0].readConfirmedAt).not.toBeNull();
});

test('invalid reading writes fail without creating progress', async () => {
  await expect(saveLessonPosition('', 1, 'section')).rejects.toThrow(/Invalid/);
  await expect(saveLessonPosition('lesson', 0, 'section')).rejects.toThrow(/Invalid/);
  await expect(markLessonRead('lesson', NaN)).rejects.toThrow(/Invalid/);
  expect(await getLessonProgress()).toEqual([]);
});

test('ordinary practice cannot create a course checkpoint even after ten correct answers', async () => {
  let session = beginPractice(bank, 10, 'ordinary');
  await replaceSavedPractice(session);
  for (const question of bank) {
    session = await recordSavedPracticeAnswer(session, question, question.correctIndex);
    session = await advanceSavedPractice(session);
  }
  expect((await getProgressSummary()).correctAttempts).toBe(10);
  expect(await getCheckpointResults()).toEqual([]);
});

test('completed checkpoints retain one immutable answer snapshot through duplicate completion and reopening', async () => {
  let session = beginPractice(bank, 10, 'checkpoint-one', context);
  await replaceSavedPractice(session);
  let lastAnswered = session;
  for (const [index, question] of bank.entries()) {
    session = await recordSavedPracticeAnswer(session, question, index < 8 ? question.correctIndex : (question.correctIndex + 1) % 4);
    lastAnswered = session;
    session = await advanceSavedPractice(session);
  }
  const first = await getCheckpointResults();
  expect(first).toHaveLength(1);
  expect(first[0]).toMatchObject({ attemptId: 'checkpoint-one', correct: 8, total: 10, ...context });
  expect(first[0].answers).toEqual(session.answers);
  expect(await advanceSavedPractice(lastAnswered)).toEqual(session);
  expect(await advanceSavedPractice(session)).toEqual(session);
  first[0].answers[bank[0].id] = 99;
  expect((await getCheckpointResults())[0].answers[bank[0].id]).toBe(bank[0].correctIndex);
  expect(await getCheckpointResults()).toHaveLength(1);
  expect((await getProgressSummary()).totalAttempts).toBe(10);
});

test('result-write failure rolls back completion and a retry records exactly one checkpoint', async () => {
  let session = beginPractice(bank, 10, 'checkpoint-retry', context);
  await replaceSavedPractice(session);
  for (const [index, question] of bank.entries()) {
    session = await recordSavedPracticeAnswer(session, question, question.correctIndex);
    if (index < 9) session = await advanceSavedPractice(session);
  }
  mockFailCheckpointInsert = true;
  await expect(advanceSavedPractice(session)).rejects.toThrow(/Simulated/);
  expect((await getSavedPracticeSession())?.currentIndex).toBe(9);
  expect(await getCheckpointResults()).toEqual([]);
  const finished = await advanceSavedPractice(session);
  expect(finished.currentIndex).toBe(10);
  expect(await getCheckpointResults()).toHaveLength(1);
  expect((await getProgressSummary()).totalAttempts).toBe(10);
});

test('mock completion is immutable and repeated completion cannot recreate active state', async () => {
  const initial = beginMock(questions, 'sample', 1000, () => .5);
  const question = questions.find(q => q.id === initial.questionIds[0])!;
  const answered = answerQuestion(initial, question.id, question.correctIndex, 1001);
  await saveMockSession(answered);
  const first = finishMock(answered, questions, 2000);
  await finishStoredMock(answered, first);
  await finishStoredMock(answered, finishMock(answered, questions, 3000));
  expect(await getMockResults()).toEqual([first]);
  const changed = answerQuestion(answered, question.id, (question.correctIndex + 1) % 4, 1002);
  await expect(finishStoredMock(changed, finishMock(changed, questions, 4000))).rejects.toThrow(/different completed/);
  await saveMockSession(changed);
  expect(await getActiveMockSession()).toBeNull();
  expect(await getMockResults()).toEqual([first]);
  expect((await getProgressSummary()).totalAttempts).toBe(0);
});

test('unmatched scores, answer snapshots and unsaved mock attempts cannot enter exam history', async () => {
  const session = beginMock(questions, 'sample', 1000, () => .5);
  const result = finishMock(session, questions, 2000);
  await expect(finishStoredMock(session, result)).rejects.toThrow(/No active/);
  await saveMockSession(session);
  await expect(finishStoredMock(session, { ...result, correct: 1, percent: 20 })).rejects.toThrow(/does not match/);
  const reordered = { ...session, questionIds: [...session.questionIds].reverse() };
  await expect(finishStoredMock(reordered, finishMock(reordered, questions, 2000))).rejects.toThrow(/saved mock changed/);
  await expect(finishStoredMock(session, { ...result, mode: 'full' })).rejects.toThrow(/does not match/);
  expect(await getMockResults()).toEqual([]);
});

test('failed mock completion rolls back, then retry saves once; malformed legacy history is filtered', async () => {
  const session = beginMock(questions, 'sample', 1000, () => .5);
  const result = finishMock(session, questions, 2000);
  await saveMockSession(session);
  mockFailMockInsert = true;
  await expect(finishStoredMock(session, result)).rejects.toThrow(/Simulated exam/);
  expect(await getActiveMockSession()).toEqual(session);
  expect(await getMockResults()).toEqual([]);
  await finishStoredMock(session, result);
  mockSqlite!.prepare('INSERT INTO mock_exam_results (id, payload, completed_at) VALUES (?, ?, ?)')
    .run('bad-row', JSON.stringify({ id: 'bad-row', correct: 1000 }), new Date(9000).toISOString());
  expect(await getMockResults()).toEqual([result]);
  expect(await getMockResults(NaN)).toEqual([result]);
});

test('ordinary revision exposes its real answer time for comparison with mock answers', async () => {
  await recordAnswer(bank[0], bank[0].correctIndex);
  const [record] = await getQuestionProgressRecords();
  expect(record.lastAnsweredAt).toEqual(expect.any(Number));
  expect(Number.isFinite(record.lastAnsweredAt)).toBe(true);
});

test('completed mock answer times remain immutable even when the selected answer is unchanged', async () => {
  const initial = beginMock(questions, 'sample', 1000, () => .5);
  const question = questions.find(q => q.id === initial.questionIds[0])!;
  const answered = answerQuestion(initial, question.id, question.correctIndex, 1100);
  await saveMockSession(answered);
  const first = finishMock(answered, questions, 2000);
  await finishStoredMock(answered, first);
  const changed = { ...answered, answerTimes: { ...answered.answerTimes, [question.id]: 1200 } };
  await expect(finishStoredMock(changed, finishMock(changed, questions, 2500))).rejects.toThrow(/different completed/);
  expect(await getMockResults()).toEqual([first]);
});

test('a partial startup read fails atomically and retry recovers the existing saved work', async () => {
  let practice = beginPractice(bank, 10, 'startup-saved');
  await replaceSavedPractice(practice);
  practice = await recordSavedPracticeAnswer(practice, bank[0], bank[0].correctIndex);
  await toggleBookmark(bank[0].id);
  await markLessonRead('lesson-a', 1);
  mockFailBookmarkRead = true;
  await expect(loadLearningData()).rejects.toThrow('Simulated bookmark read failure');
  const recovered = await loadLearningData();
  expect(recovered.practice).toEqual(practice);
  expect(recovered.bookmarks).toEqual([bank[0].id]);
  expect(recovered.progress.totalAttempts).toBe(1);
  expect(recovered.lessons[0].readConfirmedAt).not.toBeNull();
});

test('a failed database open can be retried without clearing data or poisoning the connection', async () => {
  mockFailOpenOnce = true;
  await expect(loadLearningData()).rejects.toThrow('Simulated opening failure');
  await expect(loadLearningData()).resolves.toMatchObject({ bookmarks: [], practice: null });
  await toggleSavedSign('stop');
  expect(await getSavedSignIds()).toEqual(['stop']);
});

test('reset clears every kind of saved learning data together and fresh study still works', async () => {
  await recordAnswer(bank[0], bank[0].correctIndex);
  await toggleBookmark(bank[0].id);
  await toggleSavedSign('stop');
  await markLessonRead('lesson-a', 1);
  let practice = beginPractice(bank, 10, 'reset-checkpoint', context);
  await replaceSavedPractice(practice);
  for (const question of bank) {
    practice = await recordSavedPracticeAnswer(practice, question, question.correctIndex);
    practice = await advanceSavedPractice(practice);
  }
  const mock = beginMock(questions, 'sample', 1000, () => .5);
  await saveMockSession(mock);
  await finishStoredMock(mock, finishMock(mock, questions, 2000));
  const activeMock = beginMock(questions, 'sample', 3000, () => .25);
  await saveMockSession(activeMock);
  expect(await getCheckpointResults()).toHaveLength(1);
  expect(await getMockResults()).toHaveLength(1);
  await resetLearningData();
  const empty = await loadLearningData();
  expect(empty).toMatchObject({ bookmarks: [], records: [], practice: null, lessons: [], checkpoints: [], mocks: [] });
  expect(empty.progress.totalAttempts).toBe(0);
  expect(await getSavedSignIds()).toEqual([]);
  expect(await getActiveMockSession()).toBeNull();
  await markLessonRead('fresh-lesson', 1);
  await replaceSavedPractice(beginPractice(bank, 4000, 'fresh-practice'));
  expect((await getLessonProgress())[0].lessonId).toBe('fresh-lesson');
  expect((await getSavedPracticeSession())?.id).toBe('fresh-practice');
});

test('a mid-reset failure rolls all deleted tables back and allows a safe retry', async () => {
  await recordAnswer(bank[0], bank[0].correctIndex);
  await toggleBookmark(bank[0].id);
  await toggleSavedSign('stop');
  await markLessonRead('lesson-a', 1);
  const before = await loadLearningData();
  mockFailResetTable = 'lesson_progress';
  await expect(resetLearningData()).rejects.toThrow('Simulated reset failure');
  expect(await loadLearningData()).toEqual(before);
  expect(await getSavedSignIds()).toEqual(['stop']);
  await resetLearningData();
  expect((await loadLearningData()).progress.totalAttempts).toBe(0);
});

test('pending saves cannot recreate data after reset, and writes are blocked until it finishes', async () => {
  await getProgressSummary();
  let release!: () => void;
  let entered!: () => void;
  const blocked = new Promise<void>(resolve => { release = resolve; });
  const started = new Promise<void>(resolve => { entered = resolve; });
  mockBeforeWrite = async sql => {
    if (sql.includes('INSERT INTO bookmarks')) { entered(); await blocked; }
  };
  const bookmark = toggleBookmark(bank[0].id);
  await started;
  const queuedLesson = markLessonRead('late-lesson', 1);
  const queuedMock = saveMockSession(beginMock(questions, 'sample', 1000, () => .5));
  const reset = resetLearningData();
  const duringReset = toggleSavedSign('stop');
  // Attach all rejection handlers before releasing the artificial slow write.
  const results = Promise.allSettled([bookmark, queuedLesson, queuedMock, reset, duringReset]);
  release();
  expect((await results).map(result => result.status)).toEqual([
    'fulfilled', 'rejected', 'rejected', 'fulfilled', 'rejected',
  ]);
  expect((await loadLearningData()).lessons).toEqual([]);
  expect(await getBookmarkedQuestionIds()).toEqual([]);
  expect(await getActiveMockSession()).toBeNull();
  expect(await getSavedSignIds()).toEqual([]);
});
