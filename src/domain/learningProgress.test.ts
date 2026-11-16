import type { TheoryQuestion } from '../data/questions';
import type { QuestionProgressDetail } from './revision';
import { buildLearningOverview } from './learningProgress';

const question = (id: string, topic = 'Road rules'): TheoryQuestion => ({
  id, topic, difficulty: 'easy', prompt: id, options: ['A', 'B', 'C', 'D'],
  correctIndex: 0, explanation: 'Explanation', reference: 'Source',
});
const record = (questionId: string, lastSelectedIndex: number, attempts = 1,
  correctAttempts = lastSelectedIndex === 0 ? 1 : 0): QuestionProgressDetail =>
  ({ questionId, attempts, correctAttempts, lastSelectedIndex });

describe('learning progress overview', () => {
  test('keeps coverage separate from latest correct answers and review needs', () => {
    const overview = buildLearningOverview([
      question('a'), question('b'), question('c', 'Signs'), question('d', 'Signs'),
    ], [record('a', 0), record('b', 2), record('c', 0)]);
    expect(overview).toEqual({
      total: 4, tried: 3, unseen: 1, correctLastTime: 2, needsReview: 1, coveragePercent: 75,
      topics: [
        { topic: 'Road rules', total: 2, tried: 2, unseen: 0, correctLastTime: 1,
          needsReview: 1, coveragePercent: 100 },
        { topic: 'Signs', total: 2, tried: 1, unseen: 1, correctLastTime: 1,
          needsReview: 0, coveragePercent: 50 },
      ],
    });
  });

  test('moves wrong to correct and back to review without changing coverage', () => {
    const bank = [question('a')];
    const first = buildLearningOverview(bank, [record('a', 1, 1, 0)]);
    const corrected = buildLearningOverview(bank, [record('a', 0, 2, 1)]);
    const wrongAgain = buildLearningOverview(bank, [record('a', 3, 3, 1)]);
    expect([first, corrected, wrongAgain].map(({ correctLastTime, needsReview, coveragePercent }) =>
      ({ correctLastTime, needsReview, coveragePercent }))).toEqual([
      { correctLastTime: 0, needsReview: 1, coveragePercent: 100 },
      { correctLastTime: 1, needsReview: 0, coveragePercent: 100 },
      { correctLastTime: 0, needsReview: 1, coveragePercent: 100 },
    ]);
  });

  test('returns factual zero counts for an empty bank or untouched questions', () => {
    expect(buildLearningOverview([], [record('removed', 0)])).toEqual({
      total: 0, tried: 0, unseen: 0, correctLastTime: 0, needsReview: 0, coveragePercent: 0, topics: [],
    });
    expect(buildLearningOverview([question('a')], [])).toMatchObject({
      total: 1, tried: 0, unseen: 1, correctLastTime: 0, needsReview: 0, coveragePercent: 0,
    });
  });

  test('ignores orphan records and uses the first bank entry and last record per ID', () => {
    const overview = buildLearningOverview([
      question('a'), question('a', 'Duplicate topic'), question('b', 'Signs'),
    ], [record('removed', 0), record('a', 1), record('a', 0), record('b', 0), record('b', 3)]);
    expect(overview).toMatchObject({
      total: 2, tried: 2, correctLastTime: 1, needsReview: 1, unseen: 0, coveragePercent: 100,
    });
    expect(overview.topics.map(({ topic }) => topic)).toEqual(['Road rules', 'Signs']);
    expect(overview.topics[0].correctLastTime).toBe(1);
    expect(overview.topics[1].needsReview).toBe(1);
  });

  test.each([0, -1, NaN, Infinity, 0.5])('does not inflate coverage from invalid attempt count %s', (attempts) => {
    expect(buildLearningOverview([question('a')], [record('a', 0, attempts)])).toMatchObject({
      tried: 0, unseen: 1, correctLastTime: 0, needsReview: 0, coveragePercent: 0,
    });
  });

  test.each([-1, 4, 0.5, NaN, Infinity])('holds invalid latest answer %s for review', (selected) => {
    expect(buildLearningOverview([question('a')], [record('a', selected, 2, 2)])).toMatchObject({
      tried: 1, unseen: 0, correctLastTime: 0, needsReview: 1, coveragePercent: 100,
    });
  });

  test('rounds coverage and leaves both input collections unchanged', () => {
    const bank = [question('a'), question('b'), question('c')];
    const records = [record('a', 0)];
    const before = JSON.stringify({ bank, records });
    const overview = buildLearningOverview(bank, records);
    expect(overview.coveragePercent).toBe(33);
    expect(overview.tried + overview.unseen).toBe(overview.total);
    expect(overview.correctLastTime + overview.needsReview).toBe(overview.tried);
    expect(JSON.stringify({ bank, records })).toBe(before);
  });

  test('reserves 100% for complete coverage of the bank and each topic', () => {
    const bank = Array.from({ length: 228 }, (_, index) => question('q-' + index));
    const almostComplete = bank.slice(0, -1).map(({ id }) => record(id, 0));
    const overview = buildLearningOverview(bank, almostComplete);
    expect(overview).toMatchObject({ total: 228, tried: 227, unseen: 1, coveragePercent: 99 });
    expect(overview.topics[0].coveragePercent).toBe(99);

    const complete = buildLearningOverview(bank, [...almostComplete, record(bank[227].id, 0)]);
    expect(complete.coveragePercent).toBe(100);
    expect(complete.topics[0].coveragePercent).toBe(100);
  });
});
