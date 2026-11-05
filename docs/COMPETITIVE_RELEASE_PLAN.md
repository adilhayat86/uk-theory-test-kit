# Competitive release roadmap — UK Theory Test Kit

Last reviewed: 6 November 2026

## Product positioning

One-time £0.99 purchase, original Highway Code-based practice, no ads, no account, core content and progress fully offline. Do not market the app as an official DVSA product, and never imply our question bank is the DVSA licensed bank.

## Milestone A: usable practice app (existing on main)

- [x] React Native / Expo SDK 58 app for Android and iOS
- [x] Offline SQLite progress, bookmarks and timed sample mock
- [x] Passing GitHub Actions build jobs: Android APK and iOS simulator
- [x] 21 source-referenced original practice questions
- [ ] Real-device offline restart tests, not just build compilation

## Milestone B: competitiveness improvements (this branch)

- [x] Expand to **50 independently written, source-referenced questions**
- [x] Add **24 simplified, locally rendered road-sign illustrations** and their meaning
- [x] Add **10-question road-sign recognition quizzes**, category filters and search
- [x] Add **one-tap review of latest mistakes**
- [x] Add **10-question smart revision**: missed, weak, unseen and mastered in that order
- [x] Rotate unseen questions by topic, avoiding an entire session on one topic
- [x] Carry completed mock results into learning records without double-counting
- [x] Add validation tests for road signs, revision queues and quiz options
- [ ] Pass all quality/Android/iOS CI checks on this feature commit
- [ ] Verify illustrated signs against official artwork before release; current diagrams are schematic

**Release note:** Even though the bank reaches 50 items, the 50-question exam feature remains locked because the official test includes video case-study questions which we have not produced.

## Milestone C: market-ready educational depth

- [ ] Source-review 950 further **original** questions (target 1,000 total), with editorial quality rather than bulk paraphrasing
- [ ] Add a complete vector/illustration library (target 150 road-sign variants), verify exact sign artwork against DfT standards
- [ ] Build and bundle original offline silent video case studies with three linked questions per case
- [ ] Produce original hazard perception clips: 14 clips, 15 scored hazards per realistic simulation, plus extra practice
- [ ] Build time-window scoring, abuse detection and 44/75 hazard test pass threshold
- [ ] Keep official question-bank and hazard clips separate unless explicitly licensed by DVSA
- [ ] Accessibility, TalkBack and VoiceOver verification
- [ ] Actual Android device and iOS simulator automated offline QA

## Milestone D: release and customer acquisition

- [ ] Standalone release-style APK installed with Wi-Fi/cellular disabled; confirm all text, images and videos work
- [ ] Production signing, identifiers, asset size, startup time and crash QA
- [ ] App icon, screenshots, privacy notice and trademark/brand review
- [ ] Publish as an **independent** driving theory revision aid, no claim of exam guarantee
- [ ] Verify £0.99 tier, platform fees, taxes and app-store acquisition economics
- [ ] Measure organic conversion and reviews, then improve content and onboarding

## Evidenced sources and reuse

- [DfT: Know Your Traffic Signs](https://www.gov.uk/government/publications/know-your-traffic-signs), particularly [regulatory signs](https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs), [warnings](https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs) and [speed signs](https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs)
- [Highway Code](https://www.gov.uk/guidance/the-highway-code)
- [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)

The UK context is deliberately narrowed to Great Britain for DVSA material. Check Northern Ireland DVA requirements separately before claiming faithful full-UK parity. The currently drawn road-sign illustrations are educational approximations, not supplied official artwork.
