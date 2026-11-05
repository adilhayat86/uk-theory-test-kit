import type { RoadSign } from '../data/roadSigns';

export type SignQuizQuestion = {
  signId: string;
  options: [string, string, string, string];
  answerIndex: number;
};

export function shuffleItems<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const sample = random();
    if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
      throw new Error('Random generator returned an invalid value.');
    }
    const j = Math.floor(sample * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/**
 * Sign identification from original visual diagrams.
 * Distractors come from the same category first, not random unrelated labels.
 */
export function makeSignQuiz(
  signs: readonly RoadSign[],
  count: number,
  random: () => number = Math.random,
): SignQuizQuestion[] {
  if (!Number.isInteger(count) || count < 1 || count > signs.length) {
    throw new Error('Not enough signs to start quiz.');
  }
  const ids = new Set(signs.map((sign) => sign.id));
  if (ids.size !== signs.length || new Set(signs.map((sign) => sign.label)).size !== signs.length) {
    throw new Error('All signs must have unique IDs and labels.');
  }
  return shuffleItems(signs, random).slice(0, count).map((sign) => {
    const related = signs.filter((other) =>
      other.id !== sign.id && other.category === sign.category).map((item) => item.label);
    const alternate = signs.filter((other) =>
      other.id !== sign.id && other.category !== sign.category).map((item) => item.label);
    const distractors = shuffleItems([...related], random).slice(0, 3);
    if (distractors.length < 3) {
      distractors.push(...shuffleItems(alternate, random).slice(0, 3 - distractors.length));
    }
    const options = shuffleItems([sign.label, ...distractors], random) as [
      string, string, string, string,
    ];
    return {
      signId: sign.id,
      options,
      answerIndex: options.indexOf(sign.label),
    };
  });
}
