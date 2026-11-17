import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import QuestionIllustration from './QuestionIllustration';
import type { TheoryQuestion } from '../data/questions';
import {
  buildPracticeReview, filterPracticeReview, topicPracticeScores,
} from '../domain/practiceReview';
import type { PracticeReviewFilter } from '../domain/practiceReview';
import { colors } from '../theme';

type Props = {
  questions: TheoryQuestion[];
  answers: Record<string, number>;
  savedIds: string[];
  backLabel: string;
  onFinish: () => void;
  onRetry: (items: TheoryQuestion[]) => void;
  onRestart: () => void;
  onProgress: () => void;
};

const filters: { key: PracticeReviewFilter; title: string }[] = [
  { key: 'all', title: 'All' },
  { key: 'correct', title: 'Correct' },
  { key: 'incorrect', title: 'Incorrect' },
  { key: 'saved', title: 'Saved' },
];

export default function PracticeResultsScreen({
  questions, answers, savedIds, backLabel, onFinish, onRetry, onRestart, onProgress,
}: Props) {
  const [filter, setFilter] = useState<PracticeReviewFilter>('all');
  const [showReview, setShowReview] = useState(false);
  const entries = useMemo(() => buildPracticeReview(questions, answers), [questions, answers]);
  const reviewed = useMemo(() => filterPracticeReview(entries, filter, savedIds),
    [entries, filter, savedIds]);

  const topicScores=useMemo(()=>topicPracticeScores(entries),[entries]);
  const right = entries.filter((entry) => entry.correct).length;
  const wrongQuestions = entries.filter((entry) => !entry.correct).map((entry) => entry.question);
  const percent = entries.length ? Math.round(right / entries.length * 100) : 0;

  return (
    <View>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>PRACTICE COMPLETE</Text>
        <Text style={styles.score}>{right}/{entries.length}</Text>
        <Text style={styles.detail}>{percent}% correct · {questions.length} questions in session</Text>
        <Text style={styles.note}>This short practice result does not predict your official test score.</Text>
      </View>

      <Pressable accessibilityRole="button" style={styles.primary} onPress={onFinish}><Text style={styles.primaryText}>Done</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: showReview }} style={styles.secondary}
        onPress={() => setShowReview((previous) => !previous)}>
        <Text style={styles.secondaryText}>{showReview ? 'Hide answer review' : 'Review your answers'}</Text>
      </Pressable>

      {showReview && wrongQuestions.length > 0 ? (
        <Pressable accessibilityRole="button" style={styles.secondary}
          onPress={() => onRetry(wrongQuestions)}>
          <Text style={styles.secondaryText}>Retry {wrongQuestions.length} incorrect answer{wrongQuestions.length === 1 ? '' : 's'}</Text>
        </Pressable>
      ) : null}

      {showReview ? (
        <>
          <Text style={styles.sectionTitle}>By topic</Text>
          {topicScores.map(item=><View key={item.topic} style={styles.topicRow}><Text style={styles.topicTitle}>{item.topic}</Text><Text style={styles.topicMetric}>{item.correct}/{item.attempted}</Text></View>)}
          <Text style={styles.sectionTitle}>Your answers</Text>
          <View style={styles.filterRow}>
            {filters.map(({ key, title }) => (
              <Pressable accessibilityRole="button" accessibilityState={{ selected: filter === key }}
                key={key} style={[styles.filter, filter === key && styles.filterSelected]}
                onPress={() => setFilter(key)}>
                <Text style={[styles.filterText, filter === key && styles.filterTextActive]}>{title}</Text>
              </Pressable>
            ))}
          </View>
          {reviewed.length === 0 ? (
            <Text style={styles.empty}>No questions in this filter.</Text>
          ) : reviewed.map((entry, index) => (
            <View key={entry.question.id} style={styles.reviewCard}>
              <Text style={[styles.tag, entry.correct ? styles.good : styles.bad]}>
                {entry.correct ? 'CORRECT' : 'REVIEW'} · {entry.question.topic.toUpperCase()}
              </Text>
              <Text style={styles.question}>{index + 1}. {entry.question.prompt}</Text>
              <QuestionIllustration question={entry.question} context="review" />
              <Text style={styles.answerText}>Your answer: {entry.question.options[entry.selectedIndex]}</Text>
              {!entry.correct ? (
                <Text style={styles.correctAnswer}>Correct: {entry.question.options[entry.question.correctIndex]}</Text>
              ) : null}
              <Text style={styles.explanation}>{entry.question.explanation}</Text>
              <Text style={styles.reference}>{entry.question.reference}</Text>
            </View>
          ))}
        </>
      ) : null}

      {showReview?<Pressable accessibilityRole="button" style={styles.textAction} onPress={onRestart}>
        <Text style={styles.link}>Practise these questions again</Text>
      </Pressable>:null}

    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 24, padding: 24, backgroundColor: colors.ink, alignItems: 'center', marginTop: 8, marginBottom: 16 },
  eyebrow: { color: colors.lime, letterSpacing: 1.3, fontSize: 10, fontWeight: '900' },
  score: { color: colors.white, fontSize: 52, fontWeight: '900', marginTop: 8 },
  detail: { color: colors.white, fontSize: 14, lineHeight: 21, marginTop: 8, textAlign: 'center' },
  note: { color: '#D6D4E9', fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 10 },
  progressCard: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
    borderRadius: 20, padding: 18, marginBottom: 22 },
  progressEyebrow: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  progressTitle: { color: colors.ink, fontSize: 20, lineHeight: 27, fontWeight: '800', marginTop: 7 },
  progressBody: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 7 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 12, marginTop: 8 },
  topicRow: { borderRadius: 14, borderWidth: 1, borderColor: colors.border,
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, padding: 14,
    backgroundColor: colors.surface, marginBottom: 8 },
  topicTitle: { color: colors.ink, fontWeight: '700', fontSize: 13, flexShrink: 1 },
  topicMetric: { color: colors.primary, fontWeight: '900', fontSize: 13 },
  primary: { backgroundColor: colors.primary, minHeight: 48, borderRadius: 14, padding: 14,
    alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  primaryText: { color: colors.white, fontWeight: '900', fontSize: 14, textAlign: 'center' },
  secondary: { backgroundColor: colors.primarySoft, borderRadius: 14, minHeight: 48, padding: 14,
    marginTop: 10, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { fontSize: 14, lineHeight: 21, color: colors.primary, fontWeight: '800', textAlign: 'center' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  filter: { borderWidth: 1, borderRadius: 20, borderColor: colors.border,
    backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 10, minHeight: 44 },
  filterSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  filterText: { color: colors.muted, fontSize: 12, fontWeight: '800' },
  filterTextActive: { color: colors.primary },
  reviewCard: { borderRadius: 18, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, padding: 16, marginBottom: 12 },
  tag: { fontWeight: '900', fontSize: 10, letterSpacing: 0.6 },
  good: { color: colors.success }, bad: { color: colors.danger },
  question: { fontSize: 16, color: colors.ink, fontWeight: '800', lineHeight: 23, marginTop: 9 },
  answerText: { fontSize: 13, color: colors.muted, lineHeight: 20, marginTop: 10 },
  correctAnswer: { fontSize: 13, color: colors.success, lineHeight: 20, fontWeight: '800', marginTop: 6 },
  explanation: { color: colors.ink, fontSize: 13, lineHeight: 20, marginTop: 12 },
  reference: { color: colors.muted, fontSize: 11, marginTop: 9 },
  empty: { color: colors.muted, fontSize: 13, padding: 15 },
  textAction: { alignItems: 'center', justifyContent: 'center', padding: 14, minHeight: 48 },
  link: { color: colors.primary, fontWeight: '800', fontSize: 13, textAlign: 'center' },
});
