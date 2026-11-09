export type RootScreen = 'home' | 'setup' | 'roadSigns' | 'saved' | 'progress';
export type Screen = RootScreen | 'practice' | 'mock' | 'flashcards' | 'search' | 'imageReview';
export type NavigationState = { stack: Screen[] };
export type NavigationAction =
  | { type: 'tab'; screen: RootScreen }
  | { type: 'open'; screen: Screen }
  | { type: 'back' };

export const initialNavigation: NavigationState = { stack: ['home'] };
export const screenTitles: Record<Screen, string> = {
  home: 'Home', setup: 'Practice', roadSigns: 'Signs', saved: 'Saved', progress: 'Progress',
  practice: 'Your session', mock: 'Timed practice', flashcards: 'Flashcards',
  search: 'Search', imageReview: 'Artwork review',
};
export function activeRoot({ stack }: NavigationState): RootScreen {
  const current = stack[stack.length - 1];
  if (current === 'practice' || current === 'mock' || current === 'flashcards' || current === 'search') return 'setup';
  return current === 'imageReview' ? 'home' : current;
}

export function previousScreen({ stack }: NavigationState): Screen | null {
  if (stack.length > 1) return stack[stack.length - 2];
  return stack[0] === 'home' ? null : 'home';
}

/** A tab starts at its overview; detail screens remember the actual caller. */
export function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  if (action.type === 'tab') {
    if (state.stack.length === 1 && state.stack[0] === action.screen) return state;
    return { stack: [action.screen] };
  }
  if (action.type === 'back') {
    if (state.stack.length > 1) return { stack: state.stack.slice(0, -1) };
    return state.stack[0] === 'home' ? state : initialNavigation;
  }
  const index = state.stack.indexOf(action.screen);
  if (index === state.stack.length - 1) return state;
  return { stack: index < 0 ? [...state.stack, action.screen] : state.stack.slice(0, index + 1) };
}
