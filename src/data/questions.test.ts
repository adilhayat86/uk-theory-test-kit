import { questions } from './questions';

describe('starter theory question bank', () => {
  it('contains questions with unique IDs and four answer options', () => {
    expect(questions.length).toBeGreaterThan(0);
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
      expect(question.prompt.trim().length).toBeGreaterThan(10);
      expect(question.explanation.trim().length).toBeGreaterThan(10);
    }
  });
});