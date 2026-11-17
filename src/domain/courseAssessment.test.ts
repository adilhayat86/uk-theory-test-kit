import type { TheoryQuestion } from '../data/questions';
import { selectCheckpointQuestions } from './courseAssessment';

const bank: TheoryQuestion[] = Array.from({ length: 20 }, (_, index) => ({
  id: `q-${index}`, topic: 'Road rules', difficulty: 'standard', prompt: `Scenario ${index}`,
  options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Explanation.', reference: 'Highway Code',
}));
const lessons = Array.from({ length: 4 }, (_, index) => ({
  id: `lesson-${index}`, questionIds: bank.slice(index * 5, index * 5 + 5).map(q => q.id),
}));
const module = { lessonIds: lessons.map(lesson => lesson.id), questionIds: bank.map(q => q.id) };

test('ten unique questions include every lesson without changing the source bank or mappings', () => {
  const before = JSON.stringify({ bank, lessons, module });
  for (const draw of [.05, .4, .95]) {
    const selected = selectCheckpointQuestions(module, lessons, bank, () => draw);
    expect(selected).toHaveLength(10);
    const ids = new Set(selected.map(q => q.id));
    expect(ids.size).toBe(10);
    for (const lesson of lessons) expect(lesson.questionIds.some(id => ids.has(id))).toBe(true);
    expect(selected.every(q => module.questionIds.includes(q.id))).toBe(true);
  }
  expect(JSON.stringify({ bank, lessons, module })).toBe(before);
});

test('overlapping lesson pools remain represented without duplicating shared questions', () => {
  const sharedLessons = lessons.map(lesson => ({ ...lesson, questionIds: ['q-0'] }));
  const selected = selectCheckpointQuestions(module, sharedLessons, bank, () => .5);
  expect(selected.filter(q => q.id === 'q-0')).toHaveLength(1);
  expect(new Set(selected.map(q => q.id)).size).toBe(10);
});

test('an exactly ten-question pool still covers every lesson and returns all ten', () => {
  const pool = bank.slice(0, 10);
  const smallLessons = [{ id: 'first', questionIds: ['q-0'] }, { id: 'last', questionIds: ['q-9'] }];
  const selected = selectCheckpointQuestions({ lessonIds: ['first', 'last'], questionIds: pool.map(q => q.id) }, smallLessons, pool);
  expect(selected.map(q => q.id).sort()).toEqual(pool.map(q => q.id).sort());
});

test('invalid mappings cannot silently omit a lesson or substitute an unrelated question', () => {
  for (const invalid of [
    { ...module, questionIds: module.questionIds.slice(0, 9) },
    { ...module, questionIds: ['missing', ...module.questionIds.slice(1)] },
    { ...module, questionIds: ['q-0', ...module.questionIds.slice(0, 19)] },
    { ...module, lessonIds: [] },
    { ...module, lessonIds: ['missing'] },
    { ...module, lessonIds: ['lesson-0', 'lesson-0'] },
  ]) expect(() => selectCheckpointQuestions(invalid, lessons, bank)).toThrow();
  expect(() => selectCheckpointQuestions(module, [{ ...lessons[0], questionIds: [] }, ...lessons.slice(1)], bank)).toThrow();
  expect(() => selectCheckpointQuestions(module, [{ ...lessons[0], questionIds: ['unrelated'] }, ...lessons.slice(1)], bank)).toThrow();
  expect(() => selectCheckpointQuestions(module, [...lessons, lessons[0]], bank)).toThrow();
  expect(() => selectCheckpointQuestions(module, lessons, [...bank, bank[0]])).toThrow();
});

test('video-only questions and invalid random sources are rejected', () => {
  expect(() => selectCheckpointQuestions(module, lessons, [{ ...bank[0], caseStudyVideoAssetId: 'video-a' }, ...bank.slice(1)])).toThrow(/without video/);
  expect(() => selectCheckpointQuestions(module, lessons, bank, () => Infinity)).toThrow(/random/);
});
