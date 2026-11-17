# Learning-first rebuild — internal version0.7.0

This product direction supersedes the earlier practice-first/simplified navigation. The user asked for substantive learning material followed by assessment and progress toward mocks, while retaining direct exam access after an explicit study confirmation.

## Learning model

Four roots: Learn, Practise, Exams, Progress. Learn is a15-module38-lesson course, with reading objectives, explanations, worked road scenarios, selected illustrations/video examples, recaps and primary-source references. The309-question bank contains the unchanged228 original questions plus72 gap questions and9 linked video questions. New foundation, documentation, loading, incidents and sharing content broadens the previous narrow topic bank.

Opening or scrolling a lesson does not mark it learned. The learner explicitly confirms studying its final recap; their reading position is stored percontentversion. A topic completes only after all its current-version lessons are confirmed and a dedicated10-question checkpoint passes at8/10. The selector represents every lesson. Latest compatible checkpoint governs revise/pass status; ordinary revision and self-attestation never award course completion. New content versions invalidate affected confirmations/checkpoint credit without deleting historical answers.

Exams can be entered directly. An unchecked confirmation states that the learner has studied the material here or elsewhere. Each new attempt needs a fresh confirmation, persisted with that attempt; resume uses its stored confirmation. This does not mark course material read.

## Mock format and original media

Full multiple-choice practice:50uniquequestions,57minutes,43correctpracticepass.47ordinaryquestions sample across topic groups, followed by3questions linked to one of3registered silent20-second animations. Actual localMP4s must exist and be bundled; metadata alone is insufficient. The existing5-question warm-up remains a clearly labelled secondary option. Correct answers appear aftersubmission; flags, jump list, changes, wall-clock timeout and history are saved offline. Lesson links support targeted revision after errors.

The clips are original educational diagram animations, notDVSAfootage. These mocks do not assess hazard perception. Official format references checked17November2026: https://www.gov.uk/theory-test/multiple-choice-questions and https://www.gov.uk/theory-test/pass-mark-and-result .

## Storage and compatibility

Additive lesson_progress/checkpoint_results tables; legacy question/bookmark/practice/mock records remain compatible. Dedicated checkpoints persist context(moduleversion+lessonversions), queue and complete answer snapshot, scored transactionally and idempotently. Mock acknowledgements are separate fromreading/checkpointrecords. No automatic wipe onupdate. The prior Samsung fresh-start request was device-specific, not an update migration.

## Review boundary

Independent human editorial approval remains pending for questions, lessons and original media. Primary-source author checks, structuraltests and deviceQA are not independent approval. InternalAPK delivery does not authorize a paid store release, publication or merge into main. The existing source/licensing attribution and release-review requirements continue to apply.
