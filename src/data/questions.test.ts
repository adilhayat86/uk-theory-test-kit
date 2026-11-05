import { questions } from './questions';
import { gradeAnswer } from '../domain/progress';

describe('starter theory question bank', () => {
  it('contains unique, complete questions with four answer options', () => {
    expect(questions.length).toBeGreaterThan(0);
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);

    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
      expect(question.prompt.trim().length).toBeGreaterThan(10);
      expect(question.explanation.trim().length).toBeGreaterThan(10);
      expect(question.reference.trim().length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate answer options within a question', () => {
    for (const question of questions) {
      expect(new Set(question.options).size).toBe(question.options.length);
    }
  });

  it('grades only the correct selected answer as correct', () => {
    for (const question of questions) {
      expect(gradeAnswer(question.correctIndex, question.correctIndex)).toBe(true);
      expect(gradeAnswer(question.correctIndex, (question.correctIndex + 1) % 4)).toBe(false);
    }
  });
});
