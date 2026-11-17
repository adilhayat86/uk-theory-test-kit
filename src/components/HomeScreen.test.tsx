import React from 'react';
import HomeScreen from './HomeScreen';
import type { PracticeSession } from '../domain/practiceSession';

type ElementProps = {
  children?: React.ReactNode;
  accessibilityLabel?: string;
  onPress?: () => void;
};

function elements(node: React.ReactNode): React.ReactElement<ElementProps>[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!React.isValidElement<ElementProps>(node)) return [];
  return [node, ...elements(node.props.children)];
}

const completed: PracticeSession = {
  version: 1, id: 'completed-practice',
  questionIds: ['rules-001', 'motorway-001'],
  answers: { 'rules-001': 1, 'motorway-001': 0 },
  currentIndex: 2, startedAt: 1,
};

function renderHome(session: PracticeSession | null) {
  const onResume = jest.fn();
  const onNext = jest.fn();
  const noop = () => undefined;
  const tree = HomeScreen({
    session,
    overview: { total: 2, tried: 0, unseen: 2, correctLastTime: 0,
      needsReview: 0, coveragePercent: 0, topics: [] },
    onResume, onNext, onProgress: noop,

  });
  const controls = elements(tree);
  const find = (label: string) => controls.find((element) => element.props.accessibilityLabel === label);
  return { find, onResume, onNext };
}

test('completed practice remains reviewable from Home without starting or clearing a session', () => {
  const { find, onResume, onNext } = renderHome(completed);
  const review = find('Review last practice result');
  expect(review).toBeDefined();
  review!.props.onPress!();
  expect(onResume).toHaveBeenCalledTimes(1);
  expect(onNext).not.toHaveBeenCalled();
  expect(find('Start practice')).toBeDefined();
  expect(find('Discard practice session')).toBeUndefined();
  expect(find('Continue practice')).toBeUndefined();
});

test('unfinished practice offers Continue and no completed-result action', () => {
  const { find, onResume, onNext } = renderHome({
    ...completed, currentIndex: 1, answers: { 'rules-001': 1 },
  });
  expect(find('Review last practice result')).toBeUndefined();
  find('Continue practice')!.props.onPress!();
  expect(onResume).toHaveBeenCalledTimes(1);
  expect(onNext).not.toHaveBeenCalled();
});

test('Home without a session offers a new session and no stale review action', () => {
  const { find, onResume, onNext } = renderHome(null);
  expect(find('Review last practice result')).toBeUndefined();
  expect(find('Discard practice session')).toBeUndefined();
  find('Start practice')!.props.onPress!();
  expect(onNext).toHaveBeenCalledTimes(1);
  expect(onResume).not.toHaveBeenCalled();
});
