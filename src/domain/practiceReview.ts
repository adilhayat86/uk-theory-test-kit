import type { TheoryQuestion } from '../data/questions';

export type PracticeReviewEntry = {
  question: TheoryQuestion;
  selectedIndex: number;
  correct: boolean;
};

export type PracticeReviewFilter = 'all' | 'correct' | 'incorrect' | 'saved';

export type PracticeTopicScore = {
  topic: string;
  correct: number;
  attempted: number;
  percentage: number;
};

/**
 * Review each question from this specific practice session, not historical
 * aggregate counters. Invalid or absent choices are not counted as attempts.
 */
export function buildPracticeReview(
  bank: TheoryQuestion[],
  answers: Record<string, number>,
): PracticeReviewEntry[] {
  const ids = new Set<string>();
  return bank.flatMap((question) => {
    if (ids.has(question.id)) return [];
    ids.add(question.id);
    const selectedIndex = answers[question.id];
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= question.options.length) {
      return [];
    }
    return [{ question, selectedIndex, correct: selectedIndex === question.correctIndex }];
  });
}

export function filterPracticeReview(
  entries: PracticeReviewEntry[],
  filter: PracticeReviewFilter,
  savedIds: string[] = [],
): PracticeReviewEntry[] {
  if (filter === 'correct') return entries.filter((entry) => entry.correct);
  if (filter === 'incorrect') return entries.filter((entry) => !entry.correct);
  if (filter === 'saved') {
    const saved = new Set(savedIds);
    return entries.filter((entry) => saved.has(entry.question.id));
  }
  return entries;
}

export function topicPracticeScores(entries: PracticeReviewEntry[]): PracticeTopicScore[] {
  const result = new Map<string, { attempted: number; correct: number }>();
  for (const entry of entries) {
    const current = result.get(entry.question.topic) ?? { attempted: 0, correct: 0 };
    current.attempted += 1;
    if (entry.correct) current.correct += 1;
    result.set(entry.question.topic, current);
  }
  return [...result.entries()].map(([topic, count]) => ({
    topic,
    correct: count.correct,
    attempted: count.attempted,
    percentage: Math.round((count.correct / count.attempted) * 100),
  }));
}
