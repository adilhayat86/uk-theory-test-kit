import { questions } from './questions';
import { studyImageAssets, studyImageBindings } from './studyImages';
import manifest from '../assets/illustrations-v2/image-manifest.json';
import selection from '../assets/illustrations-v2/learner-selection.json';

test('new image questions use individual technical illustrations without explanatory labels', () => {
  const additions = questions.filter((question) => question.id.startsWith('illustrated-'));
  expect(additions).toHaveLength(20);
  expect(additions.filter((question) => question.topic === 'Dashboard warnings')).toHaveLength(12);
  for (const question of additions) {
    const item = studyImageAssets[question.imageAssetId as keyof typeof studyImageAssets];
    expect(item).toBeDefined();
    const original = manifest.assets.find((asset) => asset.id === item.originalAssetId)!;
    expect(['Dashboard warnings', 'Vehicle safety']).toContain(original.category);
    expect(original.id).not.toMatch(/panel|explanation/);
    expect(selection.assetIds).toContain(original.id);
    if (question.topic === 'Dashboard warnings') {
      expect(question.supportingSourceUrl).toMatch(/^https:\/\/www\.ford\.co\.uk\/support\//);
    }
  }
});

test('every educational match points to an existing question and a traceable selected image', () => {
  const ids = new Set(questions.map((question) => question.id));
  for (const [questionId, imageId] of Object.entries(studyImageBindings)) {
    expect(ids.has(questionId)).toBe(true);
    expect(selection.assetIds).toContain(studyImageAssets[imageId].originalAssetId);
  }
  expect(selection.assetIds).not.toContain('motorway_red_x_closed_lane_original_01');
  expect(selection.assetIds).not.toContain('vehicle_rear_fog_lamp_switch_original_02');
});
