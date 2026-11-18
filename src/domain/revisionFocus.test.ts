import type { CourseLesson } from "../data/course";
import type { TheoryQuestion } from "../data/questions";
import type { MockResult } from "./mockExam";
import { answerQuestion, beginMock, finishMock } from "./mockExam";
import type { QuestionProgressDetail } from "./revision";
import { buildMockReview, buildRevisionFocus, currentMockResults,
  filterMockReview, mergeRevisionRecords, mockTopicScores } from "./revisionFocus";

const bank: TheoryQuestion[] = Array.from({ length: 5 }, (_, i) => ({
  id: `q${i}`, topic: i < 3 ? "Road rules" : "Road signs", difficulty: "easy",
  prompt: `Question ${i}`, options: ["Correct", "Wrong", "Other", "Another"],
  correctIndex: 0, explanation: "Reason", reference: "Rule",
  ...(i === 4 ? { caseStudyVideoAssetId: "video-road" } : {}),
}));
function result(id: string, finishedAt: number, answers: Record<string, number>): MockResult {
  const correct = Object.values(answers).filter((answer) => answer === 0).length;
  return { id, mode: "sample", questionIds: bank.map((q) => q.id), answers,
    answerTimes: Object.fromEntries(Object.keys(answers).map((id) => [id, finishedAt])),
    correct, answered: Object.keys(answers).length, total: 5, percent: correct * 20,
    passed: null, startedAt: 0, finishedAt, reason: "submitted" };
}
function record(questionId: string, lastSelectedIndex: number, lastAnsweredAt?: number): QuestionProgressDetail {
  return { questionId, lastSelectedIndex, attempts: 1,
    correctAttempts: lastSelectedIndex === 0 ? 1 : 0, lastAnsweredAt };
}
const lessons: CourseLesson[] = [{
  id: "rules-lesson", moduleId: "rules", title: "Rules", version: 1, minutes: 2,
  objectives: [], sections: [], scenario: { title: "Example", text: "Example" },
  takeaways: [], sources: [], questionIds: ["q0", "q1", "q2"],
}, { id: "video-lesson", moduleId: "signs", title: "Video", version: 1, minutes: 2,
  objectives: [], sections: [{ id: "clip", title: "Clip", paragraphs: [], caseStudyId: "video-road" }],
  scenario: { title: "Example", text: "Example" }, takeaways: [], sources: [], questionIds: [] }];

describe("latest-answer revision focus", () => {
  test("a newer ordinary correct retry clears an earlier mock mistake", () => {
    expect(buildRevisionFocus(bank, [record("q0", 0, 200)], [result("exam", 100, { q0: 1 })], lessons).mistakeCount).toBe(0);
  });
  test("a newer correct mock answer clears an ordinary mistake", () => {
    expect(buildRevisionFocus(bank, [record("q0", 1, 100)], [result("exam", 200, { q0: 0 })], lessons).mistakeCount).toBe(0);
  });
  test("newer wrong answers from either source enter the queue, newest first", () => {
    const focus = buildRevisionFocus(bank, [record("q0", 1, 300), record("q1", 0, 100)],
      [result("exam", 200, { q1: 1, q4: 1 })], lessons);
    expect(focus.questions.map((q) => q.id)).toEqual(["q0", "q1", "q4"]);
    expect(focus.topics).toEqual([{ topic: "Road rules", count: 2 }, { topic: "Road signs", count: 1 }]);
    expect(focus.lessonIds).toEqual(["rules-lesson", "video-lesson"]);
  });
  test("unanswered questions never become mistakes", () => {
    const focus = buildRevisionFocus(bank, [], [result("exam", 100, { q0: 1 })], lessons);
    expect(focus.questions.map((q) => q.id)).toEqual(["q0"]);
  });
  test("equal timestamps prefer ordinary retries and unknown legacy dates are older than dated mocks", () => {
    expect(buildRevisionFocus(bank, [record("q0", 0, 100)], [result("exam", 100, { q0: 1 })], lessons).mistakeCount).toBe(0);
    expect(buildRevisionFocus(bank, [record("q0", 0)], [result("exam", 100, { q0: 1 })], lessons).mistakeCount).toBe(1);
  });
  test("duplicate results do not double-count derived selection events or mutate persisted records", () => {
    const records = [record("q0", 0, 100)];
    const exams = [result("exam", 200, { q0: 1 })];
    const before = JSON.stringify({ records, exams });
    expect(mergeRevisionRecords(bank, records, [exams[0], exams[0]])[0]).toMatchObject({ attempts: 2, correctAttempts: 1, lastSelectedIndex: 1 });
    expect(JSON.stringify({ records, exams })).toBe(before);
  });
  test("ignores obsolete or corrupt result scores and invalid ordinary rows", () => {
    const obsolete = { ...result("removed", 100, { q0: 1 }), questionIds: ["removed", "q1", "q2", "q3", "q4"] };
    const corrupt = { ...result("score", 200, { q0: 0 }), correct: 0, percent: 0 };
    expect(currentMockResults(bank, [obsolete, corrupt])).toEqual([]);
    expect(mergeRevisionRecords(bank, [record("removed", 1), { ...record("q0", 1), attempts: -1 }], [])).toEqual([]);
  });
  test("answer changes invalidate an incompatible historical score", () => {
    const changed = bank.map((q) => q.id === "q0" ? { ...q, correctIndex: 1 as const } : q);
    expect(currentMockResults(changed, [result("exam", 100, { q0: 0 })])).toEqual([]);
  });
  test("returns empty focus for a fresh learner", () => {
    expect(buildRevisionFocus(bank, [], [], lessons)).toEqual({ questions: [], mistakeCount: 0, topics: [], lessonIds: [] });
  });
  test("submitting an older wrong answer after a correct ordinary retry does not reintroduce it", () => {
    const mock = beginMock(bank, "sample", 0);
    const answered = answerQuestion(mock, "q0", 1, 20);
    const submitted = finishMock(answered, bank, 40);
    expect(submitted.finishedAt).toBe(40);
    expect(submitted.answerTimes?.q0).toBe(20);
    expect(buildRevisionFocus(bank, [record("q0", 0, 30)], [submitted], lessons).mistakeCount).toBe(0);
  });
  test("legacy mocks without answer dates use their start, not later submission", () => {
    const legacy = { ...result("old", 200, { q0: 1 }), startedAt: 10, answerTimes: undefined };
    expect(buildRevisionFocus(bank, [record("q0", 0, 100)], [legacy], lessons).mistakeCount).toBe(0);
    expect(buildRevisionFocus(bank, [record("q0", 1, 100)], [{ ...legacy, answers: { q0: 0 }, correct: 1, percent: 20 }], lessons).mistakeCount).toBe(1);
  });
});

describe("actionable mock review", () => {
  const entries = buildMockReview(result("exam", 100, { q0: 0, q1: 1, q3: 1 }), bank);
  test("keeps original question numbers while separating wrong and unanswered", () => {
    expect(filterMockReview(entries, "incorrect").map((e) => e.number)).toEqual([2, 4]);
    expect(filterMockReview(entries, "unanswered").map((e) => e.number)).toEqual([3, 5]);
    expect(filterMockReview(entries, "all")).toHaveLength(5);
  });
  test("topic scores include correct, wrong and unanswered counts without conflating them", () => {
    expect(mockTopicScores(entries)).toEqual([
      { topic: "Road rules", total: 3, correct: 1, incorrect: 1, unanswered: 1 },
      { topic: "Road signs", total: 2, correct: 0, incorrect: 1, unanswered: 1 },
    ]);
  });
});
