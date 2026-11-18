const { withAppBuildGradle } = require('@expo/config-plugins');

const marker = 'android-mvp-upload-signing';
const signingBlock = `// @generated begin ${marker}
// CI/internal builds retain Expo's test certificate. Production is an explicit,
// fail-closed channel and reads owner credentials only from the environment.
if (System.getenv('ANDROID_BUILD_CHANNEL') == 'production') {
    if (System.getenv('EXPO_PUBLIC_IMAGE_REVIEW') != 'false') {
        throw new GradleException('Production builds must explicitly exclude the draft artwork reviewer')
    }
    def requiredUploadVariables = [
        'ANDROID_UPLOAD_KEYSTORE_PATH', 'ANDROID_UPLOAD_STORE_PASSWORD',
        'ANDROID_UPLOAD_KEY_ALIAS', 'ANDROID_UPLOAD_KEY_PASSWORD'
    ]
    requiredUploadVariables.each { variable ->
        if (!System.getenv(variable)) {
            throw new GradleException('Missing production signing variable: ' + variable)
        }
    }
    def uploadStore = file(System.getenv('ANDROID_UPLOAD_KEYSTORE_PATH'))
    if (!uploadStore.isFile()) {
        throw new GradleException('Production upload keystore is not available')
    }
    android.signingConfigs.create('mvpUpload') {
        storeFile uploadStore
        storePassword System.getenv('ANDROID_UPLOAD_STORE_PASSWORD')
        keyAlias System.getenv('ANDROID_UPLOAD_KEY_ALIAS')
        keyPassword System.getenv('ANDROID_UPLOAD_KEY_PASSWORD')
    }
    android.buildTypes.release.signingConfig = android.signingConfigs.getByName('mvpUpload')
}
// @generated end ${marker}
`;

function applyReleaseSigning(contents) {
  const existing = new RegExp(`\\n?// @generated begin ${marker}[\\s\\S]*?// @generated end ${marker}\\n?`, 'g');
  return contents.replace(existing, '\n').trimEnd() + '\n\n' + signingBlock;
}

function withAndroidReleaseSigning(config) {
  return withAppBuildGradle(config, (result) => {
    if (result.modResults.language !== 'groovy') {
      throw new Error('Android MVP signing requires the generated Groovy app build file');
    }
    result.modResults.contents = applyReleaseSigning(result.modResults.contents);
    return result;
  });
}

module.exports = withAndroidReleaseSigning;
module.exports.applyReleaseSigning = applyReleaseSigning;
