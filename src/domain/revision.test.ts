import { questions } from '../data/questions';
import { getMistakeQuestions, getSmartRevision } from './revision';

describe('offline learning and mistake-based practice', () => {
  const [first, second, third, fourth] = questions;

  it('collects latest incorrect answers and places most missed first', () => {
    const records = [
      { questionId: first.id, attempts: 3, correctAttempts: 1, lastSelectedIndex: (first.correctIndex + 1) % 4 },
      { questionId: second.id, attempts: 1, correctAttempts: 1, lastSelectedIndex: second.correctIndex },
      { questionId: third.id, attempts: 7, correctAttempts: 2, lastSelectedIndex: (third.correctIndex + 1) % 4 },
      { questionId: 'deleted-id', attempts: 1, correctAttempts: 0, lastSelectedIndex: 2 },
    ];
    expect(getMistakeQuestions(questions, records).map((q) => q.id)).toEqual([third.id, first.id]);
    expect(getSmartRevision(questions, records, 4).map((q) => q.id)).toEqual([third.id, first.id, second.id, fourth.id]);
  });

  it('does not repeat an item after its latest correct answer', () => {
    const wrong = { questionId: first.id, attempts: 1, correctAttempts: 0, lastSelectedIndex: (first.correctIndex + 1) % 4 };
    expect(getMistakeQuestions(questions, [wrong]).map((q) => q.id)).toEqual([first.id]);
    const corrected = { ...wrong, attempts: 2, correctAttempts: 1, lastSelectedIndex: first.correctIndex };
    expect(getMistakeQuestions(questions, [corrected])).toEqual([]);
    expect(getSmartRevision(questions, [], 10)).toHaveLength(10);
  });

  it('handles invalid limits and historical question IDs', () => {
    expect(getSmartRevision(questions, [], 0)).toEqual([]);
    expect(getSmartRevision(questions, [], -1)).toEqual([]);
    expect(getSmartRevision(questions, [], Number.NaN)).toEqual([]);
    expect(getSmartRevision(questions, [
      { questionId: 'old-content', attempts: 8, correctAttempts: 0, lastSelectedIndex: 3 },
    ], 5)).toHaveLength(5);
  });
});
