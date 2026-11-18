const { applyLocalOnlyManifest, dataExtractionRules } = require('./withAndroidLocalData');

test('opts existing app storage out of legacy backup without removing its activity', () => {
  const activity = { $: { 'android:name': '.MainActivity' } };
  const manifest = { manifest: { application: [{ $: { 'android:name': '.MainApplication', 'android:allowBackup': 'true' }, activity: [activity] }] } };
  const app = applyLocalOnlyManifest(manifest).manifest.application[0];
  expect(app.$).toMatchObject({
    'android:allowBackup': 'false',
    'android:fullBackupContent': 'false',
    'android:dataExtractionRules': '@xml/android_mvp_data_extraction_rules',
  });
  expect(app.activity).toEqual([activity]);
});

test('excludes the SQLite database and every app storage domain from cloud and phone transfer', () => {
  const expected = ['root', 'file', 'database', 'sharedpref', 'external',
    'device_root', 'device_file', 'device_database', 'device_sharedpref'];
  for (const mode of ['cloud-backup', 'device-transfer']) {
    const block = dataExtractionRules.match(new RegExp(`<${mode}>([\\s\\S]*?)</${mode}>`))[1];
    const exclusions = [...block.matchAll(/<exclude domain="([^"]+)" path="\." \/>/g)].map((m) => m[1]);
    expect(exclusions.sort()).toEqual([...expected].sort());
    expect(block).not.toContain('<include');
  }
});
