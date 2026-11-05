import type { TheoryQuestion } from '../data/questions';

/**
 * An intentionally separate exam engine. It has no React, network or SQLite dependencies,
 * so timer/scoring behavior can be tested deterministically.
 */
export const FULL_EXAM_QUESTION_COUNT = 50;
export const FULL_EXAM_DURATION_MS = 57 * 60 * 1000;
export const FULL_EXAM_PASS_MARK = 43;
export const SAMPLE_EXAM_DURATION_MS = 6 * 60 * 1000;

export type MockMode = 'sample' | 'full';
export type FinishReason = 'submitted' | 'timeout';

export type MockSession = {
  version: 1;
  id: string;
  mode: MockMode;
  questionIds: string[];
  answers: Record<string, number>;
  flaggedIds: string[];
  currentIndex: number;
  startedAt: number;
  expiresAt: number;
};

export type MockResult = {
  id: string;
  mode: MockMode;
  questionIds: string[];
  answers: Record<string, number>;
  correct: number;
  answered: number;
  total: number;
  percent: number;
  passed: boolean | null;
  startedAt: number;
  finishedAt: number;
  reason: FinishReason;
};

export function fullMockReadiness(bank: TheoryQuestion[]): {
  eligible: boolean;
  questionCount: number;
  hasVideoCaseStudy: boolean;
} {
  // The real exam includes three questions tied to a silent video.
  // Do not label a random 50-question quiz a faithful full exam.
  const validVideos = bank.filter((question) => Boolean(question.caseStudyVideoAssetId));
  const hasVideoCaseStudy = new Set(validVideos.map((q) => q.caseStudyVideoAssetId)).size >= 1 &&
    validVideos.length >= 3;
  const questionCount = new Set(bank.map((question) => question.id)).size;
  return {
    eligible: questionCount >= FULL_EXAM_QUESTION_COUNT && hasVideoCaseStudy,
    questionCount,
    hasVideoCaseStudy,
  };
}

export function chooseQuestions(
  bank: TheoryQuestion[],
  count: number,
  random: () => number = Math.random,
): TheoryQuestion[] {
  const seen = new Set<string>();
  const unique = bank.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
  if (count < 1 || count > unique.length || !Number.isInteger(count)) {
    throw new Error('Not enough unique questions to start this mock.');
  }
  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const draw = random();
    if (!Number.isFinite(draw) || draw < 0 || draw >= 1) {
      throw new Error('Invalid random value.');
    }
    const j = Math.floor(draw * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function beginMock(
  bank: TheoryQuestion[],
  mode: MockMode,
  now: number,
  random: () => number = Math.random,
): MockSession {
  if (!Number.isFinite(now) || now < 0) throw new Error('Invalid clock.');
  if (mode === 'full' && !fullMockReadiness(bank).eligible) {
    throw new Error('Full mock requires 50 reviewed questions and a video case study.');
  }
  const count = mode === 'full' ? FULL_EXAM_QUESTION_COUNT : Math.min(5, bank.length);
  const questionIds = chooseQuestions(bank, count, random).map((question) => question.id);
  return {
    version: 1,
    id: `mock-${Math.trunc(now)}-${Math.floor(random() * 1_000_000_000)}`,
    mode,
    questionIds,
    answers: {},
    flaggedIds: [],
    currentIndex: 0,
    startedAt: now,
    expiresAt: now + (mode === 'full' ? FULL_EXAM_DURATION_MS : SAMPLE_EXAM_DURATION_MS),
  };
}

export function timeLeftMs(session: MockSession, now: number): number {
  return Math.max(0, session.expiresAt - now);
}

export function isExpired(session: MockSession, now: number): boolean {
  return timeLeftMs(session, now) === 0;
}

export function answerQuestion(
  session: MockSession,
  questionId: string,
  index: number,
  now: number,
): MockSession {
  if (isExpired(session, now)) return session;
  if (!session.questionIds.includes(questionId) || !Number.isInteger(index) || index < 0 || index > 3) {
    throw new Error('Invalid question or answer.');
  }
  return { ...session, answers: { ...session.answers, [questionId]: index } };
}

export function flagQuestion(session: MockSession, questionId: string, now: number): MockSession {
  if (isExpired(session, now)) return session;
  if (!session.questionIds.includes(questionId)) throw new Error('Question is not part of this mock.');
  const flagged = new Set(session.flaggedIds);
  if (flagged.has(questionId)) flagged.delete(questionId);
  else flagged.add(questionId);
  return { ...session, flaggedIds: [...flagged] };
}

export function goToQuestion(session: MockSession, index: number): MockSession {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) return session;
  return { ...session, currentIndex: index };
}

export function finishMock(
  session: MockSession,
  bank: TheoryQuestion[],
  now: number,
  reason: FinishReason = 'submitted',
): MockResult {
  if (reason === 'submitted' && isExpired(session, now)) reason = 'timeout';
  const correctAnswers = new Map(bank.map((question) => [question.id, question.correctIndex]));
  const correct = session.questionIds.reduce(
    (sum, id) => sum + (Object.prototype.hasOwnProperty.call(session.answers, id) &&
      session.answers[id] === correctAnswers.get(id) ? 1 : 0),
    0,
  );
  const total = session.questionIds.length;
  const answered = session.questionIds.filter((id) =>
    Object.prototype.hasOwnProperty.call(session.answers, id)).length;
  return {
    id: session.id,
    mode: session.mode,
    questionIds: [...session.questionIds],
    answers: { ...session.answers },
    correct,
    answered,
    total,
    percent: total === 0 ? 0 : Math.round(correct * 100 / total),
    passed: session.mode === 'full' ? correct >= FULL_EXAM_PASS_MARK : null,
    startedAt: session.startedAt,
    finishedAt: Math.max(session.startedAt, Math.min(now, session.expiresAt)),
    reason,
  };
}

export function isMockSession(value: unknown): value is MockSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as Partial<MockSession>;
  if (session.version !== 1 || typeof session.id !== 'string' ||
      (session.mode !== 'sample' && session.mode !== 'full') ||
      !Array.isArray(session.questionIds) || session.questionIds.length === 0 ||
      !session.questionIds.every((id) => typeof id === 'string') ||
      new Set(session.questionIds).size !== session.questionIds.length ||
      typeof session.startedAt !== 'number' || !Number.isFinite(session.startedAt) ||
      typeof session.expiresAt !== 'number' || !Number.isFinite(session.expiresAt) ||
      session.expiresAt <= session.startedAt ||
      !Number.isInteger(session.currentIndex) || (session.currentIndex ?? -1) < 0 ||
      (session.currentIndex ?? 0) >= session.questionIds.length ||
      !session.answers || typeof session.answers !== 'object' ||
      !Array.isArray(session.flaggedIds) ||
      !session.flaggedIds.every((id) => session.questionIds?.includes(id))) return false;
  const ids = new Set(session.questionIds);
  return Object.entries(session.answers).every(([id, index]) =>
    ids.has(id) && Number.isInteger(index) && index >= 0 && index <= 3);
}

export function formattedTimeLeft(milliseconds: number): string {
  const seconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
