import { roadSigns } from '../data/roadSigns';
import { makeSignQuiz, shuffleItems } from './roadSignQuiz';

describe('road sign recognition quiz', () => {
  it('picks ten distinct offline signs with four plausible unique options', () => {
    const quiz = makeSignQuiz(roadSigns, 10, () => 0.4);
    expect(quiz).toHaveLength(10);
    expect(new Set(quiz.map((question) => question.signId)).size).toBe(10);
    for (const question of quiz) {
      const sign = roadSigns.find((item) => item.id === question.signId)!;
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options).size).toBe(4);
      expect(question.options[question.answerIndex]).toBe(sign.label);
      expect(question.options.every((option) => roadSigns.some((item) => item.label === option))).toBe(true);
    }
  });

  it('draws distractors from the same category when possible', () => {
    const quiz = makeSignQuiz(roadSigns, roadSigns.length, () => 0.5);
    for (const question of quiz) {
      const sign = roadSigns.find((item) => item.id === question.signId)!;
      const sameCategoryLabels = roadSigns.filter((item) => item.category === sign.category).map((item) => item.label);
      expect(question.options.filter((option) => sameCategoryLabels.includes(option)).length)
        .toBe(Math.min(4, sameCategoryLabels.length));
    }
  });

  it('rejects invalid draws, invalid lengths and duplicate sign IDs', () => {
    expect(() => makeSignQuiz(roadSigns, 0)).toThrow();
    expect(() => makeSignQuiz(roadSigns, roadSigns.length + 1)).toThrow();
    expect(() => makeSignQuiz(roadSigns, 3, () => 1)).toThrow();
    expect(() => makeSignQuiz([roadSigns[0], roadSigns[0]], 1)).toThrow();
    expect(() => shuffleItems([1, 2, 3], () => -0.1)).toThrow();
  });
});
