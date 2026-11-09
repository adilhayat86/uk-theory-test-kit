# UK Theory Test Kit

An independent, offline-first Great Britain car theory revision prototype, targeting a lean Android launch.

## Android-first MVP scope (current launch target)

**Target paid product:** £0.99 / Google Play for Great Britain car revision,
fully offline with no ads, account or subscription. The first release requires at least **200 independently authored, checked questions** across
10 or more topics. **All 200 are drafted, but independent editorial approval is pending.**
See [MVP release target](docs/MVP_RELEASE_TARGET.md) and run
`npm run check:mvp:content` to enforce the structural release gate.

**MVP included:** mixed and topic practice, question search, saved/flagged
questions, explanations, 5/10-question sessions with answer review,
retry incorrect, offline progress, basic flashcards and text-first sign notes.
**Deferred:** hazard videos, full exam-equivalent mock, full Highway Code,
AI rewording, games, social features, Northern Ireland content and iOS launch.
Do not describe it as an official test simulator or complete 4-in-1 app.

## Product decisions

- Great Britain car learners; Android first (iOS later)
- React Native + Expo + TypeScript
- Target price: £0.99 one-time purchase; no ads or subscriptions
- Core study content and user progress stored locally on the device
- Original educational questions and explanations; hazard-perception media is future scope
- Not affiliated with or endorsed by DVSA

## Tech stack

- Expo SDK 58 / React Native
- SQLite via `expo-sqlite` for offline progress and bookmarks
- Jest for domain tests
- GitHub Actions for TypeScript, unit tests, Expo validation, Android APK and iOS simulator builds

## Local development

Use Node.js 22.13 or later in the Node 22 line.

```bash
npm install
npm run doctor
npm run typecheck
npm test
npx expo start
```

## Working features

- Offline study topics, answer explanations and bookmarked questions.
- Saved answer counts and accuracy over repeated attempts.
- **Smart Revision**: an offline, personalised 10-question queue prioritising recently incorrect answers, unseen questions and weaker material.
- **Retry mistakes**: repeat only questions answered incorrectly most recently.
- **Revision flashcards**: choose a topic, recall/reveal the answer, browse cards and launch practice.
- **Per-topic dashboard**: view attempted-question coverage, accuracy and mistakes to retry; all calculated locally.
- **Screenshot-informed study hub**: clear Theory Revision and Road Sign Notes navigation for MVP, with unique independent styling.
- **Offline question search**: keyword and topic filtering across the local original bank, tap one result or practise all matches.
- **Road Signs**: twelve original, source-referenced notes with category browsing, search, SQLite bookmarks and a twelve-question text quiz. STOP and GIVE WAY notes include teaching diagrams; eight visual recognition questions are available in Theory Revision.
- **Deferred:** hazard-perception playback and full Highway Code are not exposed in the MVP navigation.
- **Competitor-recording-informed practice**: choose a shuffled 5- or 10-question session from the Theory hub; after practice, filter your actual session answers by correct/incorrect/saved, review explanations and topic scores, and retry mistakes.
- **Timed five-question mini test** (six minutes), with flagging, changing answers, question jumping, submission, timeout, answer review and saved offline mock history.
- Mock session resumes from SQLite after leaving and returning to the screen, including after an app restart. The timer is anchored to wall-clock time, not a paused app timer.
- A full 50-question / 57-minute exam engine with 43/50 pass criteria is implemented and tested, but **the full-exam button is intentionally locked** pending the full source-reviewed question bank and actual local video case-study playback.
- Android debug APK and iOS simulator build jobs in GitHub Actions.

## Crash-safe practice and Android release verification

The ordinary revision session now has an on-device SQLite snapshot: selected
question order, current position, answers and completed result. The **Continue
saved practice** banner resumes unfinished work after restarting, and finished
results remain reviewable. A selected answer and its progress counter are
written in **one SQLite transaction** so a failed save cannot silently
double-count or lose the answer. The Android system Back key returns to
the relevant study screen. Tests for strict session transitions were added.

CI also builds a **release-mode Android App Bundle** for build verification.
This is **not production-signed** and must **never** be uploaded to Play
without the publisher's release/upload key and Play Console checks.
The app version is `0.1.0`, Android version code `1`.

See [manual Android smoke-test plan](docs/ANDROID_RELEASE_SMOKE_TEST.md) and
[privacy notice draft](docs/PRIVACY_POLICY_DRAFT.md). Neither has been
signed off or published as a final store document.

## Quality gates

