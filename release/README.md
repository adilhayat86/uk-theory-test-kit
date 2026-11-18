# Android paid-MVP build and publisher handoff

Current internal candidate: **0.8.0 / Android version code 11**. Purchase model: one paid Google Play download with all included study content available, no advertisements, subscriptions or in-app purchases. This repository does not run a checkout or collect payment-card details.

Android is the only active platform. No iOS export, native build or iPhone QA runs in this phase. Historical iOS metadata can remain dormant without enabling it in `expo.platforms` or CI.

## Default build: learner, not artwork reviewer

The default `Android MVP CI` workflow runs three required jobs: quality, Android learner export, and native Android learner build. The `artwork-review` job is skipped unless explicitly selected through its dispatch input. Its separate export is internal review material, never the learner APK.

The native job uses `EXPO_PUBLIC_IMAGE_REVIEW=false` and `ANDROID_BUILD_CHANNEL=internal`, builds only the release-mode APK and CI-inspection AAB, and keeps the known test certificate for Samsung updates. It does not build a Metro-dependent debug APK or any iOS artifacts.

Artifacts:

- `android-offline-test-apk`: standalone learner APK, with JavaScript/content/media embedded.
- `android-native-verification`: JSON evidence from the actual APK.
- `android-release-ci-only-aab`: development-signed inspection bundle, **not a Play upload**.
- `android-learner-js-bundle`: Android export and assets.

The APK verifier checks source version/package, expected signer, minimum/target APIs, release flags, minimal permissions, legacy/modern backup exclusions, every source question and lesson ID, all selected PNG pixels, all original MP4 byte hashes, gallery-only strings, 64-bit ELF load alignment and `zipalign -P 16`. Unselected draft images must be absent. Android resource names/PNG compression can change, so the check compares displayed pixels rather than trusting filenames or a hidden menu.

## Local verification

Use Node 22 and Java 17 as in CI. The pinned image-verification tooling needs Python 3.11+ and is not an app dependency. Install it in a virtual environment outside tracked source if desired:

```text
python -m venv <private-verifier-directory>
<verifier-python> -m pip install -r scripts/android-verify-requirements.txt
node scripts/check-android-release.cjs
python -m unittest discover -s scripts -p test_android_apk_verifier.py
<verifier-python> scripts/verify_android_apk.py <learner.apk> --mode learner --signing test --output <verification.json>
```

Set `ANDROID_HOME` to the installed SDK; the verifier defaults to Build Tools 37.0.0. `--sdk` and `--build-tools` can specify another inspected installation. The internal signer SHA-256 is `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`.

Normal merged permissions are limited to Internet/network state for Expo/development support and video dependencies, video wake-lock, and the app's signature-level receiver permission. The app itself has no developer-server calls; study is tested in airplane mode. Storage, overlay and vibration permissions are blocked. Revisit the permission contract before deliberately adding any new native capability.

## Device-only study data

`withAndroidLocalData` disables `allowBackup` and legacy full backup, and writes explicit exclusions for every application storage domain in cloud/device-transfer rules. This prevents the normal OS backup pathways from undermining the device-only product promise. The application references that exact generated XML, which the APK verifier resolves from compiled resources and checks.

The app has no progress cloud backup or account restore. Users must understand that resetting/uninstalling/replacing a phone can remove study history permanently. Ordinary updates must preserve compatible local data; disabling backup is not an update-time reset instruction.

## Owner inputs still required for a paid release

`android-release.json` deliberately leaves these unknown values empty rather than inventing them:

1. Verified publisher legal identity matching the Play developer account.
2. The real public HTTPS privacy-policy URL, after the owner reviews and hosts `privacy/index.html`. That page is prepared locally and has not been published. Confirm support-mailbox handling/retention as part of the review. Support contact is the user-provided `adilhayatkamker@gmail.com`.
3. The owner upload certificate SHA-256 and a securely held upload keystore, alias and passwords. Do not commit signing material, put passwords in command lines, use `EXPO_PUBLIC_` variables for secrets, or store a production key in source artifacts.
4. Independent, named approval for the current content-addressed question, lesson, image, sign-note and video catalogue. Existing pending tracker rows are not automatically approved by a successful build.
5. Play listing/screenshots, audience/content rating, accurate Data safety declarations, paid pricing/payments profile and any account-specific closed-test/production-access requirement. Confirm whether this package was ever offered free on Play before deciding its paid listing: a free listing cannot later become paid for that same package.

No release metadata or local test here creates a Play listing, changes pricing, publishes the privacy page or grants approval to merge/publish.

## Prepared production path (fails closed)

After the owner inputs and independent approvals are complete, change release status to `production-candidate`. Provide these environment variables through the owner's secure local/CI credential mechanism:

- `ANDROID_BUILD_CHANNEL=production`
- `ANDROID_UPLOAD_KEYSTORE_PATH`
- `ANDROID_UPLOAD_STORE_PASSWORD`
- `ANDROID_UPLOAD_KEY_ALIAS`
- `ANDROID_UPLOAD_KEY_PASSWORD`
- `EXPO_PUBLIC_IMAGE_REVIEW=false`

Run `node scripts/check-android-release.cjs --production` before building. It enforces metadata, owner credential presence and independent content approval. It validates URL structure; the publisher must also open the hosted policy and verify public availability and matching content.

Then prebuild Android and run `assembleRelease bundleRelease` with the same environment. The signing plugin selects the owner upload config **only** for the explicit production channel, requires all four credential variables and a real keystore file, and otherwise throws. It reads credentials at Gradle execution; no password is written into generated source. Internal CI stays on the existing test signer.

Verify the resulting APK with `--mode learner --signing production`; it must match the recorded owner upload certificate and reject the development certificate. Inspect the AAB and complete Play App Signing/release review separately. Google Play's distributed signing key may differ from the upload key. A production-signed app cannot update the existing debug-signed Samsung installation; plan that transition with the owner rather than silently uninstalling their data.

Passing preflight/build checks prepares a reviewable candidate. Actual Play upload, publication, pricing changes and merging into main remain a separate explicit release action.

## Current primary references

Checked 17–18 November 2026:

- [Google Play target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878): current new phone apps/updates target API 36 or higher. This build targets 36 and supports Android API 24+.
- [Android 16 KB native page-size support](https://developer.android.com/guide/practices/page-sizes): check ELF and ZIP alignment, then runtime behavior. CI verifies binary alignment; broader device/Play pre-launch testing remains useful.
- [Android cloud and device-transfer backup behavior](https://developer.android.com/identity/data/autobackup)
- [Play App Signing and upload keys](https://support.google.com/googleplay/android-developer/answer/9842756)
- [Privacy policy requirements](https://support.google.com/googleplay/android-developer/answer/9859455) and [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469), including apps without off-device data collection.
- [Personal-account testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465): applicable newer personal accounts need 12 opted-in testers continuously for 14 days before applying for production access. Check the actual account.
- [Paid/free app pricing rules](https://support.google.com/googleplay/android-developer/answer/6334373)
- [Pinned Pillow build-verification tooling](https://pypi.org/project/pillow/13.0.0/)

Recheck policies on the actual publication date; this dated engineering check is not a permanent policy or legal approval.
