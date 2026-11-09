import type { TheoryQuestion } from '../data/questions';
import { getQuestionsToRetry, selectSmartPractice } from './revision';
import type { QuestionProgressDetail } from './revision';

export type PracticeMode = 'all' | 'smart' | 'incorrect' | 'unseen' | 'saved';

/** Empty topics means every topic. Filters always apply before smart ranking. */
export function eligiblePracticeQuestions(
  bank: TheoryQuestion[], records: QuestionProgressDetail[], savedIds: string[],
  topics: string[], mode: PracticeMode,
): TheoryQuestion[] {
  const seen = new Set<string>();
  const selected = new Set(topics);
  const pool = bank.filter((q) => {
    if (seen.has(q.id) || (selected.size > 0 && !selected.has(q.topic))) return false;
    seen.add(q.id);
    return true;
  });
  if (mode === 'smart') return selectSmartPractice(pool, records, pool.length);
  if (mode === 'incorrect') return getQuestionsToRetry(pool, records);
  if (mode === 'unseen') {
    const tried = new Set(records.filter((r) => r.attempts > 0).map((r) => r.questionId));
    return pool.filter((q) => !tried.has(q.id));
  }
  if (mode === 'saved') {
    const saved = new Set(savedIds);
    return pool.filter((q) => saved.has(q.id));
  }
  return pool;
}
