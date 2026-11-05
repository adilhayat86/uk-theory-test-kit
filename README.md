# UK Theory Test Kit

An independent, offline-first UK car theory test preparation app for Android and iOS.

## Product decisions

- UK market, Android and iOS
- React Native + Expo + TypeScript
- Target price: £0.99 one-time purchase; no ads or subscriptions
- Core study content and user progress stored locally on the device
- Original educational questions, explanations, illustrations and hazard-perception scenarios
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
- **Timed five-question sample mock** (six minutes), with flagging, changing answers, question jumping, submission, timeout, answer review and saved offline mock history.
- Mock session resumes from SQLite after leaving and returning to the screen, including after an app restart. The timer is anchored to wall-clock time, not a paused app timer.
- A full 50-question / 57-minute exam engine with 43/50 pass criteria is implemented and tested, but **the full-exam button is intentionally locked** pending the full source-reviewed question bank and actual local video case-study playback.
- Android debug APK and iOS simulator build jobs in GitHub Actions.

## Quality gates

Use the [implementation plan](docs/IMPLEMENTATION_PLAN.md) and [audit](docs/audit-2026-11-06.md) for remaining blockers. The app is **not yet a complete commercial theory-test product**. The current sample is not an official-style full mock; hazard perception and video case studies are not yet available.

## How to try the mock

Open the app, select **Mock**, then **Start 5-question sample**. Tap an answer, flag questions, navigate with Previous/Next or question numbers, and submit to get explanations. Leaving and returning to **Mock** restores the active timed session. Finished attempts appear in history.



## Content and compliance

All question wording, explanations, road-sign artwork and hazard-perception scenarios must be original or appropriately licensed. Verify exam facts against current official GOV.UK/DVSA guidance before release. Do not reproduce DVSA question banks or hazard-perception clips, and do not imply DVSA endorsement.