Use the [implementation plan](docs/IMPLEMENTATION_PLAN.md) and [audit](docs/audit-2026-11-06.md) for remaining blockers. The app is **not yet a complete commercial theory-test product**. The current revision bank is not an official-style full mock; hazard perception and video case studies are not yet available.

## Navigate the screenshot-informed modules

From **Home**, choose **Theory Revision** for a dedicated hub with configurable quick practice (5/10 questions), timed sample mock, search, saved/flagged questions, progress, flashcards and Smart Revision. The completed quick practice view now has answer-review filters and a retry-mistakes action. Choose **Road Sign Notes** to browse categories, search and save explanatory notes or complete a text-based mini quiz. Hazard perception and a full Highway Code section are deferred from MVP navigation; they must not be marketed as included functionality.

All new sample features work locally, but a full sign illustration bank, original hazard clips and source-reviewed 50-question mock are still required before launch.

## How to try the mock

Open the app, select **Theory Revision**, open **Timed Mini Test**, then **Start 5-question sample**. Tap an answer, flag questions, navigate with Previous/Next or question numbers, and submit to get explanations. Leaving and returning to **Mock** restores the active timed session. Finished attempts appear in history.



## Content and compliance

All question wording, explanations, road-sign artwork and hazard-perception scenarios must be original or appropriately licensed. Verify exam facts against current official GOV.UK/DVSA guidance before release. Do not reproduce DVSA question banks or hazard-perception clips, and do not imply DVSA endorsement.

## Competitor-informed roadmap

A static audit of a user-supplied Theory Test 4 in 1 Kit APK informs our priorities without copying any competitor assets or licensed question banks. See [APK competitor audit](docs/COMPETITOR_APK_AUDIT.md).

**Try the new features:** From Home tap **Your next 10** or **Flashcards**. On **Progress**, see topic-level coverage and use **Retry only mistakes** when available. All features run offline using our original sample questions and existing local SQLite records. The bank now has 200 authored questions, but independent editorial review and on-device QA remain mandatory.

## Question-bank evidence

All 200 current draft questions include four answer choices, explanations and direct primary GOV.UK rule links. Read the [editorial audit](docs/QUESTION_BANK_EDITORIAL_AUDIT.md) and [200-row review tracker](docs/QUESTION_REVIEW_TRACKER.csv). The automated structure checks do **not** constitute human fact checking or approval to sell the app.


## Offline artwork integration (9 November 2026)

The 208-question bank and all progress storage formats are preserved. The nine
existing diagrams now share one typed registry. Practice and timed mini tests
hide meaning captions until answer review; screen-reader labels describe visible
shapes instead of naming the tested meaning. Flashcards and practice results
now display their matching diagrams. Selected road-sign notes include diagrams.

All **121 draft pack PNGs** are stored separately under
`src/assets/illustrations-v2/`, with the original manifest, review CSV, guide and
editable sources. Each has a literal Metro `require()` in `draftImageSources.ts`.
They have **not** been substituted into scored questions. All remain
`DRAFT_REVIEW_REQUIRED`; see [artwork review findings](docs/IMAGE_LIBRARY_REVIEW.md).

For internal offline visual QA, set `EXPO_PUBLIC_IMAGE_REVIEW=true` before building
(or run a development build), then open **Home → Artwork review**. This browser
loads one draft at a time and supports description/category/ID search. Ordinary
release navigation hides this entry. Do not enable it for a commercial build.

The full-resolution review pack adds approximately 146 MiB of PNG masters to
an artwork-review bundle. Ordinary production exports replace the review screen
at Metro resolution time and exclude all 121 draft masters; merely hiding a
menu does not exclude its imported assets. The existing nine learner diagrams
remain packaged. Restart Metro when changing `EXPO_PUBLIC_IMAGE_REVIEW`.

Verify both packaging modes locally:

```bash
EXPO_PUBLIC_IMAGE_REVIEW=false npx expo export --platform android --output-dir dist/android --clear
node scripts/check-export-assets.cjs dist/android android learner
EXPO_PUBLIC_IMAGE_REVIEW=true npx expo export --platform android --output-dir dist/android-artwork-review --clear
node scripts/check-export-assets.cjs dist/android-artwork-review android review
```

CI checks Android/iOS learner exports and the Android artwork-review export
against the actual packaged PNG hashes. The standalone internal device-test APK
enables artwork review; it is a QA build. Produce optimised device derivatives after editorial
approval; retain the master checksums. No runtime network downloads are used.
