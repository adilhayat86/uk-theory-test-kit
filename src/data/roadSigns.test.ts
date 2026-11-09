import { findRoadSignFacts, roadSignFacts, roadSignCategories } from './roadSigns';
import { illustrationAssets } from './illustrationAssets';

test('every study note has a bundled sign illustration', () => {
  expect(roadSignFacts).toHaveLength(30);
  for (const item of roadSignFacts) {
    expect(item.imageAssetId).toBeTruthy();
    expect(illustrationAssets[item.imageAssetId!].source).toBeDefined();
  }
});

test('sign IDs and quiz choices are valid and unique', () => {
  expect(new Set(roadSignFacts.map((item) => item.id)).size).toBe(roadSignFacts.length);
  for (const item of roadSignFacts) {
    expect(roadSignCategories).toContain(item.category);
    expect(item.quiz.answers).toHaveLength(4);
    expect(item.quiz.correctIndex).toBeGreaterThanOrEqual(0);
    expect(item.quiz.correctIndex).toBeLessThan(4);
    expect(item.reference).toBeTruthy();
  }
});
test('search and categories are case insensitive and combine', () => {
  expect(findRoadSignFacts(roadSignFacts, 'RED', 'Warnings').map((item) => item.id))
    .toContain('warning-triangle');
  expect(findRoadSignFacts(roadSignFacts, 'red', 'Warnings').map((item) => item.id))
    .not.toContain('red-ring');
});
test('unmatched search is empty and blank search returns all', () => {
  expect(findRoadSignFacts(roadSignFacts, 'not a real sign')).toEqual([]);
  expect(findRoadSignFacts(roadSignFacts, '')).toHaveLength(roadSignFacts.length);
});
