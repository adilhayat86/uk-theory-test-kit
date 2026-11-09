import type { IllustrationId } from './illustrationAssets';

/**
 * Original text-first GB sign revision notes from DfT's "Know Your Traffic Signs".
 * Selected notes include original simplified teaching diagrams.
 * Source: https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system
 * Sources last editorially reviewed 6 November 2026. Recheck before store release.
 */
export type RoadSignCategory = 'Orders' | 'Warnings' | 'Information';

export type RoadSignFact = {
  id: string;
  title: string;
  imageAssetId?: IllustrationId;
  category: RoadSignCategory;
  description: string;
  takeaway: string;
  reference: string;
  quiz: { prompt: string; answers: [string, string, string, string]; correctIndex: 0 | 1 | 2 | 3 };
};

const signingSystem = 'DfT Know Your Traffic Signs — The signing system';
const regulatory = 'DfT Know Your Traffic Signs — Regulatory signs';

export const roadSignFacts: RoadSignFact[] = [
  {
    id: 'red-ring', title: 'Red-bordered circle', category: 'Orders',
    description: 'A circular sign outlined in red commonly tells you about an action that is banned or restricted.',
    takeaway: 'Look for prohibitions, such as a restricted turn or speed limit.',
    reference: signingSystem,
    quiz: { prompt: 'A circular sign with a red border will usually mean…',
      answers: ['An instruction or restriction', 'A picnic site', 'A tourist route', 'Only advance warning'], correctIndex: 0 },
  },
  {
    id: 'blue-circle', title: 'Blue circle', category: 'Orders',
    description: 'A solid blue circular sign usually tells drivers to follow a particular direction or to use a designated route.',
    takeaway: 'Many blue circles give positive instructions.',
    reference: signingSystem,
    quiz: { prompt: 'What does a blue circular sign usually indicate?',
      answers: ['A junction warning', 'A positive instruction or designated route', 'A parking charge', 'A place-name direction'], correctIndex: 1 },
  },
  {
    id: 'stop', imageAssetId: 'stop-sign', title: 'STOP sign', category: 'Orders',
    description: 'An eight-sided STOP sign is intentionally different in shape from most other order signs.',
    takeaway: 'Stop before crossing the stop line and check that it is safe to proceed.',
    reference: regulatory,
    quiz: { prompt: 'When you reach a STOP sign with a stop line, you must…',
      answers: ['Slow if traffic is light', 'Stop only if someone is crossing', 'Come to a complete stop before the line', 'Sound your horn'], correctIndex: 2 },
  },
  {
    id: 'give-way', imageAssetId: 'give-way', title: 'GIVE WAY sign', category: 'Orders',
    description: 'This sign is shaped like an upside-down triangle to make it easily recognisable.',
    takeaway: 'Give priority to traffic on the major road.',
    reference: regulatory,
    quiz: { prompt: 'At a GIVE WAY sign, what is your duty?',
      answers: ['Stop for exactly ten seconds', 'Always drive through first', 'Ignore road markings', 'Give priority to traffic on the major road'], correctIndex: 3 },
  },
  {
    id: 'no-u-turn', title: 'No U-turn', category: 'Orders',
    description: 'A prohibited turn is commonly shown inside a red circular border with a bar across the turning symbol.',
    takeaway: 'Do not make the displayed prohibited turn.',
    reference: regulatory,
    quiz: { prompt: 'What does a No U-turn sign tell you?',
      answers: ['You must not make a U-turn', 'The route is one-way only', 'Make a U-turn at the next junction', 'Turn only if the road is empty'], correctIndex: 0 },
  },
  {
    id: 'warning-triangle', title: 'Red-bordered triangle', category: 'Warnings',
    description: 'An upright triangle with a red border commonly warns of a hazard or special road condition ahead.',
    takeaway: 'Scan the road ahead and be ready to adapt your driving.',
    reference: signingSystem,
    quiz: { prompt: 'What is the usual purpose of an upright red-bordered triangle?',
      answers: ['Motorway direction', 'Warn about a hazard', 'Compulsory direction', 'Car park location'], correctIndex: 1 },
  },
  {
    id: 'warning-bend', title: 'Bend warning', category: 'Warnings',
    description: 'A triangular bend-warning sign warns that the road changes direction ahead.',
    takeaway: 'Check the bend and adjust speed to the conditions before reaching it.',
    reference: 'DfT Know Your Traffic Signs — Warning signs',
    quiz: { prompt: 'What should you consider when you see a bend-warning sign?',
      answers: ['Overtake before the bend', 'Turn on hazard lights', 'Adjust your speed for the bend ahead', 'Stop in the traffic lane'], correctIndex: 2 },
  },
  {
    id: 'warning-crossing', title: 'Pedestrian crossing warning', category: 'Warnings',
    description: 'A warning sign can alert drivers to pedestrians or a crossing ahead.',
    takeaway: 'Watch the crossing area and be prepared to stop.',
    reference: 'DfT Know Your Traffic Signs — Warning signs',
    quiz: { prompt: 'A crossing-warning sign should make you…',
      answers: ['Accelerate', 'Ignore the pavement', 'Change lanes immediately', 'Look for pedestrians and be ready to stop'], correctIndex: 3 },
  },
  {
    id: 'motorway-blue', title: 'Motorway direction signs', category: 'Information',
    description: 'Blue rectangular backgrounds are used for direction information on motorways.',
    takeaway: 'Use the signs to plan your lane and exit safely.',
    reference: signingSystem,
    quiz: { prompt: 'Motorway direction signs typically have which background colour?',
      answers: ['Blue', 'Brown', 'Purple', 'Pink'], correctIndex: 0 },
  },
  {
    id: 'primary-green', title: 'Primary route directions', category: 'Information',
    description: 'Green rectangular backgrounds are used for route directions on primary roads.',
    takeaway: 'Green backgrounds help identify a primary-route direction sign.',
    reference: signingSystem,
    quiz: { prompt: 'A green direction sign commonly identifies…',
      answers: ['A temporary closure only', 'A primary route', 'An emergency vehicle', 'A no-entry order'], correctIndex: 1 },
  },
  {
    id: 'nonprimary-white', title: 'Non-primary route directions', category: 'Information',
    description: 'White rectangular signs are used for directions on non-primary roads and supplementary plates.',
    takeaway: 'White is often a direction-sign background away from primary routes.',
    reference: signingSystem,
    quiz: { prompt: 'Which background is generally used for non-primary route directions?',
      answers: ['Red', 'Green', 'White', 'Black'], correctIndex: 2 },
  },
  {
    id: 'information-blue', title: 'Blue information rectangles', category: 'Information',
    description: 'Outside the motorway direction-sign context, blue rectangular signs commonly provide road-user information.',
    takeaway: 'Think information rather than a red-ring restriction.',
    reference: signingSystem,
    quiz: { prompt: 'A blue rectangular sign off the motorway will usually…',
      answers: ['Ban every type of vehicle', 'Always warn of a sharp bend', 'Require an emergency stop', 'Give useful information'], correctIndex: 3 },
  },
];

export const roadSignCategories: RoadSignCategory[] = ['Orders', 'Warnings', 'Information'];

export function findRoadSignFacts(items: RoadSignFact[], query: string, category?: RoadSignCategory): RoadSignFact[] {
  const terms = query.trim().toLocaleLowerCase('en-GB').split(/\s+/u).filter(Boolean);
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    if (category && item.category !== category) return false;
    const searchText = [item.title, item.category, item.description, item.takeaway].join(' ').toLocaleLowerCase('en-GB');
    return terms.every((term) => searchText.includes(term));
  });
}
