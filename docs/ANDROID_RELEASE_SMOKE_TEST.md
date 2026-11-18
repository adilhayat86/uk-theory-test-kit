# Android paid-MVP acceptance check — 0.8.0 / code 11

Run on the **exact final learner APK** and record its source commit, SHA-256, device/Android version, outcome and screenshots. Previous 0.7.0 results are historical evidence, not approval of this changed build. Android is the only active platform in this phase.

## Before testing

- Verify the APK with `scripts/verify_android_apk.py --mode learner --signing test` and retain its JSON report. It checks the real signature, version, permissions, backup exclusions, 16 KB native alignment, images, videos, question/lesson IDs and absence of the draft gallery.
- The internal APK must retain the existing test certificate so it can update the Samsung. The CI-only AAB is not a production Play upload.
- Capture the phone's original connection, font and keep-awake settings. Check that no call is active before enabling airplane mode. Restore settings and remove temporary test helpers afterwards.
- Use temporary study data. Do not wipe a user's real progress unless they have authorized that action. The current owner's earlier test-version instruction authorizes a clean test state, not a destructive migration for future customers.

## Learning and assessment

1. Open the app with airplane mode on and Wi-Fi off. First-run guidance, course content and images must load without a server or account. Returning users should reach their existing study state.
2. Open a lesson, advance a section, force-stop/reopen and continue. The same lesson/section must return; opening, scrolling or watching its video must not award study completion.
3. Confirm one lesson in a two-lesson topic. Its topic check must remain locked. Confirm the second lesson; its ten-question check should unlock.
4. Complete a topic check. Check correct/incorrect feedback, 8/10 threshold, result review and a full retake. Verify Learn and Progress agree on studied lessons and completed topics. Wrong-only/general practice must not award a completed checkpoint.
5. Revisit mistakes through the revision flow. Search must start with an empty prompt, and topic/picture/saved revision must remain reachable without making the main learning screen cluttered.

## Mocks and videos

1. Direct exam Start must be disabled until the learner explicitly confirms studying here or elsewhere. Starting a new attempt needs a fresh unchecked confirmation. This does not mark unread lessons studied.
2. Full mock: 50 distinct questions, 57 minutes, practice pass mark 43. Questions 48–50 must refer to the same actual local case-study clip. The small warm-up stays clearly secondary.
3. Play, pause and replay the video offline. Inspect changing frames, not only the button label. Check all three registered clips through their lesson examples or mocks. Backgrounding/hiding the player must pause it.
4. Answer and flag a question. Force-stop/reopen and resume: same question, answer, flag and saved study confirmation; wall-clock time continues while away.
5. Cancel the unanswered-question submission warning and continue. Then submit, check scoring and review, reopen history and ensure the result is not duplicated. A new attempt must reset study confirmation.
6. Verify timeout and duplicate/rapid-tap protection in the automated domain/SQLite tests; native smoke testing need not wait 57 minutes simply to repeat a validated clock rule.

## Saved items, progress and reset

- Save an illustrated question and a road sign. Both must survive a restart and appear in the appropriate saved list.
- Before answering, question/sign images must hide meaning captions and use neutral visual descriptions. Teaching/review views may explain the image.
- Ordinary practice, bookmarks, direct-exam confirmation and mock results must leave unread lessons and topic completion unchanged.
- Use the in-app reset action, cancel it once, then confirm on authorized test data. All intended local study data, saved items and active/history records must clear; an ordinary update must never do this automatically.
- After a requested final fresh start, verify zero lesson/topic counts, no saved questions/signs, no exam history and no saved session. Leave Learn open.

## Accessibility and reliability

- Check 200% font scale on Learn, a long lesson, answer options, exam confirmation, results and Help/reset. Controls must remain readable, scrollable and reachable.
- Verify TalkBack roles/labels/checked and disabled states, native Back behavior, and focus/navigation after returning from a lesson or result.
- Exercise storage-load/save failure behavior with the automated SQLite tests. Recovery must be explicit; never silently erase data to hide an initialization failure.
- Inspect app-only runtime logs for uncaught JavaScript/native exceptions. Distinguish platform codec diagnostics from actual failed playback. Capture evidence of any reproducible fault and fix it before delivery.
- Test another lower-memory Android device or Play pre-launch report before public release. Binary 16 KB alignment checks do not replace runtime testing on a 16 KB environment.

## Separate publication gate

A green learner APK is an MVP test result. Charging/publication additionally requires independent, current-content editorial approval; a public reviewed privacy policy; verified publisher/support details; owner upload-key signing and Play App Signing; correct store claims, Data safety/audience/content rating/pricing; and any account-specific closed-testing requirement. Run `node scripts/check-android-release.cjs --production` and record the final manual release decision. Do not merge into main, publish or change Play pricing as a side effect of this checklist.
