import React, { useMemo, useState } from 'react';
import {
  Linking, Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { roadSigns, roadSignCategories } from '../data/roadSigns';
import type { RoadSignCategory } from '../data/roadSigns';
import { makeSignQuiz } from '../domain/roadSignQuiz';
import type { SignQuizQuestion } from '../domain/roadSignQuiz';
import RoadSignVisual from './RoadSignVisual';

type Category = 'All' | RoadSignCategory;
type Props = { onBack: () => void };

export default function RoadSignsScreen({ onBack }: Props) {
  const [category, setCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [quiz, setQuiz] = useState<SignQuizQuestion[] | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const filtered = useMemo(() => roadSigns.filter((sign) => {
    const matchesCategory = category === 'All' || sign.category === category;
    const query = search.trim().toLocaleLowerCase();
    return matchesCategory && (!query || `${sign.label} ${sign.meaning} ${sign.category}`.toLocaleLowerCase().includes(query));
  }), [category, search]);

  const question = quiz?.[questionIndex];
  const quizSign = roadSigns.find((sign) => sign.id === question?.signId);
  const quizFinished = Boolean(quiz && questionIndex >= quiz.length);

  function startQuiz() {
    setQuiz(makeSignQuiz(roadSigns, Math.min(10, roadSigns.length)));
    setQuestionIndex(0);
    setChosen(null);
    setCorrectCount(0);
  }

  function nextQuestion() {
    if (!quiz || chosen === null) return;
    setQuestionIndex((index) => index + 1);
    setChosen(null);
  }

  return (
    <View style={styles.root}>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}>
        <Text style={styles.link}>‹  Home</Text>
      </Pressable>
      <Text style={styles.eyebrow}>UK ROAD SIGNS · OFFLINE STUDY</Text>
      <Text style={styles.title}>Recognise the sign.</Text>
      <Text style={styles.subtitle}>Learn the meaning, then test yourself. These are original simplified teaching diagrams, not replacements for official road-sign artwork.</Text>

      {quizFinished && quiz ? (
        <View style={styles.quizPanel}>
          <Text style={styles.eyebrow}>QUIZ COMPLETE</Text>
          <Text style={styles.bigScore}>{correctCount}/{quiz.length}</Text>
          <Text style={styles.body}>{Math.round(correctCount * 100 / quiz.length)}% identified correctly</Text>
          <Text style={styles.muted}>Review the signs below and try again to improve recognition.</Text>
          <Pressable accessibilityRole="button" onPress={startQuiz} style={styles.primary}>
            <Text style={styles.primaryText}>Try another quiz</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => setQuiz(null)} style={styles.secondary}>
            <Text style={styles.secondaryText}>Browse road signs</Text>
          </Pressable>
        </View>
      ) : quiz && question && quizSign ? (
        <View style={styles.quizPanel}>
          <View style={styles.rowBetween}>
            <Text style={styles.eyebrow}>IDENTIFY THE SIGN</Text>
            <Text style={styles.muted}>Question {questionIndex + 1} of {quiz.length}</Text>
          </View>
          <View style={styles.quizArt}>
            <RoadSignVisual artwork={quizSign.artwork} size={180} accessibilityLabel="Road sign identification diagram" />
          </View>
          <Text style={styles.quizPrompt}>What does this sign mean?</Text>
          {question.options.map((option, i) => {
            const selected = chosen === i;
            const showCorrect = chosen !== null && i === question.answerIndex;
            return (
              <Pressable key={option} accessibilityRole="button"
                disabled={chosen !== null}
                accessibilityState={{ disabled: chosen !== null, selected }}
                onPress={() => {
                  if (chosen !== null) return;
                  setChosen(i);
                  if (i === question.answerIndex) setCorrectCount((value) => value + 1);
                }}
                style={[styles.choice, selected && styles.selected, showCorrect && styles.correct]}>
                <Text style={styles.choiceText}>{String.fromCharCode(65 + i)}. {option}</Text>
              </Pressable>
            );
          })}
          {chosen !== null ? (
            <View style={styles.feedback}>
              <Text style={[styles.feedbackTitle, chosen === question.answerIndex ? styles.correctText : styles.wrongText]}>
                {chosen === question.answerIndex ? 'Correct' : 'Review this sign'}
              </Text>
              <Text style={styles.body}>{quizSign.meaning}</Text>
              <Text style={styles.muted}>{quizSign.tip}</Text>
              <Pressable accessibilityRole="button" onPress={nextQuestion} style={styles.primary}>
                <Text style={styles.primaryText}>{questionIndex === quiz.length - 1 ? 'See results' : 'Next sign ›'}</Text>
              </Pressable>
            </View>
          ) : null}
          <Pressable accessibilityRole="button" onPress={() => setQuiz(null)} style={styles.secondary}>
            <Text style={styles.secondaryText}>Exit quiz</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.quizBanner}>
            <View style={styles.quizBannerContent}>
              <Text style={styles.quizBannerTitle}>Sign recognition quiz</Text>
              <Text style={styles.quizBannerSubtitle}>10 visual questions · instant explanations</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={startQuiz} style={styles.quizButton}>
              <Text style={styles.quizButtonText}>Start</Text>
            </Pressable>
          </View>

          <View style={styles.categories}>
            {(['All', ...roadSignCategories] as Category[]).map((item) => (
              <Pressable accessibilityRole="button" key={item}
                accessibilityState={{ selected: category === item }}
                onPress={() => setCategory(item)}
                style={[styles.categoryChip, category === item && styles.categoryActive]}>
                <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput accessibilityLabel="Search signs" placeholder="Search signs and meanings"
            placeholderTextColor="#728197" value={search} onChangeText={setSearch}
            style={styles.searchField} autoCorrect={false}/>
          <Text style={styles.muted}>{filtered.length} of {roadSigns.length} signs</Text>
          <View style={styles.signGrid}>
            {filtered.map((sign) => (
              <View key={sign.id} style={styles.signCard}>
                <View style={styles.artwork}>
                  <RoadSignVisual artwork={sign.artwork} size={108} accessibilityLabel={sign.label}/>
                </View>
                <Text style={styles.signCategory}>{sign.category.toUpperCase()}</Text>
                <Text style={styles.signName}>{sign.label}</Text>
                <Text style={styles.signMeaning}>{sign.meaning}</Text>
                <Text style={styles.signTip}>{sign.tip}</Text>
                <Pressable accessibilityRole="link" onPress={() => { void Linking.openURL(sign.sourceUrl); }} style={styles.sourceButton}>
                  <Text style={styles.sourceLink}>DfT source ↗</Text>
                </Pressable>
              </View>
            ))}
          </View>
          {filtered.length === 0 ? <Text style={styles.body}>No signs match that search.</Text> : null}
          <Text style={styles.disclaimer}>Content based on the Department for Transport's “Know Your Traffic Signs” (Open Government Licence v3.0). Original simplified diagrams are for teaching; check official illustrations for exact variants. Applies to Great Britain.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingBottom: 28 },
  back: { paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 9 },
  link: { color: '#2756C0', fontWeight: '800', fontSize: 14 },
  eyebrow: { color: '#2756C0', fontWeight: '900', fontSize: 10, letterSpacing: 1 },
  title: { color: '#16263F', fontWeight: '900', fontSize: 27, marginTop: 6 },
  subtitle: { color: '#56667D', fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 18 },
  body: { color: '#405068', fontSize: 14, lineHeight: 20, marginTop: 7 },
  muted: { color: '#708198', fontSize: 12, lineHeight: 18, marginTop: 6 },
  quizBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9F0FE', borderRadius: 16, padding: 15, marginBottom: 20 },
  quizBannerContent: { flex: 1 },
  quizBannerTitle: { color: '#214893', fontWeight: '900', fontSize: 16 },
  quizBannerSubtitle: { color: '#5872A6', fontSize: 12, marginTop: 5 },
  quizButton: { backgroundColor: '#2756C0', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 11 },
  quizButtonText: { color: 'white', fontWeight: '900', fontSize: 13 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  categoryChip: { backgroundColor: '#F2F5FA', borderRadius: 22, paddingHorizontal: 13, paddingVertical: 9, borderWidth: 1, borderColor: '#D9E3F2' },
  categoryActive: { backgroundColor: '#2756C0', borderColor: '#2756C0' },
  categoryText: { fontSize: 12, fontWeight: '800', color: '#4C6181' },
  categoryTextActive: { color: 'white' },
  searchField: { borderRadius: 11, backgroundColor: 'white', borderWidth: 1, borderColor: '#D9E3F2', padding: 12, fontSize: 14, color: '#152A48' },
  signGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11, marginTop: 13 },
  signCard: { width: '48%', minWidth: 138, backgroundColor: 'white', padding: 11, borderRadius: 16, borderWidth: 1, borderColor: '#E1E8F2', gap: 4 },
  artwork: { alignItems: 'center', justifyContent: 'center', minHeight: 117 },
  signCategory: { color: '#2C5DBA', fontSize: 9, fontWeight: '900', marginTop: 3 },
  signName: { color: '#16263F', fontSize: 14, fontWeight: '900', lineHeight: 19 },
  signMeaning: { color: '#526079', fontSize: 11, lineHeight: 16 },
  signTip: { color: '#76849A', fontSize: 11, lineHeight: 16, marginTop: 5 },
  sourceButton: { paddingTop: 10, paddingBottom: 5 },
  sourceLink: { color: '#2756C0', fontWeight: '800', fontSize: 11 },
  quizPanel: { padding: 18, borderRadius: 18, backgroundColor: 'white', borderWidth: 1, borderColor: '#E1E8F2' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quizArt: { alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
  quizPrompt: { color: '#16263F', fontSize: 19, fontWeight: '900', marginBottom: 12 },
  choice: { borderWidth: 1, borderColor: '#DAE3EF', borderRadius: 12, padding: 14, marginBottom: 9 },
  selected: { backgroundColor: '#FDE9E9', borderColor: '#D98989' },
  correct: { backgroundColor: '#E8F8F0', borderColor: '#47AA79' },
  choiceText: { color: '#233B5A', fontWeight: '700', fontSize: 13, lineHeight: 19 },
  feedback: { paddingTop: 10 },
  feedbackTitle: { fontSize: 16, fontWeight: '900' },
  correctText: { color: '#167548' },
  wrongText: { color: '#AD383D' },
  primary: { marginTop: 16, minHeight: 48, borderRadius: 11, backgroundColor: '#2756C0', justifyContent: 'center', alignItems: 'center' },
  primaryText: { color: 'white', fontWeight: '900', fontSize: 13 },
  secondary: { marginTop: 12, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
  secondaryText: { color: '#2756C0', fontWeight: '800', fontSize: 12 },
  bigScore: { color: '#2756C0', fontSize: 48, fontWeight: '900', marginTop: 9 },
  disclaimer: { color: '#7D8799', lineHeight: 17, fontSize: 11, marginTop: 20 },
});
