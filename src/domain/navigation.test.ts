import { activeRoot, initialNavigation, navigationReducer as reduce, previousScreen } from './navigation';

test('Back returns from a saved-question session to Saved', () => {
  const saved = reduce(reduce(initialNavigation, { type: 'tab', screen: 'more' }), { type: 'open', screen: 'saved' });
  const session = reduce(saved, { type: 'open', screen: 'practice' });
  expect(activeRoot(session)).toBe('more');
  expect(previousScreen(session)).toBe('saved');
  expect(reduce(session, { type: 'back' })).toEqual(saved);
});

test('global search returns to the originating sign study screen', () => {
  const signs = reduce(reduce(initialNavigation, { type: 'tab', screen: 'more' }), { type: 'open', screen: 'roadSigns' });
  const search = reduce(signs, { type: 'open', screen: 'search' });
  expect(activeRoot(search)).toBe('more');
  expect(reduce(search, { type: 'back' })).toEqual(signs);
});

test('nested practice returns to its search before returning to the overview', () => {
  let state = reduce(initialNavigation, { type: 'tab', screen: 'setup' });
  state = reduce(state, { type: 'open', screen: 'search' });
  state = reduce(state, { type: 'open', screen: 'practice' });
  expect(reduce(state, { type: 'back' }).stack).toEqual(['setup', 'search']);
  expect(activeRoot(state)).toBe('setup');
});

test('a main-tab press opens its overview instead of unexpectedly resuming a session', () => {
  const detail = { stack: ['setup', 'mock'] as const };
  expect(reduce({ stack: [...detail.stack] }, { type: 'tab', screen: 'setup' }).stack).toEqual(['setup']);
});

test('Back from a root returns Home, then allows Android to exit', () => {
  const state = reduce(initialNavigation, { type: 'open', screen: 'progress' });
  expect(previousScreen(state)).toBe('home');
  expect(reduce(state, { type: 'back' })).toEqual(initialNavigation);
  expect(previousScreen(initialNavigation)).toBeNull();
  expect(reduce(initialNavigation, { type: 'back' })).toBe(initialNavigation);
});

test('opening the current screen cannot add duplicate Back steps', () => {
  const state = reduce(initialNavigation, { type: 'open', screen: 'flashcards' });
  expect(reduce(state, { type: 'open', screen: 'flashcards' })).toBe(state);
  expect(reduce(state, { type: 'open', screen: 'home' })).toEqual(initialNavigation);
});


test('Home continuation keeps Home selected and Back returns Home', () => {
  const state=reduce(initialNavigation,{type:'open',screen:'practice'});
  expect(activeRoot(state)).toBe('home');
  expect(reduce(state,{type:'back'})).toEqual(initialNavigation);
});
test('tools and nested sessions keep More selected and preserve their caller', () => {
  let state=reduce(initialNavigation,{type:'tab',screen:'more'});
  state=reduce(state,{type:'open',screen:'search'});
  state=reduce(state,{type:'open',screen:'practice'});
  expect(activeRoot(state)).toBe('more');
  expect(previousScreen(state)).toBe('search');
  expect(reduce(state,{type:'back'}).stack).toEqual(['more','search']);
});
