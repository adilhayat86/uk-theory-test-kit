import type { TheoryQuestion } from '../data/questions';
import { searchQuestions } from './questionSearch';

const question = (id: string, topic: string, prompt: string): TheoryQuestion => ({
  id, topic, prompt, difficulty: 'standard',
  options: ['First', 'Second', 'Third', 'Fourth'],
  correctIndex: 0, explanation: 'Safety and stopping', reference: 'Highway Code 126',
});
const bank = [
  question('one', 'Road signs', 'What does a circle mean?'),
  question('two', 'Weather conditions', 'How should you stop in rain?'),
];

test('supports multiword, case insensitive search', () => {
  expect(searchQuestions(bank, '  ROAD   signs ' ).map((item) => item.id)).toEqual(['one']);
});
test('searches explanations and returns a stable result order', () => {
  expect(searchQuestions(bank, 'safety')).toHaveLength(2);
});
test('searches topic, wording and source references', () => {
  expect(searchQuestions(bank, 'highway 126').map((item) => item.id)).toEqual(['one', 'two']);
});
test('returns empty list on unmatched query', () => {
  expect(searchQuestions(bank, 'zzz')).toEqual([]);
});
test('de-duplicates repeated IDs and handles blank search', () => {
  expect(searchQuestions([...bank, bank[0]], '').map((item) => item.id)).toEqual(['one', 'two']);
});
