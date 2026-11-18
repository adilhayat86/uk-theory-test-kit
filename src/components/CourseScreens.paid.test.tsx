import React from "react";
import { CourseHome } from "./CourseScreens";
import { courseLessons, courseModules } from "../data/course";
import { buildCourseProgress } from "../domain/courseProgress";
import type { PracticeSession } from "../domain/practiceSession";

jest.mock("./CaseStudyVideo", () => () => null);
jest.mock("./TimedProgress", () => () => null);

type Props = { children?: React.ReactNode; title?: string; onPress?: () => void; secondary?: boolean };
function elements(node: React.ReactNode): React.ReactElement<Props>[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!React.isValidElement<Props>(node)) return [];
  return [node, ...elements(node.props.children)];
}
const ordinary: PracticeSession = {
  version: 1, id: "saved-practice", questionIds: ["rules-001"], answers: {}, currentIndex: 0, startedAt: 1,
};
function render(session: PracticeSession | null) {
  const onLesson = jest.fn(), onResume = jest.fn();
  const noop = () => undefined;
  const tree = CourseHome({ progress: buildCourseProgress(courseModules, courseLessons, [], []),
    records: [], session, onLesson, onResume, onModule: noop, onTools: noop, onExams: noop });
  const buttons = elements(tree).filter((element) => element.props.title);
  return { buttons, onLesson, onResume };
}
test("an unfinished ordinary practice never displaces the primary reading step", () => {
  const { buttons, onLesson, onResume } = render(ordinary);
  expect(buttons[0].props.title).toBe("Continue learning");
  buttons[0].props.onPress!();
  expect(onLesson).toHaveBeenCalledWith(courseLessons[0].id);
  expect(onResume).not.toHaveBeenCalled();
  const resume = buttons.find((button) => button.props.title === "Continue practice")!;
  expect(resume.props.secondary).toBe(true);
  resume.props.onPress!();
  expect(onResume).toHaveBeenCalledTimes(1);
});
test("an unfinished topic check remains part of the guided learning next step", () => {
  const module = courseModules[0];
  const { buttons, onResume, onLesson } = render({ ...ordinary,
    checkpoint: { moduleId: module.id, moduleVersion: module.version,
      lessonVersions: Object.fromEntries(module.lessonIds.map((id) => [id, 1])) } });
  expect(buttons[0].props.title).toBe("Continue topic check");
  buttons[0].props.onPress!();
  expect(onResume).toHaveBeenCalledTimes(1);
  expect(onLesson).not.toHaveBeenCalled();
});
test("a fresh learner receives the first real lesson without a saved-practice action", () => {
  const { buttons } = render(null);
  expect(buttons[0].props.title).toBe("Continue learning");
  expect(buttons.some((button) => button.props.title === "Continue practice")).toBe(false);
});
