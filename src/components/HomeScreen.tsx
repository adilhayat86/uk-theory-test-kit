import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { brandAssets } from '../data/brandAssets';
import type { PracticeSession } from '../domain/practiceSession';
import type { ProgressSummary } from '../domain/progress';

type Props = {
  session: PracticeSession | null; progress: ProgressSummary;
  onQuickPractice: () => void; onResume: () => void; onPractice: () => void;
  onSigns: () => void; onFlashcards: () => void; onTimed: () => void;
  onArtworkReview?: () => void;
};

export default function HomeScreen({ session, progress, onQuickPractice, onResume, onPractice,
  onSigns, onFlashcards, onTimed, onArtworkReview }: Props) {
  const unfinished = session !== null && session.currentIndex < session.questionIds.length;
  return <View>
    <View style={styles.countryBadge}><Image source={brandAssets['uk-flag']} accessibilityLabel="United Kingdom flag" style={{ width: 26, height: 16 }} /><Text style={styles.countryText}>UK CAR THEORY</Text></View>
    <Text accessibilityRole="header" style={styles.title}>Your road to test day</Text>
    <Text style={styles.subtitle}>Small sessions. Steady progress.</Text>
    <View style={styles.hero}>
      <Text style={styles.kicker}>{unfinished ? 'PICK UP WHERE YOU LEFT OFF' : 'MAKE TODAY COUNT'}</Text>
      <Text style={styles.heroTitle}>{unfinished ? 'Your session is saved' : 'Quick practice'}</Text>
      <Text style={styles.heroDetail}>{unfinished
        ? 'Question ' + (session.currentIndex + 1) + ' of ' + session.questionIds.length
        : '10 mixed questions · learn at your own pace'}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={unfinished ? 'Continue practice' : 'Start quick practice'}
        onPress={unfinished ? onResume : onQuickPractice} style={styles.primary}>
        <Text style={styles.primaryText}>{unfinished ? 'Continue practice' : 'Start 10 questions'} ›</Text>
      </Pressable>
    </View>
    <View style={styles.grid}>
      <Tool title="Practice" detail="Choose topics & questions" mark="practice" onPress={onPractice} />
      <Tool title="Road signs" detail="Learn signs & take a quiz" mark="signs" onPress={onSigns} />
      <Tool title="Flashcards" detail="Recall, then reveal" mark="flashcards" onPress={onFlashcards} />
      <Tool title="Timed practice" detail="5 questions · 6 minutes" mark="timed" onPress={onTimed} />
    </View>
    {session && !unfinished ? <Pressable accessibilityRole="button" accessibilityLabel="Review last practice result"
      onPress={onResume} style={styles.lastResult}>
      <Text style={styles.resultTitle}>Last practice result</Text>
      <Text style={styles.resultDetail}>{Object.keys(session.answers).length} answers saved · review ›</Text>
    </Pressable> : null}
    <View style={styles.stats}>
      <Text style={styles.stat}><Text style={styles.statValue}>{progress.questionsAnswered}</Text> questions tried</Text>
      <Text style={styles.stat}><Text style={styles.statValue}>{progress.accuracyPercent}%</Text> accuracy</Text>
    </View>
    <Text style={styles.scope}>Great Britain car revision · available offline</Text>
    {onArtworkReview ? <Pressable accessibilityRole="button" onPress={onArtworkReview} style={styles.review}>
      <Text style={styles.resultTitle}>Artwork review ›</Text>
    </Pressable> : null}
  </View>;
}

function Tool({ title, detail, mark, onPress }: { title: string; detail: string; mark: keyof typeof brandAssets; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={styles.tool}>
    <View style={styles.iconTile}><Image accessible={false} source={brandAssets[mark]} style={styles.toolIcon} /></View>
    <Text style={styles.toolTitle}>{title}</Text><Text style={styles.toolDetail}>{detail}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  countryBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 9 },
  countryText: { color: '#087E8B', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#132B3A', fontSize: 22, lineHeight: 28, fontWeight: '900', marginTop: 3 },
  subtitle: { color: '#66758B', fontSize: 13, marginTop: 5, marginBottom: 16 },
  hero: { backgroundColor: '#132B3A', padding: 18, borderRadius: 19, marginBottom: 14 },
  kicker: { color: '#B4F1D7', fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  heroTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginTop: 7 },
  heroDetail: { color: '#D6E9E6', fontSize: 12, lineHeight: 18, marginTop: 5 },
  primary: { backgroundColor: '#087E8B', minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginTop: 13 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tool: { width: '47%', flexGrow: 1, minHeight: 112, padding: 14, borderRadius: 15, borderWidth: 1, borderColor: '#DFE8E6', backgroundColor: '#FFFFFF' },
  iconTile: { width: 36, height: 36, borderRadius: 11, backgroundColor: '#E6F5F3', alignItems: 'center', justifyContent: 'center' },
  toolIcon: { width: 24, height: 24 },
  toolMark: { color: '#087E8B', fontSize: 21, lineHeight: 25 },
  toolTitle: { color: '#132B3A', fontSize: 15, fontWeight: '800', marginTop: 6 },
  toolDetail: { color: '#66758B', fontSize: 11, lineHeight: 16, marginTop: 4 },
  lastResult: { borderRadius: 13, backgroundColor: '#E6F5F3', padding: 13, marginTop: 14 },
  resultTitle: { color: '#087E8B', fontWeight: '800', fontSize: 13 },
  resultDetail: { color: '#437057', fontSize: 12, marginTop: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 17 },
  stat: { color: '#66758B', fontSize: 12, flexShrink: 1 },
  statValue: { color: '#132B3A', fontWeight: '900' },
  scope: { color: '#66758B', fontSize: 10, marginTop: 12, textAlign: 'center' },
  review: { padding: 14, alignItems: 'center', marginTop: 12 },
});
