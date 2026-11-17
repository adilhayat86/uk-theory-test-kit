import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { LearningOverview } from "../domain/learningProgress";
import type { ProgressSummary } from "../domain/progress";
import { colors } from "../theme";
import { CoverageCard, TopicProgressRow } from "./LearningOverview";

type Props = {
  overview: LearningOverview;
  summary: ProgressSummary;
  active: boolean;
  onTimed: () => void;
  onTopic: (topic: string) => void;
};
export default function ProgressScreen({
  overview,
  summary,
  active,
  onTimed,
  onTopic,
}: Props) {
  const [details, setDetails] = useState(false);
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: details }}
        onPress={() => setDetails((v) => !v)}
        style={s.goalAction}
      >
        <Text style={s.actionText}>
          Question practice details {details ? "−" : "+"}
        </Text>
      </Pressable>
      {details ? (
        <>
          <CoverageCard overview={overview} />
          <View style={s.accuracy}>
            <Text style={s.accuracyValue}>
              {summary.totalAttempts ? `${summary.accuracyPercent}%` : "—"}
            </Text>
            <View style={s.accuracyCopy}>
              <Text style={s.cardTitle}>Answer accuracy</Text>
              <Text style={s.body}>
                {summary.correctAttempts} correct across {summary.totalAttempts}{" "}
                attempts
              </Text>
            </View>
          </View>
          <Text style={s.sectionTitle}>Question coverage by topic</Text>
          {overview.topics.map((item) => (
            <TopicProgressRow
              key={item.topic}
              item={item}
              onPress={() => onTopic(item.topic)}
            />
          ))}
          <Text style={s.body}>
            Coverage counts answered questions. It is separate from studying
            lessons, passing topic checks and mock-exam results.
          </Text>
        </>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  eyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: { fontSize: 29, color: colors.ink, fontWeight: "900", marginTop: 8 },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.muted,
    marginTop: 6,
    marginBottom: 19,
  },
  accuracy: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 12,
  },
  accuracyValue: { fontSize: 30, fontWeight: "900", color: colors.primary },
  accuracyCopy: { flexShrink: 1 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
    flexShrink: 1,
  },
  body: { fontSize: 12, lineHeight: 19, color: colors.muted, marginTop: 5 },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 23,
    marginBottom: 12,
  },
  goal: {
    borderRadius: 17,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  goalHeading: { flexDirection: "row", alignItems: "center", gap: 10 },
  number: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    padding: 8,
    borderRadius: 8,
  },
  goalAction: { minHeight: 44, justifyContent: "center", marginTop: 6 },
  actionText: { fontSize: 12, fontWeight: "800", color: colors.primary },
  note: {
    borderRadius: 17,
    padding: 17,
    backgroundColor: colors.primarySoft,
    marginTop: 12,
  },
});
