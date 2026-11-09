import QuestionIllustration, { Illustration } from './QuestionIllustration';
import { questions } from '../data/questions';

test('a question image renders no answer caption before reveal', () => {
  const frame = Illustration({ assetId: 'national-speed-limit' });
  expect(frame.props.children[1]).toBeNull();
  expect(frame.props.children[0].props.accessibilityLabel).toBe('White circular sign with a black diagonal stripe');
});

test('answer review includes the explanation caption', () => {
  const frame = Illustration({ assetId: 'national-speed-limit', context: 'review' });
  expect(frame.props.children[1].props.children).toBe('National speed limit applies sign');
});

test('text-only questions do not render an empty image frame', () => {
  expect(QuestionIllustration({ question: questions.find((question) => !question.imageAssetId)! })).toBeNull();
});
