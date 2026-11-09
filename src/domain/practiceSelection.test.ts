import { questions } from '../data/questions';
import { eligiblePracticeQuestions } from './practiceSelection';
import type { QuestionProgressDetail } from './revision';

const [first, second, third] = questions;
const records: QuestionProgressDetail[] = [
  { questionId: first.id, attempts: 2, correctAttempts: 1, lastSelectedIndex: first.correctIndex },
  { questionId: second.id, attempts: 1, correctAttempts: 0, lastSelectedIndex: (second.correctIndex + 1) % 4 },
];
const bank = [first, second, third, first];

test('incorrect mode uses the latest answer and respects selected topics', () => {
  expect(eligiblePracticeQuestions(bank, records, [], [], 'incorrect')).toEqual([second]);
  expect(eligiblePracticeQuestions(bank, records, [], [first.topic], 'incorrect')).toEqual([]);
});

test('unseen and saved filters ignore stale history and bookmarks and remove duplicates', () => {
  expect(eligiblePracticeQuestions(bank, records, [], [], 'unseen')).toEqual([third]);
  expect(eligiblePracticeQuestions(bank, records, [first.id, 'missing'], [], 'saved')).toEqual([first]);
});

test('multiple topics combine as a union and smart priority survives selection', () => {
  expect(eligiblePracticeQuestions(bank, records, [], [first.topic, third.topic], 'all')).toEqual([first, third]);
  expect(eligiblePracticeQuestions(bank, records, [], [], 'smart')).toEqual([second, third, first]);
});

test('empty selections return an empty pool without falling back to unrelated questions', () => {
  expect(eligiblePracticeQuestions(bank, records, [], [], 'saved')).toEqual([]);
  expect(eligiblePracticeQuestions(bank, records, [], ['unknown topic'], 'smart')).toEqual([]);
});
