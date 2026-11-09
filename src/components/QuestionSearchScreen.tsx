import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';
import TopicPicker from './TopicPicker';
import { searchQuestions } from '../domain/questionSearch';

type Props = { onPractise: (items: TheoryQuestion[]) => void };

export default function QuestionSearchScreen({ onPractise }: Props) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All topics');
  const topics = useMemo(() => [...new Set(questions.map((item) => item.topic))].map((id) => ({ id })), []);
  const results = useMemo(
    () => searchQuestions(questions.filter((item) => topic === 'All topics' || topic === item.topic), query),
    [query, topic],
  );

  return (
    <View>
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
      <TopicPicker accessibilityLabel="Choose search topic" items={topics}
        selected={topic === 'All topics' ? [] : [topic]} onChange={(ids) => setTopic(ids[0] ?? 'All topics')} />
      <Text style={styles.counter}>{results.length} matching question{results.length === 1 ? '' : 's'}</Text>
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
  link: { color: '#087E8B', fontWeight: '800', fontSize: 13 },
  heading: { fontSize: 25, fontWeight: '900', color: '#132B3A', marginTop: 4 },
  subheading: { color: '#66758B', fontSize: 13, lineHeight: 20, marginTop: 6, marginBottom: 14 },
  search: { borderWidth: 1, borderColor: '#CBD6E6', backgroundColor: '#FFFFFF',
    borderRadius: 13, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16,
    color: '#132B3A', minHeight: 52 },
  counter: { marginTop: 16, marginBottom: 8, fontSize: 12, color: '#66758B', fontWeight: '700' },
  primary: { alignItems: 'center', justifyContent: 'center', minHeight: 48,
    backgroundColor: '#087E8B', borderRadius: 13, marginBottom: 10 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  result: { backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1,
    borderColor: '#DFE8E6', padding: 15, marginBottom: 10 },
  topic: { color: '#087E8B', fontWeight: '900', fontSize: 10, letterSpacing: 0.6 },
  prompt: { color: '#132B3A', fontWeight: '700', fontSize: 15, lineHeight: 22, marginVertical: 9 },
  empty: { padding: 20, borderWidth: 1, borderColor: '#DFE8E6', borderRadius: 15 },
  emptyText: { color: '#66758B', lineHeight: 20 }
});
