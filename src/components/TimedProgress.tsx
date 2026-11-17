import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { MockResult } from "../domain/mockExam";
import { getMockResults } from "../storage/database";
import { colors } from "../theme";

type Props = { onOpen: () => void };

export default function TimedProgress({ onOpen }: Props) {
  const [results, setResults] = useState<MockResult[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    getMockResults(3)
      .then((saved) => {
        if (mounted) setResults(saved);
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.title}>
        Mock exam results
      </Text>
      <Text style={styles.note}>
        Mock exam results are tracked separately from question coverage.
      </Text>
      <View style={styles.card}>
        {failed ? (
          <Text accessibilityRole="alert" style={styles.message}>
            Your exam history could not be loaded. Open exams to try again.
          </Text>
        ) : results === null ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.message}>Loading exams…</Text>
          </View>
        ) : results.length === 0 ? (
          <Text style={styles.message}>No exams completed yet</Text>
        ) : (
          results.map((result) => (
            <TimedResult key={result.id} result={result} />
          ))
        )}
        <Pressable
          accessibilityRole="button"
          onPress={onOpen}
          style={styles.action}
        >
          <Text style={styles.actionText}>
            {results?.length === 0 ? "Go to exams" : "View exams"} →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TimedResult({ result }: { result: MockResult }) {
  const validScore =
    Number.isInteger(result.total) &&
    result.total > 0 &&
    Number.isInteger(result.correct) &&
    result.correct >= 0 &&
    result.correct <= result.total;
  const percent = validScore
    ? Math.round((result.correct / result.total) * 100)
    : null;
  const finished = new Date(result.finishedAt);
  const date =
    Number.isFinite(result.finishedAt) && Number.isFinite(finished.getTime())
      ? finished.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Date unavailable";

  return (
    <View
      accessible
      accessibilityLabel={`${date}, ${validScore ? `${result.correct} of ${result.total} correct, ${percent} percent` : "Score unavailable"}`}
      style={styles.result}
    >
      <Text style={styles.date}>
        {result.mode === "full" ? "Full mock" : "Warm-up"} · {date}
      </Text>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>
          {validScore
            ? `${result.correct}/${result.total}`
            : "Score unavailable"}
        </Text>
        {percent !== null ? (
          <Text style={styles.percent}>{percent}% correct</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 23 },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: 7,
  },
  note: { fontSize: 12, lineHeight: 19, color: colors.muted, marginBottom: 12 },
  card: {
    borderRadius: 17,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  loading: { flexDirection: "row", alignItems: "center", gap: 10 },
  message: { fontSize: 13, lineHeight: 20, color: colors.muted, flexShrink: 1 },
  result: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  date: { fontSize: 12, lineHeight: 19, color: colors.muted },
  scoreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 4,
  },
  score: { fontSize: 23, fontWeight: "900", color: colors.ink },
  percent: {
    fontSize: 12,
    lineHeight: 19,
    fontWeight: "800",
    color: colors.primary,
  },
  action: {
    minHeight: 44,
    justifyContent: "center",
    marginTop: 8,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 12,
    lineHeight: 19,
    fontWeight: "800",
    color: colors.primary,
  },
});
