import { questions } from './questions';
test('illustrated questions use bundled image IDs', () => {
  const allowed = new Set(['zebra-crossing', 'no-entry', 'stop-sign', 'give-way', 'speed-limit-30', 'speed-limit-50', 'national-speed-limit', 'keep-left', 'signals-ahead']);
  const illustrated = questions.filter(q => q.imageAssetId);
  expect(illustrated).toHaveLength(11);
  for (const question of illustrated) expect(allowed.has(question.imageAssetId!)).toBe(true);
});

test('road sign recognition questions have unique illustrations and plausible answer references', () => {
  const items = questions.filter(q => q.id.startsWith('sign-recognition-'));
  expect(items).toHaveLength(8);
  expect(new Set(items.map(q => q.imageAssetId)).size).toBe(8);
  for (const q of items) {
    expect(q.imageAssetId).toBeTruthy();
    expect(q.reference).toMatch(/Highway Code|Know Your Traffic Signs/);
    expect(q.options).toHaveLength(4);
  }
});
