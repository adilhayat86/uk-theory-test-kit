import type { TheoryQuestion } from '../data/questions';
import {
  answerPractice, beginPractice, isPracticeSession, nextPractice, practiceIsCompatible,
} from './practiceSession';

const bank: TheoryQuestion[] = [
  { id: 'a', topic: 'Road rules', difficulty: 'easy', prompt: 'How should a driver act?',
    options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Drive safely.',
    reference: 'Highway Code, Rule 103' },
  { id: 'b', topic: 'Road rules', difficulty: 'easy', prompt: 'What is the next step?',
    options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'Be careful.',
    reference: 'Highway Code, Rule 104' },
];

describe('resumable offline practice domain', () => {
  const start = () => beginPractice(bank, 1_700_000_000_000, 'practice-1');

  it('creates and round-trips a valid session', () => {
    const session = start();
    expect(session.questionIds).toEqual(['a', 'b']);
    expect(session.answers).toEqual({});
    expect(isPracticeSession(JSON.parse(JSON.stringify(session)))).toBe(true);
    expect(practiceIsCompatible(session, bank)).toBe(true);
  });

  it('saves exactly one answer and advances only after an answer', () => {
    const original = start();
    expect(() => nextPractice(original)).toThrow(/Answer/);
    const selected = answerPractice(original, 'a', 1);
    expect(original.answers).toEqual({});
    expect(selected.answers.a).toBe(1);
    expect(() => answerPractice(selected, 'a', 2)).toThrow(/already answered/);
    expect(() => answerPractice(original, 'b', 1)).toThrow(/Invalid/);
    const moved = nextPractice(selected);
    expect(moved.currentIndex).toBe(1);
    const completed = nextPractice(answerPractice(moved, 'b', 0));
    expect(completed.currentIndex).toBe(2);
    expect(isPracticeSession(completed)).toBe(true);
    expect(() => nextPractice(completed)).toThrow(/Answer/);
  });

  it('rejects stale or malformed sessions and duplicates', () => {
    const session = start();
    expect(isPracticeSession({ ...session, questionIds: ['a', 'a'] })).toBe(false);
    expect(isPracticeSession({ ...session, currentIndex: 99 })).toBe(false);
    expect(isPracticeSession({ ...session, answers: { b: 7 } })).toBe(false);
    expect(isPracticeSession({ ...session, answers: { x: 1 } })).toBe(false);
    expect(isPracticeSession({ ...session, answers: [] })).toBe(false);
    expect(practiceIsCompatible(session, bank.slice(1))).toBe(false);
    expect(() => beginPractice([bank[0], bank[0]], 3, 'x')).toThrow();
  });

  it('rejects invalid answer indexes', () => {
    expect(() => answerPractice(start(), 'a', -1)).toThrow();
    expect(() => answerPractice(start(), 'a', 4)).toThrow();
    expect(() => answerPractice(start(), 'a', NaN)).toThrow();
  });
});
