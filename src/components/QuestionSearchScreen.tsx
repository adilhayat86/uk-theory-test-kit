import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';
import { searchQuestions } from '../domain/questionSearch';

type Props = { onBack: () => void; onPractise: (items: TheoryQuestion[]) => void };

export default function QuestionSearchScreen({ onBack, onPractise }: Props) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All topics');
  const topics = useMemo(() => ['All topics', ...new Set(questions.map((item) => item.topic))], []);
  const results = useMemo(
    () => searchQuestions(questions.filter((item) => topic === 'All topics' || topic === item.topic), query),
    [query, topic],
  );

  return (
    <View>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}>
        <Text style={styles.link}>‹ Theory Test</Text>
      </Pressable>
      <Text style={styles.heading}>Search questions</Text>
      <Text style={styles.subheading}>Find a topic or rule in the original offline question bank.</Text>
      <TextInput
        accessibilityLabel="Search theory questions"
        placeholder="Search by keyword, topic or rule…"
        placeholderTextColor="#77869A"
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCorrect={false}
        style={styles.search}
      />
      <View style={styles.filters}>
        {topics.map((item) => (
          <Pressable key={item} accessibilityRole="button"
            accessibilityState={{ selected: item === topic }}
            onPress={() => setTopic(item)}
            style={[styles.filter, topic === item && styles.filterActive]}>
            <Text style={[styles.filterText, topic === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.counter}>{results.length} matching sample question{results.length === 1 ? '' : 's'}</Text>
      {results.length > 1 ? (
        <Pressable accessibilityRole="button" style={styles.primary} onPress={() => onPractise(results)}>
          <Text style={styles.primaryText}>Practise all {results.length} matches</Text>
        </Pressable>
      ) : null}
      {results.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>No matches yet. Try a different word or topic.</Text></View>
      ) : results.map((item) => (
        <Pressable
          accessibilityRole="button" accessibilityLabel={'Practise question: ' + item.prompt}
          key={item.id} style={styles.result} onPress={() => onPractise([item])}>
          <Text style={styles.topic}>{item.topic.toUpperCase()}</Text>
          <Text style={styles.prompt}>{item.prompt}</Text>
          <Text style={styles.link}>Practise this question ›</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  back: { paddingVertical: 10, alignSelf: 'flex-start' },
  link: { color: '#2456C7', fontWeight: '800', fontSize: 13 },
  heading: { fontSize: 25, fontWeight: '900', color: '#14233B', marginTop: 4 },
  subheading: { color: '#66758B', fontSize: 13, lineHeight: 20, marginTop: 6, marginBottom: 14 },
  search: { borderWidth: 1, borderColor: '#CBD6E6', backgroundColor: '#FFFFFF',
    borderRadius: 13, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16,
    color: '#14233B', minHeight: 52 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  filter: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E7F2',
    borderRadius: 22, paddingHorizontal: 12, paddingVertical: 9, minHeight: 40 },
  filterActive: { backgroundColor: '#EDF3FF', borderColor: '#2456C7' },
  filterText: { color: '#66758B', fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#2456C7' },
  counter: { marginTop: 16, marginBottom: 8, fontSize: 12, color: '#66758B', fontWeight: '700' },
  primary: { alignItems: 'center', justifyContent: 'center', minHeight: 48,
    backgroundColor: '#2456C7', borderRadius: 13, marginBottom: 10 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  result: { backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1,
    borderColor: '#E4EAF2', padding: 15, marginBottom: 10 },
  topic: { color: '#2456C7', fontWeight: '900', fontSize: 10, letterSpacing: 0.6 },
  prompt: { color: '#14233B', fontWeight: '700', fontSize: 15, lineHeight: 22, marginVertical: 9 },
  empty: { padding: 20, borderWidth: 1, borderColor: '#E4EAF2', borderRadius: 15 },
  emptyText: { color: '#66758B', lineHeight: 20 },
});
