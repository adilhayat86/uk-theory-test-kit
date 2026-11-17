import type { TheoryQuestion } from '../data/questions';
import {
  buildCheckpointResult, buildCourseProgress, checkpointPassed, checkpointContextMatchesModule, isCheckpointContext,
  isCheckpointResult, isLessonProgress, isCurrentCheckpointContext,
} from './courseProgress';
import type { CheckpointContext, CheckpointResult, LessonProgress } from './courseProgress';
import { beginPractice } from './practiceSession';

const bank: TheoryQuestion[] = Array.from({ length: 10 }, (_, index) => ({
  id: `q-${index}`, topic: 'Road rules', difficulty: 'standard', prompt: `Scenario ${index}`,
  options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Explanation.', reference: 'Highway Code',
}));
const lessons = [{ id: 'lesson-a', version: 1 }, { id: 'lesson-b', version: 2 }];
const modules = [{ id: 'module-a', version: 3, lessonIds: lessons.map(lesson => lesson.id), questionIds: bank.map(q => q.id) }];
const context: CheckpointContext = { moduleId: 'module-a', moduleVersion: 3, lessonVersions: { 'lesson-a': 1, 'lesson-b': 2 } };
const read = (lessonId: string, contentVersion: number): LessonProgress =>
  ({ lessonId, contentVersion, lastSectionId: 'last', readConfirmedAt: 10, updatedAt: 10 });
function result(correct = 8, completedAt = 20): CheckpointResult {
  return buildCheckpointResult({
    ...beginPractice(bank, 1, `attempt-${completedAt}`, context), currentIndex: 10,
    answers: Object.fromEntries(bank.map((q, i) => [q.id, i < correct ? 1 : 0])),
  }, bank, completedAt);
}

test('reading completion and dedicated assessment success remain separate', () => {
  const unopened = buildCourseProgress(modules, lessons, [], []);
  expect(unopened).toMatchObject({ lessonsRead: 0, modulesPassed: 0, modulesCompleted: 0 });
  expect(unopened.modules[0].status).toBe('notstarted');
  const reading = buildCourseProgress(modules, lessons, [{ ...read('lesson-a', 1), readConfirmedAt: null }], []);
  expect(reading.modules[0].status).toBe('reading');
  const ready = buildCourseProgress(modules, lessons, lessons.map(l => read(l.id, l.version)), []);
  expect(ready.modules[0]).toMatchObject({ status: 'ready', checkpointPassed: false, completed: false });
  const checkOnly = buildCourseProgress(modules, lessons, [], [result()]);
  expect(checkOnly.modules[0]).toMatchObject({ status: 'checkpassed', completed: false });
  const complete = buildCourseProgress(modules, lessons, lessons.map(l => read(l.id, l.version)), [result()]);
  expect(complete).toMatchObject({ lessonsRead: 2, totalLessons: 2, modulesPassed: 1, modulesCompleted: 1 });
});

test('latest compatible checkpoint determines revision, not the best or accumulated score', () => {
  const records = lessons.map(l => read(l.id, l.version));
  const failed = buildCourseProgress(modules, lessons, records, [result(10, 20), result(7, 30)]);
  expect(failed.modules[0]).toMatchObject({ status: 'revisit', checkpointPassed: false, completed: false });
  expect(failed.modules[0].latestCheckpoint?.correct).toBe(7);
  const recovered = buildCourseProgress(modules, lessons, records, [result(7, 30), result(8, 40)]);
  expect(recovered.modules[0].completed).toBe(true);
});

test('old content acknowledgements, wrong pools and mismatched lesson versions cannot complete current modules', () => {
  expect(checkpointContextMatchesModule(context, modules[0], lessons)).toBe(true);
  expect(checkpointContextMatchesModule({ ...context, moduleVersion: 1 }, modules[0], lessons)).toBe(false);
  expect(checkpointContextMatchesModule(context, modules[0], lessons.slice(0, 1))).toBe(false);
  expect(isCurrentCheckpointContext(context, modules, lessons)).toBe(true);
  expect(isCurrentCheckpointContext(context, [], lessons)).toBe(false);
  const oldRead = buildCourseProgress(modules, lessons, [read('lesson-a', 1), read('lesson-b', 1)], [result()]);
  expect(oldRead).toMatchObject({ lessonsRead: 1, modulesCompleted: 0 });
  for (const incompatible of [
    { ...result(), moduleVersion: 2 },
    { ...result(), lessonVersions: { 'lesson-a': 1, 'lesson-b': 1 } },
    { ...result(), lessonVersions: { 'lesson-a': 1 } },
    { ...result(), lessonVersions: { ...context.lessonVersions, unrelated: 1 } },
    { ...result(), moduleId: 'another-module' },
    { ...result(), questionIds: ['unrelated', ...bank.slice(1).map(q => q.id)], answers: { ...Object.fromEntries(bank.slice(1).map(q => [q.id, 1])), unrelated: 1 } },
  ]) {
    expect(buildCourseProgress(modules, lessons, lessons.map(l => read(l.id, l.version)), [incompatible]).modulesPassed).toBe(0);
  }
  const absentLesson = [{ ...modules[0], lessonIds: ['missing'] }];
  expect(buildCourseProgress(absentLesson, lessons, [], []).modulesCompleted).toBe(0);
  expect(buildCourseProgress(absentLesson, lessons, [], [{ ...result(), lessonVersions: { unrelated: 1 } }]).modulesPassed).toBe(0);
});

