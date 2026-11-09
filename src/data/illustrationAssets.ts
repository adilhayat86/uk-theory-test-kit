import { dftSignAssets } from './dftSignAssets';
import { teachingAssets } from './teachingImages';
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
  ...dftSignAssets,
  ...teachingAssets,
  'zebra-crossing': { source: require('../assets/zebra-crossing.png'), label: 'Zebra crossing illustration', visualDescription: 'Road with striped pedestrian crossing', width: 96, height: 96 },
  'no-entry': dftSignAssets['dft-no-entry'],
  'stop-sign': dftSignAssets['dft-stop'],
  'give-way': dftSignAssets['dft-give-way'],
  'speed-limit-30': { source: require('../assets/speed-limit-30.png'), label: '30 mph maximum speed sign', visualDescription: 'White circular sign with a red border and black number 30', width: 112, height: 112 },
  'speed-limit-50': { source: require('../assets/speed-limit-50.png'), label: '50 mph maximum speed sign', visualDescription: 'White circular sign with a red border and black number 50', width: 112, height: 112 },
  'national-speed-limit': dftSignAssets['dft-national-speed-limit'],
  'keep-left': dftSignAssets['dft-keep-left'],
  'signals-ahead': dftSignAssets['dft-signals-ahead'],
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
