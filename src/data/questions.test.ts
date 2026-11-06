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

  it('meets the Android MVP scope of 200 questions across ten or more topics', () => {
    expect(questions.length).toBeGreaterThanOrEqual(200);
    const counts = new Map<string, number>();
    for (const question of questions) {
      counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1);
    }
    expect(counts.size).toBeGreaterThanOrEqual(10);
    for (const count of counts.values()) {
      expect(count).toBeGreaterThanOrEqual(10);
    }
  });

  it('has unique question prompts and traceable primary rule URLs', () => {
    const prompts = questions.map((question) => question.prompt.trim().toLocaleLowerCase('en-GB'));
    expect(new Set(prompts).size).toBe(prompts.length);
    for (const question of questions) {
      expect(question.sourceUrl).toMatch(/^https:\/\/www\.gov\.uk\//);
      expect(question.reference).toBeTruthy();
    }
  });

  it('uses all four possible correct-answer positions', () => {
    expect(new Set(questions.map((question) => question.correctIndex)))
      .toEqual(new Set([0, 1, 2, 3]));
  });

  it('grades only the correct selected answer as correct', () => {
    for (const question of questions) {
      expect(gradeAnswer(question.correctIndex, question.correctIndex)).toBe(true);
      expect(gradeAnswer(question.correctIndex, (question.correctIndex + 1) % 4)).toBe(false);
    }
  });
});
