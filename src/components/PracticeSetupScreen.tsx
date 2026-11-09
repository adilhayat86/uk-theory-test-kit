import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';
import { eligiblePracticeQuestions } from '../domain/practiceSelection';
import type { PracticeMode } from '../domain/practiceSelection';
import { getTopicReview } from '../domain/revision';
import type { QuestionProgressDetail } from '../domain/revision';

const modes: { id: PracticeMode; title: string; detail: string }[] = [
  { id: 'all', title: 'All questions', detail: 'A shuffled mix from your chosen topics' },
  { id: 'smart', title: 'Smart revision', detail: 'Recent mistakes first, then unseen questions' },
  { id: 'incorrect', title: 'Incorrect', detail: 'Questions you answered incorrectly last time' },
  { id: 'unseen', title: 'Not tried yet', detail: 'Explore questions you have not answered' },
  { id: 'saved', title: 'Saved', detail: 'Revisit your bookmarked questions' },
];

type Props = {
  records: QuestionProgressDetail[]; savedIds: string[]; initialTopic?: string;
  onBack: () => void; onStart: (items: TheoryQuestion[]) => void;
};

export default function PracticeSetupScreen({ records, savedIds, initialTopic, onBack, onStart }: Props) {
  const [topics, setTopics] = useState<string[]>(initialTopic ? [initialTopic] : []);
  const [mode, setMode] = useState<PracticeMode>('all');
  const [limit, setLimit] = useState(10);
  const topicStats = useMemo(() => getTopicReview(questions, records), [records]);
  const eligible = useMemo(() => eligiblePracticeQuestions(questions, records, savedIds, topics, mode),
    [records, savedIds, topics, mode]);
  const count = Math.min(limit, eligible.length);

  function toggleTopic(topic: string) {
    setTopics((previous) => previous.includes(topic)
      ? previous.filter((item) => item !== topic) : [...previous, topic]);
  }

  function start() {
    // Smart ranking must survive session creation; other modes are shuffled here.
    const pool = [...eligible];
    if (mode !== 'smart') {
      for (let i = pool.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    onStart(pool.slice(0, count));
  }

  return <View>
    <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.link}>‹ Theory revision</Text></Pressable>
    <Text style={styles.title}>Build your practice</Text>
    <Text style={styles.subtitle}>Choose a focus. Answers and explanations are saved on this device.</Text>
    <Text style={styles.heading}>1. Choose your focus</Text>
    <View style={styles.row}>{modes.map((item) => <Pressable key={item.id} accessibilityRole="button"
      accessibilityState={{ selected: mode === item.id }} onPress={() => setMode(item.id)}
      style={[styles.chip, mode === item.id && styles.selected]}>
      <Text style={[styles.chipText, mode === item.id && styles.activeText]}>{item.title}</Text>
    </Pressable>)}</View>
    <Text style={styles.subtitle}>{modes.find((item) => item.id === mode)?.detail}</Text>
    <Text style={styles.heading}>2. Session length</Text>
    <View style={styles.row}>{[5, 10, 20].map((value) => <Pressable key={value} accessibilityRole="button"
      accessibilityState={{ selected: limit === value }} onPress={() => setLimit(value)}
      style={[styles.chip, limit === value && styles.selected]}>
      <Text style={[styles.chipText, limit === value && styles.activeText]}>{value} questions</Text>
    </Pressable>)}</View>
    <View style={styles.summary}>
      <Text style={styles.summaryTitle}>{count ? count + ' questions ready' : 'No matching questions yet'}</Text>
      <Text style={styles.summaryBody}>{eligible.length} available · {topics.length ? topics.length + ' selected topics' : 'All topics'}</Text>
      {count === 0 ? <Text style={styles.summaryBody}>Try All questions or choose more topics.</Text> : null}
      {count > 0 && count < limit ? <Text style={styles.summaryBody}>This session uses all {count} matching questions.</Text> : null}
      <Pressable accessibilityRole="button" accessibilityLabel={'Start practice with ' + count + ' questions'}
        accessibilityState={{ disabled: count === 0 }} disabled={count === 0} onPress={start}
        style={[styles.primary, count === 0 && styles.disabled]}>
        <Text style={styles.primaryText}>Start practice ›</Text>
      </Pressable>
    </View>
    <Text style={styles.heading}>3. Pick one or more topics</Text>
    <Pressable accessibilityRole="button" accessibilityState={{ selected: topics.length === 0 }}
      style={[styles.topic, topics.length === 0 && styles.selected]} onPress={() => setTopics([])}>
      <Text style={styles.topicTitle}>{topics.length === 0 ? '✓ ' : ''}All topics</Text>
      <Text style={styles.topicDetail}>{questions.length} original questions</Text>
    </Pressable>
    {topicStats.map((item) => <Pressable key={item.topic} accessibilityRole="checkbox"
      accessibilityState={{ checked: topics.includes(item.topic) }} onPress={() => toggleTopic(item.topic)}
      style={[styles.topic, topics.includes(item.topic) && styles.selected]}>
      <Text style={styles.topicTitle}>{topics.includes(item.topic) ? '✓ ' : '○ '}{item.topic}</Text>
      <Text style={styles.topicDetail}>{item.questionsTried}/{item.totalQuestions} tried · {item.recentMistakes} to retry</Text>
    </Pressable>)}
    <Pressable accessibilityRole="button" disabled={count === 0} accessibilityState={{ disabled: count === 0 }}
      onPress={start} style={[styles.primary, count === 0 && styles.disabled]}>
      <Text style={styles.primaryText}>Start {count}-question practice ›</Text>
    </Pressable>
  </View>;
}

const styles = StyleSheet.create({
  back: { paddingVertical: 12, alignSelf: 'flex-start', minHeight: 44 },
  link: { color: '#2456C7', fontWeight: '800', fontSize: 14 },
  title: { color: '#14233B', fontSize: 26, fontWeight: '900', marginTop: 8 },
  subtitle: { color: '#66758B', fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 18 },
  heading: { color: '#14233B', fontSize: 17, fontWeight: '800', marginBottom: 12, marginTop: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { borderWidth: 1, borderColor: '#CBD6E6', borderRadius: 22, backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 12, minHeight: 46 },
  chipText: { color: '#40516A', fontWeight: '700', fontSize: 13 },
  selected: { borderColor: '#2456C7', backgroundColor: '#EDF3FF' },
  activeText: { color: '#2456C7' },
  summary: { backgroundColor: '#142B55', borderRadius: 18, padding: 20, marginVertical: 16 },
  summaryTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 21 },
  summaryBody: { color: '#D5DFF2', fontSize: 13, lineHeight: 20, marginTop: 6 },
  primary: { minHeight: 50, borderRadius: 13, backgroundColor: '#2456C7', alignItems: 'center', justifyContent: 'center', padding: 14, marginTop: 15 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  disabled: { opacity: 0.45 },
  topic: { padding: 16, borderWidth: 1, borderColor: '#E4EAF2', backgroundColor: '#FFFFFF', borderRadius: 13, marginBottom: 9 },
  topicTitle: { color: '#14233B', fontSize: 15, fontWeight: '800' },
  topicDetail: { color: '#66758B', fontSize: 12, marginTop: 6 },
});
