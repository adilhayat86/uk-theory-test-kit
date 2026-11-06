# Question-bank authoring and editorial audit — 6 November 2026

## Scope and delivery

The independent Great Britain car-theory **revision-only** MVP has **200 authored
multiple-choice questions**. The 21 original starter questions were retained and
179 new original question/answer sets were created from current GOV.UK Highway
Code guidance. The content is text-first; it is not the licensed DVSA practice
bank, a complete official mock simulation or a hazard-perception test.

### Topic distribution

| Topic | Questions | New additions |
| --- | ---: | ---: |
| Road rules | 17 | 16 |
| Motorways | 17 | 16 |
| Vehicle safety | 17 | 16 |
| Weather conditions | 17 | 13 |
| Road signs | 17 | 16 |
| Road junctions | 17 | 15 |
| Roundabouts | 17 | 15 |
| Overtaking | 17 | 15 |
| Pedestrian crossings | 16 | 15 |
| Vulnerable road users | 16 | 14 |
| Snow and ice | 16 | 15 |
| Parking | 16 | 13 |
| **TOTAL** | **200** | **179** |

## Primary sources used for the authoring draft

The GOV.UK Highway Code pages below were consulted. They reported an update
date of **22 October 2025** when checked on 6 November 2026.
Each question contains a textual rule/source reference and direct `sourceUrl`.
**A URL and rule number are pointers for editorial verification, not proof
that a reviewer has approved the answer.**

- Road rules, signals, speed, stopping distances and markings:
  https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158
- Motorways, joining, closed lanes, overtaking and exits:
  https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273
- Driver fitness, licence, child seats and towing:
  https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102
- Tyres, fluids and vehicle maintenance:
  https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security
- Weather and winter conditions:
  https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237
- Sign types and restrictions:
  https://www.gov.uk/guidance/the-highway-code/traffic-signs
- Junctions, roundabouts, overtaking and crossings:
  https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203
- Pedestrians, cyclists, animals and other vulnerable road users:
  https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225
- Waiting, parking, lighting and restrictions:
  https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252

## Current checks and evidence

- **Structural:** 200 unique IDs, 12 topics, each with 16–17 questions;
  exactly four distinct options per question and one correct index; no
  identical question wording; required explanation and rule/source URL.
- **Automated:** `npm run check:mvp:content` and `npm test`.
  See GitHub Actions for the exact commit status.
- **Authorship:** the new 179 question prompts and distractors were written
  for this project rather than extracted from the competitor APK.
- **Independent human editorial approval: NOT COMPLETE.** Every question,
  explanation, law-vs-guidance wording and reference remains **pending**.

A complete question-by-question review sheet is provided in
[QUESTION_REVIEW_TRACKER.csv](QUESTION_REVIEW_TRACKER.csv).
All 200 entries deliberately start as `PENDING_INDEPENDENT_REVIEW`.

## Mandatory editor verification protocol

For EACH question (no sampling for commercial publication):

1. Open its primary GOV.UK source URL. Confirm the numbered rule or sign
   really supports the question and correct response.
2. Check **MUST/MUST NOT** versus **should/should not**, including any relevant
   exceptions and differences between England, Scotland and Wales.
3. Check the three distractors for ambiguity or unintended second correct
   answers, and whether the wording tests knowledge rather than nonsense.
4. Check for repetitive items, misleading absolutes, outdated statistics,
   unintended copying of official test-bank language, and any outdated laws.
5. Mark the row `APPROVED` only after a named independent reviewer has
   recorded date, judgement and any amendment required.
6. Re-run test suite and update review evidence whenever a question changes.

**Do not market these 200 as fully reviewed or release the £0.99 product**
until the independent source-fact-check and physical-device gates are complete.
Questions about regional limitations are for GB car learners only, not DVA NI.

## Next steps before charging

1. Complete independent rule-by-rule review and resolve all rejected wording.
2. Check selected question choices against realistic exam-style distractor
   standards; strengthen weak options and avoid accidental easy patterns.
3. Run signed Android release AAB and actual offline/manual UI checks.
4. Complete Play listing, privacy/copyright and store policy review.
5. Publish only after explicit sign-off. Hazard clips and the full 50-question
   video-case-study exam remain outside the lean MVP.

## Licensing

This question bank is independent editorial work. Do not add DVSA licensed
question wording, videos, proprietary commercial competitor graphics or
brand marks without a separate grant of permission. Any government assets
should be checked against the applicable Open Government Licence terms.

## Mechanical independent-review gate

Run `npm run check:mvp:editorial` locally before preparing a paid Android release. The command checks that every current ID has a matching tracker row with source metadata, an explicit `APPROVED` status, a reviewer name and a valid review date. This is not a substitute for real editorial work; it only ensures that the work has been recorded. It **intentionally fails now** (0/200 approved).

GitHub CI runs the same script with `--report-only` while the bank is under review. Passing CI therefore does not mean this commercial-release sign-off is complete.
