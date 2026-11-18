import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { courseLessons } from "../data/course";
import type { RevisionFocus } from "../domain/revisionFocus";
import { colors } from "../theme";

export default function RevisionFocusCard({ focus, onRevise, onReadLesson }: {
  focus?: RevisionFocus;
  onRevise?: () => void;
  onReadLesson?: (id: string) => void;
}) {
  if (!focus?.mistakeCount) return null;
  const lessons = focus.lessonIds.slice(0, 2).flatMap((id) => {
    const lesson = courseLessons.find((item) => item.id === id);
    return lesson ? [lesson] : [];
  });
  return <View style={s.card}>
    <Text accessibilityRole="header" style={s.title}>Your revision focus</Text>
    <Text style={s.body}>{focus.mistakeCount} answered question{focus.mistakeCount === 1 ? "" : "s"} to revisit. A newer correct answer clears a mistake.</Text>
    <Text style={s.topics}>{focus.topics.slice(0, 2).map((item) => `${item.topic} · ${item.count}`).join("   ")}</Text>
    {onRevise ? <Pressable accessibilityRole="button" accessibilityLabel="Practise mistakes"
      onPress={onRevise} style={s.button}><Text style={s.buttonText}>Practise mistakes</Text></Pressable> : null}
    {onReadLesson ? lessons.map((lesson) => <Pressable key={lesson.id} accessibilityRole="button"
      accessibilityLabel={"Read: " + lesson.title} onPress={() => onReadLesson(lesson.id)} style={s.lesson}>
      <Text style={s.link}>Read: {lesson.title} ›</Text>
    </Pressable>) : null}
  </View>;
}
const s = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 17, padding: 17, marginTop: 17 },
  title: { fontSize: 18, lineHeight: 25, fontWeight: "800", color: colors.ink },
  body: { fontSize: 13, lineHeight: 21, color: colors.muted, marginTop: 8 },
  topics: { fontSize: 12, lineHeight: 20, color: colors.ink, marginTop: 8 },
  button: { minHeight: 48, justifyContent: "center", alignItems: "center", backgroundColor: colors.primarySoft, borderRadius: 11, padding: 13, marginTop: 12 },
  buttonText: { color: colors.primary, fontSize: 13, fontWeight: "800" },
  lesson: { minHeight: 44, justifyContent: "center", paddingVertical: 10 },
  link: { color: colors.primary, fontSize: 13, lineHeight: 20, fontWeight: "700" },
});