test('checkpoints use their own full answer snapshot and the 80 percent boundary', () => {
  expect(checkpointPassed(result(7))).toBe(false);
  expect(checkpointPassed(result(8))).toBe(true);
  const session = { ...beginPractice(bank, 1, 'immutable', context), currentIndex: 10,
    answers: Object.fromEntries(bank.map(q => [q.id, 1])) };
  const report = buildCheckpointResult(session, bank, 50);
  session.answers[bank[0].id] = 0;
  session.questionIds.reverse();
  session.checkpoint!.lessonVersions['lesson-a'] = 99;
  expect(report).toMatchObject({ correct: 10, total: 10, answers: { 'q-0': 1 }, lessonVersions: context.lessonVersions });
  expect(report.questionIds[0]).toBe('q-0');
  expect(() => buildCheckpointResult({ ...session, currentIndex: 9 }, bank, 50)).toThrow(/completed/);
  expect(() => buildCheckpointResult({ ...session, checkpoint: undefined }, bank, 50)).toThrow();
  expect(() => buildCheckpointResult(session, bank.slice(1), 50)).toThrow(/no longer/);
});

test('malformed snapshots and fabricated small quizzes are rejected', () => {
  const valid = result();
  expect(isCheckpointResult(JSON.parse(JSON.stringify(valid)))).toBe(true);
  for (const bad of [
    null, [], { ...valid, attemptId: '' }, { ...valid, correct: 11 }, { ...valid, correct: 2.5 },
    { ...valid, total: 9 }, { ...valid, completedAt: Infinity }, { ...valid, answers: [] },
    { ...valid, answers: { ...valid.answers, extra: 0 } }, { ...valid, answers: { ...valid.answers, 'q-0': 4 } },
    { ...valid, answers: { 'q-0': 1 } }, { ...valid, questionIds: ['q-0', ...valid.questionIds.slice(0, 9)] },
    { ...valid, questionIds: valid.questionIds.slice(0, 5), answers: Object.fromEntries(bank.slice(0, 5).map(q => [q.id, 1])), total: 5, correct: 5 },
  ]) expect(isCheckpointResult(bad)).toBe(false);
  expect(isCheckpointContext(context)).toBe(true);
  for (const bad of [{ ...context, lessonVersions: {} }, { ...context, lessonVersions: [] },
    { ...context, lessonVersions: { a: 0 } }, { ...context, moduleVersion: NaN }]) expect(isCheckpointContext(bad)).toBe(false);
});

test('lesson records are validated, current-version records deduplicated and timestamp zero is a valid read', () => {
  expect(isLessonProgress({ ...read('lesson-a', 1), readConfirmedAt: 0 })).toBe(true);
  expect(isLessonProgress({ ...read('lesson-a', 1), contentVersion: 0 })).toBe(false);
  expect(isLessonProgress({ ...read('lesson-a', 1), lastSectionId: '' })).toBe(false);
  const report = buildCourseProgress([...modules, modules[0]], [...lessons, lessons[0]], [
    read('lesson-a', 1), { ...read('lesson-a', 1), readConfirmedAt: null, updatedAt: 30 },
    read('unrelated', 1), read('lesson-b', 1),
  ], []);
  expect(report).toMatchObject({ totalLessons: 2, totalModules: 1, lessonsRead: 0 });
  expect(report.modules[0].status).toBe('reading');
});

test('a result that skipped an entire mapped lesson cannot count as a topic check pass', () => {
  const largerBank = Array.from({ length: 20 }, (_, index) => ({ ...bank[0], id: `q-${index}` }));
  const detailedLessons = [
    { ...lessons[0], questionIds: largerBank.slice(0, 5).map(q => q.id) },
    { ...lessons[1], questionIds: largerBank.slice(5, 10).map(q => q.id) },
  ];
  const pool = [...largerBank.slice(0, 5), ...largerBank.slice(10, 15)];
  const skippedLesson = buildCheckpointResult({
    ...beginPractice(pool, 1, 'biased-check', context), currentIndex: 10,
    answers: Object.fromEntries(pool.map(q => [q.id, q.correctIndex])),
  }, largerBank, 50);
  const report = buildCourseProgress([{ ...modules[0], questionIds: largerBank.map(q => q.id) }], detailedLessons,
    lessons.map(lesson => read(lesson.id, lesson.version)), [skippedLesson]);
  expect(report.modulesPassed).toBe(0);
  expect(report.modules[0].status).toBe('ready');
});
