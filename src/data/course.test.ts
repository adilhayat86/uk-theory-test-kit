import { courseLessons, courseModules } from "./course";
import { questions } from "./questions";
import { illustrationAssets } from "./illustrationAssets";
import { caseStudies } from "./caseStudies";
import { selectCheckpointQuestions } from "../domain/courseAssessment";

test("the course contains complete, substantive, uniquely identified lessons", () => {
  expect(courseModules).toHaveLength(15);
  expect(courseLessons).toHaveLength(38);
  expect(new Set(courseModules.map((item) => item.id)).size).toBe(15);
  expect(new Set(courseLessons.map((item) => item.id)).size).toBe(38);
  for (const lesson of courseLessons) {
    expect(courseModules.some((module) => module.id === lesson.moduleId)).toBe(
      true,
    );
    expect(lesson.version).toBeGreaterThan(0);
    expect(lesson.minutes).toBeGreaterThan(0);
    expect(lesson.objectives.length).toBeGreaterThanOrEqual(2);
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    expect(new Set(lesson.sections.map((section) => section.id)).size).toBe(
      lesson.sections.length,
    );
    expect(
      lesson.sections.every(
        (section) => !["worked-example", "recap"].includes(section.id),
      ),
    ).toBe(true);
    const words =
      [
        ...lesson.sections.flatMap((section) => section.paragraphs),
        lesson.scenario.text,
      ]
        .join(" ")
        .match(/\b[\w’'-]+\b/gu) ?? [];
    expect({ id: lesson.id, substantive: words.length >= 250 }).toEqual({
      id: lesson.id,
      substantive: true,
    });
    expect(lesson.takeaways.length).toBeGreaterThanOrEqual(2);
    expect(
      lesson.sources.some((source) =>
        source.url.startsWith("https://www.gov.uk/"),
      ),
    ).toBe(true);
    for (const section of lesson.sections) {
      if (section.imageAssetId)
        expect(illustrationAssets[section.imageAssetId]).toBeDefined();
      if (section.caseStudyId)
        expect(Object.hasOwn(caseStudies, section.caseStudyId)).toBe(true);
    }
  }
});
test("every lesson has valid ordinary assessment questions and every topic can produce a representative check", () => {
  const bank = new Map(questions.map((question) => [question.id, question]));
  for (const lesson of courseLessons) {
    expect(new Set(lesson.questionIds).size).toBe(lesson.questionIds.length);
    expect(lesson.questionIds.length).toBeGreaterThanOrEqual(3);
    for (const id of lesson.questionIds) {
      expect({ id, exists: bank.has(id) }).toEqual({ id, exists: true });
      expect(bank.get(id)?.caseStudyVideoAssetId).toBeUndefined();
    }
  }
  for (const module of courseModules) {
    expect(module.lessonIds.length).toBeGreaterThan(0);
    expect(module.questionIds.length).toBeGreaterThanOrEqual(10);
    expect(
      module.lessonIds.every((id) =>
        courseLessons.some(
          (lesson) => lesson.id === id && lesson.moduleId === module.id,
        ),
      ),
    ).toBe(true);
    for (const draw of [0, 0.3, 0.9]) {
      const check = selectCheckpointQuestions(
        module,
        courseLessons,
        questions,
        () => draw,
      );
      expect(check).toHaveLength(10);
      expect(new Set(check.map((question) => question.id)).size).toBe(10);
      for (const lessonId of module.lessonIds) {
        const lesson = courseLessons.find((item) => item.id === lessonId)!;
        expect(
          check.some((question) => lesson.questionIds.includes(question.id)),
        ).toBe(true);
      }
    }
  }
});
test("all ordinary bank questions have a learning-material mapping and all case studies have a learning example", () => {
  const taught = new Set(courseLessons.flatMap((lesson) => lesson.questionIds));
  const unmapped = questions
    .filter(
      (question) => !question.caseStudyVideoAssetId && !taught.has(question.id),
    )
    .map((question) => question.id);
  expect(unmapped).toEqual([]);
  const examples = new Set(
    courseLessons.flatMap((lesson) =>
      lesson.sections.map((section) => section.caseStudyId).filter(Boolean),
    ),
  );
  expect([...examples].sort()).toEqual(Object.keys(caseStudies).sort());
});
