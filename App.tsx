import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { questions } from './src/data/questions';
import MockExamScreen from './src/components/MockExamScreen';
import RoadSignsScreen from './src/components/RoadSignsScreen';
import { roadSigns } from './src/data/roadSigns';
import { getMistakeQuestions, getSmartRevision } from './src/domain/revision';
import type { QuestionLearningRecord } from './src/domain/revision';
import type { TheoryQuestion } from './src/data/questions';
import {
  getBookmarkedQuestionIds,
  getProgressSummary,
  getQuestionLearningRecords,
  recordAnswer,
  toggleBookmark,
} from './src/storage/database';
import type { ProgressSummary } from './src/domain/progress';

type Tab = 'home' | 'practice' | 'mock' | 'signs' | 'saved' | 'progress';

const EMPTY_PROGRESS: ProgressSummary = {
  questionsAnswered: 0,
  totalAttempts: 0,
  correctAttempts: 0,
  accuracyPercent: 0,
};

function AppContent() {
  const [tab, setTab] = useState<Tab>('home');
  const [practiceQuestions, setPracticeQuestions] = useState<TheoryQuestion[]>(questions);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [progress, setProgress] = useState<ProgressSummary>(EMPTY_PROGRESS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [learningRecords, setLearningRecords] = useState<QuestionLearningRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [storageMessage, setStorageMessage] = useState<string | null>(null);
  const answerLockedRef = useRef(false);
  const pendingBookmarksRef = useRef<Set<string>>(new Set());

  const currentQuestion = practiceQuestions[questionIndex];
  const savedQuestions = useMemo(
    () => questions.filter((question) => bookmarkedIds.includes(question.id)),
    [bookmarkedIds],
  );
  const mistakeQuestions = useMemo(() => getMistakeQuestions(questions, learningRecords), [learningRecords]);
  const smartQuestions = useMemo(() => getSmartRevision(questions, learningRecords, 10), [learningRecords]);

  const refreshLocalData = useCallback(async () => {
    const [nextProgress, nextBookmarks, nextRecords] = await Promise.all([
      getProgressSummary(),
      getBookmarkedQuestionIds(),
      getQuestionLearningRecords(),
    ]);
    setProgress(nextProgress);
    setBookmarkedIds(nextBookmarks);
    setLearningRecords(nextRecords);
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([getProgressSummary(), getBookmarkedQuestionIds(), getQuestionLearningRecords()])
      .then(([nextProgress, nextBookmarks, nextRecords]) => {
        if (!mounted) return;
        setProgress(nextProgress);
        setBookmarkedIds(nextBookmarks);
        setLearningRecords(nextRecords);
      })
      .catch(() => {
        if (mounted) setStorageMessage('Local storage could not be opened. Your current practice screen is still available.');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  function startPractice(items: TheoryQuestion[] = questions) {
    if (items.length === 0) {
      setStorageMessage('There are no saved questions yet. Save a question while practising.');
      setTab('saved');
      return;
    }
    answerLockedRef.current = false;
    setPracticeQuestions(items);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setSessionCorrect(0);
    setSessionAnswered(0);
    setStorageMessage(null);
    setTab('practice');
  }

  async function chooseAnswer(index: number) {
    if (!currentQuestion || selectedAnswer !== null || isSaving || answerLockedRef.current) return;
    // Lock synchronously, before React can render disabled answer buttons.
    answerLockedRef.current = true;
    setSelectedAnswer(index);
    setSessionAnswered((value) => value + 1);
    const correct = index === currentQuestion.correctIndex;
    if (correct) setSessionCorrect((value) => value + 1);

    setIsSaving(true);
    try {
      await recordAnswer(currentQuestion, index);
      await refreshLocalData();
      setStorageMessage(null);
    } catch {
      setStorageMessage('This answer could not be saved on the device. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleBookmark(questionId: string) {
    if (pendingBookmarksRef.current.has(questionId)) return;
    pendingBookmarksRef.current.add(questionId);
    try {
      const isSaved = await toggleBookmark(questionId);
      setBookmarkedIds((previous) => isSaved
        ? [...previous.filter((id) => id !== questionId), questionId]
        : previous.filter((id) => id !== questionId));
      setStorageMessage(null);
    } catch {
      setStorageMessage('The bookmark could not be saved on this device.');
    } finally {
      pendingBookmarksRef.current.delete(questionId);
    }
  }

  function goToNextQuestion() {
    if (isSaving) return;
    answerLockedRef.current = false;
    if (questionIndex + 1 >= practiceQuestions.length) {
      setQuestionIndex(practiceQuestions.length);
      setSelectedAnswer(null);
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelectedAnswer(null);
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text style={styles.loadingText}>Opening your offline study data…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>INDEPENDENT UK CAR THEORY PRACTICE</Text>
            <Text style={styles.headerTitle}>Theory Test Kit</Text>
          </View>
          <View style={styles.headerMark}><Text style={styles.headerMarkText}>UK</Text></View>
        </View>

        {storageMessage ? (
          <Pressable style={styles.notice} onPress={() => setStorageMessage(null)}>
            <Text style={styles.noticeText}>{storageMessage}</Text>
            <Text style={styles.noticeDismiss}>Dismiss</Text>
          </Pressable>
        ) : null}

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {tab === 'home' && (
            <>
              <View style={styles.hero}>
                <Text style={styles.heroKicker}>YOUR NEXT STEP</Text>
                <Text style={styles.heroTitle}>Learn the rules. Build confidence.</Text>
                <Text style={styles.heroBody}>Short practice sessions, clear explanations and progress saved on this device.</Text>
                <Pressable style={styles.primaryButton} onPress={() => startPractice()}>
                  <Text style={styles.primaryButtonText}>Start practice <Text style={styles.buttonArrow}>›</Text></Text>
                </Pressable>
              </View>

              <Pressable accessibilityRole="button" style={styles.mockBanner} onPress={() => setTab('mock')}>
                <Text style={styles.mockBannerTitle}>Timed mock exams  ›</Text>
                <Text style={styles.mockBannerBody}>5-question sample • resume offline • review results</Text>
              </Pressable>

              <Pressable accessibilityRole="button" style={styles.signBanner} onPress={() => setTab('signs')}>
                <Text style={styles.signBannerTitle}>Road sign library  ›</Text>
                <Text style={styles.signBannerBody}>{roadSigns.length} illustrated signs · 10-question identification quizzes</Text>
              </Pressable>

              <View style={styles.revisionRow}>
                <Pressable accessibilityRole="button" disabled={mistakeQuestions.length === 0}
                  style={[styles.revisionCard, mistakeQuestions.length === 0 && styles.disabledButton]}
                  onPress={() => startPractice(mistakeQuestions)}>
                  <Text style={styles.revisionTitle}>Fix mistakes</Text>
                  <Text style={styles.revisionCount}>{mistakeQuestions.length} to review</Text>
                  <Text style={styles.revisionSub}>Questions you last answered incorrectly</Text>
                </Pressable>
                <Pressable accessibilityRole="button" style={styles.revisionCard} onPress={() => startPractice(smartQuestions)}>
                  <Text style={styles.revisionTitle}>Smart revision</Text>
                  <Text style={styles.revisionCount}>10 questions</Text>
                  <Text style={styles.revisionSub}>Mistakes first, then weaker and new topics</Text>
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>Your progress</Text>
              <View style={styles.statsRow}>
                <StatCard value={String(progress.questionsAnswered)} label="Questions tried" />
                <StatCard value={`${progress.accuracyPercent}%`} label="Accuracy" />
                <StatCard value={String(bookmarkedIds.length)} label="Saved" />
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Study by topic</Text>
                <Text style={styles.sectionHint}>{questions.length} sample questions</Text>
              </View>
              <View style={styles.topicGrid}>
                {Array.from(new Set(questions.map((question) => question.topic))).map((topic, index) => {
                  const topicQuestions = questions.filter((question) => question.topic === topic);
                  return (
                    <Pressable key={topic} style={styles.topicCard} onPress={() => startPractice(topicQuestions)}>
                      <Text style={styles.topicNumber}>{String(index + 1).padStart(2, '0')}</Text>
                      <Text style={styles.topicName}>{topic}</Text>
                      <Text style={styles.topicCount}>{topicQuestions.length} question{topicQuestions.length === 1 ? '' : 's'}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable style={styles.savedBanner} onPress={() => setTab('saved')}>
                <View>
                  <Text style={styles.savedTitle}>Saved for later</Text>
                  <Text style={styles.savedSubtitle}>Review questions you have bookmarked</Text>
                </View>
                <Text style={styles.savedCount}>{bookmarkedIds.length}  ›</Text>
              </Pressable>
            </>
          )}

          {tab === 'practice' && (
            <>
              {!currentQuestion ? (
                <View style={styles.completionCard}>
                  <Text style={styles.completionEmoji}>✓</Text>
                  <Text style={styles.completionTitle}>Practice complete</Text>
                  <Text style={styles.completionBody}>You answered {sessionAnswered} question{sessionAnswered === 1 ? '' : 's'} and got {sessionCorrect} correct.</Text>
                  <Text style={styles.completionScore}>{sessionAnswered === 0 ? 0 : Math.round(sessionCorrect / sessionAnswered * 100)}% correct</Text>
                  <Pressable style={styles.primaryButton} onPress={() => setTab('home')}>
                    <Text style={styles.primaryButtonText}>Back to home</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View style={styles.practiceTop}>
                    <Pressable onPress={() => setTab('home')} style={styles.backButton}><Text style={styles.backText}>‹  Home</Text></Pressable>
                    <Text style={styles.practiceCounter}>QUESTION {questionIndex + 1} OF {practiceQuestions.length}</Text>
                  </View>
                  <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((questionIndex + (selectedAnswer === null ? 0 : 1)) / practiceQuestions.length) * 100}%` }]} /></View>
                  <View style={styles.questionCard}>
                    <View style={styles.questionMeta}>
                      <Text style={styles.topicPill}>{currentQuestion.topic.toUpperCase()}</Text>
                      <Pressable onPress={() => handleBookmark(currentQuestion.id)} style={styles.bookmarkButton}>
                        <Text style={styles.bookmarkText}>{bookmarkedIds.includes(currentQuestion.id) ? '★ Saved' : '☆ Save'}</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
                    {currentQuestion.options.map((option, index) => {
                      const isChosen = selectedAnswer === index;
                      const isCorrectOption = selectedAnswer !== null && index === currentQuestion.correctIndex;
                      return (
                        <Pressable
                          key={`${currentQuestion.id}-${index}`}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isChosen, disabled: selectedAnswer !== null }}
                          disabled={selectedAnswer !== null}
                          onPress={() => chooseAnswer(index)}
                          style={[
                            styles.answerOption,
                            isChosen && (isCorrectOption ? styles.answerCorrect : styles.answerIncorrect),
                            isCorrectOption && selectedAnswer !== null && styles.answerCorrect,
                          ]}
                        >
                          <View style={styles.optionLetter}><Text style={styles.optionLetterText}>{String.fromCharCode(65 + index)}</Text></View>
                          <Text style={styles.answerText}>{option}</Text>
                          {isCorrectOption ? <Text style={styles.answerMark}>✓</Text> : null}
                        </Pressable>
                      );
                    })}
                    {selectedAnswer !== null ? (
                      <View style={styles.explanationBox}>
                        <Text style={[styles.explanationHeading, selectedAnswer === currentQuestion.correctIndex ? styles.correctLabel : styles.incorrectLabel]}>
                          {selectedAnswer === currentQuestion.correctIndex ? 'Correct answer' : 'Review this one'}
                        </Text>
                        <Text style={styles.explanationBody}>{currentQuestion.explanation}</Text>
                        <Text style={styles.referenceText}>{currentQuestion.reference}</Text>
                        <Pressable
                          accessibilityRole="button"
                          disabled={isSaving}
                          style={[styles.primaryButton, isSaving && styles.disabledButton]}
                          onPress={goToNextQuestion}
                        >
                          <Text style={styles.primaryButtonText}>{isSaving ? 'Saving answer…' : questionIndex + 1 === practiceQuestions.length ? 'Finish practice' : 'Next question  ›'}</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <Text style={styles.selectHint}>Choose one answer to see the explanation.</Text>
                    )}
                  </View>
                </>
              )}
            </>
          )}

          {tab === 'mock' && <MockExamScreen onBack={() => setTab('home')} onFinished={refreshLocalData} />}

          {tab === 'signs' && <RoadSignsScreen onBack={() => setTab('home')} />}

          {tab === 'saved' && (
            <>
              <Text style={styles.pageTitle}>Saved questions</Text>
              <Text style={styles.pageSubtitle}>Your bookmarks are stored locally on this device.</Text>
              {savedQuestions.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyTitle}>Nothing saved yet</Text>
                  <Text style={styles.emptyBody}>Tap ☆ Save during practice to keep a question here for revision.</Text>
                  <Pressable style={styles.primaryButton} onPress={() => startPractice()}>
                    <Text style={styles.primaryButtonText}>Find questions to save</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <Pressable style={styles.primaryButton} onPress={() => startPractice(savedQuestions)}>
                    <Text style={styles.primaryButtonText}>Practise saved questions</Text>
                  </Pressable>
                  {savedQuestions.map((question) => (
                    <View key={question.id} style={styles.savedQuestionCard}>
                      <Text style={styles.savedQuestionTopic}>{question.topic.toUpperCase()}</Text>
                      <Text style={styles.savedQuestionPrompt}>{question.prompt}</Text>
                      <Pressable onPress={() => handleBookmark(question.id)}>
                        <Text style={styles.removeSaved}>Remove from saved</Text>
                      </Pressable>
                    </View>
                  ))}
                </>
              )}
            </>
          )}

          {tab === 'progress' && (
            <>
              <Text style={styles.pageTitle}>Your progress</Text>
              <Text style={styles.pageSubtitle}>Your answers stay on this device. No account or internet connection is needed.</Text>
              <View style={styles.progressHero}>
                <Text style={styles.progressHeroValue}>{progress.accuracyPercent}%</Text>
                <Text style={styles.progressHeroLabel}>Overall answer accuracy</Text>
              </View>
              <View style={styles.statsRow}>
                <StatCard value={String(progress.questionsAnswered)} label="Unique questions" />
                <StatCard value={String(progress.totalAttempts)} label="Total attempts" />
                <StatCard value={String(progress.correctAttempts)} label="Correct answers" />
              </View>
              <Text style={styles.sectionTitle}>Current content</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>{questions.length} original sample questions</Text>
                <Text style={styles.infoBody}>This is an early content sample, not yet the complete question bank or a full timed mock exam.</Text>
              </View>
              <Pressable style={styles.primaryButton} onPress={() => startPractice()}>
                <Text style={styles.primaryButtonText}>Continue practising</Text>
              </Pressable>
            </>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem label="Home" icon="⌂" active={tab === 'home'} onPress={() => setTab('home')} />
          <NavItem label="Practice" icon="✓" active={tab === 'practice'} onPress={() => { if (tab !== 'practice') startPractice(); }} />
          <NavItem label="Mock" icon="◷" active={tab === 'mock'} onPress={() => setTab('mock')} />
          <NavItem label="Signs" icon="△" active={tab === 'signs'} onPress={() => setTab('signs')} />
          <NavItem label="Progress" icon="▥" active={tab === 'progress'} onPress={() => setTab('progress')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function NavItem({ label, icon, active, onPress }: { label: string; icon: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress} style={styles.navItem}>
      <Text style={[styles.navIcon, active && styles.navActive]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.navActive]}>{label}</Text>
    </Pressable>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const colors = {
  ink: '#14233B',
  muted: '#66758B',
  blue: '#2456C7',
  paleBlue: '#EDF3FF',
  border: '#E4EAF2',
  green: '#16834A',
  red: '#C23B42',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FB' },
  appShell: { flex: 1, backgroundColor: '#F5F7FB' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7FB' },
  loadingText: { color: colors.muted, marginTop: 12, fontSize: 13 },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  headerEyebrow: { color: colors.blue, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { color: colors.ink, fontSize: 23, fontWeight: '800', marginTop: 4 },
  headerMark: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.paleBlue, alignItems: 'center', justifyContent: 'center' },
  headerMarkText: { color: colors.blue, fontSize: 14, fontWeight: '900' },
  notice: { marginHorizontal: 16, marginTop: 10, padding: 12, backgroundColor: '#FFF7E6', borderRadius: 12, borderWidth: 1, borderColor: '#F3D89E' },
  noticeText: { color: '#795A1A', fontSize: 12, lineHeight: 17 },
  noticeDismiss: { color: '#795A1A', fontWeight: '800', fontSize: 11, marginTop: 5 },
  scrollContent: { padding: 18, paddingBottom: 26 },
  hero: { backgroundColor: '#142B55', borderRadius: 22, padding: 22, marginBottom: 23 },
  heroKicker: { color: '#B9CCF4', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: '#FFFFFF', fontSize: 26, lineHeight: 32, fontWeight: '800', marginTop: 10, maxWidth: 300 },
  heroBody: { color: '#D5DFF2', fontSize: 13, lineHeight: 19, marginTop: 10, marginBottom: 18 },
  primaryButton: { backgroundColor: colors.blue, borderRadius: 13, minHeight: 48, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, marginTop: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  disabledButton: { opacity: 0.55 },
  buttonArrow: { fontSize: 18 },
  sectionTitle: { color: colors.ink, fontWeight: '800', fontSize: 17, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 },
  sectionHint: { color: colors.muted, fontSize: 11, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 9 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 10, borderWidth: 1, borderColor: colors.border },
  statValue: { color: colors.ink, fontSize: 23, fontWeight: '900' },
  statLabel: { color: colors.muted, fontSize: 10, marginTop: 3, lineHeight: 14 },
  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: { width: '48%', flexGrow: 1, backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1, borderColor: colors.border, padding: 14, minHeight: 112 },
  topicNumber: { color: '#8EA4C8', fontWeight: '900', fontSize: 11 },
  topicName: { color: colors.ink, fontWeight: '800', fontSize: 14, marginTop: 10 },
  topicCount: { color: colors.muted, fontSize: 11, marginTop: 4 },
  savedBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#EAF1FF', borderRadius: 15, padding: 16, marginTop: 20 },
  savedTitle: { color: colors.ink, fontWeight: '800', fontSize: 14 },
  savedSubtitle: { color: colors.muted, fontSize: 11, marginTop: 3 },
  savedCount: { color: colors.blue, fontWeight: '900', fontSize: 14 },
  practiceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backButton: { paddingVertical: 6, paddingRight: 12 },
  backText: { color: colors.blue, fontSize: 13, fontWeight: '800' },
  practiceCounter: { color: colors.muted, fontSize: 10, letterSpacing: 0.8, fontWeight: '900' },
  progressTrack: { height: 6, backgroundColor: '#E0E7F2', borderRadius: 5, overflow: 'hidden', marginBottom: 16 },
  progressFill: { height: 6, backgroundColor: colors.blue, borderRadius: 5 },
  questionCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  questionMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  topicPill: { color: colors.blue, fontSize: 10, letterSpacing: 0.8, fontWeight: '900' },
  bookmarkButton: { backgroundColor: '#F1F5FA', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  bookmarkText: { color: colors.blue, fontSize: 11, fontWeight: '800' },
  questionPrompt: { color: colors.ink, fontWeight: '800', fontSize: 21, lineHeight: 29, marginBottom: 18 },
  answerOption: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 13, padding: 12, marginBottom: 10, minHeight: 54 },
  optionLetter: { height: 28, width: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F3F8', marginRight: 10 },
  optionLetterText: { color: colors.ink, fontWeight: '900', fontSize: 12 },
  answerText: { color: '#34445C', fontSize: 13, lineHeight: 19, flex: 1 },
  answerCorrect: { borderColor: '#8DCEA9', backgroundColor: '#F0FAF4' },
  answerIncorrect: { borderColor: '#E8A4A7', backgroundColor: '#FFF3F3' },
  answerMark: { color: colors.green, fontWeight: '900', fontSize: 17, marginLeft: 8 },
  explanationBox: { backgroundColor: '#F4F7FC', borderRadius: 14, padding: 14, marginTop: 7 },
  explanationHeading: { fontSize: 13, fontWeight: '900', marginBottom: 6 },
  correctLabel: { color: colors.green },
  incorrectLabel: { color: colors.red },
  explanationBody: { color: '#40516A', fontSize: 13, lineHeight: 20 },
  referenceText: { color: '#8492A7', fontSize: 10, marginTop: 8, fontWeight: '700' },
  selectHint: { color: '#8290A4', fontSize: 11, textAlign: 'center', marginTop: 8 },
  pageTitle: { color: colors.ink, fontSize: 25, fontWeight: '900', marginTop: 5 },
  pageSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 20 },
  emptyCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 20, marginTop: 6 },
  emptyTitle: { color: colors.ink, fontSize: 17, fontWeight: '800' },
  emptyBody: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 8 },
  savedQuestionCard: { backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1, borderColor: colors.border, padding: 15, marginTop: 12 },
  savedQuestionTopic: { color: colors.blue, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  savedQuestionPrompt: { color: colors.ink, fontSize: 14, lineHeight: 20, fontWeight: '700', marginTop: 8 },
  removeSaved: { color: colors.red, fontSize: 11, fontWeight: '800', marginTop: 12 },
  progressHero: { backgroundColor: '#142B55', borderRadius: 20, padding: 22, alignItems: 'center', marginBottom: 14 },
  progressHeroValue: { color: '#FFFFFF', fontSize: 42, fontWeight: '900' },
  progressHeroLabel: { color: '#D5DFF2', fontSize: 12, marginTop: 3 },
  infoCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 15, backgroundColor: '#FFFFFF', marginBottom: 8 },
  infoTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  infoBody: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  completionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 22, alignItems: 'center', marginTop: 20 },
  completionEmoji: { color: colors.green, fontSize: 44, fontWeight: '900' },
  completionTitle: { color: colors.ink, fontSize: 22, fontWeight: '900', marginTop: 10 },
  completionBody: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  completionScore: { color: colors.blue, fontSize: 28, fontWeight: '900', marginTop: 14 },
  mockBanner: { backgroundColor: '#E5EDFD', borderRadius: 15, padding: 16, marginBottom: 22 },
  mockBannerTitle: { color: '#183D8A', fontSize: 16, fontWeight: '900' },
  mockBannerBody: { color: '#526B9A', fontSize: 12, marginTop: 5 },
  signBanner: { backgroundColor: '#E8F4F0', borderRadius: 15, padding: 16, marginBottom: 13 },
  signBannerTitle: { color: '#176247', fontSize: 16, fontWeight: '900' },
  signBannerBody: { color: '#467A68', fontSize: 12, marginTop: 5 },
  revisionRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  revisionCard: { flex: 1, padding: 14, backgroundColor: '#FFFFFF', borderRadius: 13, borderColor: colors.border, borderWidth: 1 },
  revisionTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' },
  revisionCount: { color: colors.blue, fontSize: 18, fontWeight: '900', marginTop: 8 },
  revisionSub: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, paddingBottom: 4 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 5 },
  navIcon: { fontSize: 20, color: '#91A0B4' },
  navLabel: { color: '#91A0B4', fontSize: 9, fontWeight: '700', marginTop: 2 },
  navActive: { color: colors.blue },
});
