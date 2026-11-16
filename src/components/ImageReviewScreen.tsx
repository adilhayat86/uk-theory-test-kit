import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import manifest from '../assets/illustrations-v2/image-manifest.json';
import { draftImageSources } from '../data/draftImageSources';
import type { DraftImageId } from '../data/draftImageSources';

/** Internal artwork QA. No draft is assigned to a learner question by this screen. */
export default function ImageReviewScreen() {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const assets = useMemo(() => manifest.assets.filter((asset) =>
    `${asset.id} ${asset.category} ${asset.description}`.toLowerCase().includes(query.toLowerCase().trim())), [query]);
  const asset = assets[index];
  return <View>
    <Text accessibilityRole="header" style={styles.title}>My images</Text>
    <Text style={styles.description}>{manifest.assets.length} original images · available offline</Text>
    <Text style={styles.warning}>Draft collection · review in progress</Text>
    <TextInput accessibilityLabel="Search my images" placeholder="Search description, category or ID"
      value={query} onChangeText={(value) => { setQuery(value); setIndex(0); }} style={styles.search} />
    {asset ? <>
      <Text accessibilityLiveRegion="polite" style={styles.description}>{index + 1} of {assets.length} · {asset.category.replace(/_/g, ' ')}</Text>
      <Image key={asset.id} source={draftImageSources[asset.id as DraftImageId]}
        accessible accessibilityRole="image" accessibilityLabel={asset.description}
        resizeMode="contain" style={{ width: '100%', aspectRatio: asset.width / asset.height, maxHeight: 360 }} />
      <Text style={styles.description}>{asset.description}</Text>
      <View style={styles.navigation}>
        <Pressable accessibilityRole="button" disabled={index === 0} accessibilityState={{ disabled: index === 0 }}
          onPress={() => setIndex((value) => value - 1)} style={[styles.button, index === 0 && styles.disabledButton]}>
          <Text style={styles.buttonText}>Previous image</Text></Pressable>
        <Pressable accessibilityRole="button" disabled={index + 1 >= assets.length}
          accessibilityState={{ disabled: index + 1 >= assets.length }}
          onPress={() => setIndex((value) => value + 1)} style={[styles.button, index + 1 >= assets.length && styles.disabledButton]}>
          <Text style={styles.buttonText}>Next image</Text></Pressable>
      </View>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: showDetails }}
        onPress={() => setShowDetails((value) => !value)} style={styles.detailsButton}>
        <Text style={styles.buttonText}>{showDetails ? 'Hide image details' : 'Show image details'}</Text>
      </Pressable>
      {showDetails ? <View>
        <Text selectable style={styles.description}>Image ID: {asset.id}</Text>
        <Text style={styles.description}>Draft — awaiting review</Text>
        <Text style={styles.description}>{asset.reviewNotes}</Text>
        <Text style={styles.description}>Size: {asset.width} × {asset.height}</Text>
      </View> : null}
    </> : <Text style={styles.description}>No images match your search.</Text>}
  </View>;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: '#132B3A', marginVertical: 12 },
  description: { fontSize: 14, lineHeight: 21, color: '#40516A', marginVertical: 8 },
  warning: { fontSize: 14, lineHeight: 21, fontWeight: '700', color: '#9A4D0B', marginVertical: 10 },
  search: { borderWidth: 1, borderColor: '#CBD6E6', borderRadius: 12, padding: 12, minHeight: 48 },
  navigation: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  button: { padding: 14, backgroundColor: '#E6F5F3', borderRadius: 12, minHeight: 48, marginVertical: 8 },
  buttonText: { color: '#132B3A', fontWeight: '700' },
  disabledButton: { opacity: 0.45 },
  detailsButton: { paddingVertical: 14, minHeight: 48, alignSelf: 'flex-start' },
});
