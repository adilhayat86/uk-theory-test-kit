import { colors } from "../theme";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { questions } from "../data/questions";
import type { TheoryQuestion } from "../data/questions";
import { eligiblePracticeQuestions } from "../domain/practiceSelection";
import type { PracticeMode } from "../domain/practiceSelection";
import TopicPicker from "./TopicPicker";
import { getTopicReview } from "../domain/revision";
import type { QuestionProgressDetail } from "../domain/revision";

const modes: { id: PracticeMode; title: string; detail: string }[] = [
  {
    id: "all",
    title: "All questions",
    detail: "A shuffled mix from your chosen topics",
  },
  {
    id: "illustrated",
    title: "Picture questions",
    detail: "Questions with an illustration to examine before answering",
  },
  {
    id: "smart",
    title: "Smart revision",
    detail: "Recent mistakes first, then unseen questions",
  },
  {
    id: "incorrect",
    title: "Incorrect",
    detail: "Questions you answered incorrectly last time",
  },
  {
    id: "unseen",
    title: "Not tried yet",
    detail: "Explore questions you have not answered",
  },
  { id: "saved", title: "Saved", detail: "Revisit your bookmarked questions" },
];

type Props = {
  records: QuestionProgressDetail[];
  savedIds: string[];
  initialTopic?: string;
  onStart: (items: TheoryQuestion[]) => void;
};

export default function PracticeSetupScreen({
  records,
  savedIds,
  initialTopic,
  onStart,
}: Props) {
  const [topics, setTopics] = useState<string[]>(
    initialTopic ? [initialTopic] : [],
  );
  const [mode, setMode] = useState<PracticeMode>("smart");
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(10);
  const topicStats = useMemo(
    () => getTopicReview(questions, records),
    [records],
  );
  const eligible = useMemo(
    () => eligiblePracticeQuestions(questions, records, savedIds, topics, mode),
    [records, savedIds, topics, mode],
  );
  const count = Math.min(limit, eligible.length);

  function start() {
    // Smart ranking must survive session creation; other modes are shuffled here.
    const pool = [...eligible];
    if (mode !== "smart") {
      for (let i = pool.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    onStart(pool.slice(0, count));
  }

  return (
    <View>
      <Text style={styles.title}>Practise what you have learned</Text>
      <Text style={styles.summaryHint}>
        {count} questions · {topics.length ? topics.join(", ") : "All topics"}
      </Text>
      <Text style={styles.summaryHint}>
        {mode === "smart"
          ? "Revision based on your question history"
          : modes.find((item) => item.id === mode)?.title}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={"Start practice with " + count + " questions"}
        accessibilityState={{ disabled: count === 0 }}
        disabled={count === 0}
        onPress={start}
        style={[styles.primary, count === 0 && styles.disabled]}
      >
        <Text style={styles.primaryText}>Start practice</Text>
      </Pressable>
      <Text style={styles.summaryHint}>
        Use the Learn tab for guided lessons and topic checks. This practice
        updates your question revision.
      </Text>
      {count === 0 ? (
        <Text style={styles.summaryHint}>
          No matching questions. Change your practice options.
        </Text>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((value) => !value)}
        style={styles.options}
      >
        <Text style={styles.chipText}>
          Practice options {expanded ? "−" : "+"}
        </Text>
      </Pressable>
      {expanded ? (
        <>
          <Text style={styles.heading}>Focus</Text>
          <View style={styles.row}>
            {modes.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityState={{ selected: mode === item.id }}
                accessibilityHint={item.detail}
                onPress={() => setMode(item.id)}
                style={[styles.chip, mode === item.id && styles.selected]}
              >
                <Text
                  style={[
                    styles.chipText,
                    mode === item.id && styles.activeText,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.heading}>Number of questions</Text>
          <View style={styles.row}>
            {[5, 10, 20].map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityState={{ selected: limit === value }}
                onPress={() => setLimit(value)}
                accessibilityLabel={value + " questions"}
                style={[styles.length, limit === value && styles.selected]}
              >
                <Text
                  style={[
                    styles.chipText,
                    limit === value && styles.activeText,
                  ]}
                >
                  {value}
                </Text>
              </Pressable>
            ))}
          </View>
          <TopicPicker
            multiple
            accessibilityLabel="Choose practice topics"
            selected={topics}
            onChange={setTopics}
            items={topicStats.map((item) => ({
              id: item.topic,
              detail:
                item.questionsTried +
                "/" +
                item.totalQuestions +
                " tried · " +
                item.recentMistakes +
                " to retry",
            }))}
          />
          <Text style={styles.summaryHint}>{eligible.length} available</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  summaryHint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 6,
  },
  options: { minHeight: 48, justifyContent: "center", marginVertical: 18 },
  title: { color: colors.ink, fontSize: 26, fontWeight: "900", marginTop: 8 },
  heading: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 6,
  },
  length: {
    flex: 1,
    minHeight: 44,
    padding: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 46,
  },
  chipText: { color: colors.ink, fontWeight: "700", fontSize: 13 },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  activeText: { color: colors.primary },
  summary: {
    backgroundColor: colors.ink,
    borderRadius: 16,
    padding: 16,
    marginTop: 2,
  },
  summaryTitle: { color: colors.white, fontWeight: "800", fontSize: 21 },
  summaryBody: {
    color: colors.primarySoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  primary: {
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    marginTop: 15,
  },
  primaryText: { color: colors.white, fontWeight: "800", fontSize: 14 },
  disabled: { opacity: 0.45 },
});
