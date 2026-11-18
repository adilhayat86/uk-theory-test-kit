const fs = require('node:fs/promises');
const path = require('node:path');
const { AndroidConfig, withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');

// allowBackup=false alone can still permit some manufacturers' device transfers.
// Exclude app storage explicitly from both Android 12+ extraction modes as well.
const backupDomains = [
  'root', 'file', 'database', 'sharedpref', 'external',
  'device_root', 'device_file', 'device_database', 'device_sharedpref',
];
const exclusions = backupDomains.map((domain) => `    <exclude domain="${domain}" path="." />`).join('\n');
const dataExtractionRules = `<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
  <cloud-backup>
${exclusions}
  </cloud-backup>
  <device-transfer>
${exclusions}
  </device-transfer>
</data-extraction-rules>
`;

function applyLocalOnlyManifest(manifest) {
  const app = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
  app.$['android:allowBackup'] = 'false';
  app.$['android:fullBackupContent'] = 'false';
  app.$['android:dataExtractionRules'] = '@xml/android_mvp_data_extraction_rules';
  return manifest;
}

function withAndroidLocalData(config) {
  config = withAndroidManifest(config, (result) => {
    result.modResults = applyLocalOnlyManifest(result.modResults);
    return result;
  });
  return withDangerousMod(config, ['android', async (result) => {
    const directory = path.join(result.modRequest.platformProjectRoot, 'app/src/main/res/xml');
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'android_mvp_data_extraction_rules.xml'), dataExtractionRules);
    return result;
  }]);
}

module.exports = withAndroidLocalData;
module.exports.applyLocalOnlyManifest = applyLocalOnlyManifest;
module.exports.dataExtractionRules = dataExtractionRules;
