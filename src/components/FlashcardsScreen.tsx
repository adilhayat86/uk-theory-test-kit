import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { questions } from '../data/questions';
import type { TheoryQuestion } from '../data/questions';

type Props = {
  onBack: () => void;
  onPractise: (items: TheoryQuestion[]) => void;
};

/** A no-download, no-login, locally bundled revision tool using independently authored questions. */
export default function FlashcardsScreen({ onBack, onPractise }: Props) {
  const [topic, setTopic] = useState<string>('All topics');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const topics = useMemo(() => ['All topics', ...new Set(questions.map((item) => item.topic))], []);
  const cards = useMemo(() => topic === 'All topics'
    ? questions : questions.filter((item) => item.topic === topic), [topic]);
  const current = cards[index];

  function chooseTopic(next: string) {
    setTopic(next);
    setIndex(0);
    setRevealed(false);
  }

  function changeCard(offset: number) {
    setIndex((value) => Math.max(0, Math.min(cards.length - 1, value + offset)));
    setRevealed(false);
  }

  return (
    <View>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>‹ Home</Text>
      </Pressable>
      <Text style={styles.title}>Revision flashcards</Text>
      <Text style={styles.subtitle}>Recall the answer before revealing it. Everything works offline.</Text>
      <View style={styles.topics}>
        {topics.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: topic === item }}
            onPress={() => chooseTopic(item)}
            style={[styles.topic, topic === item && styles.selectedTopic]}
          >
            <Text style={[styles.topicText, topic === item && styles.selectedTopicText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      {current ? (
        <>
          <View style={styles.card}>
            <Text style={styles.counter}>CARD {index + 1} OF {cards.length} • {current.topic.toUpperCase()}</Text>
            <Text style={styles.prompt}>{current.prompt}</Text>
            {revealed ? (
              <View style={styles.answer}>
                <Text style={styles.answerLabel}>ANSWER</Text>
                <Text style={styles.answerText}>{current.options[current.correctIndex]}</Text>
                <Text style={styles.explanation}>{current.explanation}</Text>
                <Text style={styles.source}>{current.reference}</Text>
              </View>
            ) : (
              <Text style={styles.hint}>Think of the correct response first.</Text>
            )}
            <Pressable accessibilityRole="button" style={styles.primary}
              onPress={() => setRevealed((value) => !value)}>
              <Text style={styles.primaryText}>{revealed ? 'Hide answer' : 'Reveal answer'}</Text>
            </Pressable>
          </View>
          <View style={styles.navigation}>
            <Pressable accessibilityRole="button" disabled={index === 0}
              style={[styles.navButton, index === 0 && styles.disabled]}
              onPress={() => changeCard(-1)}>
              <Text style={styles.navText}>‹ Previous</Text>
            </Pressable>
            <Pressable accessibilityRole="button" disabled={index + 1 >= cards.length}
              style={[styles.navButton, index + 1 >= cards.length && styles.disabled]}
              onPress={() => changeCard(1)}>
              <Text style={styles.navText}>Next ›</Text>
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" style={styles.secondary}
            onPress={() => onPractise(cards)}>
            <Text style={styles.secondaryText}>Practise these questions</Text>
          </Pressable>
          <Text style={styles.disclaimer}>Flashcard reveals are not scored as test attempts.</Text>
        </>
      ) : <Text style={styles.subtitle}>No questions in this topic yet.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: { alignSelf: 'flex-start', paddingVertical: 8 },
  backText: { color: '#2456C7', fontWeight: '800', fontSize: 14 },
  title: { color: '#14233B', fontWeight: '900', fontSize: 25, marginTop: 8 },
  subtitle: { color: '#66758B', fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 14 },
  topics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  topic: { borderColor: '#E4EAF2', backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 9 },
  selectedTopic: { borderColor: '#2456C7', backgroundColor: '#EDF3FF' },
  topicText: { color: '#66758B', fontSize: 12, fontWeight: '700' },
  selectedTopicText: { color: '#2456C7' },
  card: { borderWidth: 1, borderColor: '#E4EAF2', borderRadius: 18, backgroundColor: '#FFFFFF', padding: 20 },
  counter: { color: '#2456C7', fontWeight: '900', fontSize: 10, letterSpacing: 0.7 },
  prompt: { color: '#14233B', fontWeight: '800', fontSize: 22, lineHeight: 30, marginTop: 16, marginBottom: 16 },
  hint: { color: '#66758B', fontStyle: 'italic', fontSize: 13, marginBottom: 10 },
  answer: { backgroundColor: '#F1F8F5', padding: 15, borderRadius: 12, marginBottom: 10 },
  answerLabel: { color: '#16834A', fontWeight: '900', fontSize: 10 },
  answerText: { color: '#14233B', fontWeight: '800', fontSize: 17, marginTop: 8, lineHeight: 24 },
  explanation: { color: '#40516A', fontSize: 13, lineHeight: 19, marginTop: 10 },
  source: { color: '#66758B', fontSize: 11, marginTop: 10 },
  primary: { backgroundColor: '#2456C7', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10, minHeight: 48 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  navigation: { flexDirection: 'row', gap: 10, marginTop: 12 },
  navButton: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 12, backgroundColor: '#EAF1FF' },
  navText: { color: '#2456C7', fontWeight: '800', fontSize: 13 },
  disabled: { opacity: 0.4 },
  secondary: { paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: '#2456C7', fontWeight: '800', fontSize: 13 },
  disclaimer: { textAlign: 'center', color: '#66758B', fontSize: 11, marginTop: 2 },
});
