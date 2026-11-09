import QuestionIllustration, { Illustration } from './QuestionIllustration';
import { questions } from '../data/questions';

test('a question image renders no answer caption before reveal', () => {
  const frame = Illustration({ assetId: 'national-speed-limit' });
  expect(frame.props.children[1]).toBeNull();
  expect(frame.props.children[0].props.accessibilityLabel).toBe('White circular sign with a black diagonal stripe');
});

test('answer review includes the explanation caption', () => {
  const frame = Illustration({ assetId: 'national-speed-limit', context: 'review' });
  expect(frame.props.children[1].props.children).toBe('National speed limit applies');
});

test('teaching diagrams stay hidden until an answer is revealed', () => {
  const question = questions.find((item) => item.id === 'gb-safety-013')!;
  expect(QuestionIllustration({ question, context: 'question' })).toBeNull();
  const revealed = QuestionIllustration({ question, context: 'review' });
  expect(revealed!.props.assetId).toBe('tyre-tread');
});

test('text-only questions do not render an empty image frame', () => {
  expect(QuestionIllustration({ question: questions.find((question) => !question.imageAssetId)! })).toBeNull();
});
