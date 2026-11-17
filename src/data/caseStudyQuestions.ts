import type { TheoryQuestion } from './questions';

const usingRoad = 'https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203';
const generalRules = 'https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158';
const extraCare = 'https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225';

/** Original questions tied to visible events in the bundled animations; independent editorial review pending. */
export const caseStudyQuestions: TheoryQuestion[] = [
  {
    id: 'case-zebra-001', topic: 'Pedestrian crossings', difficulty: 'easy',
    caseStudyVideoAssetId: 'case-zebra-crossing',
    prompt: 'In the video, why does the blue car stop before the zebra crossing?',
    options: ['To give way to the person waiting to cross', 'To let a car overtake on the crossing', 'To park beside the crossing', 'To ask the pedestrian for directions'],
    correctIndex: 0,
    explanation: 'The person is waiting at the zebra crossing. Drivers should give way to people waiting to cross and must give way once a pedestrian has moved onto the crossing.',
    reference: 'Highway Code, Rule 195 and Rule H2', sourceUrl: usingRoad,
  },
  {
    id: 'case-zebra-002', topic: 'Pedestrian crossings', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-zebra-crossing',
    prompt: 'The pedestrian is walking across the road in the video. What must the blue car driver do?',
    options: ['Move forward if the opposite car is stationary', 'Sound the horn to make the person hurry', 'Continue giving way while the person is on the crossing', 'Drive around the pedestrian if there is space'],
    correctIndex: 2,
    explanation: 'A pedestrian on a zebra crossing must be given way to. A stopped vehicle in the other direction does not make it safe to drive through the crossing.',
    reference: 'Highway Code, Rule 195', sourceUrl: usingRoad,
  },
  {
    id: 'case-zebra-003', topic: 'Pedestrian crossings', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-zebra-crossing',
    prompt: 'After the person in the video has crossed, what should the blue car driver check before moving on?',
    options: ['Whether the driver behind wants to overtake', 'That the crossing is clear and nobody else is waiting or crossing', 'Only whether the opposite car has started moving', 'Whether there is room to stop on the crossing'],
    correctIndex: 1,
    explanation: 'Check the whole crossing and both approaches for other pedestrians. The movement of another vehicle is not a substitute for checking that it is safe to proceed.',
    reference: 'Highway Code, Rule 195', sourceUrl: usingRoad,
  },
  {
    id: 'case-wet-001', topic: 'Weather conditions', difficulty: 'easy',
    caseStudyVideoAssetId: 'case-wet-following',
    prompt: 'Which condition shown in the video affects how much space the blue car should leave?',
    options: ['A closed tunnel', 'Deep snow covering the lanes', 'Dry road markings in bright sunshine', 'Rain and a wet road surface'],
    correctIndex: 3,
    explanation: 'Rain and the wet surface are visible. Wet conditions increase stopping distances, so the driver needs more space behind the vehicle in front.',
    reference: 'Highway Code, Rule 126', sourceUrl: generalRules,
  },
  {
    id: 'case-wet-002', topic: 'Weather conditions', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-wet-following',
    prompt: 'When travelling at high speed in the wet conditions shown, what minimum following time should the blue car driver allow?',
    options: ['One second', 'Two seconds', 'At least four seconds', 'The same small gap at every speed'],
    correctIndex: 2,
    explanation: 'On high-speed roads the usual two-second gap should be at least doubled when the road is wet. A fixed roadside point can help judge the time gap.',
    reference: 'Highway Code, Rule 126', sourceUrl: generalRules,
  },
  {
    id: 'case-wet-003', topic: 'Weather conditions', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-wet-following',
    prompt: 'Why is the growing space between the blue car and the car ahead useful in the video?',
    options: ['It gives the following driver more time to react and stop', 'It removes the need to watch the vehicle ahead', 'It makes the road dry more quickly', 'It gives the blue car permission to exceed the speed limit'],
    correctIndex: 0,
    explanation: 'A larger following gap provides time to respond if the vehicle ahead slows. It does not replace observation or change the speed limit.',
    reference: 'Highway Code, Rule 126', sourceUrl: generalRules,
  },
  {
    id: 'case-cyclist-001', topic: 'Overtaking', difficulty: 'easy',
    caseStudyVideoAssetId: 'case-cyclist-oncoming',
    prompt: 'What visible hazard makes the blue car driver wait behind the cyclist before overtaking?',
    options: ['A red traffic signal', 'A car approaching in the opposite direction', 'A level-crossing barrier', 'A motorway exit lane'],
    correctIndex: 1,
    explanation: 'The approaching car uses the space needed for a safe overtake. Stay back until the road ahead is clear and there is enough room to pass the cyclist safely.',
    reference: 'Highway Code, Rules 162 and 163', sourceUrl: usingRoad,
  },
  {
    id: 'case-cyclist-002', topic: 'Overtaking', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-cyclist-oncoming',
    prompt: 'Why should the blue car driver expect the cyclist in the video to move farther from the left edge?',
    options: ['Cyclists must always use the opposite lane', 'The cyclist has to signal the car to pass', 'Parked vehicles can create a door-opening hazard', 'A cyclist should ride as close to parked cars as possible'],
    correctIndex: 2,
    explanation: 'A cyclist may need space away from parked vehicles to avoid an opening door. Drivers should allow for that movement and leave enough room rather than squeezing past.',
    reference: 'Highway Code, Rule 213', sourceUrl: extraCare,
  },
  {
    id: 'case-cyclist-003', topic: 'Overtaking', difficulty: 'standard',
    caseStudyVideoAssetId: 'case-cyclist-oncoming',
    prompt: 'If overtaking the cyclist at up to 30 mph, how much passing space should the blue car driver allow?',
    options: ['Only the width of the cycle handlebars', 'Half a metre whenever the road is narrow', 'No extra space once the horn is sounded', 'At least 1.5 metres, and more at higher speeds'],
    correctIndex: 3,
    explanation: 'Leave at least 1.5 metres when overtaking a cyclist at speeds up to 30 mph, with more room at higher speeds. If that space is not available, wait behind.',
    reference: 'Highway Code, Rule 163', sourceUrl: usingRoad,
  },
];
