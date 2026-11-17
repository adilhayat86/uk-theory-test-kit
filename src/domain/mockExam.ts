import type { TheoryQuestion } from "../data/questions";

/**
 * An intentionally separate exam engine. It has no React, network or SQLite dependencies,
 * so timer/scoring behavior can be tested deterministically.
 */
export const FULL_EXAM_QUESTION_COUNT = 50;
export const FULL_EXAM_DURATION_MS = 57 * 60 * 1000;
export const FULL_EXAM_PASS_MARK = 43;
export const SAMPLE_EXAM_DURATION_MS = 6 * 60 * 1000;

export type MockMode = "sample" | "full";
export type StudyAcknowledgement = { confirmedAt: number; statementVersion: 1 };
export type FinishReason = "submitted" | "timeout";

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
  studyAcknowledgement?: StudyAcknowledgement;
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
  studyAcknowledgement?: StudyAcknowledgement;
};

export function fullMockReadiness(
  bank: TheoryQuestion[],
  availableVideoIds?: readonly string[],
): {
  eligible: boolean;
  questionCount: number;
  hasVideoCaseStudy: boolean;
} {
  // The real exam includes three questions tied to a silent video.
  // Do not label a random 50-question quiz a faithful full exam.
  const unique = [...new Map(bank.map((q) => [q.id, q])).values()];
  const groupedVideoQuestions = new Map<string, TheoryQuestion[]>();
  for (const question of unique) {
    if (
      !question.caseStudyVideoAssetId ||
      (availableVideoIds &&
        !availableVideoIds.includes(question.caseStudyVideoAssetId))
    )
      continue;
    const group =
      groupedVideoQuestions.get(question.caseStudyVideoAssetId) ?? [];
    group.push(question);
    groupedVideoQuestions.set(question.caseStudyVideoAssetId, group);
  }
  const hasVideoCaseStudy = [...groupedVideoQuestions.values()].some(
    (group) => group.length >= 3,
  );
  const nonVideoCount = unique.filter((q) => !q.caseStudyVideoAssetId).length;
  return {
    eligible:
      unique.length >= FULL_EXAM_QUESTION_COUNT &&
      nonVideoCount >= 47 &&
      hasVideoCaseStudy,
    questionCount: unique.length,
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
    throw new Error("Not enough unique questions to start this mock.");
  }
  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const draw = random();
    if (!Number.isFinite(draw) || draw < 0 || draw >= 1) {
      throw new Error("Invalid random value.");
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
  if (!Number.isFinite(now) || now < 0) throw new Error("Invalid clock.");
  if (mode === "full" && !fullMockReadiness(bank).eligible) {
    throw new Error(
      "Full mock requires 50 reviewed questions and a video case study.",
    );
  }
  let selected: TheoryQuestion[];
  if (mode === "full") {
    // Reserve exactly three linked questions for ONE video case study, plus 47 standard questions.
    const videoGroups = new Map<string, TheoryQuestion[]>();
    for (const item of bank) {
      if (!item.caseStudyVideoAssetId) continue;
      const items = videoGroups.get(item.caseStudyVideoAssetId) ?? [];
      items.push(item);
      videoGroups.set(item.caseStudyVideoAssetId, items);
    }
    const groups = [...videoGroups.values()].filter(
      (group) => new Set(group.map((q) => q.id)).size >= 3,
    );
    const draw = random();
    if (!Number.isFinite(draw) || draw < 0 || draw >= 1)
      throw new Error("Invalid random value.");
    const videoGroup = groups[Math.floor(draw * groups.length)];
    if (!videoGroup)
      throw new Error("A three-question video case study is required.");
    const caseQuestions = chooseQuestions(videoGroup, 3, random);
    const pool = bank.filter((q) => !q.caseStudyVideoAssetId);
    const topics = [...new Set(pool.map((q) => q.topic))];
    const anchors = topics.slice(0, 47).map(
      (topic) =>
        chooseQuestions(
          pool.filter((q) => q.topic === topic),
          1,
          random,
        )[0],
    );
    const anchorIds = new Set(anchors.map((q) => q.id));
    const extras = 47 - anchors.length;
    const regularQuestions = chooseQuestions(
      [
        ...anchors,
        ...(extras
          ? chooseQuestions(
              pool.filter((q) => !anchorIds.has(q.id)),
              extras,
              random,
            )
          : []),
      ],
      47,
      random,
    );
    selected = [...regularQuestions, ...caseQuestions];
  } else {
    selected = chooseQuestions(bank, Math.min(5, bank.length), random);
  }
  const questionIds = selected.map((question) => question.id);
  const identityDraw = random();
  if (!Number.isFinite(identityDraw) || identityDraw < 0 || identityDraw >= 1)
    throw new Error("Invalid random value.");
  return {
    version: 1,
    id: `mock-${Math.trunc(now)}-${Math.floor(identityDraw * 1_000_000_000)}`,
    mode,
    questionIds,
    answers: {},
    flaggedIds: [],
    currentIndex: 0,
    startedAt: now,
    expiresAt:
      now + (mode === "full" ? FULL_EXAM_DURATION_MS : SAMPLE_EXAM_DURATION_MS),
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
  if (
    !session.questionIds.includes(questionId) ||
    !Number.isInteger(index) ||
    index < 0 ||
    index > 3
  ) {
    throw new Error("Invalid question or answer.");
  }
  return { ...session, answers: { ...session.answers, [questionId]: index } };
}

export function flagQuestion(
  session: MockSession,
  questionId: string,
  now: number,
): MockSession {
  if (isExpired(session, now)) return session;
  if (!session.questionIds.includes(questionId))
    throw new Error("Question is not part of this mock.");
  const flagged = new Set(session.flaggedIds);
  if (flagged.has(questionId)) flagged.delete(questionId);
  else flagged.add(questionId);
  return { ...session, flaggedIds: [...flagged] };
}

export function goToQuestion(session: MockSession, index: number): MockSession {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= session.questionIds.length
  )
    return session;
  return { ...session, currentIndex: index };
}

export function finishMock(
  session: MockSession,
  bank: TheoryQuestion[],
  now: number,
  reason: FinishReason = "submitted",
): MockResult {
  if (reason === "submitted" && isExpired(session, now)) reason = "timeout";
  const correctAnswers = new Map(
    bank.map((question) => [question.id, question.correctIndex]),
  );
  const correct = session.questionIds.reduce(
    (sum, id) =>
      sum +
      (Object.prototype.hasOwnProperty.call(session.answers, id) &&
      session.answers[id] === correctAnswers.get(id)
        ? 1
        : 0),
    0,
  );
  const total = session.questionIds.length;
  const answered = session.questionIds.filter((id) =>
    Object.prototype.hasOwnProperty.call(session.answers, id),
  ).length;
  return {
    id: session.id,
    mode: session.mode,
    questionIds: [...session.questionIds],
    answers: { ...session.answers },
    correct,
    answered,
    total,
    percent: total === 0 ? 0 : Math.round((correct * 100) / total),
    passed: session.mode === "full" ? correct >= FULL_EXAM_PASS_MARK : null,
    startedAt: session.startedAt,
    finishedAt: Math.max(session.startedAt, Math.min(now, session.expiresAt)),
    reason,
    ...(session.studyAcknowledgement
      ? { studyAcknowledgement: { ...session.studyAcknowledgement } }
      : {}),
  };
}

export function isMockSession(value: unknown): value is MockSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<MockSession>;
  if (
    session.version !== 1 ||
    typeof session.id !== "string" ||
    (session.mode !== "sample" && session.mode !== "full") ||
    !Array.isArray(session.questionIds) ||
    session.questionIds.length === 0 ||
    !session.questionIds.every((id) => typeof id === "string") ||
    new Set(session.questionIds).size !== session.questionIds.length ||
    typeof session.startedAt !== "number" ||
    !Number.isFinite(session.startedAt) ||
    typeof session.expiresAt !== "number" ||
    !Number.isFinite(session.expiresAt) ||
    session.expiresAt <= session.startedAt ||
    !Number.isInteger(session.currentIndex) ||
    (session.currentIndex ?? -1) < 0 ||
    (session.currentIndex ?? 0) >= session.questionIds.length ||
    !session.answers ||
    typeof session.answers !== "object" ||
    Array.isArray(session.answers) ||
    !Array.isArray(session.flaggedIds) ||
    !session.flaggedIds.every((id) => session.questionIds?.includes(id))
  )
    return false;
  if (
    session.studyAcknowledgement !== undefined &&
    !isStudyAcknowledgement(session.studyAcknowledgement)
  )
    return false;
  const ids = new Set(session.questionIds);
  return Object.entries(session.answers).every(
    ([id, index]) =>
      ids.has(id) && Number.isInteger(index) && index >= 0 && index <= 3,
  );
}

