import React, { useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { appInformation } from "../data/appInformation";
import { colors } from "../theme";

export function emailSupport() {
  const url = `mailto:${appInformation.supportEmail}?subject=${encodeURIComponent(appInformation.supportSubject)}`;
  void Linking.openURL(url).catch(() => {
    Alert.alert("Email support", `Write to ${appInformation.supportEmail} from your email app.`);
  });
}

const sections = [
  {
    id: "study", title: "How to use the course",
    paragraphs: [
      "Start in Learn. Read a lesson, work through its road example and recap, then confirm that you have studied it. Your reading position is saved; simply opening a lesson does not complete it.",
      "Study every lesson in a topic to unlock its 10-question check. Pass with 8 correct to complete the topic. A later unsuccessful check marks it for revision.",
      "Use Practise for short revision sessions. Smart revision brings recent mistakes first. Progress keeps reading, topic checks, question practice and exam results separate.",
      "A full multiple-choice mock has 50 questions, 57 minutes and a practice pass mark of 43. You may enter directly after confirming that you have studied here or elsewhere. The timer keeps running when you leave the app.",
    ],
  },
  {
    id: "scope", title: "What is included",
    paragraphs: [
      "38 lessons in 15 topics, 309 original revision questions, 30 illustrated road-sign notes and three original silent video case studies. All study content is included and works offline after installation.",
      "This is independent Great Britain car-theory revision. It is not affiliated with DVSA, a licensed official question bank or a full Highway Code reproduction. Northern Ireland-specific rules and a hazard-perception simulator are not included.",
      "There are no adverts, subscriptions or in-app purchases. Google Play handles the one-time app purchase and downloads. You do not need an account inside this app.",
      "Lesson confirmations and practice scores help organise revision. They do not certify driving ability or guarantee an official test pass.",
    ],
  },
  {
    id: "privacy", title: "Privacy and your saved data",
    paragraphs: [
      "Your answers, reading positions, study confirmations, topic-check results, exam attempts, bookmarks and saved signs are stored in this app on this phone. Your study history is not sent to a developer server.",
      "The app does not ask for your name, location, contacts, photos or payment-card details. It has no advertising, analytics, remote progress profile or account system.",
      "Automatic cloud backup and device transfer of this app's study data are disabled. There is no progress sync between phones. Uninstalling the app, clearing its storage or resetting learning data removes that saved history.",
      "Lessons, images and videos are bundled with the app. Source and licence links open websites in your browser and need an internet connection. Email support opens your email app; no study history is attached automatically.",
      "Google Play and Android may handle purchases and technical diagnostics under their own policies. Contact the developer using the support email below for privacy questions.",
    ],
  },
  {
    id: "sources", title: "Sources and acknowledgements",
    paragraphs: [
      "Lessons and answer explanations identify their primary sources. Check current official guidance and your own vehicle handbook when applying a rule or interpreting a warning lamp.",
      "Sign illustrations: Department for Transport, Crown copyright 2023. Contains public sector information licensed under the Open Government Licence v3.0, except identified exclusions. The video scenarios are original educational animations, not DVSA footage.",
    ],
  },
];

export default function HelpScreen({ onReset, resetting = false }: {
  onReset: () => void; resetting?: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>("study");
  return <View>
    <Text accessibilityRole="header" style={s.title}>Help & app information</Text>
    <Text style={s.body}>{appInformation.name} · Version {appInformation.version}</Text>
    {sections.map((section) => <View key={section.id} style={s.card}>
      <Pressable accessibilityRole="button" accessibilityLabel={section.title}
        accessibilityState={{ expanded: expanded === section.id }}
        onPress={() => setExpanded(value => value === section.id ? null : section.id)} style={s.headingRow}>
        <Text style={s.heading}>{section.title}</Text>
        <Text accessible={false} style={s.symbol}>{expanded === section.id ? "−" : "+"}</Text>
      </Pressable>
      {expanded === section.id ? <View>
        {section.paragraphs.map(paragraph => <Text key={paragraph} style={s.body}>{paragraph}</Text>)}
        {section.id === "sources" ? <Pressable accessibilityRole="link" style={s.linkButton}
          onPress={() => { void Linking.openURL("https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/")
            .catch(() => Alert.alert("Unable to open link", "Connect to the internet and try again.")); }}>
          <Text style={s.link}>Read the Open Government Licence ↗</Text>
        </Pressable> : null}
      </View> : null}
    </View>)}
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.heading}>Support</Text>
      <Text selectable style={s.body}>{appInformation.supportEmail}</Text>
      <Text style={s.body}>Tell us the lesson or question, what happened and your app version. You can also report a content mistake. Please do not send payment-card or identity details.</Text>
      <Pressable accessibilityRole="button" onPress={emailSupport} style={s.linkButton}>
        <Text style={s.link}>Email support</Text>
      </Pressable>
    </View>
    <View style={s.card}>
      <Text accessibilityRole="header" style={s.heading}>Start again</Text>
      <Text style={s.body}>Reset all lesson progress, question history, practice sessions, mock exams and saved items on this phone. The course and videos remain available.</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Reset learning data"
        accessibilityState={{ disabled: resetting }} disabled={resetting}
        onPress={onReset} style={s.linkButton}>
        <Text style={s.danger}>Reset learning data</Text>
      </Pressable>
    </View>
  </View>;
}

const s = StyleSheet.create({
  title: { fontSize: 25, lineHeight: 33, fontWeight: "800", color: colors.ink },
  body: { fontSize: 14, lineHeight: 23, color: colors.muted, marginTop: 10 },
  card: { padding: 17, marginTop: 17, borderWidth: 1, borderColor: colors.border,
    borderRadius: 16, backgroundColor: colors.surface },
  headingRow: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: 12 },
  heading: { flexShrink: 1, fontSize: 17, lineHeight: 25, fontWeight: "700", color: colors.ink },
  symbol: { marginLeft: "auto", color: colors.primary, fontSize: 24 },
  linkButton: { minHeight: 48, justifyContent: "center", marginTop: 8 },
  link: { color: colors.primary, fontSize: 14, lineHeight: 22, fontWeight: "700" },
  danger: { color: colors.danger, fontSize: 14, lineHeight: 22, fontWeight: "700" },
});
