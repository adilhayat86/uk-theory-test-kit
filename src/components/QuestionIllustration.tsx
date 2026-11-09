import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { TheoryQuestion } from '../data/questions';

import { illustrationAssets, illustrationPresentation } from '../data/illustrationAssets';
import type { IllustrationContext, IllustrationId } from '../data/illustrationAssets';
import { questionTeachingImages } from '../data/teachingImages';

export function Illustration({ assetId, context = 'question' }: {
  assetId: IllustrationId; context?: IllustrationContext;
}) {
  const item = illustrationAssets[assetId];
  const presentation = illustrationPresentation(assetId, context);
  return <View style={styles.frame}>
    <Image source={item.source} style={[styles.image, { aspectRatio: item.width / item.height }]}
      resizeMode="contain" accessible accessibilityRole="image"
      accessibilityLabel={presentation.accessibilityLabel} />
    {presentation.caption ? <Text style={styles.caption}>{presentation.caption}</Text> : null}
  </View>;
}

export default function QuestionIllustration({ question, context = 'question' }: {
  question: TheoryQuestion; context?: IllustrationContext;
}) {
  const teachingId = questionTeachingImages[question.id as keyof typeof questionTeachingImages];
  // Teaching diagrams can contain clues. Never show them on an unanswered question.
  const assetId = question.imageAssetId ?? (context !== 'question' ? teachingId : undefined);
  return assetId ? <Illustration assetId={assetId} context={context} /> : null;
}
const styles = StyleSheet.create({
  frame: { alignItems: 'center', backgroundColor: '#F4F7FB', borderRadius: 12, padding: 12, marginBottom: 14 },
  image: { width: '100%', maxWidth: 400, maxHeight: 260 },
  caption: { marginTop: 6, color: '#5D6F85', fontSize: 12, flexShrink: 1 },
});
