import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import manifest from '../assets/illustrations-v2/image-manifest.json';
import { draftImageSources } from '../data/draftImageSources';
import type { DraftImageId } from '../data/draftImageSources';

/** Internal artwork QA. No draft is assigned to a learner question by this screen. */
export default function ImageReviewScreen({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const assets = useMemo(() => manifest.assets.filter((asset) =>
    `${asset.id} ${asset.category} ${asset.description}`.toLowerCase().includes(query.toLowerCase().trim())), [query]);
  const asset = assets[index];
  return <View>
    <Pressable accessibilityRole="button" onPress={onBack} style={styles.button}><Text>‹ Home</Text></Pressable>
    <Text style={styles.title}>Artwork review</Text>
    <Text style={styles.warning}>121 draft images · 0 approved. For technical and editorial review only.</Text>
    <TextInput accessibilityLabel="Search draft artwork" placeholder="Search description, category or ID"
      value={query} onChangeText={(value) => { setQuery(value); setIndex(0); }} style={styles.search} />
    {asset ? <>
      <Text style={styles.description}>{index + 1} of {assets.length} · {asset.category}</Text>
      <Image key={asset.id} source={draftImageSources[asset.id as DraftImageId]}
        accessible accessibilityRole="image" accessibilityLabel={asset.description}
        resizeMode="contain" style={{ width: '100%', aspectRatio: asset.width / asset.height, maxHeight: 360 }} />
      <Text selectable style={styles.description}>{asset.id}</Text>
      <Text style={styles.description}>{asset.description}</Text>
      <Text style={styles.warning}>{asset.status}</Text>
      <Text style={styles.description}>{asset.reviewNotes}</Text>
      <Text style={styles.description}>Size: {asset.width} × {asset.height}. A suggested question ID is not an approved binding.</Text>
      <View style={styles.navigation}>
        <Pressable accessibilityRole="button" disabled={index === 0} accessibilityState={{ disabled: index === 0 }}
          onPress={() => setIndex((value) => value - 1)} style={styles.button}><Text>Previous image</Text></Pressable>
        <Pressable accessibilityRole="button" disabled={index + 1 >= assets.length}
          accessibilityState={{ disabled: index + 1 >= assets.length }}
          onPress={() => setIndex((value) => value + 1)} style={styles.button}><Text>Next image</Text></Pressable>
      </View>
    </> : <Text style={styles.description}>No matching artwork.</Text>}
  </View>;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: '#14233B', marginVertical: 12 },
  description: { fontSize: 14, lineHeight: 21, color: '#40516A', marginVertical: 8 },
  warning: { fontSize: 14, lineHeight: 21, fontWeight: '700', color: '#9A4D0B', marginVertical: 10 },
  search: { borderWidth: 1, borderColor: '#CBD6E6', borderRadius: 12, padding: 12, minHeight: 48 },
  navigation: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  button: { padding: 14, backgroundColor: '#EAF1FF', borderRadius: 12, minHeight: 48, marginVertical: 8 },
});
