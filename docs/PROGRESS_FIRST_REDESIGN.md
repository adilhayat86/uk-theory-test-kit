# Roadstep progress-first test build

## Competitor review

On 16 November 2026 the installed UK 4 in 1 app (`uk.co.focusmm.DTSCombo`) was inspected on the Samsung: Home, Theory Test, Progress Monitor, Pass Guarantee overview and Learner Plan goals. No practice questions were answered, no test results/profile details were edited, and no subscriptions or claims were started. Local screenshots stay outside this repository.

Observed patterns: the progress monitor separates practice and mocks, shows an average score and dated results; the learner plan shows overall completion, concrete goals and actions. Those observations inform the learning loop, not a copy of the competitor's screens, artwork, content, guarantees or thresholds.

Public references checked: [4 in 1 product listing](https://play.google.com/store/apps/details?hl=en-GB&id=uk.co.focusmm.DTSCombo), [Learner Plan FAQ](https://drivingtestsuccess.com/pass-guarantee-frequently-asked-questions/), [Official DVSA app](https://play.google.com/store/apps/details?gl=UK&hl=en-GB&id=uk.co.tso.ctt), and [Theory Test Pro's distinction between averages and current knowledge](https://www.theorytestpro.co.uk/posts/changes-to-the-way-the-mastery-score-is-calculated/).

## Product changes

- Roadstep is the working internal brand: an original ascending checkpoint mark, warm neutral surfaces, indigo actions and lime accents. It has not undergone public brand clearance.
- Home starts with question coverage and one recommended next step: a saved session, up to ten unresolved mistakes, up to ten unseen questions, then mixed revision. Focus areas link directly to their topic setup.
- Progress is the central navigation destination. The learning route links bank exploration, mistakes and mixed revision to practice; each topic has an actionable coverage row.
- Coverage, correct last try, questions to revisit and historical answer accuracy have separate definitions. A later wrong answer moves a question back into review. Incomplete coverage cannot round up to 100%.
- Practice results lead directly to the shared progress overview. Flashcards remain unscored. Existing mock results remain separate from question-practice accuracy; no new mock-performance graph is fabricated.
- The current practice session can be discarded from Home. The queued `clearSavedPractice()` operation deletes only the single active-practice slot. Answer history, saved questions and saved signs are preserved. Discarding does not automatically restart practice.
- The original 228 questions, answer IDs and all image bindings are unchanged. The full 121-image collection remains available in this internal build, lower in the learning flow.

## Scope and validation

Version 0.5.0 / Android code 7 retains the existing package, SQLite database and update signing identity. This is a Great Britain car-theory internal test build, not a licensed complete DVSA question bank or a hazard-perception product. Coverage and current answers are study measures, not an official-test readiness probability.

Validation covers TypeScript, regression tests for the learning model and existing session/revision engines, learner Android/iOS exports and selected-image checks, the internal full-image export, and native CI. Device QA must verify the rebrand, current-session discard with unchanged answer/bookmark history, actionable progress rows, answer updates and cold restart. Record final build/device results in the workspace result document.
