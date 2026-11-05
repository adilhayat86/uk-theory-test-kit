import { additionalQuestions } from './additionalQuestions';

export type TheoryQuestion = {
  id: string;
  topic: string;
  difficulty: 'easy' | 'standard' | 'challenging';
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  reference: string;
  /** Locally bundled video asset linking a three-question case study; future content. */
  caseStudyVideoAssetId?: string;
};

export const questions: TheoryQuestion[] = [
  {
    id: 'rules-001',
    topic: 'Road rules',
    difficulty: 'easy',
    prompt: 'You are approaching a zebra crossing and a pedestrian is waiting to cross. What should you do?',
    options: [
      'Maintain your speed unless they step onto the crossing',
      'Give way and be prepared to stop',
      'Sound your horn to warn them',
      'Wave them across while continuing to drive',
    ],
    correctIndex: 1,
    explanation: 'You should give way to pedestrians waiting to cross at a zebra crossing. Never wave or signal them across because another vehicle may not have seen them.',
    reference: 'Highway Code, Rule 195',
  },
  {
    id: 'motorway-001',
    topic: 'Motorways',
    difficulty: 'standard',
    prompt: 'When may you use a motorway hard shoulder?',
    options: [
      'To make a phone call',
      'To overtake slow traffic',
      'In an emergency or when directed by an authorised signal or person',
      'Whenever traffic is congested',
    ],
    correctIndex: 2,
    explanation: 'You must not use a hard shoulder except in an emergency or when directed by the police, traffic officers or a traffic sign. Some motorways have a hard shoulder that can be opened as a running lane when signs permit.',
    reference: 'Highway Code, Rule 269',
  },
  {
    id: 'safety-001',
    topic: 'Vehicle safety',
    difficulty: 'easy',
    prompt: 'What is the main purpose of a correctly adjusted head restraint?',
    options: [
      'To make the seat more comfortable',
      'To reduce the risk of neck injury in a collision',
      'To support luggage on the back seat',
      'To improve rear visibility',
    ],
    correctIndex: 1,
    explanation: 'A correctly adjusted head restraint helps reduce the risk of neck injury, particularly whiplash, in a collision.',
    reference: 'Highway Code, vehicle safety guidance',
  },
  {
    id: 'weather-001',
    topic: 'Weather conditions',
    difficulty: 'standard',
    prompt: 'On a high-speed road in wet weather, how should you change the normal two-second following gap?',
    options: [
      'Keep it at two seconds',
      'At least double it',
      'Reduce it to one second',
      'Increase it only at night',
    ],
    correctIndex: 1,
    explanation: 'The Highway Code advises that the gap should be at least doubled on wet roads. Wet conditions also increase stopping distances.',
    reference: 'Highway Code, Rule 126',
  },
  {
    id: 'signs-001',
    topic: 'Road signs',
    difficulty: 'easy',
    prompt: 'What does a red circular road sign generally indicate?',
    options: [
      'An order or restriction',
      'A tourist attraction',
      'A warning of a hazard only',
      'A motorway service area',
    ],
    correctIndex: 0,
    explanation: 'Circular signs generally give orders. Red circles are commonly used for prohibitions and restrictions.',
    reference: 'Know Your Traffic Signs, regulatory signs',
  },
  {
    "id": "junction-001",
    "topic": "Road junctions",
    "difficulty": "standard",
    "prompt": "You reach a STOP sign and a solid white line at a junction. What must you do?",
    "options": [
      "Stop behind the line and wait for a safe gap",
      "Slow down and continue if the road seems clear",
      "Stop only if another driver sounds a horn",
      "Stop after the line so you can see better"
    ],
    "correctIndex": 0,
    "explanation": "You must stop behind the solid white line at a STOP sign, then wait until there is a safe gap before moving off.",
    "reference": "Highway Code, Rule 171"
  },
  {
    "id": "junction-002",
    "topic": "Road junctions",
    "difficulty": "standard",
    "prompt": "You are turning into a side road. A pedestrian is waiting to cross that road. What should you do?",
    "options": [
      "Turn quickly before the pedestrian steps out",
      "Give way to the pedestrian waiting to cross",
      "Sound your horn to signal your intention",
      "Wave them to wait and continue"
    ],
    "correctIndex": 1,
    "explanation": "When turning at a junction, you should give way to pedestrians crossing or waiting to cross the road into which you are turning.",
    "reference": "Highway Code, Rule 170"
  },
  {
    "id": "roundabout-001",
    "topic": "Roundabouts",
    "difficulty": "easy",
    "prompt": "At a normal roundabout with no signs telling you otherwise, which traffic generally has priority?",
    "options": [
      "Traffic approaching from your left",
      "Traffic approaching from your right",
      "Vehicles entering fastest",
      "Only buses and taxis"
    ],
    "correctIndex": 1,
    "explanation": "Give priority to traffic approaching from your right unless road signs, signals or markings direct otherwise.",
    "reference": "Highway Code, Rule 185"
  },
  {
    "id": "roundabout-002",
    "topic": "Roundabouts",
    "difficulty": "standard",
    "prompt": "You intend to take the first exit left at a roundabout, and signs do not say otherwise. What is the usual approach?",
    "options": [
      "Signal right and use the right lane",
      "Enter without indicating",
      "Signal left and approach in the left-hand lane",
      "Use either lane but never indicate"
    ],
    "correctIndex": 2,
    "explanation": "For the first exit left, normally signal left and approach in the left-hand lane; continue signalling left to leave.",
    "reference": "Highway Code, Rule 186"
  },
  {
    "id": "overtaking-001",
    "topic": "Overtaking",
    "difficulty": "standard",
    "prompt": "You are approaching a blind bend. What is the safest choice about overtaking?",
    "options": [
      "Overtake if the vehicle ahead is slow",
      "Overtake only while sounding your horn",
      "Wait until you can see far enough ahead and it is safe",
      "Drive closer to the vehicle ahead and then overtake"
    ],
    "correctIndex": 2,
    "explanation": "Do not overtake if you cannot see far enough ahead to be sure it is safe, such as near a bend or the brow of a hill.",
    "reference": "Highway Code, Rule 166"
  },
  {
    "id": "overtaking-002",
    "topic": "Overtaking",
    "difficulty": "standard",
    "prompt": "Another driver is overtaking your car. How should you normally respond?",
    "options": [
      "Accelerate so they cannot get past",
      "Maintain a steady course and speed, slowing if necessary",
      "Move closer to the centre line",
      "Flash your headlights continually"
    ],
    "correctIndex": 1,
    "explanation": "Do not obstruct a driver who is overtaking you. Maintain a steady course and speed, and slow down if needed to let them pass safely.",
    "reference": "Highway Code, Rule 168"
  },
  {
    "id": "crossings-001",
    "topic": "Pedestrian crossings",
    "difficulty": "standard",
    "prompt": "What is prohibited on the zig-zag lines approaching a pedestrian crossing?",
    "options": [
      "Parking and overtaking the vehicle nearest the crossing",
      "Driving under 20 mph",
      "Checking your mirrors before stopping",
      "Giving way to pedestrians"
    ],
    "correctIndex": 0,
    "explanation": "You must not park on the crossing or its zig-zag lines, or overtake the moving vehicle nearest the crossing or one stopped for pedestrians.",
    "reference": "Highway Code, Rule 191"
  },
  {
    "id": "pedestrians-001",
    "topic": "Vulnerable road users",
    "difficulty": "easy",
    "prompt": "You are passing a stopped bus in a busy shopping street. What should you anticipate?",
    "options": [
      "Pedestrians may step out unexpectedly",
      "The road must be clear because the bus has stopped",
      "The bus will always signal before a pedestrian crosses",
      "Pedestrians cannot cross near a bus stop"
    ],
    "correctIndex": 0,
    "explanation": "Drive slowly and carefully near bus and tram stops: pedestrians may appear suddenly from behind or in front of the vehicle.",
    "reference": "Highway Code, Rule 206"
  },
  {
    "id": "pedestrians-002",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "You are driving across a pavement and cycle lane to enter a private driveway. Who should you give way to?",
    "options": [
      "Only cars on the road",
      "Pedestrians and cyclists using the pavement and cycle lane",
      "Only vehicles behind you",
      "Nobody because you are entering private land"
    ],
    "correctIndex": 1,
    "explanation": "When crossing a pavement, cycle lane or cycle track to reach a driveway, give way to pedestrians and cyclists using those facilities.",
    "reference": "Highway Code, Rule 206"
  },
  {
    "id": "weather-002",
    "topic": "Weather conditions",
    "difficulty": "standard",
    "prompt": "Fog has reduced visibility to less than about 100 metres. Which lighting rule applies?",
    "options": [
      "Use your headlights",
      "Switch off all lights to reduce reflection",
      "Use hazard warning lights continuously while moving",
      "Only use your sidelights"
    ],
    "correctIndex": 0,
    "explanation": "You must use headlights when visibility is seriously reduced, generally when you cannot see farther than 100 metres.",
    "reference": "Highway Code, Rule 226"
  },
  {
    "id": "weather-003",
    "topic": "Weather conditions",
    "difficulty": "challenging",
    "prompt": "In heavy rain your steering suddenly feels unresponsive. What should you do first?",
    "options": [
      "Brake sharply and turn hard",
      "Ease off the accelerator and slow gradually",
      "Accelerate to regain steering",
      "Switch off the engine immediately"
    ],
    "correctIndex": 1,
    "explanation": "Water can prevent tyres gripping the road. The Highway Code advises easing off the accelerator and slowing down gradually.",
    "reference": "Highway Code, Rule 227"
  },
  {
    "id": "winter-001",
    "topic": "Snow and ice",
    "difficulty": "standard",
    "prompt": "In icy conditions, stopping distances may be how much greater than on dry roads?",
    "options": [
      "The same as in dry weather",
      "Up to twice as great",
      "Up to ten times as great",
      "Always exactly three times as great"
    ],
    "correctIndex": 2,
    "explanation": "Stopping distances on icy or snowy roads can be ten times greater than in dry conditions. Increase separation and avoid harsh controls.",
    "reference": "Highway Code, Rule 230"
  },
  {
    "id": "parking-001",
    "topic": "Parking",
    "difficulty": "standard",
    "prompt": "What do double yellow lines generally mean?",
    "options": [
      "No waiting at any time, subject to applicable exemptions",
      "No waiting only during the evening",
      "Parking is always allowed for up to one hour",
      "Only commercial vehicles may wait"
    ],
    "correctIndex": 0,
    "explanation": "Double yellow lines indicate a prohibition of waiting at any time even without an upright sign, subject to legal exemptions.",
    "reference": "Highway Code, Rule 238"
  },
  {
    "id": "parking-002",
    "topic": "Parking",
    "difficulty": "challenging",
    "prompt": "Except in an authorised parking space, how close to a junction does the Highway Code advise you not to stop or park?",
    "options": [
      "Within 2 metres",
      "Within 5 metres",
      "Within 10 metres",
      "Within 25 metres"
    ],
    "correctIndex": 2,
    "explanation": "Rule 243 advises drivers not to stop or park opposite or within 10 metres of a junction, except in an authorised parking space.",
    "reference": "Highway Code, Rule 243"
  },
  {
    "id": "parking-003",
    "topic": "Parking",
    "difficulty": "standard",
    "prompt": "At night, when may you park on a road facing against the traffic flow?",
    "options": [
      "Whenever the road is quiet",
      "Only when using a recognised parking space",
      "Only if the headlights are on full beam",
      "Whenever you leave the engine running"
    ],
    "correctIndex": 1,
    "explanation": "You must not park on a road at night facing against the flow of traffic unless you are in a recognised parking space.",
    "reference": "Highway Code, Rule 248"
  },
  {
    "id": "wind-001",
    "topic": "Weather conditions",
    "difficulty": "standard",
    "prompt": "Where could strong crosswinds cause particularly sudden gusts?",
    "options": [
      "Only in town-centre tunnels",
      "Open roads, bridges and gaps in hedges",
      "Only in underground car parks",
      "Only when driving behind a bicycle"
    ],
    "correctIndex": 1,
    "explanation": "Strong gusts can blow cars and other road users off course, especially on exposed roads and near gaps in hedges or bridges.",
    "reference": "Highway Code, Rule 232"
  },
  ...additionalQuestions,
];