import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import QuestionIllustration from './QuestionIllustration';
import type { TheoryQuestion } from '../data/questions';
import {
  buildPracticeReview, filterPracticeReview, topicPracticeScores,
} from '../domain/practiceReview';
import type { PracticeReviewFilter } from '../domain/practiceReview';

type Props = {
  questions: TheoryQuestion[];
  answers: Record<string, number>;
  savedIds: string[];
  backLabel: string;
  onFinish: () => void;
  onRetry: (items: TheoryQuestion[]) => void;
  onRestart: () => void;
};

const filters: { key: PracticeReviewFilter; title: string }[] = [
  { key: 'all', title: 'All' },
  { key: 'correct', title: 'Correct' },
  { key: 'incorrect', title: 'Incorrect' },
  { key: 'saved', title: 'Saved' },
];

export default function PracticeResultsScreen({
  questions, answers, savedIds, backLabel, onFinish, onRetry, onRestart,
}: Props) {
  const [filter, setFilter] = useState<PracticeReviewFilter>('all');
  const [showReview, setShowReview] = useState(false);
  const entries = useMemo(() => buildPracticeReview(questions, answers), [questions, answers]);
  const reviewed = useMemo(() => filterPracticeReview(entries, filter, savedIds),
    [entries, filter, savedIds]);
  const topicScores = useMemo(() => topicPracticeScores(entries), [entries]);
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

      {topicScores.length ? (
        <>
          <Text style={styles.sectionTitle}>How you did by topic</Text>
          {topicScores.map((item) => (
            <View key={item.topic} style={styles.topicRow}>
              <Text style={styles.topicTitle}>{item.topic}</Text>
              <Text style={styles.topicMetric}>{item.correct}/{item.attempted} · {item.percentage}%</Text>
            </View>
          ))}
        </>
      ) : null}

      <Pressable accessibilityRole="button" style={styles.primary}
        onPress={() => setShowReview((previous) => !previous)}>
        <Text style={styles.primaryText}>{showReview ? 'Hide answer review' : 'Review your answers'}</Text>
      </Pressable>

      {wrongQuestions.length > 0 ? (
        <Pressable accessibilityRole="button" style={styles.secondary}
          onPress={() => onRetry(wrongQuestions)}>
          <Text style={styles.secondaryText}>Retry {wrongQuestions.length} incorrect answer{wrongQuestions.length === 1 ? '' : 's'}</Text>
        </Pressable>
      ) : null}

      {showReview ? (
        <>
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

      <Pressable accessibilityRole="button" style={styles.textAction} onPress={onRestart}>
        <Text style={styles.link}>Practise these questions again</Text>
      </Pressable>
      <Pressable accessibilityRole="button" style={styles.textAction} onPress={onFinish}>
        <Text style={styles.link}>Back to {backLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 20, padding: 22, backgroundColor: '#132B3A', alignItems: 'center', marginTop: 8, marginBottom: 22 },
  eyebrow: { color: '#B4F1D7', letterSpacing: 1, fontSize: 10, fontWeight: '900' },
  score: { color: '#FFFFFF', fontSize: 47, fontWeight: '900', marginTop: 7 },
  detail: { color: '#FFFFFF', fontSize: 15, marginTop: 8 },
  note: { color: '#D6E9E6', fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 10 },
  sectionTitle: { color: '#132B3A', fontSize: 18, fontWeight: '900', marginBottom: 12, marginTop: 8 },
  topicRow: { borderRadius: 12, borderWidth: 1, borderColor: '#DFE8E6',
    flexDirection: 'row', justifyContent: 'space-between', gap: 8, padding: 14,
    backgroundColor: '#FFFFFF', marginBottom: 8 },
  topicTitle: { color: '#132B3A', fontWeight: '700', fontSize: 13, flexShrink: 1 },
  topicMetric: { color: '#087E8B', fontWeight: '900', fontSize: 13 },
  primary: { backgroundColor: '#087E8B', minHeight: 48, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  primaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  secondary: { backgroundColor: '#E6F5F3', borderRadius: 13, minHeight: 48,
    marginTop: 10, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { fontSize: 14, color: '#087E8B', fontWeight: '800' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  filter: { borderWidth: 1, borderRadius: 20, borderColor: '#DFE8E6',
    backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, minHeight: 42 },
  filterSelected: { borderColor: '#087E8B', backgroundColor: '#E6F5F3' },
  filterText: { color: '#66758B', fontSize: 12, fontWeight: '800' },
  filterTextActive: { color: '#087E8B' },
  reviewCard: { borderRadius: 15, borderWidth: 1, borderColor: '#DFE8E6',
    backgroundColor: '#FFFFFF', padding: 16, marginBottom: 12 },
  tag: { fontWeight: '900', fontSize: 10, letterSpacing: 0.6 },
  good: { color: '#16834A' }, bad: { color: '#C23B42' },
  question: { fontSize: 16, color: '#132B3A', fontWeight: '800', lineHeight: 23, marginTop: 9 },
  answerText: { fontSize: 13, color: '#66758B', lineHeight: 20, marginTop: 10 },
  correctAnswer: { fontSize: 13, color: '#16834A', lineHeight: 20, fontWeight: '800', marginTop: 6 },
  explanation: { color: '#40516A', fontSize: 13, lineHeight: 20, marginTop: 12 },
  reference: { color: '#8492A7', fontSize: 11, marginTop: 9 },
  empty: { color: '#66758B', fontSize: 13, padding: 15 },
  textAction: { alignItems: 'center', justifyContent: 'center', padding: 14 },
  link: { color: '#087E8B', fontWeight: '800', fontSize: 13 },
});
