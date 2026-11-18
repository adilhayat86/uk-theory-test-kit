import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { courseModules, courseLessons } from "../data/course";
import type { CourseModule, CourseLesson } from "../data/course";
import { buildCourseProgress } from "../domain/courseProgress";
import type { LessonProgress } from "../domain/courseProgress";
import type { PracticeSession } from "../domain/practiceSession";
import TimedProgress from "./TimedProgress";
import CaseStudyVideo from "./CaseStudyVideo";
import { Illustration } from "./QuestionIllustration";
import { colors } from "../theme";
import RevisionFocusCard from "./RevisionFocusCard";
import type { RevisionFocus } from "../domain/revisionFocus";

type Progress = ReturnType<typeof buildCourseProgress>;
const statusCopy = {
  notstarted: "Not started",
  reading: "Reading",
  ready: "Ready for topic check",
  checkpassed: "Check passed · finish reading",
  revisit: "Revise and try again",
};
export function StudyButton({
  title,
  onPress,
  disabled = false,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[s.button, secondary && s.secondary, disabled && s.disabled]}
    >
      <Text style={[s.buttonText, secondary && s.secondaryText]}>{title}</Text>
    </Pressable>
  );
}
export function CourseHome({
  progress,
  records,
  session,
  onLesson,
  onModule,
  onResume,
  onTools,
  onExams,
  revisionFocus,
  onRevise,
}: {
  progress: Progress;
  records: LessonProgress[];
  session: PracticeSession | null;
  onLesson: (id: string) => void;
  onModule: (id: string) => void;
  onResume: () => void;
  onTools: () => void;
  onExams: () => void;
  revisionFocus?: RevisionFocus;
  onRevise?: () => void;
}) {
  const unread = courseLessons.filter(
    (lesson) =>
      !progress.lessons.find((item) => item.lessonId === lesson.id)?.read,
  );
  const recent = [...records]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .find((record) => unread.some((lesson) => lesson.id === record.lessonId));
  const next =
    unread.find((lesson) => lesson.id === recent?.lessonId) ?? unread[0];
  const ready = progress.modules.find(
    (item) => !item.completed && item.lessonsRead === item.totalLessons,
  );
  const active = !!session && session.currentIndex < session.questionIds.length;
  const activeCheck = active && !!session?.checkpoint;
  return (
    <View>
      <Text accessibilityRole="header" style={s.title}>
        Learn. Understand. Put it into practice.
      </Text>
      <Text style={s.body}>
        A guided course for Great Britain car theory, with clear explanations,
        road scenarios and topic checks.
      </Text>
      <View style={s.summary}>
        <Metric
          value={`${progress.lessonsRead}/${progress.totalLessons}`}
          label="lessons studied"
        />
        <Metric
          value={`${progress.modulesCompleted}/${progress.totalModules}`}
          label="topics completed"
        />
      </View>
      <View style={s.continueCard}>
        <Text style={s.kicker}>YOUR NEXT STEP</Text>
        <Text style={s.heading}>
          {activeCheck
            ? "Continue your topic check"
            : ready
              ? courseModules.find((item) => item.id === ready.moduleId)?.title
              : (next?.title ?? "Practise a full mock exam")}
        </Text>
        <Text style={s.body}>
          {activeCheck
            ? "Your topic-check answers and position are saved."
            : ready
              ? ready.status === "revisit"
                ? "Revisit this topic's examples, then try its 10-question check again."
                : "You have studied the lessons. Check your understanding with 10 questions."
              : next
                ? "Read the lesson, work through its example, then confirm you have studied it."
                : "Your reading is complete. Use topic checks and mock results to find what to revisit."}
        </Text>
        <StudyButton
          title={
            activeCheck
              ? "Continue topic check"
              : ready
                ? "Open topic check"
                : next
                  ? "Continue learning"
                  : "Go to mock exams"
          }
          onPress={
            activeCheck
              ? onResume
              : ready
                ? () => onModule(ready.moduleId)
                : next
                  ? () => onLesson(next.id)
                  : onExams
          }
        />
        {session && !active ? (
          <StudyButton
            title="Review last practice result"
            onPress={onResume}
            secondary
          />
        ) : null}
      </View>
      {active && !activeCheck ? <View style={s.savedPractice}>
        <Text style={s.body}>Your question practice is saved for later.</Text>
        <StudyButton title="Continue practice" onPress={onResume} secondary />
      </View> : null}
      <RevisionFocusCard focus={revisionFocus} onRevise={onRevise} onReadLesson={onLesson} />
      <Text accessibilityRole="header" style={s.sectionTitle}>
        Your course
      </Text>
      {courseModules.map((module, index) => {
        const item = progress.modules.find(
          (value) => value.moduleId === module.id,
        )!;
        return (
          <Pressable
            key={module.id}
            accessibilityRole="button"
            accessibilityLabel={`Open ${module.title}`}
            onPress={() => onModule(module.id)}
            style={s.module}
          >
            <View style={s.row}>
              <Text style={s.number}>{String(index + 1).padStart(2, "0")}</Text>
              <Text style={s.moduleTitle}>{module.title}</Text>
              <Text accessible={false} style={s.chevron}>
                ›
              </Text>
            </View>
            <Text style={s.body}>{module.summary}</Text>
            <Text style={[s.status, item.completed && s.good]}>
              {item.lessonsRead}/{item.totalLessons} lessons studied ·{" "}
              {item.completed ? "Topic completed" : statusCopy[item.status]}
            </Text>
          </Pressable>
        );
      })}
      <StudyButton
        title="Study tools and saved questions"
        onPress={onTools}
        secondary
      />
      <Text style={s.note}>
        Studied means you confirmed reading. Topic completion also requires a
        passed topic check.
      </Text>
    </View>
  );
}
export function ModuleScreen({
  module,
  progress,
  onLesson,
  onCheck,
  onPractise,
}: {
  module: CourseModule;
  progress: Progress;
  onLesson: (id: string) => void;
  onCheck: () => void;
  onPractise: () => void;
}) {
  const state = progress.modules.find((item) => item.moduleId === module.id)!;
  return (
    <View>
      <Text accessibilityRole="header" style={s.title}>
        {module.title}
      </Text>
      <Text style={s.body}>{module.summary}</Text>
      <Text style={s.sectionTitle}>1. Study the lessons</Text>
      {module.lessonIds.map((id, index) => {
        const lesson = courseLessons.find((item) => item.id === id)!;
        const read = progress.lessons.find(
          (item) => item.lessonId === id,
        )?.read;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Read ${lesson.title}`}
            key={id}
            onPress={() => onLesson(id)}
            style={s.module}
          >
            <Text style={s.kicker}>
              LESSON {index + 1} · {lesson.minutes} MIN
            </Text>
            <Text style={s.heading}>{lesson.title}</Text>
            <Text style={[s.status, read && s.good]}>
              {read ? "Studied · read again" : "Read lesson ›"}
            </Text>
          </Pressable>
        );
      })}
      <View style={s.continueCard}>
        <Text style={s.sectionTitle}>2. Check your understanding</Text>
        <Text style={s.body}>
          10 questions covering this topic. Pass with 8 correct. A later
          unsuccessful check marks this topic for revision.
        </Text>
        {state.latestCheckpoint ? (
          <Text style={[s.status, state.checkpointPassed && s.good]}>
            Last topic check: {state.latestCheckpoint.correct}/
            {state.latestCheckpoint.total} ·{" "}
            {state.checkpointPassed ? "Passed" : "Revise and try again"}
          </Text>
        ) : null}
        <StudyButton
          title={
            state.latestCheckpoint ? "Retake topic check" : "Take topic check"
          }
          onPress={onCheck}
          disabled={state.lessonsRead < state.totalLessons}
        />
        {state.lessonsRead < state.totalLessons ? (
          <Text style={s.note}>
            Study and confirm each lesson first. General practice and direct
            mock exams are also available from their tabs.
          </Text>
        ) : null}
        <StudyButton
          title="Practise this topic"
          onPress={onPractise}
          secondary
        />
      </View>
    </View>
  );
}
export function LessonReader({
  lesson,
  record,
  onPosition,
  onRead,
  onPageChange,
  busy,
  active = true,
}: {
  lesson: CourseLesson;
  record?: LessonProgress;
  onPosition: (id: string) => Promise<void>;
  onRead: () => Promise<void>;
  onPageChange: () => void;
  busy: boolean;
  active?: boolean;
}) {
  const units = [
    ...lesson.sections,
    {
      id: "worked-example",
      title: lesson.scenario.title,
      paragraphs: [lesson.scenario.text],
      imageAssetId: undefined,
      caseStudyId: undefined,
    },
    {
      id: "recap",
      title: "Remember these points",
      paragraphs: lesson.takeaways,
      imageAssetId: undefined,
      caseStudyId: undefined,
    },
  ];
  const saved =
    record?.contentVersion === lesson.version
      ? units.findIndex((item) => item.id === record?.lastSectionId)
      : 0;
  const [index, setIndex] = useState(Math.max(0, saved));
  const current = units[index];
  async function move(next: number) {
    if (busy) return;
    try {
      await onPosition(units[next].id);
      setIndex(next);
      onPageChange();
    } catch {
      /* App displays a storage error; retain this section. */
    }
  }
  return (
    <View>
      <Text style={s.kicker}>
        LESSON · {index + 1} OF {units.length}
      </Text>
      <Text accessibilityRole="header" style={s.title}>
        {lesson.title}
      </Text>
      {index === 0 ? (
        <View style={s.objectives}>
          <Text style={s.heading}>What you will learn</Text>
          {lesson.objectives.map((item) => (
            <Text key={item} style={s.body}>
              • {item}
            </Text>
          ))}
        </View>
      ) : null}
      <Text accessibilityRole="header" style={s.sectionTitle}>
        {current.title}
      </Text>
      {"caseStudyId" in current && typeof current.caseStudyId === "string" ? (
        <CaseStudyVideo caseStudyId={current.caseStudyId} active={active} />
      ) : null}
      {current.imageAssetId ? (
        <Illustration assetId={current.imageAssetId} context="learn" />
      ) : null}
      {current.paragraphs.map((text, i) => (
        <Text key={i} style={s.reading}>
          {text}
        </Text>
      ))}
      {index === units.length - 1 ? (
        <>
          <Text style={s.note}>
            Mark this lesson studied when you have read and understood its
            material. The topic check will test your understanding separately.
          </Text>
          <StudyButton
            title={busy ? "Saving…" : "I have studied this lesson"}
            disabled={busy}
            onPress={() => {
              void onRead();
            }}
          />
          <Text style={s.sectionTitle}>Sources</Text>
          {lesson.sources.map((source) => (
            <Pressable
              key={source.url}
              accessibilityRole="link"
              onPress={() => {
                void Linking.openURL(source.url).catch(() => undefined);
              }}
              style={s.source}
            >
              <Text style={s.link}>{source.title} ↗</Text>
            </Pressable>
          ))}
        </>
      ) : (
        <StudyButton
          title="Next section"
          disabled={busy}
          onPress={() => {
            void move(index + 1);
          }}
        />
      )}
      {index > 0 ? (
        <StudyButton
          title="Previous section"
          disabled={busy}
          onPress={() => {
            void move(index - 1);
          }}
          secondary
        />
      ) : null}
    </View>
  );
}
export function CourseProgressSummary({
  progress,
  onContinue,
  onExams,
  onModule,
  revisionFocus,
  onRevise,
  onReadLesson,
}: {
  progress: Progress;
  onContinue: () => void;
  onExams: () => void;
  onModule: (id: string) => void;
  revisionFocus?: RevisionFocus;
  onRevise?: () => void;
  onReadLesson?: (id: string) => void;
}) {
  return (
    <View>
      <Text accessibilityRole="header" style={s.title}>
        Your learning progress
      </Text>
      <Text style={s.body}>
        Reading, topic checks and mock exams measure different parts of your
        preparation.
      </Text>
      <View style={s.summary}>
        <Metric
          value={`${progress.lessonsRead}/${progress.totalLessons}`}
          label="lessons studied"
        />
        <Metric
          value={`${progress.modulesCompleted}/${progress.totalModules}`}
          label="topics completed"
        />
      </View>
      <StudyButton
        title={
          progress.modulesCompleted === progress.totalModules
            ? "Take a mock exam"
            : "Continue learning"
        }
        onPress={
          progress.modulesCompleted === progress.totalModules
            ? onExams
            : onContinue
        }
      />
      <RevisionFocusCard focus={revisionFocus} onRevise={onRevise} onReadLesson={onReadLesson} />
      <TimedProgress onOpen={onExams} />
      <Text style={s.sectionTitle}>Topic checks</Text>
      {courseModules.map((module) => {
        const item = progress.modules.find(
          (value) => value.moduleId === module.id,
        )!;
        return (
          <Pressable
            key={module.id}
            accessibilityRole="button"
            onPress={() => onModule(module.id)}
            style={s.module}
          >
            <Text style={s.moduleTitle}>{module.title}</Text>
            <Text style={[s.status, item.completed && s.good]}>
              {item.completed ? "Completed" : statusCopy[item.status]}
              {item.latestCheckpoint
                ? ` · ${item.latestCheckpoint.correct}/10`
                : ""}
            </Text>
          </Pressable>
        );
      })}
      <Text style={s.note}>
        Course completion reflects your study confirmations and topic-check
        results. It does not guarantee an official test pass. You can enter a
        mock directly after confirming you have studied.
      </Text>
    </View>
  );
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={s.metric}>
      <Text style={s.metricValue}>{value}</Text>
      <Text style={s.note}>{label}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  savedPractice: { marginTop: 12 },
  title: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: 10,
  },
  body: { fontSize: 14, lineHeight: 22, color: colors.muted, marginTop: 7 },
  heading: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    color: colors.ink,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 24,
    marginBottom: 10,
  },
  summary: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginVertical: 16,
  },
  metric: {
    minWidth: 130,
    flex: 1,
    padding: 15,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
  },
  metricValue: { fontSize: 26, fontWeight: "800", color: colors.primary },
  continueCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    marginVertical: 10,
  },
  kicker: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1,
    fontWeight: "800",
    color: colors.primary,
  },
  module: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 8,
    borderRadius: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  number: { fontSize: 12, fontWeight: "800", color: colors.primary },
  moduleTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.ink,
    flex: 1,
  },
  chevron: { fontSize: 22, color: colors.muted },
  status: { fontSize: 12, lineHeight: 19, color: colors.muted, marginTop: 10 },
  good: { color: colors.success },
  button: {
    minHeight: 50,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginTop: 14,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },
  secondary: { backgroundColor: colors.primarySoft },
  secondaryText: { color: colors.primary },
  disabled: { opacity: 0.4 },
  note: { fontSize: 12, lineHeight: 19, color: colors.muted, marginTop: 7 },
  reading: {
    fontSize: 16,
    lineHeight: 27,
    color: colors.ink,
    marginBottom: 18,
  },
  objectives: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    marginVertical: 12,
  },
  source: { minHeight: 44, justifyContent: "center" },
  link: { fontSize: 12, lineHeight: 19, color: colors.primary },
});
