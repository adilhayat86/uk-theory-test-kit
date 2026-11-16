import type { TheoryQuestion } from '../data/questions';
import type { QuestionProgressDetail } from './revision';

/** Counts describe the bundled bank and the most recent recorded answers. */
export type LearningCounts = {
  total: number;
  tried: number;
  unseen: number;
  correctLastTime: number;
  needsReview: number;
  coveragePercent: number;
};

export type TopicLearningProgress = LearningCounts & { topic: string };
export type LearningOverview = LearningCounts & { topics: TopicLearningProgress[] };

function emptyCounts(): LearningCounts {
  return { total: 0, tried: 0, unseen: 0, correctLastTime: 0, needsReview: 0, coveragePercent: 0 };
}

/**
 * Coverage is questions tried / current bank size, not a pass-readiness estimate.
 * A correct latest answer moves a question out of review; a later wrong answer
 * moves it back. Historical accuracy does not change that latest-answer state.
 *
 * The first bank entry for an ID and the last progress record for an ID win.
 * Unknown IDs and invalid attempt counts do not contribute to any counts.
 * An attempted question with an invalid answer remains in review.
 */
export function buildLearningOverview(
  bank: TheoryQuestion[],
  records: QuestionProgressDetail[],
): LearningOverview {
  const byId = new Map(records.map((record) => [record.questionId, record]));
  const seen = new Set<string>();
  const topics = new Map<string, TopicLearningProgress>();
  const overview = emptyCounts();

  for (const question of bank) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);

    let topic = topics.get(question.topic);
    if (!topic) {
      topic = { topic: question.topic, ...emptyCounts() };
      topics.set(question.topic, topic);
    }

    const record = byId.get(question.id);
    const attempted = record !== undefined && Number.isInteger(record.attempts) && record.attempts > 0;
    const selected = record?.lastSelectedIndex;
    const correct = attempted && selected !== undefined && Number.isInteger(selected) &&
      selected >= 0 && selected < question.options.length && selected === question.correctIndex;

    for (const counts of [overview, topic]) {
      counts.total += 1;
      if (!attempted) {
        counts.unseen += 1;
      } else {
        counts.tried += 1;
        if (correct) counts.correctLastTime += 1;
        else counts.needsReview += 1;
      }
    }
  }

  for (const counts of [overview, ...topics.values()]) {
    counts.coveragePercent = counts.total === 0 ? 0
      : counts.tried === counts.total ? 100
      : Math.min(99, Math.round(counts.tried / counts.total * 100));
  }
  return { ...overview, topics: [...topics.values()] };
}
