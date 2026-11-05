import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';
import {
  FULL_EXAM_DURATION_MS, FULL_EXAM_PASS_MARK,
  answerQuestion, beginMock, chooseQuestions, finishMock, flagQuestion,
  formattedTimeLeft, fullMockReadiness, goToQuestion, isExpired,
  isMockSession, timeLeftMs,
} from './mockExam';

const sampleTime = 1_700_000_000_000;

function makeFullBank(): TheoryQuestion[] {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `q-${i}`,
    topic: 'Road rules',
    difficulty: 'standard',
    prompt: `Original review question ${i}`,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: 'Explanation.',
    reference: 'Highway Code',
    ...(i < 3 ? { caseStudyVideoAssetId: 'original-case-1.mp4' } : {}),
  }));
}

describe('mock exam engine', () => {
  it('gates real full mocks until 50 unique questions and three video-linked questions exist', () => {
    expect(fullMockReadiness(questions).eligible).toBe(false);
    const full = makeFullBank();
    expect(fullMockReadiness(full).eligible).toBe(true);
    expect(fullMockReadiness(full.slice(0, 49)).eligible).toBe(false);
    expect(fullMockReadiness([...full, full[0]]).questionCount).toBe(50);
    const mismatchedVideos = full.map((q, index) =>
      index < 3 ? { ...q, caseStudyVideoAssetId: `unrelated-${index}.mp4` } : q);
    expect(fullMockReadiness(mismatchedVideos).eligible).toBe(false);
    expect(fullMockReadiness(full.map((q) => ({ ...q, caseStudyVideoAssetId: undefined })))).toEqual({
      eligible: false,
      questionCount: 50,
      hasVideoCaseStudy: false,
    });
    expect(() => beginMock(questions, 'full', sampleTime)).toThrow(/50 reviewed/);
  });

  it('selects unique questions without modifying the source order', () => {
    const idsBefore = questions.map((question) => question.id);
    const chosen = chooseQuestions(questions, 3, () => 0.4);
    expect(chosen).toHaveLength(3);
    expect(new Set(chosen.map((q) => q.id)).size).toBe(3);
    expect(questions.map((question) => question.id)).toEqual(idsBefore);
    expect(() => chooseQuestions(questions, questions.length + 1)).toThrow();
    expect(() => chooseQuestions(questions, 3, () => 1)).toThrow();
  });

  it('sets a six-minute demo deadline and preserves a wall-clock based timer', () => {
    const mock = beginMock(questions, 'sample', sampleTime, () => 0.5);
    expect(mock.questionIds).toHaveLength(5);
    expect(mock.expiresAt).toBe(sampleTime + 6 * 60_000);
    expect(timeLeftMs(mock, sampleTime + 10_000)).toBe(350_000);
    expect(isExpired(mock, mock.expiresAt - 1)).toBe(false);
    expect(isExpired(mock, mock.expiresAt)).toBe(true);
    expect(formattedTimeLeft(90_001)).toBe('01:31');
    expect(formattedTimeLeft(-10)).toBe('00:00');
  });

  it('sets official timed-exam parameters when video case-study content is available', () => {
    const mock = beginMock(makeFullBank(), 'full', sampleTime, () => 0.5);
    expect(mock.questionIds).toHaveLength(50);
    expect(mock.expiresAt - mock.startedAt).toBe(FULL_EXAM_DURATION_MS);
    const selected = mock.questionIds.map((id) => makeFullBank().find((q) => q.id === id)!);
    expect(selected.filter((q) => q.caseStudyVideoAssetId)).toHaveLength(3);
    expect(FULL_EXAM_PASS_MARK).toBe(43);
  });

  it('allows changing answers, flagging, navigation and revisiting without mutating prior state', () => {
    const original = beginMock(questions, 'sample', sampleTime, () => 0.5);
    const id = original.questionIds[0];
    const answered = answerQuestion(original, id, 2, sampleTime);
    expect(original.answers[id]).toBeUndefined();
    expect(answered.answers[id]).toBe(2);
    const changed = answerQuestion(answered, id, 1, sampleTime);
    expect(changed.answers[id]).toBe(1);
    const flagged = flagQuestion(changed, id, sampleTime);
    expect(flagged.flaggedIds).toEqual([id]);
    expect(flagQuestion(flagged, id, sampleTime).flaggedIds).toEqual([]);
    expect(goToQuestion(flagged, 2).currentIndex).toBe(2);
    expect(goToQuestion(flagged, 500).currentIndex).toBe(0);
    expect(() => answerQuestion(flagged, id, -1, sampleTime)).toThrow();
    expect(() => answerQuestion(flagged, 'unknown-id', 1, sampleTime)).toThrow();
    expect(answerQuestion(flagged, id, 3, flagged.expiresAt)).toBe(flagged);
    expect(flagQuestion(flagged, id, flagged.expiresAt)).toBe(flagged);
  });

  it('scores only recorded answers, with no official pass/fail for sample exams', () => {
    const exam = beginMock(questions, 'sample', sampleTime, () => 0.5);
    const id = exam.questionIds[0];
    const correctIndex = questions.find((q) => q.id === id)!.correctIndex;
    const answered = answerQuestion(exam, id, correctIndex, sampleTime);
    const result = finishMock(answered, questions, sampleTime + 60_000);
    expect(result).toMatchObject({ correct: 1, answered: 1, total: 5, percent: 20, passed: null });
  });

  it('uses a 43/50 pass mark and detects a timeout at the deadline', () => {
    const bank = makeFullBank();
    const exam = beginMock(bank, 'full', sampleTime, () => 0.5);
    let answered = exam;
    for (const id of exam.questionIds.slice(0, 43)) {
      answered = answerQuestion(answered, id, 1, sampleTime);
    }
    expect(finishMock(answered, bank, sampleTime + 1000).passed).toBe(true);
    const failed = finishMock(answered, bank, exam.expiresAt + 1);
    expect(failed.reason).toBe('timeout');
    expect(failed.finishedAt).toBe(exam.expiresAt);
    const fewer = { ...answered, answers: Object.fromEntries(Object.entries(answered.answers).slice(0, 42)) };
    expect(finishMock(fewer, bank, sampleTime + 1000).passed).toBe(false);
  });

  it('validates saved session structure before using it on startup', () => {
    const mock = beginMock(questions, 'sample', sampleTime, () => 0.5);
    expect(isMockSession(JSON.parse(JSON.stringify(mock)))).toBe(true);
    expect(isMockSession({ ...mock, questionIds: ['bad', 'bad'] })).toBe(false);
    expect(isMockSession({ ...mock, currentIndex: 30 })).toBe(false);
    expect(isMockSession({ ...mock, answers: { [mock.questionIds[0]]: 9 } })).toBe(false);
    expect(isMockSession({ ...mock, flaggedIds: ['unrelated'] })).toBe(false);
    expect(isMockSession(null)).toBe(false);
    expect(isMockSession('not a session')).toBe(false);
  });
});
