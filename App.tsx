import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { questions } from './src/data/questions';
import HomeScreen from './src/components/HomeScreen';
import BottomNavigation from './src/components/BottomNavigation';
import { activeRoot, initialNavigation, navigationReducer, previousScreen, screenTitles } from './src/domain/navigation';
import type { Screen, RootScreen } from './src/domain/navigation';
import MockExamScreen from './src/components/MockExamScreen';
import QuestionIllustration from './src/components/QuestionIllustration';
import FlashcardsScreen from './src/components/FlashcardsScreen';
import QuestionSearchScreen from './src/components/QuestionSearchScreen';
import PracticeSetupScreen from './src/components/PracticeSetupScreen';
import ImageReviewScreen from './src/components/ImageReviewScreen';
import RoadSignsScreen from './src/components/RoadSignsScreen';
import PracticeResultsScreen from './src/components/PracticeResultsScreen';
import { chooseQuestions } from './src/domain/mockExam';
import { beginPractice, practiceIsCompatible } from './src/domain/practiceSession';
import type { PracticeSession } from './src/domain/practiceSession';
import type { TheoryQuestion } from './src/data/questions';
import {
  getBookmarkedQuestionIds,
  getProgressSummary,
  getQuestionProgressRecords,
  getSavedPracticeSession,
  replaceSavedPractice,
  recordSavedPracticeAnswer,
  advanceSavedPractice,
  toggleBookmark,
} from './src/storage/database';
import type { ProgressSummary } from './src/domain/progress';
import { getQuestionsToRetry, getTopicReview, selectSmartPractice } from './src/domain/revision';
import type { QuestionProgressDetail } from './src/domain/revision';

const EMPTY_PROGRESS: ProgressSummary = {
  questionsAnswered: 0,
  totalAttempts: 0,
  correctAttempts: 0,
  accuracyPercent: 0,
};

