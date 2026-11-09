import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';
import { eligiblePracticeQuestions } from '../domain/practiceSelection';
import type { PracticeMode } from '../domain/practiceSelection';
import TopicPicker from './TopicPicker';
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
  onStart: (items: TheoryQuestion[]) => void;
};

export default function PracticeSetupScreen({ records, savedIds, initialTopic, onStart }: Props) {
  const [topics, setTopics] = useState<string[]>(initialTopic ? [initialTopic] : []);
  const [mode, setMode] = useState<PracticeMode>('all');
  const [limit, setLimit] = useState(10);
  const topicStats = useMemo(() => getTopicReview(questions, records), [records]);
  const eligible = useMemo(() => eligiblePracticeQuestions(questions, records, savedIds, topics, mode),
    [records, savedIds, topics, mode]);
  const count = Math.min(limit, eligible.length);

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
    <Text style={styles.title}>Practice</Text>
    <Text style={styles.heading}>Focus</Text>
    <View style={styles.row}>{modes.map((item) => <Pressable key={item.id} accessibilityRole="button"
      accessibilityState={{ selected: mode === item.id }} accessibilityHint={item.detail} onPress={() => setMode(item.id)}
      style={[styles.chip, mode === item.id && styles.selected]}>
      <Text style={[styles.chipText, mode === item.id && styles.activeText]}>{item.title}</Text>
    </Pressable>)}</View>
    <Text style={styles.heading}>Number of questions</Text>
    <View style={styles.row}>{[5, 10, 20].map((value) => <Pressable key={value} accessibilityRole="button"
      accessibilityState={{ selected: limit === value }} onPress={() => setLimit(value)}
      accessibilityLabel={value + ' questions'} style={[styles.length, limit === value && styles.selected]}>
      <Text style={[styles.chipText, limit === value && styles.activeText]}>{value}</Text>
    </Pressable>)}</View>
    <TopicPicker multiple accessibilityLabel="Choose practice topics" selected={topics} onChange={setTopics}
      items={topicStats.map((item) => ({ id: item.topic, detail: item.questionsTried + '/' + item.totalQuestions + ' tried · ' + item.recentMistakes + ' to retry' }))} />
    <View style={styles.summary}>
      <Text style={styles.summaryTitle}>{count ? count + (count === 1 ? ' question ready' : ' questions ready') : 'No matching questions yet'}</Text>
      <Text style={styles.summaryBody}>{eligible.length} available · {topics.length ? topics.length + ' selected topics' : 'All topics'}</Text>
      {count === 0 ? <Text style={styles.summaryBody}>Try All questions or choose more topics.</Text> : null}
      {count > 0 && count < limit ? <Text style={styles.summaryBody}>This session uses all {count} matching questions.</Text> : null}
      <Pressable accessibilityRole="button" accessibilityLabel={'Start practice with ' + count + ' questions'}
        accessibilityState={{ disabled: count === 0 }} disabled={count === 0} onPress={start}
        style={[styles.primary, count === 0 && styles.disabled]}>
        <Text style={styles.primaryText}>Start practice ›</Text>
      </Pressable>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  title: { color: '#132B3A', fontSize: 26, fontWeight: '900', marginTop: 8 },
  heading: { color: '#132B3A', fontSize: 17, fontWeight: '800', marginBottom: 8, marginTop: 6 },
  length: { flex: 1, minHeight: 44, padding: 11, alignItems: 'center', borderWidth: 1, borderColor: '#CBD6E6', borderRadius: 12, backgroundColor: '#FFFFFF' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { borderWidth: 1, borderColor: '#CBD6E6', borderRadius: 22, backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 12, minHeight: 46 },
  chipText: { color: '#40516A', fontWeight: '700', fontSize: 13 },
  selected: { borderColor: '#087E8B', backgroundColor: '#E6F5F3' },
  activeText: { color: '#087E8B' },
  summary: { backgroundColor: '#132B3A', borderRadius: 16, padding: 16, marginTop: 2 },
  summaryTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 21 },
  summaryBody: { color: '#D6E9E6', fontSize: 13, lineHeight: 20, marginTop: 6 },
  primary: { minHeight: 50, borderRadius: 13, backgroundColor: '#087E8B', alignItems: 'center', justifyContent: 'center', padding: 14, marginTop: 15 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  disabled: { opacity: 0.45 }
});
