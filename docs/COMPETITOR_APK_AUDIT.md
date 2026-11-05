# Competitor feature audit: Driving Theory Test 4 in 1 Kit (Android)

Date: 6 November 2026

## Evidence and limits

The user-supplied ZIP contained one 161,222,641-byte APK. Static analysis of its
archive (2,662 entries), binary strings and packaged asset names only. The APK
itself is **not** committed or redistributed. No device execution, login,
paid-access circumvention, interception, or decrypted content access was performed.

Observed packaging:
- React Native/Hermes bundle, assets/index.android.bundle (~30.6 MB);
- Flutter asset manifest plus quiz/pathfinder and road-sign-related assets;
- packaged MP4s for theory explanations, hazard-click guidance and driving-lesson introductions;
- many named media references and road signs in the bundle, plus remote video URLs.

This establishes *packaged components*, not that all questions, the advertised
85 clips, or the whole competitor experience works offline. No competitor
questions, answers, code, media, fonts, illustrations or branding were copied.

The competitor's official marketing independently advertises:
- multiple-choice revision, unlimited mocks and a Learner Plan;
- 85 interactive hazard-perception clips including DVSA-licensed material;
- Highway Code, road signs and tailored Smart Mode;
- voiceover support and optional driving-lesson media;
- pass guarantee subject to conditions.

References:
- https://drivingtestsuccess.com/driving-theory-test-4-in-1-app/
- https://play.google.com/store/apps/details?id=uk.co.focusmm.DTSCombo
- https://www.gov.uk/guidance/make-and-sell-driving-theory-test-revision-products

## Gap analysis for this independent £0.99 app

| Capability | Competitor | Repository after this change |
| --- | --- | --- |
| Question revision | Broad licensed material | 21 original sample questions; needs editorial expansion |
| Timed multiple-choice mock | Unlimited | Resumable 5-question sample; 50-question version gated |
| Hazard perception | 85 marketed clips | No playable original clips yet |
| Highway Code and road signs | Dedicated sections | Referenced in questions; no dedicated library |
| Adaptive practice | Smart Mode | **Added** local next-10 queue: recent mistakes, unseen, weaker material |
| Learning plan | Learner Plan | **Added** actionable queue and topic coverage; not a full calendar |
| Flashcards | Flashcard-related assets observed | **Added** offline recall/reveal cards using original content |
| Accessibility | Voiceover advertised | Native text; dedicated speech and screen-reader audit outstanding |
| Progress | Learner goals and mocks | Local answers/bookmarks/mock history, **new topic accuracy** |
| Practical lessons / games | Advertised | Deliberately deferred |

## What this implementation adds

1. src/domain/revision.ts: deterministic offline smart selection; no external API.
2. src/storage/database.ts: read prior attempts and last answer from existing SQLite; no schema migration.
3. App.tsx: Smart Revision entry point, retry mistakes and per-topic progress.
4. src/components/FlashcardsScreen.tsx: reveal, previous/next, topic filter and practise.
5. src/domain/revision.test.ts: ranking, retry and topic statistic tests.

All three end-user features run on bundled questions and existing local data.
They are currently limited by the small sample question bank.

## Copyright and commercial guardrails

- Do not import questions or videos extracted from the competitor APK, including
  DVSA-licensed material distributed in that commercial application.
- Do not copy competitor branding, illustrations, marketing promises or UI assets.
- Use independently authored or separately licensed content only; check Open
  Government Licence scope and attribution for UK government material.
- Never claim to be endorsed by DVSA or to reproduce the exact real exam.

## Remaining release gates

**P0: content and fidelity**
- Expand to 1,000+ independent, reviewed, topic-balanced questions with citations.
- Complete 50-question / 57-minute GB car mock with three linked silent video-case-study questions and genuine bundled offline playback.
- Produce or license 14 hazard clips with 15 hazards and implement timing/scoring:
  pass mark 44/75, per-hazard maximum 5, repeated-click-pattern protection.
  Clearly describe any simulation differences from DVSA.
- Add independently illustrated or properly licensed road-sign/Highway Code libraries.

**P1: access and release**
- Offline voice support with actual on-device testing, TalkBack and text scaling.
- Android and iOS device builds, low-end performance and airplane-mode media tests.
- Verify Northern Ireland/DVA scope separately.

**P2: after core content**
- Calendar learning plan, streaks and achievements.
- Optional practical driving guidance, but not a financial pass guarantee.

## Acceptance checks for this change

- npm ci, npm run typecheck, npm test, npm run doctor, Expo export.
- Answer a question incorrectly; verify its presence in retry queue.
  Retry correctly and verify it leaves the recent-mistakes queue.
- Unseen questions rank ahead of mastered questions in Smart Revision.
- Flashcard reveal/hide, filter, navigation and practice handoff.
- Restart in airplane mode; verify saved accuracy and queue persist.
- Physical-device UI testing is mandatory before shipping.

Official references:
- https://www.gov.uk/theory-test/hazard-perception-test
- https://www.gov.uk/theory-test/pass-mark-and-result
- https://www.gov.uk/guidance/make-and-sell-driving-theory-test-revision-products
