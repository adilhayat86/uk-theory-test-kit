import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Alert, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { questions } from '../data/questions';
import QuestionIllustration from './QuestionIllustration';
import {
  answerQuestion, beginMock, finishMock, flagQuestion, formattedTimeLeft,
  goToQuestion, isExpired, timeLeftMs,
} from '../domain/mockExam';
import type { FinishReason, MockResult, MockSession, MockMode } from '../domain/mockExam';
import {
  discardActiveMock, finishStoredMock, getActiveMockSession,
  getMockResults, saveMockSession,
} from '../storage/database';



export default function MockExamScreen() {
  const [session, setSession] = useState<MockSession | null>(null);
  const sessionRef = useRef<MockSession | null>(null);
  const [result, setResult] = useState<MockResult | null>(null);
  const [history, setHistory] = useState<MockResult[]>([]);
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const submitting = useRef(false);


  useEffect(() => {
    let mounted = true;
    Promise.all([getActiveMockSession(), getMockResults(5)])
      .then(([saved, results]) => {
        if (!mounted) return;
        sessionRef.current = saved;
        setSession(saved);
        setHistory(results);
      })
      .catch(() => { if (mounted) setMessage('Unable to load offline exam history.'); })
      .finally(() => { if (mounted) setLoading(false); });
    const ticker = setInterval(() => setNow(Date.now()), 1000);
    return () => { mounted = false; clearInterval(ticker); };
  }, []);

  function changeSession(change: (current: MockSession) => MockSession) {
    const previous = sessionRef.current;
    if (!previous || busy || submitting.current) return;
    const next = change(previous);
    if (next === previous) return;
    sessionRef.current = next;
    setSession(next);
    void saveMockSession(next).catch(() =>
      setMessage('The latest answer or flag could not be saved. Do not close the app until storage works.'));
  }

  async function start(mode: MockMode) {
    if (busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const started = beginMock(questions, mode, Date.now());
      await saveMockSession(started);
      sessionRef.current = started;
      setSession(started);
      setResult(null);
      setNow(Date.now());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to start a mock exam.');
    } finally {
      setBusy(false);
    }
  }

  async function finish(reason: FinishReason) {
    const current = sessionRef.current;
    if (!current || submitting.current) return;
    submitting.current = true;
    setBusy(true);
    try {
      const report = finishMock(current, questions, Date.now(), reason);
      await finishStoredMock(current, report);
      sessionRef.current = null;
      setSession(null);
      setResult(report);
      setHistory((previous) => [report, ...previous.filter((item) => item.id !== report.id)].slice(0, 5));
      setMessage(null);
    } catch {
      setMessage('Could not save the finished mock. Your active mock is still available to retry.');
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  useEffect(() => {
    if (session && isExpired(session, now) && !submitting.current) {
      void finish('timeout');
    }
  // Only time and active session identity matter; finish() uses the latest session ref.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, session?.id]);

  function confirmSubmit() {
    const current = sessionRef.current;
    if (!current || busy) return;
    const unanswered = current.questionIds.length - Object.keys(current.answers).length;
    Alert.alert(
      'Finish timed practice?',
      unanswered ? `You still have ${unanswered} unanswered question(s). Submit anyway?` : 'Submit your answers now?',
      [
        { text: 'Keep practising', style: 'cancel' },
        { text: 'Submit answers', onPress: () => { void finish('submitted'); } },
      ],
    );
  }

  function confirmDiscard() {
    const current = sessionRef.current;
    if (!current || busy) return;
    Alert.alert('Discard timed practice?', 'This clears the active mock without saving a result.', [
      { text: 'Keep practising', style: 'cancel' },
      {
        text: 'Discard', style: 'destructive', onPress: () => {
          setBusy(true);
          void discardActiveMock(current.id)
            .then(() => {
              sessionRef.current = null;
              setSession(null);
              setMessage(null);
            })
            .catch(() => setMessage('Could not discard the active mock.'))
            .finally(() => setBusy(false));
        },
      },
    ]);
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color="#2256C9" /><Text style={styles.dim}>Loading your saved mock…</Text></View>;
  }

  const currentId = session?.questionIds[session.currentIndex];
  const question = questions.find((q) => q.id === currentId);
  const attempted = session ? Object.keys(session.answers).length : 0;
  const flagged = session ? new Set(session.flaggedIds) : new Set<string>();

  return (
    <View style={styles.root}>
      <View style={styles.headingRow}>
        <Text style={styles.eyebrow}>OFFLINE TIMED PRACTICE</Text>
      </View>
      {message ? <Text style={styles.warning}>{message}</Text> : null}

      {!session && !result ? (
        <>
          <Text style={styles.title}>Timed practice</Text>
          <Text style={styles.body}>Practise answering under time pressure. Answers can be reviewed and changed, questions can be flagged, and your session is saved locally.</Text>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>A short timed session</Text>
            <Text style={styles.body}>5 original questions · 6 minutes · saved results</Text>
            <Text style={styles.note}>This short sample does not predict a pass in the official exam.</Text>
            <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={() => { void start('sample'); }}>
              <Text style={styles.primaryText}>Start 5-question timed practice</Text>
            </Pressable>
          </View>
          <Text style={styles.note}>This MVP includes short revision sessions. A full official-style mock and hazard-perception videos are not included.</Text>
          {history.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Previous attempts</Text>
              {history.map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <View>
                    <Text style={styles.historyTitle}>{item.mode === 'full' ? 'Full mock' : 'Timed practice'} · {new Date(item.finishedAt).toLocaleDateString('en-GB')}</Text>
                    <Text style={styles.dim}>{item.answered}/{item.total} answered · {item.reason === 'timeout' ? 'Time expired' : 'Submitted'}</Text>
                  </View>
                  <Text style={styles.historyScore}>{item.correct}/{item.total}</Text>
                </View>
              ))}
            </>
          ) : null}
        </>
      ) : null}

      {session ? (
        <>
          <View style={styles.timerCard}>
            <View>
              <Text style={styles.eyebrow}>{session.mode === 'full' ? 'FULL MOCK' : 'SAMPLE MOCK'}</Text>
              <Text style={styles.timerLabel}>{attempted} of {session.questionIds.length} answered</Text>
            </View>
            <View style={styles.timerRight}>
              <Text style={[styles.timer, timeLeftMs(session, now) <= 60_000 && styles.timerDanger]}>{formattedTimeLeft(timeLeftMs(session, now))}</Text>
              <Text style={styles.dim}>Time remaining</Text>
            </View>
          </View>
          {question ? (
            <View style={styles.questionCard}>
              <View style={styles.inline}>
                <Text style={styles.topic}>{question.topic.toUpperCase()}</Text>
                <Pressable accessibilityRole="button" onPress={() => changeSession((old) => flagQuestion(old, question.id, Date.now()))}>
                  <Text style={styles.link}>{flagged.has(question.id) ? '★ Flagged' : '☆ Flag for review'}</Text>
                </Pressable>
              </View>
              <Text style={styles.number}>QUESTION {session.currentIndex + 1} / {session.questionIds.length}</Text>
              <Text style={styles.prompt}>{question.prompt}</Text>
              <QuestionIllustration question={question} />
              {question.options.map((option, index) => {
                const selected = session.answers[question.id] === index;
                return (
                  <Pressable
                    key={`${question.id}-${index}`}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => changeSession((old) => answerQuestion(old, question.id, index, Date.now()))}
                    style={[styles.option, selected && styles.optionSelected]}
                  >
                    <Text style={[styles.optionLetter, selected && styles.selectedText]}>{String.fromCharCode(65 + index)}</Text>
                    <Text style={[styles.optionText, selected && styles.selectedText]}>{option}</Text>
                  </Pressable>
                );
              })}
              <Text style={styles.note}>Correct answers appear after you submit, as in a real exam.</Text>
            </View>
          ) : <Text style={styles.warning}>A saved question is no longer available. Discard this outdated mock to start again.</Text>}
          <View style={styles.navButtons}>
            <Pressable accessibilityRole="button" disabled={session.currentIndex === 0} onPress={() => changeSession((old) => goToQuestion(old, old.currentIndex - 1))} style={[styles.secondary, session.currentIndex === 0 && styles.disabled]}>
              <Text style={styles.secondaryText}>‹ Previous</Text>
            </Pressable>
            <Pressable accessibilityRole="button" disabled={session.currentIndex === session.questionIds.length - 1} onPress={() => changeSession((old) => goToQuestion(old, old.currentIndex + 1))} style={[styles.secondary, session.currentIndex === session.questionIds.length - 1 && styles.disabled]}>
              <Text style={styles.secondaryText}>Next ›</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionTitle}>Jump to a question</Text>
          <View style={styles.questionGrid}>
            {session.questionIds.map((id, index) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Question ${index + 1}, ${Object.prototype.hasOwnProperty.call(session.answers, id) ? 'answered' : 'not answered'}${flagged.has(id) ? ', flagged' : ''}`}
                key={id}
                onPress={() => changeSession((old) => goToQuestion(old, index))}
                style={[styles.questionChip, Object.prototype.hasOwnProperty.call(session.answers, id) && styles.answeredChip, session.currentIndex === index && styles.activeChip]}
              >
                <Text style={[styles.chipText, session.currentIndex === index && styles.activeChipText]}>{index + 1}{flagged.has(id) ? '★' : ''}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable accessibilityRole="button" disabled={busy} style={[styles.primary, busy && styles.disabled]} onPress={confirmSubmit}>
            <Text style={styles.primaryText}>{busy ? 'Saving…' : 'Submit mock and see results'}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={confirmDiscard} style={styles.discardButton}>
            <Text style={styles.discardText}>Discard this mock</Text>
          </Pressable>
        </>
      ) : null}

      {result ? (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.eyebrow}>{result.mode === 'full' ? 'FULL MOCK RESULT' : 'SAMPLE MOCK RESULT'}</Text>
            <Text style={styles.resultValue}>{result.correct}/{result.total}</Text>
            <Text style={styles.body}>{result.percent}% correct · {result.answered} answered</Text>
            <Text style={styles.note}>{result.mode === 'sample'
              ? 'Practice feedback only: a sample mock cannot predict the official test result.'
              : result.passed ? 'Passed the multiple-choice part (not hazard perception).' : 'Below the multiple-choice pass mark.'}</Text>
            {result.reason === 'timeout' ? <Text style={styles.warning}>Time expired before submission.</Text> : null}
          </View>
          <Text style={styles.sectionTitle}>Review answers</Text>
          {result.questionIds.map((id, index) => {
            const item = questions.find((q) => q.id === id);
            if (!item) return null;
            const selected = result.answers[id];
            const correct = selected === item.correctIndex;
            return (
              <View key={id} style={styles.reviewCard}>
                <Text style={styles.number}>QUESTION {index + 1} · {correct ? 'CORRECT' : 'REVIEW'}</Text>
                <Text style={styles.reviewPrompt}>{item.prompt}</Text>
                <QuestionIllustration question={item} context="review" />
                <Text style={styles.body}>Your answer: {selected === undefined ? 'Unanswered' : item.options[selected]}</Text>
                <Text style={styles.correctAnswer}>Correct: {item.options[item.correctIndex]}</Text>
                <Text style={styles.body}>{item.explanation}</Text>
                <Text style={styles.reference}>{item.reference}</Text>
              </View>
            );
          })}
          <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={() => { void start('sample'); }}>
            <Text style={styles.primaryText}>Start another sample</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={() => setResult(null)}>
            <Text style={styles.secondaryText}>Timed practice overview</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingBottom: 24 },
  center: { alignItems: 'center', padding: 36, gap: 8 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  link: { color: '#2456C7', fontWeight: '800', fontSize: 13 },
  eyebrow: { color: '#2456C7', fontWeight: '900', fontSize: 10, letterSpacing: 1 },
  title: { color: '#14233B', fontSize: 25, fontWeight: '900', marginBottom: 8 },
  body: { color: '#4D5C70', fontSize: 14, lineHeight: 21, marginTop: 5 },
  dim: { color: '#6B7788', fontSize: 12, marginTop: 4 },
  note: { color: '#71819A', fontSize: 12, lineHeight: 18, marginTop: 12 },
  warning: { padding: 12, backgroundColor: '#FFF5E6', color: '#895B1F', borderRadius: 12, marginVertical: 8, fontSize: 13, lineHeight: 19 },
  info: { marginTop: 18, backgroundColor: 'white', padding: 18, borderRadius: 18, borderColor: '#E1E8F1', borderWidth: 1 },
  infoTitle: { color: '#14233B', fontSize: 18, fontWeight: '900' },
  sectionTitle: { color: '#14233B', fontWeight: '900', fontSize: 17, marginTop: 24, marginBottom: 12 },
  primary: { backgroundColor: '#2456C7', borderRadius: 12, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginTop: 15 },
  primaryText: { color: 'white', fontSize: 14, fontWeight: '800', textAlign: 'center' },
  secondary: { backgroundColor: '#E9EFFB', borderRadius: 12, minHeight: 42, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', flex: 1 },
  secondaryText: { color: '#2456C7', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  disabled: { opacity: 0.4 },
  timerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#E9F0FD', borderRadius: 16 },
  timerRight: { alignItems: 'flex-end' },
  timerLabel: { color: '#3A5074', fontSize: 14, fontWeight: '700', marginTop: 8 },
  timer: { color: '#143C86', fontWeight: '900', fontSize: 28, fontVariant: ['tabular-nums'] },
  timerDanger: { color: '#C73236' },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginTop: 15, borderWidth: 1, borderColor: '#E1E8F1' },
  inline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  topic: { color: '#2456C7', fontWeight: '900', fontSize: 10, flexShrink: 1 },
  number: { color: '#72819C', fontSize: 11, fontWeight: '900', marginTop: 14, marginBottom: 7 },
  prompt: { color: '#14233B', fontSize: 19, lineHeight: 26, fontWeight: '800', marginBottom: 15 },
  option: { flexDirection: 'row', padding: 14, borderWidth: 1, borderColor: '#E1E8F1', borderRadius: 12, marginBottom: 10, gap: 12, alignItems: 'center' },
  optionSelected: { borderColor: '#2456C7', backgroundColor: '#EAF0FF' },
  optionLetter: { color: '#64748B', fontSize: 13, fontWeight: '900' },
  optionText: { flex: 1, fontSize: 14, lineHeight: 20, color: '#35485F' },
  selectedText: { color: '#1945A7', fontWeight: '800' },
  navButtons: { flexDirection: 'row', gap: 10, marginTop: 15 },
  questionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  questionChip: { width: 47, height: 44, borderRadius: 10, borderWidth: 1, borderColor: '#D4DEEA', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  answeredChip: { borderColor: '#7EB69A', backgroundColor: '#EDF9F2' },
  activeChip: { borderColor: '#2456C7', backgroundColor: '#2456C7' },
  chipText: { color: '#415571', fontSize: 12, fontWeight: '800' },
  activeChipText: { color: 'white' },
  discardButton: { padding: 15, alignItems: 'center', marginTop: 6 },
  discardText: { color: '#B9414D', fontSize: 13, fontWeight: '800' },
  resultCard: { backgroundColor: 'white', borderWidth: 1, borderColor: '#E1E8F1', borderRadius: 18, padding: 22 },
  resultValue: { color: '#2456C7', fontSize: 48, fontWeight: '900', marginTop: 8 },
  reviewCard: { padding: 15, backgroundColor: '#FFFFFF', borderRadius: 13, marginBottom: 12, borderColor: '#E1E8F1', borderWidth: 1 },
  reviewPrompt: { color: '#14233B', fontSize: 15, fontWeight: '800', lineHeight: 22 },
  correctAnswer: { color: '#167448', fontWeight: '800', fontSize: 13, lineHeight: 19, marginTop: 8 },
  reference: { color: '#7F8FA6', fontSize: 11, marginTop: 7, fontWeight: '700' },
  historyItem: { padding: 14, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E1E8F1', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyTitle: { color: '#1F2E49', fontWeight: '800', fontSize: 13 },
  historyScore: { color: '#2456C7', fontWeight: '900', fontSize: 18 }
});
