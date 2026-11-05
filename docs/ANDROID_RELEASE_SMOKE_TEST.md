# Android MVP release smoke test (manual, required)

Date created: 6 November 2026. Status: **NOT EXECUTED**.

The repository can compile APK/AAB files, but an automated compile does
not establish that navigation, SQLite durability and accessibility actually
work on a phone. Record evidence on at least one modern Samsung handset and
one lower-memory Android model.

## Before testing

1. Use the exact final Git SHA. Download the GitHub Actions
   `android-debug-apk` artifact (development testing only).
2. Install the debug APK and note the Android OS version, device model,
   installation method, app version and Git SHA.
3. Leave mobile data and Wi-Fi **disabled** during offline tests.
4. Do not claim test success without the device action and observed result.

## User journeys

- [ ] Clean install starts successfully and shows the GB-only disclaimer.
- [ ] Start 10-question practice, answer #1 incorrectly and navigate to #2.
- [ ] Press Android Back; reopen Practice using the bottom tab. Same question
      and answer selections remain; progress count has increased exactly once.
- [ ] Force-stop the app using Android Settings; reopen while still offline.
      Resume the SAME session from the green Continue banner.
- [ ] Re-open an already answered question after force-stop; verify it
      cannot be counted a second time by double tapping.
- [ ] Finish practice and review all/correct/incorrect/saved filters.
- [ ] Retry incorrect only; correct those answers, review topic analytics.
- [ ] Start a new practice while one is unfinished: Continue vs Start new
      confirmation appears; Continue does not erase previous answers.
- [ ] Bookmark a question. Relaunch and verify it remains saved.
- [ ] Search by both a common word and an exact Highway Code rule number.
- [ ] Filter Road Sign Notes, save a sign, relaunch, verify bookmark.
- [ ] Start 5-question timed mini-test, flag and answer, background/force-stop,
      resume and verify clock and answers, then submit.
- [ ] All features above work with airplane mode and no login.
- [ ] Android system Back from a nested screen returns to study menu;
      system Back from Home exits normally.
- [ ] Increase system font scaling to 200%, verify answer texts and actions
      remain readable and tappable.
- [ ] Enable TalkBack; ensure labels, selected answers, save flags and
      navigation controls are intelligible.
- [ ] Test rapid double taps on answer/next and failed storage (when possible)
      without counter duplication or app crash.
- [ ] Verify all modules avoid official DVSA endorsement/complete-exam claims.

## Build and Play Store checks

- [ ] `npm run check:mvp:content` passes.
- [ ] `npm run check:mvp:editorial` passes: 200 human-reviewed items.
- [ ] Exact commit TypeScript/Jest/Expo Doctor and release-mode CI build green.
- [ ] `bundleRelease` builds an AAB in CI. The AAB artifact is **CI-only**.
- [ ] Set up and verify publisher's secure **Play upload signing key**.
- [ ] Generate a final production-signed AAB and validate its signing.
- [ ] Confirm manifest targetSdkVersion **36 or higher** as required for
      new Google Play submissions since 31 August 2026.
- [ ] Check app's package ID/version code, app name, translations,
      content rating, app-access and Data safety entries.
- [ ] Publish a final privacy notice with real contact email and ensure
      Play's Data safety disclosures match the binary.
- [ ] Capture original Play Store screenshots on a device (no copied
      competitor screens), plus icon and promotional metadata.
- [ ] Run Play Console closed testing, review pre-launch report and address
      real device crashes before a production release.
- [ ] Confirm `£0.99` one-time paid app pricing is accepted in all selected
      launch countries; validate store commissions/taxes.
- [ ] Record date, reviewer, tested build and explicit go/no-go decision.

## Rules checked for target SDK

- https://support.google.com/googleplay/android-developer/answer/11926878
- https://docs.expo.dev/versions/v58.0.0/

Expo SDK 58 documents `compileSdkVersion 37` and
`targetSdkVersion 36`. Reconfirm in final generated Android configuration;
documentation alone is not a manifest test.
