import type { TheoryQuestion } from '../data/questions';

export const CHECKPOINT_QUESTION_COUNT = 10;
export const CHECKPOINT_PASS_PERCENT = 80;

export type LessonProgress = {
  lessonId: string;
  contentVersion: number;
  lastSectionId: string | null;
  readConfirmedAt: number | null;
  updatedAt: number;
};

export type CheckpointContext = {
  moduleId: string;
  moduleVersion: number;
  lessonVersions: Record<string, number>;
};

export type CheckpointResult = CheckpointContext & {
  attemptId: string;
  questionIds: string[];
  answers: Record<string, number>;
  correct: number;
  total: number;
  completedAt: number;
};

export type CourseLessonDefinition = { id: string; version: number; questionIds?: readonly string[] };
export type CourseModuleDefinition = {
  id: string;
  version: number;
  lessonIds: readonly string[];
  questionIds: readonly string[];
};
export type ModuleStudyStatus = 'notstarted' | 'reading' | 'ready' | 'checkpassed' | 'revisit';
export type ModuleStudyProgress = {
  moduleId: string;
  status: ModuleStudyStatus;
  lessonsRead: number;
  totalLessons: number;
  checkpointPassed: boolean;
  completed: boolean;
  latestCheckpoint: CheckpointResult | null;
};

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const id = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const version = (value: unknown): value is number => Number.isSafeInteger(value) && (value as number) > 0;
const timestamp = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

export function isLessonProgress(value: unknown): value is LessonProgress {
  return record(value) && id(value.lessonId) && version(value.contentVersion) &&
    (value.lastSectionId === null || id(value.lastSectionId)) &&
    (value.readConfirmedAt === null || timestamp(value.readConfirmedAt)) && timestamp(value.updatedAt);
}

export function isCheckpointContext(value: unknown): value is CheckpointContext {
  return record(value) && id(value.moduleId) && version(value.moduleVersion) &&
    record(value.lessonVersions) && Object.keys(value.lessonVersions).length > 0 &&
    Object.entries(value.lessonVersions).every(([key, item]) =>
      id(key) && key !== '__proto__' && key !== 'constructor' && key !== 'prototype' && version(item));
}

export function isCheckpointResult(value: unknown): value is CheckpointResult {
  if (!isCheckpointContext(value)) return false;
  const result = value as Partial<CheckpointResult>;
  if (!id(result.attemptId) ||
      !Array.isArray(result.questionIds) || result.questionIds.length !== CHECKPOINT_QUESTION_COUNT ||
      !result.questionIds.every(id) || new Set(result.questionIds).size !== result.questionIds.length ||
      !record(result.answers) || Object.keys(result.answers).length !== result.questionIds.length ||
      result.total !== result.questionIds.length || !Number.isInteger(result.correct) ||
      (result.correct as number) < 0 || (result.correct as number) > result.questionIds.length ||
      !timestamp(result.completedAt)) return false;
  const ids = new Set(result.questionIds);
  return Object.entries(result.answers).every(([key, answer]) =>
    ids.has(key) && Number.isInteger(answer) && (answer as number) >= 0 && (answer as number) <= 3);
}

/** A checkpoint is scored from its own saved answers, never accumulated practice accuracy. */
export function buildCheckpointResult(
  session: {
    id: string;
    checkpoint?: CheckpointContext;
    questionIds: string[];
    answers: Record<string, number>;
    currentIndex: number;
  },
  bank: readonly TheoryQuestion[],
  completedAt: number,
): CheckpointResult {
  if (!isCheckpointContext(session.checkpoint) || !id(session.id) ||
      session.currentIndex !== session.questionIds.length || !timestamp(completedAt)) {
    throw new Error('Checkpoint must be completed before saving a result.');
  }
  const byId = new Map(bank.map(question => [question.id, question]));
  let correct = 0;
  for (const questionId of session.questionIds) {
    const question = byId.get(questionId);
    if (!question) throw new Error('Checkpoint question is no longer available.');
    if (session.answers[questionId] === question.correctIndex) correct += 1;
  }
  const result: CheckpointResult = {
    attemptId: session.id,
    moduleId: session.checkpoint.moduleId,
    moduleVersion: session.checkpoint.moduleVersion,
    lessonVersions: { ...session.checkpoint.lessonVersions },
    questionIds: [...session.questionIds],
    answers: { ...session.answers },
    correct,
    total: session.questionIds.length,
    completedAt,
  };
  if (!isCheckpointResult(result)) throw new Error('Invalid completed checkpoint.');
  return result;
}

export function checkpointPassed(result: CheckpointResult): boolean {
  return isCheckpointResult(result) && result.correct * 100 >= result.total * CHECKPOINT_PASS_PERCENT;
}

