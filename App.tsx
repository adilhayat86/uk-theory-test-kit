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
import FlashcardsScreen from './src/components/FlashcardsScreen';
import QuestionSearchScreen from './src/components/QuestionSearchScreen';
import RoadSignsScreen from './src/components/RoadSignsScreen';
import PracticeResultsScreen from './src/components/PracticeResultsScreen';
import { chooseQuestions } from './src/domain/mockExam';
import type { TheoryQuestion } from './src/data/questions';
import {
  getBookmarkedQuestionIds,
  getProgressSummary,
  getQuestionProgressRecords,
  recordAnswer,
  toggleBookmark,
} from './src/storage/database';
import type { ProgressSummary } from './src/domain/progress';
import { getQuestionsToRetry, getTopicReview, selectSmartPractice } from './src/domain/revision';
import type { QuestionProgressDetail } from './src/domain/revision';

type Tab = 'home' | 'theory' | 'practice' | 'mock' | 'saved' | 'progress' | 'flashcards' | 'search' | 'roadSigns';

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
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState<ProgressSummary>(EMPTY_PROGRESS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [progressRecords, setProgressRecords] = useState<QuestionProgressDetail[]>([]);
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
    Promise.all([getProgressSummary(), getBookmarkedQuestionIds(), getQuestionProgressRecords()])
      .then(([nextProgress, nextBookmarks, nextRecords]) => {
        if (!mounted) return;
        setProgress(nextProgress);
        setBookmarkedIds(nextBookmarks);
        setProgressRecords(nextRecords);
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
    if (items.length === 0) {
      setStorageMessage('There are no saved questions yet. Save a question while practising.');
      setTab('saved');
      return;
    }
    answerLockedRef.current = false;
    // Limited sessions shuffle uniquely; full topic and saved sessions preserve the supplied order.
    const selection = questionLimit === undefined ? items
      : chooseQuestions(items, Math.min(questionLimit, items.length));
    setPracticeQuestions(selection);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setSessionAnswers({});
    setStorageMessage(null);
    setTab('practice');
  }

  async function chooseAnswer(index: number) {
    if (!currentQuestion || selectedAnswer !== null || isSaving || answerLockedRef.current) return;
    // Lock synchronously, before React can render disabled answer buttons.
    answerLockedRef.current = true;
    setSelectedAnswer(index);
    setSessionAnswers((previous) => ({ ...previous, [currentQuestion.id]: index }));

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
                <Text style={styles.heroBody}>Original UK road-rule revision for Great Britain. Practise without an account or internet connection.</Text>
                <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => startPractice(questions, 10)}>
                  <Text style={styles.primaryButtonText}>Start 10-question practice <Text style={styles.buttonArrow}>›</Text></Text>
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>Learn and practise</Text>
              <MenuCard index="01" title="Theory Revision" detail="Practice questions, quick sessions, search and saved questions" onPress={() => setTab('theory')} />
              <MenuCard index="02" title="Road Sign Notes" detail="Text-based sign study, saved notes and quiz preview" onPress={() => setTab('roadSigns')} />
              <Text style={styles.scopeNote}>GB car theory preparation. NI-specific questions are not yet provided.</Text>

              <Pressable accessibilityRole="button" style={styles.mockBanner} onPress={() => setTab('mock')}>
                <Text style={styles.mockBannerTitle}>Timed 5-question practice  ›</Text>
                <Text style={styles.mockBannerBody}>Short sample only • resume offline • review answers</Text>
              </Pressable>

              <View style={styles.studyModeRow}>
                <Pressable accessibilityRole="button" style={styles.studyModeCard} onPress={() => startPractice(smartQuestions)}>
                  <Text style={styles.studyModeKicker}>SMART REVISION</Text>
                  <Text style={styles.studyModeTitle}>Your next 10 ›</Text>
                  <Text style={styles.studyModeBody}>Retry mistakes, then explore new questions</Text>
                </Pressable>
                <Pressable accessibilityRole="button" style={styles.studyModeCard} onPress={() => setTab('flashcards')}>
                  <Text style={styles.studyModeKicker}>MEMORY PRACTICE</Text>
                  <Text style={styles.studyModeTitle}>Flashcards ›</Text>
                  <Text style={styles.studyModeBody}>Recall each answer before revealing it</Text>
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

          {tab === 'theory' && (
            <>
              <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => setTab('home')}>
                <Text style={styles.backText}>‹ Home</Text>
              </Pressable>
              <Text style={styles.pageTitle}>Theory Test</Text>
              <Text style={styles.pageSubtitle}>Choose how to study. The current question bank is an independent GB sample, not the complete official bank.</Text>
              <Text style={styles.sectionTitle}>Quick practice</Text>
              <View style={styles.studyModeRow}>
                <Pressable accessibilityRole="button" style={styles.studyModeCard} onPress={() => startPractice(questions, 5)}>
                  <Text style={styles.studyModeKicker}>SHORT SESSION</Text>
                  <Text style={styles.studyModeTitle}>5 questions ›</Text>
                  <Text style={styles.studyModeBody}>A quick mixed revision session</Text>
                </Pressable>
                <Pressable accessibilityRole="button" style={styles.studyModeCard} onPress={() => startPractice(questions, 10)}>
                  <Text style={styles.studyModeKicker}>STANDARD SESSION</Text>
                  <Text style={styles.studyModeTitle}>10 questions ›</Text>
                  <Text style={styles.studyModeBody}>Review mistakes after finishing</Text>
                </Pressable>
              </View>
              <Text style={styles.sectionTitle}>All theory test tools</Text>
              <MenuCard index="01" title="Practise Revision Questions" detail={questions.length + ' original sample questions'} onPress={() => startPractice()} />
              <MenuCard index="02" title="Timed Mini Test" detail="Resumable 5-question sample; not an official exam simulation" onPress={() => setTab('mock')} />
              <MenuCard index="03" title="Search Questions" detail="Find questions by word, topic or rule" onPress={() => setTab('search')} />
              <MenuCard index="04" title="Flagged Questions" detail={bookmarkedIds.length + ' saved for later practice'} onPress={() => setTab('saved')} />
              <MenuCard index="05" title="Progress Monitor" detail="Topic coverage, recent mistakes and accuracy" onPress={() => setTab('progress')} />
              <MenuCard index="06" title="Flashcards" detail="Recall then reveal original answers" onPress={() => setTab('flashcards')} />
              <MenuCard index="07" title="Smart Revision" detail="Your next 10 questions, prioritised offline" onPress={() => startPractice(smartQuestions)} />
            </>
          )}

          {tab === 'practice' && (
            <>
              {!currentQuestion ? (
                <PracticeResultsScreen
                  questions={practiceQuestions}
                  answers={sessionAnswers}
                  savedIds={bookmarkedIds}
                  onFinish={() => setTab('theory')}
                  onRetry={startPractice}
                  onRestart={() => startPractice(practiceQuestions)}
                />
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

          {tab === 'mock' && <MockExamScreen onBack={() => setTab('theory')} />}
          {tab === 'search' && <QuestionSearchScreen onBack={() => setTab('theory')} onPractise={startPractice} />}
          {tab === 'roadSigns' && <RoadSignsScreen onBack={() => setTab('home')} />}
          {tab === 'flashcards' && <FlashcardsScreen onBack={() => setTab('home')} onPractise={startPractice} />}

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
                  onPress={() => startPractice(questions.filter((question) => question.topic === item.topic))}>
                  <View style={styles.topicReviewHeading}>
                    <Text style={styles.topicReviewTitle}>{item.topic}</Text>
                    <Text style={styles.topicReviewAccuracy}>{item.accuracyPercent === null ? 'Not tried' : item.accuracyPercent + '% accurate'}</Text>
                  </View>
                  <Text style={styles.infoBody}>{item.questionsTried}/{item.totalQuestions} questions tried · {item.recentMistakes} need retry</Text>
                </Pressable>
              ))}
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
          <NavItem label="Saved" icon="☆" active={tab === 'saved'} onPress={() => setTab('saved')} />
          <NavItem label="Progress" icon="▥" active={tab === 'progress'} onPress={() => setTab('progress')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function MenuCard({ index, title, detail, onPress }: { index: string; title: string; detail: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" style={styles.moduleCard} onPress={onPress}>
      <View style={styles.moduleNumber}><Text style={styles.moduleNumberText}>{index}</Text></View>
      <View style={styles.moduleContent}>
        <Text style={styles.moduleTitle}>{title}</Text>
        <Text style={styles.moduleDetail}>{detail}</Text>
      </View>
      <Text style={styles.moduleChevron}>›</Text>
    </Pressable>
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
  studyModeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  studyModeCard: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 15, backgroundColor: '#FFFFFF', padding: 14, minHeight: 124 },
  studyModeKicker: { color: colors.blue, fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  studyModeTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', marginTop: 10 },
  studyModeBody: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },
  secondaryAction: { padding: 12, alignItems: 'center' },
  secondaryActionText: { color: colors.blue, fontSize: 13, fontWeight: '800' },
  topicReviewCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 15, backgroundColor: '#FFFFFF', marginBottom: 10 },
  topicReviewHeading: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  topicReviewTitle: { color: colors.ink, fontWeight: '800', fontSize: 14, flexShrink: 1 },
  topicReviewAccuracy: { color: colors.blue, fontWeight: '800', fontSize: 11 },
  moduleCard: { flexDirection: 'row', alignItems: 'center', minHeight: 86,
    borderRadius: 15, borderWidth: 1, borderColor: colors.border,
    backgroundColor: '#FFFFFF', padding: 14, marginBottom: 10 },
  moduleNumber: { width: 38, height: 38, borderRadius: 12,
    backgroundColor: '#EDF3FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  moduleNumberText: { fontSize: 12, fontWeight: '900', color: colors.blue },
  moduleContent: { flex: 1 },
  moduleTitle: { fontSize: 15, fontWeight: '800', color: colors.ink },
  moduleDetail: { fontSize: 12, lineHeight: 17, color: colors.muted, marginTop: 5 },
  moduleChevron: { fontWeight: '900', fontSize: 24, color: colors.blue, marginLeft: 4 },
  scopeNote: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 4, marginBottom: 18 },
  mockBanner: { backgroundColor: '#E5EDFD', borderRadius: 15, padding: 16, marginBottom: 22 },
  mockBannerTitle: { color: '#183D8A', fontSize: 16, fontWeight: '900' },
  mockBannerBody: { color: '#526B9A', fontSize: 12, marginTop: 5 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, paddingBottom: 4 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 5 },
  navIcon: { fontSize: 20, color: '#91A0B4' },
  navLabel: { color: '#91A0B4', fontSize: 9, fontWeight: '700', marginTop: 2 },
  navActive: { color: colors.blue },
});
