import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import { emailSupport } from "./HelpScreen";

export default function StorageRecoveryScreen({ onRetry }: { onRetry: () => void }) {
  return <SafeAreaView style={s.safeArea}><ScrollView contentContainerStyle={s.screen}>
    <Text accessibilityRole="header" style={s.title}>Your saved learning could not be opened</Text>
    <Text style={s.body}>Try loading it again. Your existing progress will be kept while the app reconnects to its local storage.</Text>
    <Pressable accessibilityRole="button" onPress={onRetry} style={s.button}>
      <Text style={s.buttonText}>Try loading again</Text>
    </Pressable>
    <Pressable accessibilityRole="button" onPress={emailSupport} style={s.secondary}>
      <Text style={s.link}>Email support</Text>
    </Pressable>
  </ScrollView></SafeAreaView>;
}
const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  screen: { flexGrow: 1, padding: 28, justifyContent: "center" },
  title: { fontSize: 24, lineHeight: 33, fontWeight: "800", color: colors.ink },
  body: { fontSize: 15, lineHeight: 25, color: colors.muted, marginVertical: 18 },
  button: { minHeight: 50, padding: 16, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center" },
  buttonText: { fontWeight: "700", fontSize: 15, color: "#fff" },
  secondary: { minHeight: 48, justifyContent: "center", alignItems: "center", marginTop: 10 },
  link: { fontSize: 14, fontWeight: "700", color: colors.primary },
});