export function checkpointContextMatchesModule(
  context: CheckpointContext,
  module: CourseModuleDefinition,
  lessons: readonly CourseLessonDefinition[],
): boolean {
  if (!isCheckpointContext(context) || context.moduleId !== module.id || context.moduleVersion !== module.version ||
      !module.lessonIds.length || new Set(module.lessonIds).size !== module.lessonIds.length ||
      Object.keys(context.lessonVersions).length !== module.lessonIds.length) return false;
  const definitions = new Map(lessons.map(lesson => [lesson.id, lesson]));
  return module.lessonIds.every(lessonId => {
    const definition = definitions.get(lessonId);
    return definition !== undefined && context.lessonVersions[lessonId] === definition.version;
  });
}

export function isCurrentCheckpointContext(
  context: CheckpointContext,
  modules: readonly CourseModuleDefinition[],
  lessons: readonly CourseLessonDefinition[],
): boolean {
  if (!isCheckpointContext(context)) return false;
  const module = modules.find(item => item.id === context.moduleId);
  return module !== undefined && checkpointContextMatchesModule(context, module, lessons);
}

/** Reading, assessment and completion are deliberately independent measures. */
export function buildCourseProgress(
  modules: readonly CourseModuleDefinition[],
  lessons: readonly CourseLessonDefinition[],
  records: readonly LessonProgress[],
  results: readonly CheckpointResult[],
) {
  const lessonDefinitions = new Map<string, CourseLessonDefinition>();
  for (const lesson of lessons) if (!lessonDefinitions.has(lesson.id)) lessonDefinitions.set(lesson.id, lesson);
  const currentRecords = new Map<string, LessonProgress>();
  for (const entry of records) {
    if (!isLessonProgress(entry) || lessonDefinitions.get(entry.lessonId)?.version !== entry.contentVersion) continue;
    const previous = currentRecords.get(entry.lessonId);
    if (!previous || entry.updatedAt > previous.updatedAt) currentRecords.set(entry.lessonId, entry);
  }
  const lessonProgress = [...lessonDefinitions.values()].map(lesson => ({
    lessonId: lesson.id,
    read: currentRecords.get(lesson.id)?.readConfirmedAt != null,
    lastSectionId: currentRecords.get(lesson.id)?.lastSectionId ?? null,
  }));
  const readIds = new Set(lessonProgress.filter(lesson => lesson.read).map(lesson => lesson.lessonId));
  const uniqueModules = new Map<string, CourseModuleDefinition>();
  for (const module of modules) if (!uniqueModules.has(module.id)) uniqueModules.set(module.id, module);
  const moduleProgress: ModuleStudyProgress[] = [...uniqueModules.values()].map(module => {
    const lessonIds = [...new Set(module.lessonIds)];
    const lessonsRead = lessonIds.filter(lessonId => readIds.has(lessonId)).length;
    const allRead = lessonIds.length > 0 && lessonsRead === lessonIds.length;
    const questionIds = new Set(module.questionIds);
    let latestCheckpoint: CheckpointResult | null = null;
    for (const result of results) {
      if (!isCheckpointResult(result) || !checkpointContextMatchesModule(result, module, [...lessonDefinitions.values()]) ||
          !result.questionIds.every(questionId => questionIds.has(questionId)) ||
          !lessonIds.every(lessonId => {
            const pool = lessonDefinitions.get(lessonId)?.questionIds;
            return pool === undefined || pool.some(questionId => result.questionIds.includes(questionId));
          })) continue;
      // Input order breaks equal-time ties; storage returns the newest row first.
      if (!latestCheckpoint || result.completedAt > latestCheckpoint.completedAt) latestCheckpoint = result;
    }
    const passed = latestCheckpoint !== null && checkpointPassed(latestCheckpoint);
    const started = lessonIds.some(lessonId => currentRecords.has(lessonId));
    const status: ModuleStudyStatus = latestCheckpoint ? passed ? 'checkpassed' : 'revisit'
      : allRead ? 'ready' : started ? 'reading' : 'notstarted';
    return {
      moduleId: module.id, status, lessonsRead, totalLessons: lessonIds.length,
      checkpointPassed: passed, completed: allRead && passed, latestCheckpoint,
    };
  });
  return {
    lessonsRead: readIds.size,
    totalLessons: lessonProgress.length,
    modulesPassed: moduleProgress.filter(module => module.checkpointPassed).length,
    modulesCompleted: moduleProgress.filter(module => module.completed).length,
    totalModules: moduleProgress.length,
    modules: moduleProgress,
    lessons: lessonProgress,
  };
}
