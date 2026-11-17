import type { TheoryQuestion } from '../data/questions';
import { caseStudyQuestions } from '../data/caseStudyQuestions';
import { caseStudyIds } from '../data/caseStudies';
import {
  answerQuestion, beginConfirmedMock, finishMock, flagQuestion, fullMockReadiness,
  goToQuestion, isMockResult, isMockSession,
} from './mockExam';

const now = 1_800_000_000_000;
const regular: TheoryQuestion[] = Array.from({ length: 70 }, (_, index) => ({
  id: `confirmed-ordinary-${index}`,
  topic: `Topic ${index % 14}`,
  difficulty: 'standard',
  prompt: `Independently authored fixture ${index}`,
  options: ['First choice', 'Second choice', 'Third choice', 'Fourth choice'],
  correctIndex: 1,
  explanation: 'Fixture explanation.',
  reference: 'Highway Code',
}));
const bank = [...regular, ...caseStudyQuestions];
const questionById = new Map(bank.map(question => [question.id, question]));

function start(draw = 0.4) {
  return beginConfirmedMock(bank, 'full', now, true, caseStudyIds, () => draw);
}

describe('confirmed mock attempts', () => {
  test.each(['sample', 'full'] as const)('requires a fresh explicit true acknowledgement for a new %s attempt', mode => {
    for (const confirmed of [false, undefined, null, 0, 1, 'true', {}]) {
      expect(() => beginConfirmedMock(bank, mode, now, confirmed as boolean, caseStudyIds, () => 0.4)).toThrow(/confirm/i);
    }
    expect(beginConfirmedMock(bank, mode, now, true, caseStudyIds, () => 0.4).studyAcknowledgement)
      .toEqual({ confirmedAt: now, statementVersion: 1 });
  });

  test('keeps the acknowledgement, answers, flag and location through JSON persistence', () => {
    let session = start();
    const firstId = session.questionIds[0];
    session = answerQuestion(session, firstId, questionById.get(firstId)!.correctIndex, now + 100);
    session = flagQuestion(session, firstId, now + 200);
    session = goToQuestion(session, 12);
    const restored: unknown = JSON.parse(JSON.stringify(session));
    expect(isMockSession(restored)).toBe(true);
    expect(restored).toEqual(session);
    expect(session.studyAcknowledgement).toEqual({ confirmedAt: now, statementVersion: 1 });
    expect(session.flaggedIds).toContain(firstId);
    expect(session.currentIndex).toBe(12);
  });

  test('accepts a legacy saved session for compatibility but does not invent an acknowledgement', () => {
    const { studyAcknowledgement: _discarded, ...legacy } = start();
    expect(isMockSession(legacy)).toBe(true);
    expect(legacy).not.toHaveProperty('studyAcknowledgement');
    expect(() => beginConfirmedMock(bank, 'full', now + 100, false, caseStudyIds, () => 0.4)).toThrow(/confirm/i);
  });

  test('rejects corrupt acknowledgement and answer data when resuming', () => {
    const valid = start();
    for (const acknowledgement of [null, [], {}, { confirmedAt: -1, statementVersion: 1 },
      { confirmedAt: Infinity, statementVersion: 1 }, { confirmedAt: now, statementVersion: 2 }]) {
      expect(isMockSession({ ...valid, studyAcknowledgement: acknowledgement })).toBe(false);
    }
    expect(isMockSession({ ...valid, answers: { 'not-in-exam': 1 } })).toBe(false);
    expect(isMockSession({ ...valid, answers: [] })).toBe(false);
  });

  test('uses 50 unique questions: 47 ordinary followed by exactly three from one available video', () => {
    const session = start();
    expect(session.questionIds).toHaveLength(50);
    expect(new Set(session.questionIds).size).toBe(50);
    expect(session.questionIds.slice(0, 47).every(id => !questionById.get(id)!.caseStudyVideoAssetId)).toBe(true);
    const linkedIds = session.questionIds.slice(47).map(id => questionById.get(id)!.caseStudyVideoAssetId);
    expect(new Set(linkedIds).size).toBe(1);
    expect(caseStudyIds).toContain(linkedIds[0]);
    expect(session.expiresAt - session.startedAt).toBe(57 * 60 * 1000);
  });

  test('covers every ordinary topic rather than omitting entire subjects through random selection', () => {
    const selectedTopics = new Set(start().questionIds.slice(0, 47).map(id => questionById.get(id)!.topic));
    expect(selectedTopics).toEqual(new Set(regular.map(question => question.topic)));
  });

  test('all three registered video case studies can be selected by independent attempts', () => {
    const selected = [0, 0.34, 0.67].map(draw => questionById.get(start(draw).questionIds[47])!.caseStudyVideoAssetId);
    expect(new Set(selected)).toEqual(new Set(caseStudyIds));
  });

  test('will only select the case study supplied as available, even when others have metadata', () => {
    const available = [caseStudyIds[2]];
    const session = beginConfirmedMock(bank, 'full', now, true, available, () => 0.1);
    expect(session.questionIds.slice(47).map(id => questionById.get(id)!.caseStudyVideoAssetId))
      .toEqual([available[0], available[0], available[0]]);
  });

  test('metadata without matching registered assets never enables a full mock', () => {
    expect(fullMockReadiness(bank, []).eligible).toBe(false);
    expect(fullMockReadiness(bank, ['missing-local-video']).hasVideoCaseStudy).toBe(false);
    expect(() => beginConfirmedMock(bank, 'full', now, true, [], () => 0.4)).toThrow(/video/i);
    const mismatched = caseStudyQuestions.map(question => ({ ...question, caseStudyVideoAssetId: 'not-packaged' }));
    expect(fullMockReadiness([...regular, ...mismatched], caseStudyIds).eligible).toBe(false);
    const onlyTwoLinked = caseStudyQuestions.filter(question => question.caseStudyVideoAssetId === caseStudyIds[0]).slice(0, 2);
    expect(fullMockReadiness([...regular, ...onlyTwoLinked], caseStudyIds).eligible).toBe(false);
  });

  test.each([NaN, -0.1, 1, Infinity])('rejects invalid randomness %s including a sample with no shuffle draws', draw => {
    expect(() => beginConfirmedMock(bank, 'full', now, true, caseStudyIds, () => draw)).toThrow(/random/i);
    expect(() => beginConfirmedMock([regular[0]], 'sample', now, true, caseStudyIds, () => draw)).toThrow(/random/i);
  });

  test.each([[42, false], [43, true]] as const)('scores the 43/50 boundary correctly (%i correct)', (correct, passed) => {
    const session = start();
    session.answers = Object.fromEntries(session.questionIds.map((id, index) => {
      const answer = questionById.get(id)!.correctIndex;
      return [id, index < correct ? answer : (answer + 1) % 4];
    }));
    const result = finishMock(session, bank, now + 60_000);
    expect(result).toMatchObject({ correct, total: 50, answered: 50, passed, percent: correct * 2 });
    expect(result.studyAcknowledgement).toEqual(session.studyAcknowledgement);
    expect(result.studyAcknowledgement).not.toBe(session.studyAcknowledgement);
    expect(isMockResult(JSON.parse(JSON.stringify(result)))).toBe(true);
    expect(isMockResult({ ...result, passed: !passed })).toBe(false);
  });
});
