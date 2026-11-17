import { basicLessons } from "./course-part-basics";
import { roadLessons } from "./course-part-road";
import { roadUserLessons } from "./course-part-road-users";
import { conditionLessons } from "./course-part-conditions";
import type { IllustrationId } from "./illustrationAssets";

export type CourseLesson = {
  id: string;
  moduleId: string;
  title: string;
  version: number;
  minutes: number;
  objectives: string[];
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    imageAssetId?: IllustrationId;
    caseStudyId?: string;
  }[];
  scenario: { title: string; text: string };
  takeaways: string[];
  sources: { title: string; url: string }[];
  questionIds: string[];
};

export type CourseModule = {
  id: string;
  title: string;
  summary: string;
  version: number;
  lessonIds: string[];
  questionIds: string[];
};

/** Original source-checked course. Independent editorial approval remains pending. */
export const courseLessons: CourseLesson[] = [
  ...basicLessons,
  ...roadLessons,
  ...roadUserLessons,
  ...conditionLessons,
];
const moduleDefinitions: { id: string; title: string; summary: string }[] = [
  {
    id: "module-foundations",
    title: "Ready to drive",
    summary:
      "Build the habits, responsibilities and observation skills that every later topic depends on.",
  },
  {
    id: "module-vehicle-care",
    title: "Vehicle care and loading",
    summary:
      "Understand the car, check its condition and carry people and loads safely.",
  },
  {
    id: "module-dashboard",
    title: "Dashboard warnings",
    summary:
      "Recognise common warnings and choose a safe response rather than guessing at a diagnosis.",
  },
  {
    id: "module-road-rules",
    title: "Road rules and control",
    summary:
      "Use signals, speed, space and road markings to plan safe decisions.",
  },
  {
    id: "module-signs",
    title: "Road signs",
    summary:
      "Read the language of signs and apply orders, warnings and route information.",
  },
  {
    id: "module-junctions",
    title: "Junctions",
    summary:
      "Plan priorities and turning movements while protecting other road users.",
  },
  {
    id: "module-roundabouts",
    title: "Roundabouts",
    summary:
      "Choose lanes and signals, then make space for the people around you.",
  },
  {
    id: "module-overtaking",
    title: "Overtaking",
    summary:
      "Decide whether a pass is safe, and leave room when passing or being passed.",
  },
  {
    id: "module-crossings",
    title: "Pedestrian crossings",
    summary: "Recognise crossing types and protect people at and near them.",
  },
  {
    id: "module-sharing",
    title: "Sharing the road",
    summary:
      "Anticipate vulnerable people and the different needs of other vehicles.",
  },
  {
    id: "module-motorways",
    title: "Motorways",
    summary:
      "Join, travel and leave safely while responding to motorway signs and closures.",
  },
  {
    id: "module-weather",
    title: "Adverse weather",
    summary:
      "Adapt visibility, grip and space to rain, fog, wind, glare and heat.",
  },
  {
    id: "module-winter",
    title: "Snow and ice",
    summary:
      "Plan winter journeys and use smooth control when grip is limited.",
  },
  {
    id: "module-parking",
    title: "Parking and stopping",
    summary: "Choose a lawful, considerate place and leave the vehicle safely.",
  },
  {
    id: "module-incidents",
    title: "Breakdowns and incidents",
    summary:
      "Protect people, get accurate help and understand your duties after an incident.",
  },
];
export const courseModules: CourseModule[] = moduleDefinitions.map((module) => {
  const lessons = courseLessons.filter(
    (lesson) => lesson.moduleId === module.id,
  );
  return {
    ...module,
    version: 1,
    lessonIds: lessons.map((lesson) => lesson.id),
    questionIds: [...new Set(lessons.flatMap((lesson) => lesson.questionIds))],
  };
});
