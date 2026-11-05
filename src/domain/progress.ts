export type ProgressRecord = {
  questionId: string;
  attempts: number;
  correctAttempts: number;
};

export type ProgressSummary = {
  questionsAnswered: number;
  totalAttempts: number;
  correctAttempts: number;
  accuracyPercent: number;
};

export function gradeAnswer(correctIndex: number, selectedIndex: number): boolean {
  const validIndex = (value: number) => Number.isInteger(value) && value >= 0 && value <= 3;
  return validIndex(correctIndex) && validIndex(selectedIndex) && selectedIndex === correctIndex;
}

export function summarizeProgress(records: ProgressRecord[]): ProgressSummary {
  const totalAttempts = records.reduce((sum, record) => sum + Math.max(0, record.attempts), 0);
  const correctAttempts = records.reduce(
    (sum, record) => sum + Math.min(Math.max(0, record.correctAttempts), Math.max(0, record.attempts)),
    0,
  );

  return {
    questionsAnswered: records.length,
    totalAttempts,
    correctAttempts,
    accuracyPercent: totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100),
  };
}
