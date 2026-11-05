import { summarizeProgress, gradeAnswer } from './progress';

describe('progress calculations', () => {
  it('returns zero accuracy when no answers have been recorded', () => {
    expect(summarizeProgress([])).toEqual({
      questionsAnswered: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      accuracyPercent: 0,
    });
  });

  it('calculates accuracy from attempts, not unique questions', () => {
    expect(summarizeProgress([
      { questionId: 'q1', attempts: 3, correctAttempts: 2 },
      { questionId: 'q2', attempts: 1, correctAttempts: 1 },
    ])).toEqual({
      questionsAnswered: 2,
      totalAttempts: 4,
      correctAttempts: 3,
      accuracyPercent: 75,
    });
  });

  it('protects the summary from impossible negative or excessive counts', () => {
    expect(summarizeProgress([
      { questionId: 'q1', attempts: -3, correctAttempts: 9 },
    ])).toEqual({
      questionsAnswered: 1,
      totalAttempts: 0,
      correctAttempts: 0,
      accuracyPercent: 0,
    });
  });

  it('rejects invalid answer indexes', () => {
    expect(gradeAnswer(1, -1)).toBe(false);
    expect(gradeAnswer(1, 1.5)).toBe(false);
    expect(gradeAnswer(1, 1)).toBe(true);
    expect(gradeAnswer(4, 4)).toBe(false);
    expect(gradeAnswer(-1, -1)).toBe(false);
  });
});
