import type { TheoryQuestion } from '../data/questions';
import {
  getQuestionsToRetry,
  getTopicReview,
  selectSmartPractice,
} from './revision';
import type { QuestionProgressDetail } from './revision';

const makeQuestion = (id: string, topic: string = 'Road rules'): TheoryQuestion => ({
  id, topic, difficulty: 'easy', prompt: id,
  options: ['A', 'B', 'C', 'D'], correctIndex: 0,
  explanation: 'Explanation', reference: 'Source',
});

const bank = [
  makeQuestion('wrong'),
  makeQuestion('new'),
  makeQuestion('weak'),
  makeQuestion('strong', 'Road signs'),
  makeQuestion('another', 'Road signs'),
];
const record = (
  questionId: string, attempts: number, correctAttempts: number, lastSelectedIndex: number,
): QuestionProgressDetail => ({ questionId, attempts, correctAttempts, lastSelectedIndex });

describe('offline adaptive revision', () => {
  const history = [
    record('wrong', 3, 2, 1),
    record('weak', 4, 2, 0),
    record('strong', 4, 4, 0),
  ];

  test('prioritises most recent mistakes, unseen, low accuracy then strong', () => {
    expect(selectSmartPractice(bank, history, 5).map((item) => item.id))
      .toEqual(['wrong', 'new', 'another', 'weak', 'strong']);
  });

  test('does not treat an old mistake as a current mistake after a correct retry', () => {
    expect(getQuestionsToRetry(bank, [record('wrong', 3, 1, 0)])).toEqual([]);
  });

  test('excludes unseen questions from retry mistakes', () => {
    expect(getQuestionsToRetry(bank, history).map((item) => item.id)).toEqual(['wrong']);
  });

  test('never duplicates IDs and respects session limit', () => {
    expect(selectSmartPractice([...bank, bank[0], bank[1]], history, 2)
      .map((item) => item.id)).toEqual(['wrong', 'new']);
  });

  test('returns safe empty result for invalid limits or empty banks', () => {
    expect(selectSmartPractice(bank, history, 0)).toEqual([]);
    expect(selectSmartPractice(bank, history, NaN)).toEqual([]);
    expect(selectSmartPractice([], history)).toEqual([]);
  });

  test('ignores progress for questions that no longer exist', () => {
    expect(selectSmartPractice([makeQuestion('new')], [record('removed', 1, 0, 1)])).toHaveLength(1);
  });

  test('reports topic totals, coverage, accuracy and recent mistakes', () => {
    expect(getTopicReview(bank, history)).toEqual([
      {
        topic: 'Road rules', totalQuestions: 3, questionsTried: 2, totalAttempts: 7,
        correctAttempts: 4, accuracyPercent: 57, recentMistakes: 1,
      },
      {
        topic: 'Road signs', totalQuestions: 2, questionsTried: 1, totalAttempts: 4,
        correctAttempts: 4, accuracyPercent: 100, recentMistakes: 0,
      },
    ]);
  });

  test('represents untouched topics as not attempted rather than 0% accuracy', () => {
    expect(getTopicReview([makeQuestion('new')], [])[0].accuracyPercent).toBeNull();
  });
});
