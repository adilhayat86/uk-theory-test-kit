import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { brandAssets } from "../data/brandAssets";
import type { RootScreen } from "../domain/navigation";
import { colors } from "../theme";

const tabs: {
  screen: RootScreen;
  label: string;
  icon: keyof typeof brandAssets;
}[] = [
  { screen: "home", label: "Learn", icon: "home" },
  { screen: "setup", label: "Practise", icon: "practice" },
  { screen: "mock", label: "Exams", icon: "timed" },
  { screen: "progress", label: "Progress", icon: "progress" },
];

export default function BottomNavigation({
  active,
  onSelect,
}: {
  active: RootScreen;
  onSelect: (screen: RootScreen) => void;
}) {
  const { fontScale } = useWindowDimensions();
  // Keep the longest label together at large text sizes; system scaling still applies.
  const largeText = fontScale >= 1.6;
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.screen}
          accessibilityRole="tab"
          accessibilityLabel={tab.label + " tab"}
          accessibilityState={{ selected: active === tab.screen }}
          onPress={() => onSelect(tab.screen)}
          style={styles.tab}
        >
          <View
            style={[styles.iconFrame, active === tab.screen && styles.selected]}
          >
            <Image
              accessible={false}
              source={brandAssets[tab.icon]}
              style={[
                styles.iconImage,
                active !== tab.screen && styles.mutedIcon,
              ]}
            />
          </View>
          <Text
            style={[
              styles.label,
              largeText && styles.largeLabel,
              active === tab.screen && styles.active,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingTop: 7,
    paddingBottom: 4,
  },
  tab: {
    flex: 1,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  iconFrame: {
    width: 44,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  selected: { backgroundColor: colors.lime },
  iconImage: { width: 22, height: 22 },
  mutedIcon: { tintColor: colors.muted },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  largeLabel: { fontSize: 9 },
  active: { color: colors.ink, fontWeight: "900" },
});
