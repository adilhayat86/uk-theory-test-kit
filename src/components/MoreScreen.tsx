import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import type { Screen } from "../domain/navigation";
import { colors } from "../theme";
import { appInformation } from "../data/appInformation";
const tools: { title: string; screen: Screen }[] = [
  { title: "Road signs", screen: "roadSigns" },
  { title: "Saved questions", screen: "saved" },
  { title: "Flashcards", screen: "flashcards" },
  { title: "Search questions", screen: "search" },
  { title: "Help & app information", screen: "help" },
];
export default function MoreScreen({
  onOpen,
  artworkReview,
}: {
  onOpen: (screen: Screen) => void;
  artworkReview: boolean;
}) {
  return (
    <View>
      {tools.map((item) => (
        <Pressable
          key={item.screen}
          accessibilityRole="button"
          onPress={() => onOpen(item.screen)}
          style={s.row}
        >
          <Text style={s.label}>{item.title}</Text>
          <Text accessible={false} style={s.arrow}>
            ›
          </Text>
        </Pressable>
      ))}
      {artworkReview ? (
        <View style={s.review}>
          <Text style={s.muted}>Artwork review</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => onOpen("imageReview")}
            style={s.row}
          >
            <Text style={s.label}>My images</Text>
            <Text accessible={false} style={s.arrow}>
              ›
            </Text>
          </Pressable>
        </View>
      ) : null}
      <Text style={s.footer}>{appInformation.name} · Version {appInformation.version}</Text>
      <Text style={s.muted}>
        Independent Great Britain revision. Not affiliated with DVSA. Works
        offline.
      </Text>
      <Text style={[s.muted, { marginTop: 14 }]}>
        Sign illustrations: Department for Transport, Crown copyright 2023.
        Contains public sector information licensed under the Open Government
        Licence v3.0.
      </Text>
      <Pressable
        accessibilityRole="link"
        onPress={() => {
          void Linking.openURL(
            "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
          ).catch(() => undefined);
        }}
        style={{ minHeight: 44, justifyContent: "center" }}
      >
        <Text style={{ color: colors.primary, fontSize: 12 }}>
          View the Open Government Licence ↗
        </Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  row: {
    minHeight: 56,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: { fontSize: 16, color: colors.ink, flex: 1 },
  arrow: { fontSize: 20, color: colors.muted },
  review: { marginTop: 28 },
  muted: { fontSize: 12, lineHeight: 19, color: colors.muted },
  footer: { fontSize: 12, color: colors.muted, marginTop: 28, marginBottom: 6 },
});