export function formattedTimeLeft(milliseconds: number): string {
  const seconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function isStudyAcknowledgement(
  value: unknown,
): value is StudyAcknowledgement {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Partial<StudyAcknowledgement>;
  return (
    item.statementVersion === 1 &&
    typeof item.confirmedAt === "number" &&
    Number.isFinite(item.confirmedAt) &&
    item.confirmedAt >= 0
  );
}
/** UI entry point: a new attempt always needs a fresh explicit study confirmation. */
export function beginConfirmedMock(
  bank: TheoryQuestion[],
  mode: MockMode,
  now: number,
  confirmed: boolean,
  availableVideoIds: readonly string[],
  random: () => number = Math.random,
): MockSession {
  if (confirmed !== true)
    throw new Error(
      "Confirm you have studied the material before starting an exam.",
    );
  const available = bank.filter(
    (q) =>
      !q.caseStudyVideoAssetId ||
      availableVideoIds.includes(q.caseStudyVideoAssetId),
  );
  if (
    mode === "full" &&
    !fullMockReadiness(available, availableVideoIds).eligible
  )
    throw new Error(
      "A complete offline video case study is required for this mock.",
    );
  return {
    ...beginMock(available, mode, now, random),
    studyAcknowledgement: { confirmedAt: now, statementVersion: 1 },
  };
}
export function isMockResult(value: unknown): value is MockResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Partial<MockResult>;
  if (
    typeof item.id !== "string" ||
    !item.id ||
    (item.mode !== "full" && item.mode !== "sample") ||
    !Array.isArray(item.questionIds) ||
    !item.questionIds.length ||
    new Set(item.questionIds).size !== item.questionIds.length ||
    !item.questionIds.every((id) => typeof id === "string") ||
    !item.answers ||
    typeof item.answers !== "object" ||
    Array.isArray(item.answers)
  )
    return false;
  const total = item.questionIds.length;
  if (
    item.total !== total ||
    !Number.isInteger(item.correct) ||
    (item.correct ?? -1) < 0 ||
    (item.correct ?? Infinity) > total ||
    !Number.isInteger(item.answered) ||
    item.answered !== Object.keys(item.answers).length ||
    !Number.isFinite(item.startedAt) ||
    !Number.isFinite(item.finishedAt) ||
    (item.finishedAt ?? -1) < (item.startedAt ?? 0) ||
    (item.reason !== "submitted" && item.reason !== "timeout") ||
    item.percent !== Math.round(((item.correct ?? 0) * 100) / total)
  )
    return false;
  if (
    (item.correct ?? 0) > (item.answered ?? 0) ||
    (item.startedAt ?? -1) < 0 ||
    (item.mode === "sample" && total > 5)
  )
    return false;
  if (
    item.passed !==
    (item.mode === "full" ? (item.correct ?? 0) >= FULL_EXAM_PASS_MARK : null)
  )
    return false;
  if (item.mode === "full" && total !== FULL_EXAM_QUESTION_COUNT) return false;
  if (
    item.studyAcknowledgement !== undefined &&
    !isStudyAcknowledgement(item.studyAcknowledgement)
  )
    return false;
  return Object.entries(item.answers).every(
    ([id, index]) =>
      item.questionIds!.includes(id) &&
      Number.isInteger(index) &&
      index >= 0 &&
      index <= 3,
  );
}
