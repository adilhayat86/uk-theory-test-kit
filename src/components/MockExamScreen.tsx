import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { questions } from "../data/questions";
import { caseStudyIds } from "../data/caseStudies";
import { courseLessons } from "../data/course";
import QuestionIllustration from "./QuestionIllustration";
import CaseStudyVideo from "./CaseStudyVideo";
import { StudyButton } from "./CourseScreens";
import {
  answerQuestion,
  beginConfirmedMock,
  finishMock,
  flagQuestion,
  formattedTimeLeft,
  fullMockReadiness,
  goToQuestion,
  isExpired,
  isMockResult,
  timeLeftMs,
} from "../domain/mockExam";
import type {
  FinishReason,
  MockResult,
  MockSession,
  MockMode,
} from "../domain/mockExam";
import {
  discardActiveMock,
  finishStoredMock,
  getActiveMockSession,
  getMockResults,
  saveMockSession,
} from "../storage/database";
import { colors } from "../theme";

type Props = {
  onFocusChange: (active: boolean) => void;
  onStudy: () => void;
  topicsCompleted: number;
  totalTopics: number;
  onPageChange: () => void;
  active?: boolean;
  onReadLesson?: (id: string) => void;
};
export default function MockExamScreen({
  onFocusChange,
  onStudy,
  topicsCompleted,
  totalTopics,
  onPageChange,
  active = true,
  onReadLesson,
}: Props) {
  const [session, setSession] = useState<MockSession | null>(null);
  const sessionRef = useRef<MockSession | null>(null);
  const [result, setResult] = useState<MockResult | null>(null);
  const [history, setHistory] = useState<MockResult[]>([]);
  const [view, setView] = useState<"overview" | "exam" | "result">("overview");
  const [studied, setStudied] = useState(false);
  const [review, setReview] = useState(false);
  const [grid, setGrid] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const submitting = useRef(false);
  const starting = useRef(false);
  useEffect(() => {
    let mounted = true;
    Promise.all([getActiveMockSession(), getMockResults(10)])
      .then(([saved, reports]) => {
        if (!mounted) return;
        sessionRef.current = saved;
        setSession(saved);
        setHistory(reports.filter(isMockResult));
      })
      .catch(() => {
        if (mounted) {
          setLoadFailed(true);
          setMessage(
            "Unable to load exams. Return to learning, then reopen Exams to try again.",
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    const ticker = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      mounted = false;
      clearInterval(ticker);
    };
  }, []);
  useEffect(() => {
    onFocusChange(active && view === "exam" && session !== null);
    return () => onFocusChange(false);
  }, [active, view, session?.id, onFocusChange]);
  async function start(mode: MockMode) {
    if (
      loadFailed ||
      busy ||
      starting.current ||
      sessionRef.current ||
      !studied
    )
      return;
    starting.current = true;
    setBusy(true);
    setMessage(null);
    try {
      const started = beginConfirmedMock(
        questions,
        mode,
        Date.now(),
        studied,
        caseStudyIds,
      );
      await saveMockSession(started);
      sessionRef.current = started;
      setSession(started);
      setResult(null);
      setStudied(false);
      setGrid(false);
      setReview(false);
      setView("exam");
      setNow(Date.now());
      onPageChange();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to start the exam.",
      );
    } finally {
      starting.current = false;
      setBusy(false);
    }
  }
  async function resume() {
    const current = sessionRef.current;
    if (!current || busy || (!current.studyAcknowledgement && !studied)) return;
    setBusy(true);
    try {
      const resumed = current.studyAcknowledgement
        ? current
        : {
            ...current,
            studyAcknowledgement: {
              confirmedAt: Date.now(),
              statementVersion: 1 as const,
            },
          };
      await saveMockSession(resumed);
      sessionRef.current = resumed;
      setSession(resumed);
      setStudied(false);
      setView("exam");
      onPageChange();
    } catch {
      setMessage("The exam could not be resumed. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  function change(changeSession: (value: MockSession) => MockSession) {
    const current = sessionRef.current;
    if (!current || busy || submitting.current) return;
    const next = changeSession(current);
    if (next === current) return;
    sessionRef.current = next;
    setSession(next);
    void saveMockSession(next).catch(() =>
      setMessage(
        "The latest change could not be saved. Keep this screen open and try again.",
      ),
    );
  }
  function jump(index: number) {
    change((old) => goToQuestion(old, index));
    setGrid(false);
    onPageChange();
  }
  async function finish(reason: FinishReason) {
    const current = sessionRef.current;
    if (!current || submitting.current) return;
    submitting.current = true;
    setBusy(true);
    try {
      const report = finishMock(current, questions, Date.now(), reason);
      await finishStoredMock(current, report);
      sessionRef.current = null;
      setSession(null);
      setResult(report);
      setHistory((old) =>
        [report, ...old.filter((item) => item.id !== report.id)].slice(0, 10),
      );
      setView("result");
      setReview(false);
      setStudied(false);
      setMessage(null);
      onPageChange();
    } catch {
      setMessage(
        "Your result could not be saved. Keep the exam open and try again.",
      );
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }
  useEffect(() => {
    if (session && isExpired(session, now) && !submitting.current)
      void finish("timeout");
  }, [now, session?.id]);
  function submit() {
    const current = sessionRef.current;
    if (!current || busy) return;
    const left =
      current.questionIds.length - Object.keys(current.answers).length;
    Alert.alert(
      "Submit exam?",
      left
        ? `${left} questions are unanswered. Submit anyway?`
        : "Submit your answers and see your result?",
      [
        { text: "Keep working", style: "cancel" },
        {
          text: "Submit answers",
          onPress: () => {
            void finish("submitted");
          },
        },
      ],
    );
  }
  function discard() {
    const current = sessionRef.current;
    if (!current || busy) return;
    Alert.alert(
      "End this exam?",
      "This removes the unfinished exam without adding a result.",
      [
        { text: "Keep exam", style: "cancel" },
        {
          text: "End exam",
          style: "destructive",
          onPress: () => {
            setBusy(true);
            void discardActiveMock(current.id)
              .then(() => {
                sessionRef.current = null;
                setSession(null);
                setView("overview");
                setStudied(false);
                onPageChange();
              })
              .catch(() => setMessage("The exam could not be ended."))
              .finally(() => setBusy(false));
          },
        },
      ],
    );
  }
  if (loading)
    return (
      <View style={s.loading}>
        <ActivityIndicator color={colors.primary} />
        <Text style={s.body}>Loading exams…</Text>
      </View>
    );
  const question = session
    ? questions.find(
        (item) => item.id === session.questionIds[session.currentIndex],
      )
    : undefined;
  const answered = session ? Object.keys(session.answers).length : 0;
  const acknowledgement = (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel="I have studied the material, here or elsewhere"
      accessibilityState={{ checked: studied }}
      onPress={() => setStudied((old) => !old)}
      style={[s.confirm, studied && s.confirmed]}
    >
      <Text accessible={false} style={s.check}>
        {studied ? "☑" : "☐"}
      </Text>
      <Text style={s.confirmText}>
        I have studied the material, here or elsewhere, and want to test my
        understanding.
      </Text>
    </Pressable>
  );
  return (
    <View>
      {message ? (
        <Text accessibilityRole="alert" style={s.error}>
          {message}
        </Text>
      ) : null}
      {view === "overview" ? (
        <>
          <Text accessibilityRole="header" style={s.title}>
            Put your learning to the test
          </Text>
          <Text style={s.body}>
            50 questions · 57 minutes · pass with 43 correct. Includes a silent
            video case study with three linked questions.
          </Text>
          <View style={s.readiness}>
            <Text style={s.heading}>
              {topicsCompleted}/{totalTopics} course topics completed
            </Text>
            <Text style={s.body}>
              Follow the course and topic checks, or enter directly if you have
              studied elsewhere.
            </Text>
            <StudyButton
              title="Return to learning"
              onPress={onStudy}
              secondary
            />
          </View>
          {session ? (
            <View style={s.card}>
              <Text style={s.heading}>You have a saved exam</Text>
              <Text style={s.body}>
                {answered}/{session.questionIds.length} answered · the timer
                continues while you are away.
              </Text>
              {!session.studyAcknowledgement ? acknowledgement : null}
              <StudyButton
                title="Resume exam"
                onPress={() => {
                  void resume();
                }}
                disabled={busy || (!session.studyAcknowledgement && !studied)}
              />
              <StudyButton title="End saved exam" onPress={discard} secondary />
            </View>
          ) : (
            <>
              {acknowledgement}
              <StudyButton
                title="Start full mock exam"
                onPress={() => {
                  void start("full");
                }}
                disabled={
                  loadFailed ||
                  busy ||
                  !studied ||
                  !fullMockReadiness(questions, caseStudyIds).eligible
                }
              />
              <StudyButton
                title="Try a 5-question warm-up"
                onPress={() => {
                  void start("sample");
                }}
                disabled={loadFailed || busy || !studied}
                secondary
              />
            </>
          )}
          <Text style={s.note}>
            Independent multiple-choice practice with original questions and
            animations. Hazard perception is a separate part of the official
            test and is not assessed here.
          </Text>
          <Text style={s.sectionTitle}>Previous exams</Text>
          {!history.length ? (
            <Text style={s.body}>
              Your completed exam results will appear here.
            </Text>
          ) : (
            history.map((report) => (
              <Pressable
                key={report.id}
                accessibilityRole="button"
                accessibilityLabel={`Review ${report.mode === "full" ? "full mock" : "warm-up"} ${report.correct} of ${report.total}`}
                onPress={() => {
                  setResult(report);
                  setView("result");
                  setReview(false);
                  onPageChange();
                }}
                style={s.history}
              >
                <View style={s.historyCopy}>
                  <Text style={s.heading}>
                    {report.mode === "full" ? "Full mock" : "Warm-up"}
                  </Text>
                  <Text style={s.note}>
                    {new Date(report.finishedAt).toLocaleDateString("en-GB")} ·{" "}
                    {report.reason === "timeout" ? "Time expired" : "Submitted"}
                  </Text>
                </View>
                <Text style={s.scoreSmall}>
                  {report.correct}/{report.total}
                </Text>
              </Pressable>
            ))
          )}
        </>
      ) : null}
      {view === "exam" && session ? (
        <>
          <View style={s.timerCard}>
            <Text style={s.heading}>
              {answered}/{session.questionIds.length} answered
            </Text>
            <Text
              accessibilityLabel={`Time remaining ${formattedTimeLeft(timeLeftMs(session, now))}`}
              style={[s.timer, timeLeftMs(session, now) <= 60000 && s.error]}
            >
              {formattedTimeLeft(timeLeftMs(session, now))}
            </Text>
          </View>
          {question ? (
            <>
              <View style={s.meta}>
                <Text style={s.kicker}>
                  QUESTION {session.currentIndex + 1} OF{" "}
                  {session.questionIds.length}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    session.flaggedIds.includes(question.id)
                      ? "Unflag question"
                      : "Flag question"
                  }
                  onPress={() =>
                    change((old) => flagQuestion(old, question.id, Date.now()))
                  }
                  style={s.flag}
                >
                  <Text style={s.link}>
                    {session.flaggedIds.includes(question.id)
                      ? "★ Flagged"
                      : "☆ Flag"}
                  </Text>
                </Pressable>
              </View>
              {question.caseStudyVideoAssetId ? (
                <CaseStudyVideo
                  caseStudyId={question.caseStudyVideoAssetId}
                  active={active && view === "exam"}
                />
              ) : null}
              <Text accessibilityRole="header" style={s.question}>
                {question.prompt}
              </Text>
              <QuestionIllustration question={question} />
              {question.options.map((option, index) => (
                <Pressable
                  key={index}
                  accessibilityRole="radio"
                  accessibilityLabel={option}
                  accessibilityState={{
                    checked: session.answers[question.id] === index,
                  }}
                  disabled={busy}
                  onPress={() =>
                    change((old) =>
                      answerQuestion(old, question.id, index, Date.now()),
                    )
                  }
                  style={[
                    s.option,
                    session.answers[question.id] === index && s.chosen,
                  ]}
                >
                  <Text style={s.letter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                  <Text style={s.optionText}>{option}</Text>
                </Pressable>
              ))}
            </>
          ) : (
            <Text style={s.error}>
              This question is unavailable. End the saved exam and start again.
            </Text>
          )}
          <View style={s.nav}>
            <View style={s.navItem}>
              <StudyButton
                title="Previous"
                onPress={() => jump(session.currentIndex - 1)}
                disabled={busy || session.currentIndex === 0}
                secondary
              />
            </View>
            <View style={s.navItem}>
              <StudyButton
                title="Next question"
                onPress={() => jump(session.currentIndex + 1)}
                disabled={
                  busy ||
                  session.currentIndex + 1 === session.questionIds.length
                }
              />
            </View>
          </View>
          <StudyButton
            title={
              grid
                ? "Hide question list"
                : `Question list · ${session.flaggedIds.length} flagged`
            }
            onPress={() => setGrid((old) => !old)}
            secondary
          />
          {grid ? (
            <View style={s.grid}>
              {session.questionIds.map((id, index) => (
                <Pressable
                  key={id}
                  accessibilityRole="button"
                  accessibilityLabel={`Question ${index + 1}, ${Object.prototype.hasOwnProperty.call(session.answers, id) ? "answered" : "not answered"}${session.flaggedIds.includes(id) ? ", flagged" : ""}`}
                  accessibilityState={{
                    selected: session.currentIndex === index,
                  }}
                  onPress={() => jump(index)}
                  style={[
                    s.gridItem,
                    session.currentIndex === index && s.chosen,
                  ]}
                >
                  <Text style={s.link}>
                    {index + 1}
                    {session.flaggedIds.includes(id) ? "★" : ""}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
          <StudyButton title="Submit exam" onPress={submit} disabled={busy} />
          <StudyButton
            title="End exam without result"
            onPress={discard}
            secondary
          />
          <Text style={s.note}>
            Your answers are saved. Correct answers appear after submission.
          </Text>
        </>
      ) : null}
      {view === "result" && result ? (
        <>
          <Text style={s.kicker}>
            {result.mode === "full" ? "FULL MOCK RESULT" : "WARM-UP RESULT"}
          </Text>
          <Text style={s.resultScore}>
            {result.correct}/{result.total}
          </Text>
          <Text style={s.heading}>
            {result.mode === "full"
              ? result.passed
                ? "Practice pass"
                : "More revision needed"
              : "Warm-up completed"}
          </Text>
          <Text style={s.body}>
            {result.answered} answered ·{" "}
            {result.reason === "timeout" ? "Time expired" : "Submitted"}
          </Text>
          <Text style={s.note}>
            This is an independent practice result, not a guarantee of an
            official pass.
          </Text>
          <StudyButton
            title="Back to exams"
            onPress={() => {
              setView("overview");
              setResult(null);
              setStudied(false);
              onPageChange();
            }}
          />
          <StudyButton
            title={review ? "Hide answer review" : "Review exam answers"}
            onPress={() => setReview((old) => !old)}
            secondary
          />
          {review
            ? result.questionIds.map((id, index) => {
                const item = questions.find((q) => q.id === id);
                if (!item) return null;
                const selected = result.answers[id];
                const lesson = courseLessons.find(
                  (value) =>
                    value.questionIds.includes(id) ||
                    (item.caseStudyVideoAssetId &&
                      value.sections.some(
                        (section) =>
                          section.caseStudyId === item.caseStudyVideoAssetId,
                      )),
                );
                const firstVideo =
                  item.caseStudyVideoAssetId &&
                  result.questionIds.findIndex(
                    (qid) =>
                      questions.find((q) => q.id === qid)
                        ?.caseStudyVideoAssetId === item.caseStudyVideoAssetId,
                  ) === index;
                return (
                  <View key={id} style={s.reviewCard}>
                    <Text
                      style={[
                        s.kicker,
                        selected === item.correctIndex && s.good,
                      ]}
                    >
                      QUESTION {index + 1} ·{" "}
                      {selected === item.correctIndex ? "CORRECT" : "REVISE"}
                    </Text>
                    {firstVideo ? (
                      <CaseStudyVideo
                        caseStudyId={item.caseStudyVideoAssetId!}
                        active={active && view === "result"}
                      />
                    ) : null}
                    <Text style={s.heading}>{item.prompt}</Text>
                    <QuestionIllustration question={item} context="review" />
                    <Text style={s.body}>
                      Your answer:{" "}
                      {selected === undefined
                        ? "Unanswered"
                        : item.options[selected]}
                    </Text>
                    <Text style={s.correct}>
                      Correct: {item.options[item.correctIndex]}
                    </Text>
                    <Text style={s.body}>{item.explanation}</Text>
                    {lesson && onReadLesson ? (
                      <StudyButton
                        title={"Revise: " + lesson.title}
                        onPress={() => onReadLesson(lesson.id)}
                        secondary
                      />
                    ) : null}
                  </View>
                );
              })
            : null}
        </>
      ) : null}
    </View>
  );
}
const s = StyleSheet.create({
  title: { fontSize: 25, lineHeight: 33, fontWeight: "800", color: colors.ink },
  body: { fontSize: 14, lineHeight: 22, color: colors.muted, marginTop: 8 },
  heading: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "700",
    color: colors.ink,
  },
  readiness: {
    padding: 16,
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    marginVertical: 18,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  note: { fontSize: 12, lineHeight: 19, color: colors.muted, marginTop: 10 },
  sectionTitle: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 28,
    marginBottom: 8,
  },
  confirm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    borderRadius: 12,
    minHeight: 54,
  },
  confirmed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  check: { fontSize: 24, color: colors.primary },
  confirmText: { fontSize: 14, lineHeight: 22, color: colors.ink, flex: 1 },
  history: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  historyCopy: { flex: 1, minWidth: 150 },
  scoreSmall: { fontSize: 22, fontWeight: "800", color: colors.primary },
  loading: { padding: 20, gap: 12 },
  error: { fontSize: 14, lineHeight: 21, color: colors.danger },
  timerCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    marginBottom: 18,
  },
  timer: { fontSize: 26, fontWeight: "800", color: colors.primary },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  kicker: {
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "800",
    color: colors.primary,
  },
  flag: { minHeight: 44, minWidth: 44, justifyContent: "center", padding: 8 },
  link: { fontSize: 13, fontWeight: "700", color: colors.primary },
  question: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: "700",
    color: colors.ink,
    marginVertical: 16,
  },
  option: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    minHeight: 54,
  },
  chosen: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  letter: { fontSize: 14, fontWeight: "800", color: colors.primary },
  optionText: { flex: 1, fontSize: 14, lineHeight: 22, color: colors.ink },
  nav: { flexDirection: "row", gap: 12 },
  navItem: { flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 14 },
  gridItem: {
    minWidth: 44,
    minHeight: 44,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  resultScore: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.primary,
    marginVertical: 18,
  },
  good: { color: colors.success },
  correct: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.success,
    marginTop: 8,
  },
  reviewCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    marginTop: 14,
  },
});
