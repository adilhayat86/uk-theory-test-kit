import { colors } from "../theme";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { questions } from "../data/questions";
import type { TheoryQuestion } from "../data/questions";
import TopicPicker from "./TopicPicker";
import { searchQuestions } from "../domain/questionSearch";

type Props = { onPractise: (items: TheoryQuestion[]) => void };

export default function QuestionSearchScreen({ onPractise }: Props) {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [topic, setTopic] = useState("All topics");
  const topics = useMemo(
    () =>
      [...new Set(questions.map((item) => item.topic))].map((id) => ({ id })),
    [],
  );
  const results = useMemo(
    () =>
      !query.trim() && topic === "All topics"
        ? []
        : searchQuestions(
            questions.filter(
              (item) => topic === "All topics" || topic === item.topic,
            ),
            query,
          ),
    [query, topic],
  );

  return (
    <View>
      <Text style={styles.subheading}>
        Find a rule, situation or question to revise.
      </Text>
      <TextInput
        accessibilityLabel="Search theory questions"
        placeholder="Search by keyword, topic or rule…"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCorrect={false}
        style={styles.search}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: filtersOpen }}
        onPress={() => setFiltersOpen((value) => !value)}
        style={styles.filterToggle}
      >
        <Text style={styles.link}>Topic filter {filtersOpen ? "−" : "+"}</Text>
      </Pressable>
      {filtersOpen ? (
        <TopicPicker
          accessibilityLabel="Choose search topic"
          items={topics}
          selected={topic === "All topics" ? [] : [topic]}
          onChange={(ids) => setTopic(ids[0] ?? "All topics")}
        />
      ) : null}
      {query.trim() || topic !== "All topics" ? (
        <Text style={styles.counter}>
          {results.length} matching question{results.length === 1 ? "" : "s"}
        </Text>
      ) : null}
      {results.length > 1 ? (
        <Pressable
          accessibilityRole="button"
          style={styles.primary}
          onPress={() => onPractise(results)}
        >
          <Text style={styles.primaryText}>
            Practise all {results.length} matches
          </Text>
        </Pressable>
      ) : null}
      {results.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {!query.trim() && topic === "All topics"
              ? "Type a keyword or rule number to begin."
              : "No matches. Try another word or topic."}
          </Text>
        </View>
      ) : (
        results.map((item) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={"Practise question: " + item.prompt}
            key={item.id}
            style={styles.result}
            onPress={() => onPractise([item])}
          >
            <Text style={styles.topic}>{item.topic.toUpperCase()}</Text>
            <Text style={styles.prompt}>{item.prompt}</Text>
            <Text style={styles.link}>Practise this question ›</Text>
          </Pressable>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterToggle: { minHeight: 44, justifyContent: "center" },
  link: { color: colors.primary, fontWeight: "800", fontSize: 13 },
  heading: { fontSize: 25, fontWeight: "900", color: colors.ink, marginTop: 4 },
  subheading: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 14,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
    minHeight: 52,
  },
  counter: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },
  primary: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    backgroundColor: colors.primary,
    borderRadius: 13,
    marginBottom: 10,
  },
  primaryText: { color: colors.white, fontWeight: "800", fontSize: 14 },
  result: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 10,
  },
  topic: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 0.6,
  },
  prompt: {
    color: colors.ink,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 9,
  },
  empty: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
  },
  emptyText: { color: colors.muted, lineHeight: 20 },
});
