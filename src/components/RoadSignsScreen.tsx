import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  findRoadSignFacts, roadSignCategories, roadSignFacts,
} from '../data/roadSigns';
import type { RoadSignCategory } from '../data/roadSigns';
import { Illustration } from './QuestionIllustration';
import { illustrationAssets } from '../data/illustrationAssets';
import { getSavedSignIds, toggleSavedSign } from '../storage/database';

type Mode = 'learn' | 'saved' | 'quiz';
type Props = { onBack: () => void; onPageChange: () => void };

function newQuiz() {
  const pool = [...roadSignFacts];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 10);
}

export default function RoadSignsScreen({ onBack, onPageChange }: Props) {
  const [mode, setMode] = useState<Mode>('learn');
  const [category, setCategory] = useState<RoadSignCategory | undefined>();
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [practiceFacts, setPracticeFacts] = useState(newQuiz);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const saving = useRef<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;
    void getSavedSignIds()
      .then((ids) => { if (mounted) setSaved(ids); })
      .catch(() => { if (mounted) setMessage('Saved signs could not be loaded on this device.'); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() =>
    findRoadSignFacts(roadSignFacts, query, category)
      .filter((item) => mode !== 'saved' || saved.includes(item.id)), [query, category, mode, saved]);

  async function toggleSaved(id: string) {
    if (saving.current.has(id)) return;
    saving.current.add(id);
    try {
      const nowSaved = await toggleSavedSign(id);
      setSaved((previous) => nowSaved
        ? [...previous.filter((item) => item !== id), id]
        : previous.filter((item) => item !== id));
      setMessage(null);
    } catch {
      setMessage('Could not save this sign. Try again.');
    } finally {
      saving.current.delete(id);
    }
  }

  function selectMode(next: Mode) {
    onPageChange();
    setMode(next);
    setCategory(undefined);
    setQuery('');
    if (next === 'quiz') {
      setPracticeFacts(newQuiz());
      setIndex(0);
      setAnswer(null);
      setCorrect(0);
    }
  }

  const current = practiceFacts[index];
  function submitAnswer(selected: number) {
    if (answer !== null || !current) return;
    setAnswer(selected);
    if (selected === current.quiz.correctIndex) setCorrect((value) => value + 1);
  }

  return (
    <View>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}>
        <Text style={styles.link}>‹ Home</Text>
      </Pressable>
      <Text style={styles.title}>Road signs</Text>
      <Text style={styles.subtitle}>{roadSignFacts.length} illustrated GB sign notes. Tap a card to learn the meaning,
        then try a 10-question recognition quiz. Available offline.</Text>
      <View style={styles.modeRow}>
        {([
          ['learn', 'Categories & search'],
          ['saved', 'Saved signs'],
          ['quiz', 'Mini quiz'],
        ] as [Mode, string][]).map(([key, label]) => (
          <Pressable key={key} accessibilityRole="button"
            accessibilityState={{ selected: mode === key }}
            onPress={() => selectMode(key)}
            style={[styles.modeButton, mode === key && styles.modeSelected]}>
            <Text style={[styles.modeText, mode === key && styles.modeTextSelected]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      {message ? <Text style={styles.warning}>{message}</Text> : null}

      {mode === 'quiz' ? (
        current ? (
          <View style={styles.card}>
            <Text style={styles.eyebrow}>SIGN RECOGNITION · {index + 1} OF {practiceFacts.length}</Text>
            <Text style={styles.quizQuestion}>{current.quiz.prompt}</Text>
            {current.imageAssetId ? <Illustration assetId={current.imageAssetId}
              context={answer === null ? 'question' : 'review'} /> : null}
            {current.quiz.answers.map((option, choice) => (
              <Pressable key={option} accessibilityRole="button"
                disabled={answer !== null} accessibilityState={{ disabled: answer !== null }}
                onPress={() => submitAnswer(choice)}
                style={[styles.option, answer === choice && styles.chosen,
                  answer !== null && choice === current.quiz.correctIndex && styles.rightOption]}>
                <Text style={styles.optionText}>{String.fromCharCode(65 + choice)}. {option}</Text>
              </Pressable>
            ))}
            {answer !== null ? (
              <>
                <Text style={answer === current.quiz.correctIndex ? styles.correct : styles.incorrect}>
                  {answer === current.quiz.correctIndex ? 'Correct' : 'Review this sign'}
                </Text>
                <Text style={styles.description}>{current.takeaway}</Text>
                <Text style={styles.reference}>{current.reference}</Text>
                {index + 1 < practiceFacts.length ? (
                  <Pressable accessibilityRole="button" style={styles.primary} onPress={() => {
                    setIndex((value) => value + 1);
                    setAnswer(null);
                    onPageChange();
                  }}>
                    <Text style={styles.primaryText}>Next question ›</Text>
                  </Pressable>
                ) : (
                  <Pressable accessibilityRole="button" style={styles.primary} onPress={() => selectMode('quiz')}>
                    <Text style={styles.primaryText}>Try again · {correct}/{practiceFacts.length} correct</Text>
                  </Pressable>
                )}
              </>
            ) : null}
          </View>
        ) : <Text>No questions available yet.</Text>
      ) : (
        <>
          <TextInput accessibilityLabel="Find a road sign" placeholder="Find a sign or its meaning…"
            placeholderTextColor="#77869A" value={query} onChangeText={setQuery}
            autoCorrect={false} style={styles.search} />
          <View style={styles.filters}>
            <Pressable accessibilityRole="button" onPress={() => setCategory(undefined)}
              style={[styles.filter, category === undefined && styles.filterActive]}>
              <Text style={[styles.filterText, category === undefined && styles.filterActiveText]}>All</Text>
            </Pressable>
            {roadSignCategories.map((key) => (
              <Pressable key={key} accessibilityRole="button" onPress={() => setCategory(key)}
                style={[styles.filter, category === key && styles.filterActive]}>
                <Text style={[styles.filterText, category === key && styles.filterActiveText]}>{key}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.counter}>{filtered.length} {mode === 'saved' ? 'saved' : 'study'} sign note{filtered.length === 1 ? '' : 's'}</Text>
          {filtered.length === 0 ? (
            <Text style={styles.empty}>{mode === 'saved' ? 'No saved signs match your filters. Save a sign in Categories & search.' : 'No signs found. Try another search.'}</Text>
          ) : filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Pressable accessibilityRole="button" accessibilityLabel={'Learn about ' + item.title}
                  accessibilityState={{ expanded: expandedId === item.id }}
                  onPress={() => setExpandedId((previous) => previous === item.id ? null : item.id)}
                  style={styles.cardTitleWrap}>
                  {item.imageAssetId ? <Image source={illustrationAssets[item.imageAssetId].source}
                    style={styles.thumbnail} resizeMode="contain" accessible={false} /> : null}
                  <Text style={styles.eyebrow}>{item.category.toUpperCase()}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.expandHint}>{expandedId === item.id ? 'Close details ‹' : 'Learn this sign ›'}</Text>
                </Pressable>
                <Pressable accessibilityRole="button"
                  accessibilityLabel={saved.includes(item.id) ? 'Unsave ' + item.title : 'Save ' + item.title}
                  onPress={() => { void toggleSaved(item.id); }}
                  style={styles.saveButton}>
                  <Text style={styles.link}>{saved.includes(item.id) ? '★ Saved' : '☆ Save'}</Text>
                </Pressable>
              </View>
              {expandedId === item.id ? <>
                {item.imageAssetId ? <Illustration assetId={item.imageAssetId} context="learn" /> : null}
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.takeaway}>{item.takeaway}</Text>
                <Text style={styles.reference}>{item.reference}</Text>
              </> : null}
            </View>
          ))}
        </>
      )}
      <Text style={styles.footer}>Independent GB revision notes. Sign illustrations: Department for Transport,
        Crown copyright 2023. Contains public sector information licensed under the Open Government Licence v3.0.
        https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
        Human editorial sign-off is pending.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { paddingVertical: 10, alignSelf: 'flex-start' },
  link: { color: '#2456C7', fontSize: 13, fontWeight: '800' },
  title: { color: '#14233B', fontSize: 25, fontWeight: '900', marginTop: 5 },
  subtitle: { color: '#66758B', fontSize: 13, lineHeight: 20, marginTop: 7, marginBottom: 16 },
  modeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  modeButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 12,
    borderRadius: 12, borderWidth: 1, borderColor: '#E4EAF2', minHeight: 44 },
  modeSelected: { backgroundColor: '#EDF3FF', borderColor: '#2456C7' },
  modeText: { color: '#66758B', fontWeight: '800', fontSize: 12 },
  modeTextSelected: { color: '#2456C7' },
  warning: { color: '#9A4D0B', marginBottom: 12, fontSize: 12 },
  search: { borderWidth: 1, borderColor: '#CBD6E6', backgroundColor: '#FFFFFF',
    borderRadius: 13, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16,
    color: '#14233B', minHeight: 52 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  filter: { borderWidth: 1, borderColor: '#E0E7F2', borderRadius: 20,
    backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 9, minHeight: 40 },
  filterActive: { borderColor: '#2456C7', backgroundColor: '#EDF3FF' },
  filterText: { color: '#66758B', fontWeight: '700', fontSize: 12 },
  filterActiveText: { color: '#2456C7' },
  counter: { fontSize: 12, color: '#66758B', fontWeight: '700', marginVertical: 14 },
  empty: { color: '#66758B', fontSize: 13, lineHeight: 20, marginBottom: 18 },
  card: { borderRadius: 16, borderWidth: 1, borderColor: '#E4EAF2',
    backgroundColor: '#FFFFFF', padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  cardTitleWrap: { flex: 1 },
  thumbnail: { width: 100, height: 90, marginBottom: 12 },
  expandHint: { color: '#2456C7', fontSize: 12, fontWeight: '700', paddingVertical: 10 },
  eyebrow: { fontWeight: '900', fontSize: 10, color: '#2456C7', letterSpacing: 0.5 },
  cardTitle: { fontWeight: '800', fontSize: 17, color: '#14233B', marginTop: 6 },
  saveButton: { paddingVertical: 8, paddingHorizontal: 6 },
  description: { color: '#40516A', fontSize: 14, lineHeight: 21, marginTop: 12 },
  takeaway: { color: '#14233B', fontSize: 13, fontWeight: '700', lineHeight: 20, marginTop: 10 },
  reference: { color: '#8492A7', fontSize: 11, marginTop: 10 },
  quizQuestion: { color: '#14233B', fontWeight: '800', fontSize: 20, lineHeight: 28,
    marginTop: 15, marginBottom: 14 },
  option: { minHeight: 50, borderWidth: 1, borderColor: '#E4EAF2',
    borderRadius: 12, padding: 13, marginBottom: 9 },
  chosen: { backgroundColor: '#FFF1E6', borderColor: '#DFB58D' },
  rightOption: { backgroundColor: '#ECF8F0', borderColor: '#83C4A0' },
  optionText: { fontSize: 14, color: '#14233B', lineHeight: 20 },
  correct: { color: '#16834A', fontWeight: '900', marginTop: 10 },
  incorrect: { color: '#C23B42', fontWeight: '900', marginTop: 10 },
  primary: { backgroundColor: '#2456C7', borderRadius: 12, alignItems: 'center',
    justifyContent: 'center', minHeight: 48, marginTop: 16 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  footer: { color: '#8492A7', fontSize: 11, lineHeight: 17, marginTop: 12 },
});
