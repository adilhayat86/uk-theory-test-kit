import type { ImageSourcePropType } from 'react-native';

type IllustrationAsset = {
  source: ImageSourcePropType;
  label: string;
  visualDescription: string;
  width: number;
  height: number;
};

// Stable existing IDs. Independent editorial review is still required for release.
export const illustrationAssets = {
  'zebra-crossing': { source: require('../assets/zebra-crossing.png'), label: 'Zebra crossing illustration', visualDescription: 'Road with striped pedestrian crossing', width: 96, height: 96 },
  'no-entry': { source: require('../assets/no-entry.png'), label: 'No entry road sign', visualDescription: 'Red circular sign with a horizontal white bar', width: 96, height: 96 },
  'stop-sign': { source: require('../assets/stop-sign.png'), label: 'STOP road sign', visualDescription: 'Red eight-sided sign with white STOP lettering', width: 96, height: 96 },
  'give-way': { source: require('../assets/give-way.png'), label: 'Give way sign', visualDescription: 'Downward-pointing white triangle with a red border', width: 112, height: 112 },
  'speed-limit-30': { source: require('../assets/speed-limit-30.png'), label: '30 mph maximum speed sign', visualDescription: 'White circular sign with a red border and black number 30', width: 112, height: 112 },
  'speed-limit-50': { source: require('../assets/speed-limit-50.png'), label: '50 mph maximum speed sign', visualDescription: 'White circular sign with a red border and black number 50', width: 112, height: 112 },
  'national-speed-limit': { source: require('../assets/national-speed-limit.png'), label: 'National speed limit applies sign', visualDescription: 'White circular sign with a black diagonal stripe', width: 112, height: 112 },
  'keep-left': { source: require('../assets/keep-left.png'), label: 'Keep left instruction sign', visualDescription: 'Blue circular sign with a white arrow pointing diagonally down to the left', width: 112, height: 112 },
  'signals-ahead': { source: require('../assets/signals-ahead.png'), label: 'Traffic signals ahead warning sign', visualDescription: 'Upright red-bordered triangle containing a traffic-light symbol', width: 112, height: 112 },
} satisfies Record<string, IllustrationAsset>;

export type IllustrationId = keyof typeof illustrationAssets;
export type IllustrationContext = 'question' | 'review' | 'learn';

export function illustrationPresentation(id: IllustrationId, context: IllustrationContext) {
  const item = illustrationAssets[id];
  return {
    accessibilityLabel: context === 'question' ? item.visualDescription : item.label,
    caption: context === 'question' ? null : item.label,
  };
}
