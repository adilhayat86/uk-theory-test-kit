import type { TheoryQuestion } from '../data/questions';

/** Local-only attempt history used to suggest the next useful practice questions. */
export type QuestionProgressDetail = {
  questionId: string;
  attempts: number;
  correctAttempts: number;
  lastSelectedIndex: number;
};

export type TopicReview = {
  topic: string;
  totalQuestions: number;
  questionsTried: number;
  totalAttempts: number;
  correctAttempts: number;
  accuracyPercent: number | null;
  recentMistakes: number;
};

function uniqueQuestions(bank: TheoryQuestion[]): TheoryQuestion[] {
  const seen = new Set<string>();
  return bank.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function recordLookup(records: QuestionProgressDetail[]): Map<string, QuestionProgressDetail> {
  return new Map(records.filter((record) => record.attempts > 0).map((record) => [record.questionId, record]));
}

/** A mistake is a question whose MOST RECENT answer was wrong, not any historical error. */
export function getQuestionsToRetry(
  bank: TheoryQuestion[],
  records: QuestionProgressDetail[],
): TheoryQuestion[] {
  const byId = recordLookup(records);
  return uniqueQuestions(bank).filter((question) => {
    const record = byId.get(question.id);
    return record !== undefined && record.lastSelectedIndex !== question.correctIndex;
  });
}

/**
 * Deterministic, offline adaptive study selection:
 * 1. questions answered incorrectly most recently;
 * 2. questions never attempted;
 * 3. previously corrected but low-accuracy questions;
 * 4. stronger questions for revision.
 *
 * It never fabricates new questions or claims that a practice session predicts a pass.
 */
export function selectSmartPractice(
  bank: TheoryQuestion[],
  records: QuestionProgressDetail[],
  limit: number = 10,
): TheoryQuestion[] {
  if (!Number.isInteger(limit) || limit < 1) return [];
  const byId = recordLookup(records);
  const priority = (question: TheoryQuestion): [number, number] => {
    const record = byId.get(question.id);
    if (!record) return [1, 0];
    const accuracy = Math.max(0, Math.min(1, record.correctAttempts / record.attempts));
    return [record.lastSelectedIndex !== question.correctIndex ? 0 : accuracy < 0.8 ? 2 : 3, accuracy];
  };

  return uniqueQuestions(bank)
    .map((question, index) => ({ question, index, rank: priority(question) }))
    .sort((a, b) =>
      a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1] || a.index - b.index)
    .slice(0, limit)
    .map(({ question }) => question);
}

/** Topic counts use the current bundled question bank; no server or personal data transfer. */
export function getTopicReview(
  bank: TheoryQuestion[],
  records: QuestionProgressDetail[],
): TopicReview[] {
  const byId = recordLookup(records);
  const topicMap = new Map<string, TopicReview>();
  for (const question of uniqueQuestions(bank)) {
    const row = topicMap.get(question.topic) ?? {
      topic: question.topic, totalQuestions: 0, questionsTried: 0,
      totalAttempts: 0, correctAttempts: 0, accuracyPercent: null, recentMistakes: 0,
    };
    row.totalQuestions += 1;
    const record = byId.get(question.id);
    if (record) {
      row.questionsTried += 1;
      row.totalAttempts += Math.max(0, record.attempts);
      row.correctAttempts += Math.min(Math.max(0, record.correctAttempts), record.attempts);
      if (record.lastSelectedIndex !== question.correctIndex) row.recentMistakes += 1;
    }
    topicMap.set(question.topic, row);
  }

  return [...topicMap.values()].map((row) => ({
    ...row,
    accuracyPercent: row.totalAttempts > 0
      ? Math.round(row.correctAttempts / row.totalAttempts * 100)
      : null,
  }));
}
