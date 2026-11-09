# Navigation revision — 10 November 2026

The previous Home screen repeated study tools across large cards, menus and topic lists. Signs was absent from the bottom bar. Back controls returned to fixed destinations, and leaving a tool discarded its local search/topic state.

## Resulting behaviour

- Five main tabs: Home, Practice, Signs, Saved and Progress. A tab opens its overview; it does not silently resume an old question session.
- A compact Home dashboard exposes quick practice, signs, flashcards and timed practice. Unfinished practice has an explicit Continue action; completed practice has a separate review link.
- Practice opens setup directly. The default focus, length, topics and Start action fit on the connected Samsung without scrolling.
- Topic pickers replace long inline topic lists in practice, flashcards and search. Android Back closes the picker without navigating away or clearing selections.
- One shared, fixed Back control names the actual previous screen. Covered screens remain mounted and hidden from accessibility, retaining their query, selection and scroll position. The Practice tab highlights question sessions and study tools; their Back destination still follows the actual caller.
- The header provides question search. Signs has compact Study/Saved/Quiz controls.

No question content, illustration mapping, dependencies or database schema changes. Version 0.2.1, Android versionCode 3.

## Verification

TypeScript and all 66 tests passed, including six navigation transition tests. A local preview on Samsung SM-S918U passed 20 checks covering direct destinations, on-screen and Android Back, sign-search state retention, multi-topic selection, picker dismissal, practice setup retention, explicit resume and compact flashcard topics. The original database files were backed up and restored byte-for-byte after the temporary practice session used by this preview.

The standalone APK, CI result and final offline phone checks are recorded in the workspace navigation handoff after compilation.
