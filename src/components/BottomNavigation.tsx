import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { RootScreen } from '../domain/navigation';

const tabs: { screen: RootScreen; label: string; icon: string }[] = [
  { screen: 'home', label: 'Home', icon: '⌂' },
  { screen: 'setup', label: 'Practice', icon: '✓' },
  { screen: 'roadSigns', label: 'Signs', icon: '△' },
  { screen: 'saved', label: 'Saved', icon: '☆' },
  { screen: 'progress', label: 'Progress', icon: '▥' },
];

export default function BottomNavigation({ active, onSelect }: { active: RootScreen; onSelect: (screen: RootScreen) => void }) {
  return <View style={styles.bar}>{tabs.map((tab) => <Pressable key={tab.screen}
    accessibilityRole="tab" accessibilityLabel={tab.label + ' tab'} accessibilityState={{ selected: active === tab.screen }}
    onPress={() => onSelect(tab.screen)} style={styles.tab}>
    <View style={[styles.iconFrame, active === tab.screen && styles.selected]}>
      <Text accessible={false} style={[styles.icon, active === tab.screen && styles.active]}>{tab.icon}</Text>
    </View>
    <Text style={[styles.label, active === tab.screen && styles.active]}>{tab.label}</Text>
  </Pressable>)}</View>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#E0E7F2', backgroundColor: '#FFFFFF', paddingTop: 5, paddingBottom: 3 },
  tab: { flex: 1, minHeight: 58, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  iconFrame: { width: 45, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 15 },
  selected: { backgroundColor: '#EAF1FF' },
  icon: { fontSize: 21, lineHeight: 26, color: '#77869A' },
  label: { color: '#66758B', fontSize: 10, fontWeight: '700', marginTop: 3 },
  active: { color: '#2456C7', fontWeight: '900' },
});