function AppContent() {
  const [navigation, dispatchNavigation] = useReducer(navigationReducer, initialNavigation);
  const tab = navigation.stack[navigation.stack.length - 1];
  const returnScreen = previousScreen(navigation);
  const backLabel = returnScreen ? screenTitles[returnScreen] : 'Home';
  const navigate = useCallback((screen: Screen) => {
    Keyboard.dismiss();
    dispatchNavigation({ type: 'open', screen });
  }, []);
  const goBack = useCallback(() => {
    Keyboard.dismiss();
    dispatchNavigation({ type: 'back' });
  }, []);
  const selectTab = useCallback((screen: RootScreen) => {
    Keyboard.dismiss();
    dispatchNavigation({ type: 'tab', screen });
  }, []);
  const [setupTopic, setSetupTopic] = useState<string | undefined>();

  function openPracticeSetup(topic?: string) {
    setSetupTopic(topic);
    navigate('setup');
  }
  const [practiceSession, setPracticeSession] = useState<PracticeSession | null>(null);
  const practiceRef = useRef<PracticeSession | null>(null);
  const practiceSavingRef = useRef(false);
  const [progress, setProgress] = useState<ProgressSummary>(EMPTY_PROGRESS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [progressRecords, setProgressRecords] = useState<QuestionProgressDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [storageMessage, setStorageMessage] = useState<string | null>(null);
  const answerLockedRef = useRef(false);
  const pendingBookmarksRef = useRef<Set<string>>(new Set());
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const scrollToTop = useCallback(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), []);

  const practiceQuestions = useMemo(() => {
    if (!practiceSession) return questions;
    const indexed = new Map(questions.map((question) => [question.id, question]));
    return practiceSession.questionIds.flatMap((id) => {
      const match = indexed.get(id);
      return match ? [match] : [];
    });
  }, [practiceSession?.id]);
  const questionIndex = practiceSession?.currentIndex ?? 0;
  const currentQuestion = practiceQuestions[questionIndex];
  const selectedAnswer = practiceSession && currentQuestion
    ? (practiceSession.answers[currentQuestion.id] ?? null) : null;
  const sessionAnswers = practiceSession?.answers ?? {};
  const savedQuestions = useMemo(
    () => questions.filter((question) => bookmarkedIds.includes(question.id)),
    [bookmarkedIds],
  );

  const retryQuestions = useMemo(() => getQuestionsToRetry(questions, progressRecords), [progressRecords]);
  const smartQuestions = useMemo(() => selectSmartPractice(questions, progressRecords, 10), [progressRecords]);
  const topicStats = useMemo(() => getTopicReview(questions, progressRecords), [progressRecords]);

  const refreshLocalData = useCallback(async () => {
    const [nextProgress, nextBookmarks, nextRecords] = await Promise.all([
      getProgressSummary(),
      getBookmarkedQuestionIds(),
      getQuestionProgressRecords(),
    ]);
    setProgress(nextProgress);
    setBookmarkedIds(nextBookmarks);
    setProgressRecords(nextRecords);
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getProgressSummary(),
      getBookmarkedQuestionIds(),
      getQuestionProgressRecords(),
      getSavedPracticeSession(),
    ]).then(([nextProgress, nextBookmarks, nextRecords, savedPractice]) => {
        if (!mounted) return;
        setProgress(nextProgress);
        setBookmarkedIds(nextBookmarks);
        setProgressRecords(nextRecords);
        if (savedPractice && practiceIsCompatible(savedPractice, questions)) {
          practiceRef.current = savedPractice;
          setPracticeSession(savedPractice);
        } else if (savedPractice) {
          setStorageMessage('Saved practice uses outdated questions. Start a new session to continue.');
        }
      })
      .catch(() => {
        if (mounted) setStorageMessage('Local storage could not be opened. Your current practice screen is still available.');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  function startPractice(items: TheoryQuestion[] = questions, questionLimit?: number) {
    if (practiceSavingRef.current) return;
    if (items.length === 0) {
      setStorageMessage('There are no questions in this selection yet.');
      navigate('saved');
      return;
    }

    async function createSession() {
      if (practiceSavingRef.current) return;
      practiceSavingRef.current = true;
      setIsSaving(true);
      try {
        const selected = questionLimit === undefined ? items
          : chooseQuestions(items, Math.min(questionLimit, items.length));
        const started = beginPractice(
          selected,
          Date.now(),
          'practice-' + Date.now() + '-' + Math.floor(Math.random() * 1_000_000_000),
        );
        await replaceSavedPractice(started);
        practiceRef.current = started;
        setPracticeSession(started);
        answerLockedRef.current = false;
        setStorageMessage(null);
        navigate('practice');
      } catch {
        setStorageMessage('Could not create an offline practice session. Please try again.');
      } finally {
        practiceSavingRef.current = false;
        setIsSaving(false);
      }
    }

    const unfinished = practiceRef.current;
    if (unfinished && unfinished.currentIndex < unfinished.questionIds.length &&
        (unfinished.currentIndex > 0 || Object.keys(unfinished.answers).length > 0)) {
      Alert.alert(
        'Replace unfinished practice?',
        'Your current answers are saved. Start a new session or continue where you left off.',
        [
          { text: 'Continue existing', onPress: () => navigate('practice') },
          { text: 'Start new', style: 'destructive', onPress: () => { void createSession(); } },
        ],
      );
      return;
    }
    void createSession();
  }

  async function chooseAnswer(index: number) {
    const active = practiceRef.current;
    if (!active || !currentQuestion || selectedAnswer !== null ||
        practiceSavingRef.current || answerLockedRef.current) return;
    answerLockedRef.current = true;
    practiceSavingRef.current = true;
    setIsSaving(true);
    try {
      const persisted = await recordSavedPracticeAnswer(active, currentQuestion, index);
      practiceRef.current = persisted;
      setPracticeSession(persisted);
      setStorageMessage(null);
      try {
        await refreshLocalData();
      } catch {
        setStorageMessage('Your answer was saved, but progress could not be refreshed.');
      }
    } catch {
      // Neither the answer nor the accuracy counter changes if the SQLite
      // transaction fails. Allow the learner to tap again rather than lose it.
      answerLockedRef.current = false;
      setStorageMessage('Answer not saved. Tap your answer again to retry.');
    } finally {
      practiceSavingRef.current = false;
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

  async function goToNextQuestion() {
    const current = practiceRef.current;
    if (!current || practiceSavingRef.current) return;
    practiceSavingRef.current = true;
    setIsSaving(true);
    try {
      const persisted = await advanceSavedPractice(current);
      practiceRef.current = persisted;
      setPracticeSession(persisted);
      answerLockedRef.current = false;
      setStorageMessage(null);
    } catch {
      setStorageMessage('Could not save the next position. Try again.');
    } finally {
      practiceSavingRef.current = false;
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (returnScreen === null) return false;
      goBack();
      return true;
    });
    return () => subscription.remove();
  }, [returnScreen, goBack]);

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
          <View style={styles.headerCopy}>
            <Text style={styles.headerEyebrow}>GB CAR THEORY · OFFLINE</Text>
            <Text style={styles.headerTitle}>Theory Test Kit</Text>
          </View>
          {tab !== 'search' ? <Pressable accessibilityRole="button" accessibilityLabel="Search questions"
            onPress={() => navigate('search')} style={styles.headerSearch}><Text style={styles.backText}>Search</Text></Pressable> : null}
        </View>

        {navigation.stack.length > 1 ? <View style={styles.backBar}>
          <Pressable accessibilityRole="button" accessibilityLabel={'Back to ' + backLabel} onPress={goBack} style={styles.globalBack}>
            <Text style={styles.backText}>‹ {backLabel}</Text>
          </Pressable>
          <Text style={styles.breadcrumb}>{screenTitles[tab]}</Text>
        </View> : null}

        {storageMessage ? (
          <Pressable style={styles.notice} onPress={() => setStorageMessage(null)}>
            <Text style={styles.noticeText}>{storageMessage}</Text>
            <Text style={styles.noticeDismiss}>Dismiss</Text>
          </Pressable>
        ) : null}

        {navigation.stack.map((screen, screenIndex) => {
          const tab = screen;
          const visible = screenIndex === navigation.stack.length - 1;
          return <ScrollView ref={visible ? scrollRef : null}
            key={tab === 'practice' ? tab + '-' + practiceSession?.id + '-' + questionIndex : tab}
            style={[styles.screen, !visible && styles.hiddenScreen]}
            accessibilityElementsHidden={!visible} importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
            contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {tab === 'home' && <HomeScreen session={practiceSession} progress={progress}
            onQuickPractice={() => startPractice(questions, 10)} onResume={() => navigate('practice')}
            onPractice={() => { setSetupTopic(undefined); selectTab('setup'); }} onSigns={() => selectTab('roadSigns')}
            onFlashcards={() => navigate('flashcards')} onTimed={() => navigate('mock')}
            onArtworkReview={(__DEV__ || process.env.EXPO_PUBLIC_IMAGE_REVIEW === 'true') ? () => navigate('imageReview') : undefined} />}

          {tab === 'practice' && (
            <>
              {!currentQuestion ? (
                <PracticeResultsScreen
                  questions={practiceQuestions}
                  answers={sessionAnswers}
                  savedIds={bookmarkedIds}
                  backLabel={backLabel} onFinish={goBack}
                  onRetry={startPractice}
                  onRestart={() => startPractice(practiceQuestions)}
                />
              ) : (
                <>
                  <View style={styles.practiceTop}>
                    <Text style={styles.practiceCounter}>QUESTION {questionIndex + 1} OF {practiceQuestions.length}</Text>
                  </View>
                  <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((questionIndex + (selectedAnswer === null ? 0 : 1)) / practiceQuestions.length) * 100}%` }]} /></View>
                  <View style={styles.questionCard}>
                    <View style={styles.questionMeta}>
                      <Text style={styles.topicPill}>{currentQuestion.topic.toUpperCase()}</Text>
                      <Pressable accessibilityRole="button" accessibilityLabel={bookmarkedIds.includes(currentQuestion.id) ? 'Remove saved question' : 'Save question'}
                        onPress={() => { void handleBookmark(currentQuestion.id); }} style={styles.bookmarkButton}>
                        <Text style={styles.bookmarkText}>{bookmarkedIds.includes(currentQuestion.id) ? '★ Saved' : '☆ Save'}</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
                     <QuestionIllustration question={currentQuestion} context={selectedAnswer === null ? 'question' : 'review'} />
                    {currentQuestion.options.map((option, index) => {
                      const isChosen = selectedAnswer === index;
                      const isCorrectOption = selectedAnswer !== null && index === currentQuestion.correctIndex;
                      return (
                        <Pressable
                          key={`${currentQuestion.id}-${index}`}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isChosen, disabled: selectedAnswer !== null }}
                          disabled={selectedAnswer !== null || isSaving}
                          onPress={() => { void chooseAnswer(index); }}
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
                          onPress={() => { void goToNextQuestion(); }}
                        >
                          <Text style={styles.primaryButtonText}>{isSaving ? 'Saving answer…' : questionIndex + 1 === practiceQuestions.length ? 'Finish practice' : 'Next question  ›'}</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <Text style={styles.selectHint}>{isSaving ? 'Saving your answer on this device…' : 'Choose one answer to see the explanation.'}</Text>
                    )}
                  </View>
                </>
              )}
            </>
          )}

          {tab === 'setup' && <>
            <PracticeSetupScreen key={setupTopic ?? 'all'} initialTopic={setupTopic}
              records={progressRecords} savedIds={bookmarkedIds} onStart={startPractice} />
            <View style={styles.toolLinks}>
              <Pressable accessibilityRole="button" onPress={() => navigate('flashcards')} style={styles.toolLink}><Text style={styles.backText}>Flashcards ›</Text></Pressable>
              <Pressable accessibilityRole="button" onPress={() => navigate('mock')} style={styles.toolLink}><Text style={styles.backText}>Timed practice ›</Text></Pressable>
            </View>
          </>}
          {tab === 'mock' && <MockExamScreen />}
          {tab === 'search' && <QuestionSearchScreen onPractise={startPractice} />}
          {tab === 'imageReview' && <ImageReviewScreen />}
          {tab === 'roadSigns' && <RoadSignsScreen onPageChange={scrollToTop} />}
          {tab === 'flashcards' && <FlashcardsScreen onPageChange={scrollToTop} onPractise={startPractice} />}

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
              <Text style={styles.sectionTitle}>Your personal study plan</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>{retryQuestions.length} question{retryQuestions.length === 1 ? '' : 's'} to retry</Text>
                <Text style={styles.infoBody}>Smart revision starts with your most recent wrong answers and then questions you have not tried. This is guidance, not a pass prediction.</Text>
                <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => startPractice(smartQuestions)}>
                  <Text style={styles.primaryButtonText}>Start smart revision</Text>
                </Pressable>
                {retryQuestions.length > 0 ? (
                  <Pressable accessibilityRole="button" style={styles.secondaryAction} onPress={() => startPractice(retryQuestions)}>
                    <Text style={styles.secondaryActionText}>Retry only mistakes ({retryQuestions.length})</Text>
                  </Pressable>
                ) : null}
              </View>
              <Text style={styles.sectionTitle}>Study by topic</Text>
              {topicStats.map((item) => (
                <Pressable accessibilityRole="button" key={item.topic}
                  style={styles.topicReviewCard}
                  onPress={() => openPracticeSetup(item.topic)}>
                  <View style={styles.topicReviewHeading}>
                    <Text style={styles.topicReviewTitle}>{item.topic}</Text>
                    <Text style={styles.topicReviewAccuracy}>{item.accuracyPercent === null ? 'Not tried' : item.accuracyPercent + '% accurate'}</Text>
                  </View>
                  <Text style={styles.infoBody}>{item.questionsTried}/{item.totalQuestions} questions tried · {item.recentMistakes} need retry</Text>
                </Pressable>
              ))}
              <Text style={styles.sectionTitle}>Current content</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>{questions.length} original draft questions</Text>
                <Text style={styles.infoBody}>All {questions.length} are available for revision. Independent editorial approval is still pending, and the full official-style mock is not included.</Text>
              </View>
              <Pressable style={styles.primaryButton} onPress={() => startPractice()}>
                <Text style={styles.primaryButtonText}>Continue practising</Text>
              </Pressable>
            </>
          )}
        </ScrollView>;
        })}

        <BottomNavigation active={activeRoot(navigation)} onSelect={selectTab} />
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

export default function App() {
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
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  headerCopy: { flex: 1, minWidth: 0, marginRight: 12 },
  headerEyebrow: { color: colors.blue, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginTop: 3 },
  notice: { marginHorizontal: 16, marginTop: 10, padding: 12, backgroundColor: '#FFF7E6', borderRadius: 12, borderWidth: 1, borderColor: '#F3D89E' },
  noticeText: { color: '#795A1A', fontSize: 12, lineHeight: 17 },
  noticeDismiss: { color: '#795A1A', fontWeight: '800', fontSize: 11, marginTop: 5 },
  headerSearch: { minHeight: 44, minWidth: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDF3FF', borderRadius: 13 },
  backBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E4EAF2', gap: 12 },
  globalBack: { minHeight: 44, justifyContent: 'center', paddingRight: 15 },
  breadcrumb: { color: colors.muted, fontSize: 11, flexShrink: 1 },
  screen: { flex: 1 },
  hiddenScreen: { display: 'none' },
  toolLinks: { flexDirection: 'row', gap: 10, marginTop: 12 },
  toolLink: { flex: 1, minHeight: 48, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4EAF2', padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { padding: 16, paddingBottom: 24 },
  primaryButton: { backgroundColor: colors.blue, borderRadius: 13, minHeight: 48, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, marginTop: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  disabledButton: { opacity: 0.55 },
  sectionTitle: { color: colors.ink, fontWeight: '800', fontSize: 17, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 9 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 10, borderWidth: 1, borderColor: colors.border },
  statValue: { color: colors.ink, fontSize: 23, fontWeight: '900' },
  statLabel: { color: colors.muted, fontSize: 10, marginTop: 3, lineHeight: 14 },
  practiceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
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
  secondaryAction: { padding: 12, alignItems: 'center' },
  secondaryActionText: { color: colors.blue, fontSize: 13, fontWeight: '800' },
  topicReviewCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 15, backgroundColor: '#FFFFFF', marginBottom: 10 },
  topicReviewHeading: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  topicReviewTitle: { color: colors.ink, fontWeight: '800', fontSize: 14, flexShrink: 1 },
  topicReviewAccuracy: { color: colors.blue, fontWeight: '800', fontSize: 11 }
});
