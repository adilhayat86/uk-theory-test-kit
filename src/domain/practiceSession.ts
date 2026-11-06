import type { TheoryQuestion } from '../data/questions';

export type PracticeSession = {
  version: 1;
  id: string;
  questionIds: string[];
  answers: Record<string, number>;
  currentIndex: number;
  startedAt: number;
};

export function isPracticeSession(data: unknown): data is PracticeSession {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const value = data as Partial<PracticeSession>;
  if (value.version !== 1 || typeof value.id !== 'string' || !value.id ||
      !Number.isFinite(value.startedAt) || (value.startedAt ?? -1) < 0 ||
      !Array.isArray(value.questionIds) || !value.questionIds.length ||
      !value.questionIds.every((id) => typeof id === 'string' && id.length > 0) ||
      new Set(value.questionIds).size !== value.questionIds.length ||
      !Number.isInteger(value.currentIndex) || (value.currentIndex ?? -1) < 0 ||
      (value.currentIndex ?? Infinity) > value.questionIds.length ||
      !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return false;

  const ids = new Set(value.questionIds);
  return Object.entries(value.answers).every(([id, selectedIndex]) =>
    ids.has(id) && Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex <= 3);
}

export function beginPractice(
  items: TheoryQuestion[],
  startedAt: number,
  sessionId: string,
): PracticeSession {
  const questionIds = items.map((q) => q.id);
  if (!Number.isFinite(startedAt) || startedAt < 0 || !sessionId ||
      !questionIds.length || new Set(questionIds).size !== questionIds.length) {
    throw new Error('Cannot start an empty, duplicate or invalid practice session.');
  }
  return {
    version: 1, id: sessionId, questionIds,
    answers: {}, currentIndex: 0, startedAt,
  };
}

export function answerPractice(
  session: PracticeSession,
  questionId: string,
  selectedIndex: number,
): PracticeSession {
  if (session.currentIndex >= session.questionIds.length ||
      session.questionIds[session.currentIndex] !== questionId ||
      Object.prototype.hasOwnProperty.call(session.answers, questionId) ||
      !Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
    throw new Error('Invalid or already answered practice question.');
  }
  return { ...session, answers: { ...session.answers, [questionId]: selectedIndex } };
}

export function nextPractice(session: PracticeSession): PracticeSession {
  const questionId = session.questionIds[session.currentIndex];
  if (!questionId || !Object.prototype.hasOwnProperty.call(session.answers, questionId)) {
    throw new Error('Answer the current question before continuing.');
  }
  return { ...session, currentIndex: session.currentIndex + 1 };
}

export function practiceIsCompatible(session: PracticeSession, bank: TheoryQuestion[]): boolean {
  const byId = new Map(bank.map((q) => [q.id, q]));
  return session.questionIds.every((id) => {
    const question = byId.get(id);
    const answer = session.answers[id];
    return Boolean(question) && (answer === undefined || answer < question!.options.length);
  });
}
