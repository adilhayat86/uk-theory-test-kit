import { questions } from './questions';
test('illustrated questions use bundled image IDs', () => {
  const allowed = new Set(['zebra-crossing', 'no-entry', 'stop-sign']);
  const illustrated = questions.filter(q => q.imageAssetId);
  expect(illustrated).toHaveLength(3);
  for (const question of illustrated) expect(allowed.has(question.imageAssetId!)).toBe(true);
});
