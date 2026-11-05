import type { TheoryQuestion } from '../data/questions';

export type QuestionLearningRecord = {
  questionId: string;
  attempts: number;
  correctAttempts: number;
  lastSelectedIndex: number;
};

export function getMistakeQuestions(
  bank: readonly TheoryQuestion[],
  records: readonly QuestionLearningRecord[],
): TheoryQuestion[] {
  const byId = new Map(records.map((row) => [row.questionId, row]));
  return bank.filter((question) => {
    const record = byId.get(question.id);
    return Boolean(record && record.attempts > 0 &&
      record.lastSelectedIndex >= 0 && record.lastSelectedIndex <= 3 &&
      record.lastSelectedIndex !== question.correctIndex);
  }).sort((a, b) => {
    const first = byId.get(a.id)!;
    const second = byId.get(b.id)!;
    const firstMisses = Math.max(0, first.attempts - first.correctAttempts);
    const secondMisses = Math.max(0, second.attempts - second.correctAttempts);
    return secondMisses - firstMisses || a.id.localeCompare(b.id);
  });
}

/**
 * Adaptive practice without a server or personal profile.
 * First revisit latest mistakes, then weaker learned items, then new material,
 * finally mastered questions. Sorting is deterministic to allow test coverage.
 */
export function getSmartRevision(
  bank: readonly TheoryQuestion[],
  records: readonly QuestionLearningRecord[],
  limit: number = 10,
): TheoryQuestion[] {
  if (!Number.isInteger(limit) || limit <= 0) return [];
  const byId = new Map(records.map((row) => [row.questionId, row]));
  const mistakes = getMistakeQuestions(bank, records);
  const mistakesIds = new Set(mistakes.map((q) => q.id));
  const seen = new Set<string>(mistakesIds);

  const previouslySeen = bank.filter((q) => {
    const row = byId.get(q.id);
    return !seen.has(q.id) && row && row.attempts > 0;
  }).sort((a, b) => {
    const x = byId.get(a.id)!;
    const y = byId.get(b.id)!;
    const accuracyX = x.attempts > 0 ? x.correctAttempts / x.attempts : 0;
    const accuracyY = y.attempts > 0 ? y.correctAttempts / y.attempts : 0;
    return accuracyX - accuracyY || a.id.localeCompare(b.id);
  });
  for (const q of previouslySeen) seen.add(q.id);
  const unseen = bank.filter((q) => !seen.has(q.id)).sort((a, b) => a.id.localeCompare(b.id));
  return [...mistakes, ...previouslySeen, ...unseen].slice(0, limit);
}
