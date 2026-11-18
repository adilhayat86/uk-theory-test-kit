import type { TheoryQuestion } from "../data/questions";
import type { CourseLesson } from "../data/course";
import { isMockResult } from "./mockExam";
import type { MockResult } from "./mockExam";
import type { QuestionProgressDetail } from "./revision";

export type RevisionFocus = {
  questions: TheoryQuestion[];
  mistakeCount: number;
  topics: { topic: string; count: number }[];
  lessonIds: string[];
};
export type MockReviewFilter = "all" | "incorrect" | "unanswered";
export type MockReviewEntry = {
  question: TheoryQuestion;
  number: number;
  selectedIndex: number | undefined;
  status: "correct" | "incorrect" | "unanswered";
};

const time = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;

/** Ignore corrupt, duplicate or obsolete results when deriving current-bank revision. */
export function currentMockResults(
  bank: readonly TheoryQuestion[],
  results: readonly MockResult[],
): MockResult[] {
  const byId = new Map(bank.map((question) => [question.id, question]));
  const seen = new Set<string>();
  return results.filter(isMockResult)
    .filter((result) => result.questionIds.every((id) => byId.has(id)))
    .filter((result) => result.correct === Object.entries(result.answers)
      .filter(([id, answer]) => byId.get(id)?.correctIndex === answer).length)
    .sort((a, b) => b.finishedAt - a.finishedAt || b.id.localeCompare(a.id))
    .filter((result) => {
      if (seen.has(result.id)) return false;
      seen.add(result.id);
      return true;
    });
}

/**
 * Selection-only records; never persist these counters or use them for course/coverage credit.
 * Ordinary history and completed mocks retain separate stores. A newer correct answer from
 * either clears an older mistake. Missing ordinary dates use 0; missing legacy mock
 * answer dates use the attempt start, never its later submission time. On equal
 * timestamps, the ordinary answer wins; mock ties use completion time then ID.
 */
export function mergeRevisionRecords(
  bank: readonly TheoryQuestion[],
  records: readonly QuestionProgressDetail[],
  mockResults: readonly MockResult[] = [],
): QuestionProgressDetail[] {
  const byId = new Map(bank.map((question) => [question.id, question]));
  const selected = new Map<string, QuestionProgressDetail>();
  const ordinaryTimes = new Map<string, number>();
  for (const record of records) {
    const question = byId.get(record.questionId);
    if (!question || !Number.isSafeInteger(record.attempts) || record.attempts < 1 ||
        !Number.isSafeInteger(record.correctAttempts) || record.correctAttempts < 0 ||
        record.correctAttempts > record.attempts || !Number.isInteger(record.lastSelectedIndex) ||
        record.lastSelectedIndex < 0 || record.lastSelectedIndex >= question.options.length) continue;
    const answeredAt = time(record.lastAnsweredAt);
    if (selected.has(record.questionId) && answeredAt < (ordinaryTimes.get(record.questionId) ?? 0)) continue;
    selected.set(record.questionId, { ...record, lastAnsweredAt: answeredAt });
    ordinaryTimes.set(record.questionId, answeredAt);
  }
  const latest = new Map([...selected].map(([id, record]) => [id, time(record.lastAnsweredAt)]));
  // Newest first means equal-time mock answers are resolved deterministically once.
  for (const result of currentMockResults(bank, mockResults)) {
    for (const [id, answer] of Object.entries(result.answers)) {
      const question = byId.get(id)!;
      const existing = selected.get(id);
      const newestTime = latest.get(id);
      const answeredAt = result.answerTimes?.[id] ?? result.startedAt;
      const replaceLatest = newestTime === undefined || answeredAt > newestTime;
      selected.set(id, {
        questionId: id,
        attempts: (existing?.attempts ?? 0) + 1,
        correctAttempts: (existing?.correctAttempts ?? 0) + (answer === question.correctIndex ? 1 : 0),
        lastSelectedIndex: replaceLatest ? answer : existing!.lastSelectedIndex,
        lastAnsweredAt: replaceLatest ? answeredAt : newestTime,
      });
      if (replaceLatest) latest.set(id, answeredAt);
    }
  }
  return [...byId.keys()].flatMap((id) => selected.has(id) ? [selected.get(id)!] : []);
}

export function relatedLessonId(
  question: TheoryQuestion,
  lessons: readonly CourseLesson[],
): string | undefined {
  return lessons.find((lesson) => lesson.questionIds.includes(question.id) ||
    (!!question.caseStudyVideoAssetId && lesson.sections.some(
      (section) => section.caseStudyId === question.caseStudyVideoAssetId,
    )))?.id;
}

export function buildRevisionFocus(
  bank: readonly TheoryQuestion[],
  records: readonly QuestionProgressDetail[],
  mockResults: readonly MockResult[],
  lessons: readonly CourseLesson[],
): RevisionFocus {
  const merged = new Map(mergeRevisionRecords(bank, records, mockResults)
    .map((record) => [record.questionId, record]));
  const unique = [...new Map(bank.map((question) => [question.id, question])).values()];
  const questions = unique.filter((question) => {
    const record = merged.get(question.id);
    return record !== undefined && record.lastSelectedIndex !== question.correctIndex;
  }).sort((a, b) => time(merged.get(b.id)?.lastAnsweredAt) - time(merged.get(a.id)?.lastAnsweredAt));
  const topics = new Map<string, number>();
  const lessonIds = new Set<string>();
  for (const question of questions) {
    topics.set(question.topic, (topics.get(question.topic) ?? 0) + 1);
    const lessonId = relatedLessonId(question, lessons);
    if (lessonId) lessonIds.add(lessonId);
  }
  return { questions, mistakeCount: questions.length,
    topics: [...topics].map(([topic, count]) => ({ topic, count })).sort((a, b) => b.count - a.count),
    lessonIds: [...lessonIds] };
}

export function buildMockReview(result: MockResult, bank: readonly TheoryQuestion[]): MockReviewEntry[] {
  if (!currentMockResults(bank, [result]).length) return [];
  const byId = new Map(bank.map((question) => [question.id, question]));
  return result.questionIds.map((id, index) => {
    const question = byId.get(id)!;
    const selectedIndex = result.answers[id];
    return { question, number: index + 1, selectedIndex,
      status: selectedIndex === undefined ? "unanswered" : selectedIndex === question.correctIndex ? "correct" : "incorrect" };
  });
}

export function filterMockReview(entries: readonly MockReviewEntry[], filter: MockReviewFilter): MockReviewEntry[] {
  return entries.filter((entry) => filter === "all" || entry.status === filter);
}

export function mockTopicScores(entries: readonly MockReviewEntry[]) {
  const topics = new Map<string, { topic: string; correct: number; incorrect: number; unanswered: number; total: number }>();
  for (const entry of entries) {
    const score = topics.get(entry.question.topic) ?? {
      topic: entry.question.topic, correct: 0, incorrect: 0, unanswered: 0, total: 0,
    };
    score.total += 1;
    score[entry.status] += 1;
    topics.set(score.topic, score);
  }
  return [...topics.values()].sort((a, b) =>
    (b.incorrect + b.unanswered) - (a.incorrect + a.unanswered) || a.topic.localeCompare(b.topic));
}
