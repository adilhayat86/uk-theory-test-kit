import type { TheoryQuestion } from '../data/questions';
import {
  buildPracticeReview, filterPracticeReview, topicPracticeScores,
} from './practiceReview';

const question = (id: string, topic: string = 'Signs'): TheoryQuestion => ({
  id, topic, difficulty: 'standard', prompt: id,
  options: ['A', 'B', 'C', 'D'], correctIndex: 1,
  explanation: 'A helpful original explanation', reference: 'Highway Code',
});

const bank = [question('first'), question('second'), question('third', 'Safety')];

test('scores correct and incorrect answers and skips unanswered questions', () => {
  const result = buildPracticeReview(bank, { first: 1, second: 2 });
  expect(result.map((item) => [item.question.id, item.correct]))
    .toEqual([['first', true], ['second', false]]);
});

test('uses stable question order and avoids duplicate IDs', () => {
  expect(buildPracticeReview([...bank, bank[0]], { first: 1, second: 1 }))
    .toHaveLength(2);
});

test('discards out-of-range or invalid choices rather than inventing attempts', () => {
  expect(buildPracticeReview(bank, { first: 5, second: -1, third: NaN })).toEqual([]);
});

test('supports all, correct, incorrect and saved filters', () => {
  const entries = buildPracticeReview(bank, { first: 1, second: 2, third: 1 });
  expect(filterPracticeReview(entries, 'all')).toHaveLength(3);
  expect(filterPracticeReview(entries, 'correct').map((entry) => entry.question.id))
    .toEqual(['first', 'third']);
  expect(filterPracticeReview(entries, 'incorrect').map((entry) => entry.question.id))
    .toEqual(['second']);
  expect(filterPracticeReview(entries, 'saved', ['second', 'third']).map((entry) => entry.question.id))
    .toEqual(['second', 'third']);
});

test('computes category summaries from this session, not all-time progress', () => {
  const entries = buildPracticeReview(bank, { first: 1, second: 2, third: 1 });
  expect(topicPracticeScores(entries)).toEqual([
    { topic: 'Signs', correct: 1, attempted: 2, percentage: 50 },
    { topic: 'Safety', correct: 1, attempted: 1, percentage: 100 },
  ]);
});

test('empty practice is safe', () => {
  expect(topicPracticeScores([])).toEqual([]);
  expect(filterPracticeReview([], 'incorrect')).toEqual([]);
});
