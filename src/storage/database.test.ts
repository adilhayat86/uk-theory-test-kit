import { questions } from '../data/questions';
import { answerQuestion, beginMock, finishMock } from '../domain/mockExam';
import {
  closeDatabaseForTests, finishStoredMock, getActiveMockSession,
  getQuestionLearningRecords, saveMockSession,
} from './database';

const mockTxn = {
  runAsync: jest.fn(async (..._args: unknown[]) => undefined),
  getFirstAsync: jest.fn(async (..._args: unknown[]): Promise<{ id: string } | null> => null),
};
const mockDb = {
  execAsync: jest.fn(async () => undefined),
  runAsync: jest.fn(async (..._args: unknown[]) => undefined),
  getAllAsync: jest.fn(async (..._args: unknown[]): Promise<unknown[]> => []),
  getFirstAsync: jest.fn(async (..._args: unknown[]): Promise<unknown> => null),
  withExclusiveTransactionAsync: jest.fn(async (callback: (tx: typeof mockTxn) => Promise<void>) =>
    callback(mockTxn)),
  closeAsync: jest.fn(async () => undefined),
};

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(async () => mockDb),
}));

describe('offline SQLite storage boundaries (mocked database API)', () => {
  beforeEach(async () => {
    await closeDatabaseForTests();
    jest.clearAllMocks();
    mockDb.getAllAsync.mockResolvedValue([]);
    mockDb.getFirstAsync.mockResolvedValue(null);
    mockTxn.getFirstAsync.mockResolvedValue(null);
  });

  afterAll(async () => {
    await closeDatabaseForTests();
  });

  it('maps persisted attempt counts to smart-revision learning records', async () => {
    mockDb.getAllAsync.mockResolvedValueOnce([
      { question_id: 'q-example', attempts: 3, correct_attempts: 1, last_selected_index: 2 },
    ]);
    await expect(getQuestionLearningRecords()).resolves.toEqual([
      { questionId: 'q-example', attempts: 3, correctAttempts: 1, lastSelectedIndex: 2 },
    ]);
    expect(mockDb.execAsync).toHaveBeenCalledTimes(1);
  });

  it('can save and restore a valid timed mock session', async () => {
    const sample = beginMock(questions, 'sample', 1_700_000_000_000, () => 0.4);
    await saveMockSession(sample);
    const call = mockDb.runAsync.mock.calls.find(([sql]) => String(sql).includes('INSERT INTO mock_exam_sessions'));
    expect(call).toBeDefined();
    const payload = call![2] as string;
    expect(JSON.parse(payload).id).toBe(sample.id);
    mockDb.getFirstAsync.mockResolvedValueOnce({ payload });
    await expect(getActiveMockSession()).resolves.toEqual(sample);
  });

  it('stores mock answers as progress once, even if completion is retried', async () => {
    const start = beginMock(questions, 'sample', 1_700_000_000_000, () => 0.4);
    const id = start.questionIds[0];
    const current = answerQuestion(start, id, questions.find((q) => q.id === id)!.correctIndex, start.startedAt);
    const result = finishMock(current, questions, start.startedAt + 5000);
    await finishStoredMock(current, result);
    const inserts = () => mockTxn.runAsync.mock.calls.filter(([sql]) => String(sql).includes('INSERT INTO question_progress'));
    expect(inserts()).toHaveLength(1);
    expect(mockTxn.runAsync.mock.calls.some(([sql]) => String(sql).includes('INSERT OR REPLACE INTO mock_exam_results'))).toBe(true);
    mockTxn.getFirstAsync.mockResolvedValue({ id: result.id });
    await finishStoredMock(current, result);
    expect(inserts()).toHaveLength(1);
  });
});
