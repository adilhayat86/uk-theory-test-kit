import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { TheoryQuestion } from '../data/questions';

// Static requires: PNGs are packaged in the APK, not downloaded.
const assets = {
  'zebra-crossing': { source: require('../assets/zebra-crossing.png'), label: 'Zebra crossing illustration' },
  'no-entry': { source: require('../assets/no-entry.png'), label: 'No entry road sign' },
  'stop-sign': { source: require('../assets/stop-sign.png'), label: 'STOP road sign' },
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
