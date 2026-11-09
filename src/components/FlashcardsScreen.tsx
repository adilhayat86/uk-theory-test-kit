import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { questions } from '../data/questions';
import TopicPicker from './TopicPicker';
import QuestionIllustration from './QuestionIllustration';
import type { TheoryQuestion } from '../data/questions';

type Props = {
  onPageChange: () => void;
  onPractise: (items: TheoryQuestion[]) => void;
};

/** A no-download, no-login, locally bundled revision tool using independently authored questions. */
export default function FlashcardsScreen({ onPractise, onPageChange }: Props) {
  const [topic, setTopic] = useState<string>('All topics');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const topics = useMemo(() => [...new Set(questions.map((item) => item.topic))].map((id) => ({ id })), []);
  const cards = useMemo(() => topic === 'All topics'
    ? questions : questions.filter((item) => item.topic === topic), [topic]);
  const current = cards[index];

  function chooseTopic(next: string) {
    onPageChange();
    setTopic(next);
    setIndex(0);
    setRevealed(false);
  }

  function changeCard(offset: number) {
    onPageChange();
    setIndex((value) => Math.max(0, Math.min(cards.length - 1, value + offset)));
    setRevealed(false);
  }

  return (
    <View>
      <Text style={styles.title}>Revision flashcards</Text>
      <Text style={styles.subtitle}>Recall the answer before revealing it. Everything works offline.</Text>
      <TopicPicker accessibilityLabel="Choose flashcard topic" items={topics}
        selected={topic === 'All topics' ? [] : [topic]} onChange={(ids) => chooseTopic(ids[0] ?? 'All topics')} />
      {current ? (
        <>
          <View style={styles.card}>
            <Text style={styles.counter}>CARD {index + 1} OF {cards.length} • {current.topic.toUpperCase()}</Text>
            <Text style={styles.prompt}>{current.prompt}</Text>
            <QuestionIllustration question={current} context={revealed ? 'review' : 'question'} />
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
  title: { color: '#132B3A', fontWeight: '900', fontSize: 25, marginTop: 8 },
  subtitle: { color: '#66758B', fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 14 },
  card: { borderWidth: 1, borderColor: '#DFE8E6', borderRadius: 18, backgroundColor: '#FFFFFF', padding: 20 },
  counter: { color: '#087E8B', fontWeight: '900', fontSize: 10, letterSpacing: 0.7 },
  prompt: { color: '#132B3A', fontWeight: '800', fontSize: 22, lineHeight: 30, marginTop: 16, marginBottom: 16 },
  hint: { color: '#66758B', fontStyle: 'italic', fontSize: 13, marginBottom: 10 },
  answer: { backgroundColor: '#F1F8F5', padding: 15, borderRadius: 12, marginBottom: 10 },
  answerLabel: { color: '#16834A', fontWeight: '900', fontSize: 10 },
  answerText: { color: '#132B3A', fontWeight: '800', fontSize: 17, marginTop: 8, lineHeight: 24 },
  explanation: { color: '#40516A', fontSize: 13, lineHeight: 19, marginTop: 10 },
  source: { color: '#66758B', fontSize: 11, marginTop: 10 },
  primary: { backgroundColor: '#087E8B', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10, minHeight: 48 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  navigation: { flexDirection: 'row', gap: 10, marginTop: 12 },
  navButton: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 12, backgroundColor: '#E6F5F3' },
  navText: { color: '#087E8B', fontWeight: '800', fontSize: 13 },
  disabled: { opacity: 0.4 },
  secondary: { paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: '#087E8B', fontWeight: '800', fontSize: 13 },
  disclaimer: { textAlign: 'center', color: '#66758B', fontSize: 11, marginTop: 2 }
});
