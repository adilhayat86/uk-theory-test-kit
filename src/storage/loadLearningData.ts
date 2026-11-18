import {
  getBookmarkedQuestionIds, getCheckpointResults, getLessonProgress, getMockResults,
  getProgressSummary, getQuestionProgressRecords, getSavedPracticeSession,
} from "./database";

/** Return one complete snapshot; a failed read must never hydrate a partial empty app. */
export async function loadLearningData() {
  const [progress, bookmarks, records, practice, lessons, checkpoints, mocks] = await Promise.all([
    getProgressSummary(), getBookmarkedQuestionIds(), getQuestionProgressRecords(),
    getSavedPracticeSession(), getLessonProgress(), getCheckpointResults(), getMockResults(50),
  ]);
  return { progress, bookmarks, records, practice, lessons, checkpoints, mocks };
}
