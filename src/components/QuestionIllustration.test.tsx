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

test('a labelled teaching scene replaces the quiz diagram only after answering', () => {
  const question = questions.find((item) => item.id === 'rules-001')!;
  expect(QuestionIllustration({ question, context: 'question' })!.props.assetId).toBe('zebra-crossing');
  expect(QuestionIllustration({ question, context: 'review' })!.props.assetId).toBe('zebra-priority-example');
});

test('new illustrated questions show an uncaptioned picture before the answer', () => {
  for (const question of questions.filter((item) => item.id.startsWith('illustrated-'))) {
    const frame = QuestionIllustration({ question, context: 'question' });
    expect(frame!.props.assetId).toBe(question.imageAssetId);
    expect(Illustration({ assetId: frame!.props.assetId }).props.children[1]).toBeNull();
  }
});
