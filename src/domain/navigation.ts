export type RootScreen = "home" | "setup" | "mock" | "progress";
export type Screen =
  | RootScreen
  | "more"
  | "help"
  | "module"
  | "lesson"
  | "roadSigns"
  | "saved"
  | "practice"
  | "flashcards"
  | "search"
  | "imageReview";
export type NavigationState = { stack: Screen[] };
export type NavigationAction =
  | { type: "tab"; screen: RootScreen }
  | { type: "open"; screen: Screen }
  | { type: "back" };

export const initialNavigation: NavigationState = { stack: ["home"] };
export const screenTitles: Record<Screen, string> = {
  home: "Learn",
  setup: "Practise",
  more: "Study tools",
  help: "Help",
  module: "Topic",
  lesson: "Lesson",
  roadSigns: "Signs",
  saved: "Saved",
  progress: "Progress",
  practice: "Your session",
  mock: "Mock exams",
  flashcards: "Flashcards",
  search: "Search",
  imageReview: "My images",
};
export function activeRoot({ stack }: NavigationState): RootScreen {
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const screen = stack[i];
    if (
      screen === "home" ||
      screen === "setup" ||
      screen === "mock" ||
      screen === "progress"
    )
      return screen;
  }
  return "home";
}

export function previousScreen({ stack }: NavigationState): Screen | null {
  if (stack.length > 1) return stack[stack.length - 2];
  return stack[0] === "home" ? null : "home";
}

/** A tab starts at its overview; detail screens remember the actual caller. */
export function navigationReducer(
  state: NavigationState,
  action: NavigationAction,
): NavigationState {
  if (action.type === "tab") {
    if (state.stack.length === 1 && state.stack[0] === action.screen)
      return state;
    return { stack: [action.screen] };
  }
  if (action.type === "back") {
    if (state.stack.length > 1) return { stack: state.stack.slice(0, -1) };
    return state.stack[0] === "home" ? state : initialNavigation;
  }
  const index = state.stack.indexOf(action.screen);
  if (index === state.stack.length - 1) return state;
  return {
    stack:
      index < 0
        ? [...state.stack, action.screen]
        : state.stack.slice(0, index + 1),
  };
}
