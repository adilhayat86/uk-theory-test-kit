import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { brandAssets } from '../data/brandAssets';
import type { RootScreen } from '../domain/navigation';

const tabs: { screen: RootScreen; label: string; icon: keyof typeof brandAssets }[] = [
  { screen: 'home', label: 'Home', icon: 'home' },
  { screen: 'setup', label: 'Practice', icon: 'practice' },
  { screen: 'roadSigns', label: 'Signs', icon: 'signs' },
  { screen: 'saved', label: 'Saved', icon: 'saved' },
  { screen: 'progress', label: 'Progress', icon: 'progress' },
];

export default function BottomNavigation({ active, onSelect }: { active: RootScreen; onSelect: (screen: RootScreen) => void }) {
  return <View style={styles.bar}>{tabs.map((tab) => <Pressable key={tab.screen}
    accessibilityRole="tab" accessibilityLabel={tab.label + ' tab'} accessibilityState={{ selected: active === tab.screen }}
    onPress={() => onSelect(tab.screen)} style={styles.tab}>
    <View style={[styles.iconFrame, active === tab.screen && styles.selected]}>
      <Image accessible={false} source={brandAssets[tab.icon]} style={[styles.iconImage, active !== tab.screen && styles.mutedIcon]} />
    </View>
    <Text style={[styles.label, active === tab.screen && styles.active]}>{tab.label}</Text>
  </Pressable>)}</View>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#DFE8E6', backgroundColor: '#FFFFFF', paddingTop: 5, paddingBottom: 3 },
  tab: { flex: 1, minHeight: 58, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  iconFrame: { width: 45, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 15 },
  selected: { backgroundColor: '#E6F5F3' },
  iconImage: { width: 23, height: 23 }, mutedIcon: { opacity: 0.5 },
  icon: { fontSize: 21, lineHeight: 26, color: '#77869A' },
  label: { color: '#66758B', fontSize: 10, fontWeight: '700', marginTop: 3 },
  active: { color: '#087E8B', fontWeight: '900' },
});
