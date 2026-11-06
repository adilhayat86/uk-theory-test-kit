import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { TheoryQuestion } from '../data/questions';

// Static requires: PNGs are packaged in the APK, not downloaded.
const assets = {
  'zebra-crossing': { source: require('../assets/zebra-crossing.png'), label: 'Zebra crossing illustration' },
  'no-entry': { source: require('../assets/no-entry.png'), label: 'No entry road sign' },
  'stop-sign': { source: require('../assets/stop-sign.png'), label: 'STOP road sign' },
  'give-way': { source: require('../assets/give-way.png'), label: 'Give way sign' },
  'speed-limit-30': { source: require('../assets/speed-limit-30.png'), label: '30 mph maximum speed sign' },
  'speed-limit-50': { source: require('../assets/speed-limit-50.png'), label: '50 mph maximum speed sign' },
  'national-speed-limit': { source: require('../assets/national-speed-limit.png'), label: 'National speed limit applies sign' },
  'keep-left': { source: require('../assets/keep-left.png'), label: 'Keep left instruction sign' },
  'signals-ahead': { source: require('../assets/signals-ahead.png'), label: 'Traffic signals ahead warning sign' },
};
export default function QuestionIllustration({ question }: { question: TheoryQuestion }) {
  const item = question.imageAssetId ? assets[question.imageAssetId] : undefined;
  if (!item) return null;
  return <View style={styles.frame}>
    <Image source={item.source} style={styles.image} resizeMode="contain" accessibilityLabel={item.label} />
    <Text style={styles.caption}>{item.label}</Text>
  </View>;
}
const styles = StyleSheet.create({
  frame: { alignItems: 'center', backgroundColor: '#F4F7FB', borderRadius: 12, padding: 12, marginBottom: 14 },
  image: { width: 160, height: 160 },
  caption: { marginTop: 6, color: '#5D6F85', fontSize: 11 },
});
