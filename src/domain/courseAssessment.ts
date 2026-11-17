import type { TheoryQuestion } from '../data/questions';
import { CHECKPOINT_QUESTION_COUNT } from './courseProgress';
import { chooseQuestions } from './mockExam';

type AssessmentModule = { questionIds: readonly string[]; lessonIds: readonly string[] };
type AssessmentLesson = { id: string; questionIds: readonly string[] };

const validIds = (ids: readonly string[]) => ids.length > 0 &&
  ids.every(id => typeof id === 'string' && id.trim().length > 0) && new Set(ids).size === ids.length;

/** Keep each lesson represented, then mix the remaining questions from the topic pool. */
export function selectCheckpointQuestions(
  module: AssessmentModule,
  lessons: readonly AssessmentLesson[],
  bank: readonly TheoryQuestion[],
  random: () => number = Math.random,
): TheoryQuestion[] {
  if (!validIds(module.questionIds) || !validIds(module.lessonIds) ||
      module.lessonIds.length > CHECKPOINT_QUESTION_COUNT || module.questionIds.length < CHECKPOINT_QUESTION_COUNT) {
    throw new Error('This topic needs a valid pool of at least ten checkpoint questions.');
  }
  const moduleIds = new Set(module.questionIds);
  const byQuestion = new Map<string, TheoryQuestion>();
  for (const question of bank) {
    if (!moduleIds.has(question.id)) continue;
    if (byQuestion.has(question.id)) throw new Error('Checkpoint bank contains duplicate question identifiers.');
    if (question.caseStudyVideoAssetId) throw new Error('Topic checkpoints require ordinary questions, without video.');
    byQuestion.set(question.id, question);
  }
  if (module.questionIds.some(id => !byQuestion.has(id))) {
    throw new Error('A checkpoint question is missing from the bank.');
  }
  const byLesson = new Map<string, AssessmentLesson>();
  for (const lesson of lessons) {
    if (!module.lessonIds.includes(lesson.id)) continue;
    if (byLesson.has(lesson.id)) throw new Error('Checkpoint contains duplicate lesson definitions.');
    byLesson.set(lesson.id, lesson);
  }
  const lessonPools = module.lessonIds.map(id => {
    const lesson = byLesson.get(id);
    if (!lesson || !validIds(lesson.questionIds) || lesson.questionIds.some(questionId => !moduleIds.has(questionId))) {
      throw new Error('Each topic lesson needs valid questions in its checkpoint pool.');
    }
    return lesson.questionIds.map(questionId => byQuestion.get(questionId)!);
  });
  const selected = new Map<string, TheoryQuestion>();
  for (const pool of lessonPools) {
    if (pool.some(question => selected.has(question.id))) continue;
    const question = chooseQuestions([...pool], 1, random)[0];
    selected.set(question.id, question);
  }
  const remaining = CHECKPOINT_QUESTION_COUNT - selected.size;
  if (remaining > 0) {
    const pool = module.questionIds.filter(id => !selected.has(id)).map(id => byQuestion.get(id)!);
    for (const question of chooseQuestions(pool, remaining, random)) selected.set(question.id, question);
  }
  return chooseQuestions([...selected.values()], CHECKPOINT_QUESTION_COUNT, random);
}
