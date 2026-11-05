import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { questions } from './src/data/questions';

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const question = questions[questionIndex];
  const isCorrect = selected === question.correctIndex;
  const score = useMemo(() => completed.length, [completed]);

  function nextQuestion() {
    if (selected === null) return;
    setCompleted((old) => old.includes(question.id) ? old : [...old, question.id]);
    setQuestionIndex((old) => (old + 1) % questions.length);
    setSelected(null);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>INDEPENDENT UK THEORY PRACTICE</Text>
        <Text style={styles.title}>UK Theory Test Kit</Text>
        <Text style={styles.subtitle}>Build confidence, one question at a time.</Text>

        <View style={styles.stats}>
          <View><Text style={styles.statNumber}>{score}</Text><Text style={styles.statLabel}>Answered</Text></View>
          <View><Text style={styles.statNumber}>{questions.length}</Text><Text style={styles.statLabel}>Starter questions</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.topic}>{question.topic.toUpperCase()}</Text>
          <Text style={styles.progress}>QUESTION {questionIndex + 1} OF {questions.length}</Text>
          <Text style={styles.prompt}>{question.prompt}</Text>
          {question.options.map((option, index) => {
            const chosen = selected === index;
            const correct = selected !== null && index === question.correctIndex;
            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected: chosen }}
                onPress={() => selected === null && setSelected(index)}
                style={[styles.option, chosen && styles.chosen, correct && styles.correct]}
              >
                <Text style={styles.optionText}>{String.fromCharCode(65 + index)}. {option}</Text>
              </Pressable>
            );
          })}
          {selected !== null && (
            <View style={styles.feedback}>
              <Text style={styles.feedbackTitle}>{isCorrect ? 'Correct' : 'Not quite'}</Text>
              <Text style={styles.explanation}>{question.explanation}</Text>
            </View>
          )}
          <Pressable
            accessibilityRole="button"
            disabled={selected === null}
            onPress={nextQuestion}
            style={[styles.nextButton, selected === null && styles.disabled]}
          >
            <Text style={styles.nextText}>Next question</Text>
          </Pressable>
        </View>
        <Text style={styles.footer}>Original educational practice content. Not affiliated with or endorsed by DVSA.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F6FA' },
  container: { padding: 22, paddingTop: 34, flexGrow: 1 },
  eyebrow: { color: '#2563EB', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#14213D', fontSize: 30, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#64748B', fontSize: 15, marginTop: 6 },
  stats: { flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 20 },
  statNumber: { color: '#14213D', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#64748B', fontSize: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#0F172A', shadowOpacity: 0.06, shadowRadius: 14, elevation: 3 },
  topic: { color: '#2563EB', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  progress: { color: '#94A3B8', fontSize: 11, marginTop: 12, fontWeight: '700' },
  prompt: { color: '#14213D', fontSize: 20, fontWeight: '700', lineHeight: 28, marginTop: 12, marginBottom: 18 },
  option: { borderWidth: 1, borderColor: '#DCE3ED', borderRadius: 12, padding: 14, marginBottom: 10 },
  chosen: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  correct: { borderColor: '#16A34A', backgroundColor: '#F0FDF4' },
  optionText: { color: '#263449', fontSize: 14, lineHeight: 20 },
  feedback: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14, marginTop: 4 },
  feedbackTitle: { color: '#14213D', fontWeight: '800', marginBottom: 4 },
  explanation: { color: '#475569', lineHeight: 20, fontSize: 13 },
  nextButton: { backgroundColor: '#1D4ED8', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 18 },
  disabled: { opacity: 0.4 },
  nextText: { color: '#FFFFFF', fontWeight: '800' },
  footer: { color: '#94A3B8', fontSize: 11, textAlign: 'center', lineHeight: 16, marginTop: 22, marginBottom: 16 }
});