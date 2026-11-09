import type { IllustrationId } from './illustrationAssets';

/**
 * Original GB sign revision notes from DfT's "Know Your Traffic Signs".
 * Illustrations from DfT under the Open Government Licence v3.0.
 * Source: https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system
 * Sources checked 10 November 2026. Independent human sign-off remains pending.
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
    id: 'red-ring', imageAssetId: 'dft-red-ring', title: 'Red-bordered circle', category: 'Orders',
    description: 'A circular sign outlined in red commonly tells you about an action that is banned or restricted.',
    takeaway: 'Look for prohibitions, such as a restricted turn or speed limit.',
    reference: signingSystem,
    quiz: { prompt: 'A circular sign with a red border will usually mean…',
      answers: ['An instruction or restriction', 'A picnic site', 'A tourist route', 'Only advance warning'], correctIndex: 0 },
  },
  {
    id: 'blue-circle', imageAssetId: 'dft-blue-circle', title: 'Blue circle', category: 'Orders',
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
    id: 'no-u-turn', imageAssetId: 'dft-no-u-turn', title: 'No U-turn', category: 'Orders',
    description: 'A prohibited turn is commonly shown inside a red circular border with a bar across the turning symbol.',
    takeaway: 'Do not make the displayed prohibited turn.',
    reference: regulatory,
    quiz: { prompt: 'What does a No U-turn sign tell you?',
      answers: ['You must not make a U-turn', 'The route is one-way only', 'Make a U-turn at the next junction', 'Turn only if the road is empty'], correctIndex: 0 },
  },
  {
    id: 'warning-triangle', imageAssetId: 'signals-ahead', title: 'Red-bordered triangle', category: 'Warnings',
    description: 'An upright triangle with a red border commonly warns of a hazard or special road condition ahead.',
    takeaway: 'Scan the road ahead and be ready to adapt your driving.',
    reference: signingSystem,
    quiz: { prompt: 'What is the usual purpose of an upright red-bordered triangle?',
      answers: ['Motorway direction', 'Warn about a hazard', 'Compulsory direction', 'Car park location'], correctIndex: 1 },
  },
  {
    id: 'warning-bend', imageAssetId: 'dft-bend-right', title: 'Bend warning', category: 'Warnings',
    description: 'A triangular bend-warning sign warns that the road changes direction ahead.',
    takeaway: 'Check the bend and adjust speed to the conditions before reaching it.',
    reference: 'DfT Know Your Traffic Signs — Warning signs',
    quiz: { prompt: 'What should you consider when you see a bend-warning sign?',
      answers: ['Overtake before the bend', 'Turn on hazard lights', 'Adjust your speed for the bend ahead', 'Stop in the traffic lane'], correctIndex: 2 },
  },
  {
    id: 'warning-crossing', imageAssetId: 'dft-crossing-warning', title: 'Pedestrian crossing warning', category: 'Warnings',
    description: 'A warning sign can alert drivers to pedestrians or a crossing ahead.',
    takeaway: 'Watch the crossing area and be prepared to stop.',
    reference: 'DfT Know Your Traffic Signs — Warning signs',
    quiz: { prompt: 'A crossing-warning sign should make you…',
      answers: ['Accelerate', 'Ignore the pavement', 'Change lanes immediately', 'Look for pedestrians and be ready to stop'], correctIndex: 3 },
  },
  {
    id: 'motorway-blue', imageAssetId: 'dft-motorway-direction', title: 'Motorway direction signs', category: 'Information',
    description: 'Blue rectangular backgrounds are used for direction information on motorways.',
    takeaway: 'Use the signs to plan your lane and exit safely.',
    reference: signingSystem,
    quiz: { prompt: 'Motorway direction signs typically have which background colour?',
      answers: ['Blue', 'Brown', 'Purple', 'Pink'], correctIndex: 0 },
  },
  {
    id: 'primary-green', imageAssetId: 'dft-primary-direction', title: 'Primary route directions', category: 'Information',
    description: 'Green rectangular backgrounds are used for route directions on primary roads.',
    takeaway: 'Green backgrounds help identify a primary-route direction sign.',
    reference: signingSystem,
    quiz: { prompt: 'A green direction sign commonly identifies…',
      answers: ['A temporary closure only', 'A primary route', 'An emergency vehicle', 'A no-entry order'], correctIndex: 1 },
  },
  {
    id: 'nonprimary-white', imageAssetId: 'dft-nonprimary-direction', title: 'Non-primary route directions', category: 'Information',
    description: 'White rectangular signs are used for directions on non-primary roads and supplementary plates.',
    takeaway: 'White is often a direction-sign background away from primary routes.',
    reference: signingSystem,
    quiz: { prompt: 'Which background is generally used for non-primary route directions?',
      answers: ['Red', 'Green', 'White', 'Black'], correctIndex: 2 },
  },
  {
    id: 'information-blue', imageAssetId: 'dft-no-through-road', title: 'Blue information rectangles', category: 'Information',
    description: 'Outside the motorway direction-sign context, blue rectangular signs commonly provide road-user information.',
    takeaway: 'Think information rather than a red-ring restriction.',
    reference: signingSystem,
    quiz: { prompt: 'A blue rectangular sign off the motorway will usually…',
      answers: ['Ban every type of vehicle', 'Always warn of a sharp bend', 'Require an emergency stop', 'Give useful information'], correctIndex: 3 },
  },
  {"id": "no-entry", "title": "No entry", "category": "Orders", "imageAssetId": "dft-no-entry", "description": "Vehicular traffic must not enter from this direction.", "takeaway": "Check for a signed exception.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "What does this sign prohibit?", "answers": ["Vehicular entry", "Parking only", "Overtaking only", "Pedestrian access"], "correctIndex": 0}},
  {"id": "keep-left", "title": "Keep left", "category": "Orders", "imageAssetId": "keep-left", "description": "Pass to the left of the obstruction.", "takeaway": "Follow the arrow.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "Which side should you pass?", "answers": ["Either side", "Right", "Left", "Use the pavement"], "correctIndex": 2}},
  {"id": "signals-ahead", "title": "Traffic signals ahead", "category": "Warnings", "imageAssetId": "signals-ahead", "description": "Traffic lights control the road ahead.", "takeaway": "Check the lights and approaching traffic.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "What lies ahead?", "answers": ["A toll booth", "Traffic signals", "A level crossing", "A tunnel"], "correctIndex": 1}},
  {"id": "national-speed-limit", "title": "National speed limit", "category": "Orders", "imageAssetId": "national-speed-limit", "description": "The national limit for your vehicle and road type applies.", "takeaway": "It is not always 70 mph.", "reference": "DfT Know Your Traffic Signs — Speed limit signs", "quiz": {"prompt": "What determines the applicable limit?", "answers": ["Your engine size", "Your journey length", "The weather alone", "Vehicle class and road type"], "correctIndex": 3}},
  {"id": "speed-40", "title": "40 mph maximum", "category": "Orders", "imageAssetId": "dft-speed-40", "description": "The signed maximum is 40 mph.", "takeaway": "Drive more slowly when conditions require.", "reference": "DfT Know Your Traffic Signs — Speed limit signs", "quiz": {"prompt": "What is the signed maximum?", "answers": ["20 mph", "30 mph", "40 mph", "50 mph"], "correctIndex": 2}},
  {"id": "no-motor-vehicles", "title": "No motor vehicles", "category": "Orders", "imageAssetId": "dft-no-motor-vehicles", "description": "Motor vehicles are prohibited.", "takeaway": "Read any exception plate.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "Which traffic is prohibited?", "answers": ["Motor vehicles", "Only lorries", "Only motorcycles", "Only cars"], "correctIndex": 0}},
  {"id": "no-overtaking", "title": "No overtaking", "category": "Orders", "imageAssetId": "dft-no-overtaking", "description": "This sign prohibits overtaking.", "takeaway": "Wait until overtaking is permitted and safe.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "What does this sign prohibit?", "answers": ["Parking", "Overtaking", "Turning left", "Reversing only"], "correctIndex": 1}},
  {"id": "oncoming-priority", "title": "Give way to oncoming vehicles", "category": "Orders", "imageAssetId": "dft-oncoming-priority", "description": "Oncoming traffic has priority through the restriction.", "takeaway": "Wait for a safe gap.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "Who has priority here?", "answers": ["You always do", "The faster vehicle", "Oncoming traffic", "Only buses"], "correctIndex": 2}},
  {"id": "turn-left", "title": "Turn left ahead", "category": "Orders", "imageAssetId": "dft-turn-left", "description": "You must turn left at the junction ahead.", "takeaway": "Plan your position and signal.", "reference": "DfT Know Your Traffic Signs — Regulatory signs", "quiz": {"prompt": "What is required ahead?", "answers": ["Turn right", "Continue straight", "Make a U-turn", "Turn left"], "correctIndex": 3}},
  {"id": "crossroads", "title": "Crossroads ahead", "category": "Warnings", "imageAssetId": "dft-crossroads", "description": "A crossroads is ahead; the broader line indicates priority.", "takeaway": "Check for emerging traffic.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "Which junction is shown?", "answers": ["Crossroads", "Roundabout", "Motorway exit", "Dead end"], "correctIndex": 0}},
  {"id": "roundabout-warning", "title": "Roundabout ahead", "category": "Warnings", "imageAssetId": "dft-roundabout", "description": "The road approaches a roundabout.", "takeaway": "Read the lane signs and adjust speed.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "What is ahead?", "answers": ["Traffic lights", "Roundabout", "Road works", "Level crossing"], "correctIndex": 1}},
  {"id": "road-narrows", "title": "Road narrows on both sides", "category": "Warnings", "imageAssetId": "dft-road-narrows", "description": "The carriageway becomes narrower from both sides.", "takeaway": "Allow room and watch approaching traffic.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "What changes ahead?", "answers": ["Road widens", "One-way traffic begins", "Road narrows", "Motorway starts"], "correctIndex": 2}},
  {"id": "two-way", "title": "Two-way traffic", "category": "Warnings", "imageAssetId": "dft-two-way", "description": "Traffic travels in opposing directions ahead.", "takeaway": "Keep to your side of the road.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "What should you expect?", "answers": ["Only bicycles", "One-way traffic", "No vehicles", "Oncoming traffic"], "correctIndex": 3}},
  {"id": "slippery-road", "title": "Slippery road", "category": "Warnings", "imageAssetId": "dft-slippery-road", "description": "The road surface may offer reduced grip.", "takeaway": "Use smooth steering and braking.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "What is the hazard?", "answers": ["Slippery surface", "A bridge", "Falling rocks", "Low aircraft"], "correctIndex": 0}},
  {"id": "school", "title": "School warning", "category": "Warnings", "imageAssetId": "dft-school", "description": "Children may be going to or from school.", "takeaway": "Watch the pavement and crossing points.", "reference": "DfT Know Your Traffic Signs — Warning signs", "quiz": {"prompt": "Who may be nearby?", "answers": ["Deer", "School children", "Horse riders", "Road workers"], "correctIndex": 1}},
  {"id": "no-through-road", "title": "No through road", "category": "Information", "imageAssetId": "dft-no-through-road", "description": "There is no through route for vehicular traffic.", "takeaway": "Use another route to travel beyond it.", "reference": "DfT Know Your Traffic Signs — Information signs", "quiz": {"prompt": "What does this sign indicate?", "answers": ["No parking", "Hospital", "No through road", "Motorway end"], "correctIndex": 2}},
  {"id": "parking", "title": "Parking place", "category": "Information", "imageAssetId": "dft-parking", "description": "This sign identifies a parking place.", "takeaway": "Check local conditions and restrictions.", "reference": "DfT Know Your Traffic Signs — Information signs", "quiz": {"prompt": "What is indicated?", "answers": ["Police station", "Pedestrian route", "Petrol station", "Parking place"], "correctIndex": 3}},
  {"id": "motorway-start", "title": "Start of motorway", "category": "Information", "imageAssetId": "dft-motorway-start", "description": "Motorway regulations begin at this sign.", "takeaway": "Check that you and your vehicle are permitted.", "reference": "DfT Know Your Traffic Signs — Speed limit signs", "quiz": {"prompt": "What begins here?", "answers": ["Motorway regulations", "A 30 mph zone", "A cycle route", "A clearway only"], "correctIndex": 0}},
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
