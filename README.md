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

## Current scope

The repository currently contains the app shell, a small sample question set, local progress/bookmark storage and automated build validation. It is not yet a complete commercial theory-test product.

## Content and compliance

All question wording, explanations, road-sign artwork and hazard-perception scenarios must be original or appropriately licensed. Verify exam facts against current official GOV.UK/DVSA guidance before release. Do not reproduce DVSA question banks or hazard-perception clips, and do not imply DVSA endorsement.
