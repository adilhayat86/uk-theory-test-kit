export type TheoryQuestion = {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const questions: TheoryQuestion[] = [
  {
    id: 'rules-001',
    topic: 'Road rules',
    prompt: 'You are approaching a zebra crossing. A pedestrian is waiting to cross. What should you do?',
    options: ['Wave them across while moving', 'Slow down and be prepared to stop', 'Sound your horn', 'Accelerate past the crossing'],
    correctIndex: 1,
    explanation: 'Approach carefully and be prepared to stop to let pedestrians cross. Never wave or signal pedestrians across.',
  },
  {
    id: 'motorway-001',
    topic: 'Motorways',
    prompt: 'When may you use the hard shoulder on a motorway?',
    options: ['To make a phone call', 'To overtake slow traffic', 'Only in an emergency or when directed', 'Whenever traffic is congested'],
    correctIndex: 2,
    explanation: 'The hard shoulder is for emergencies and situations where signs or an authorised person direct you to use it.',
  },
  {
    id: 'safety-001',
    topic: 'Vehicle safety',
    prompt: 'What is the main purpose of a head restraint?',
    options: ['To make the seat more comfortable', 'To reduce the risk of neck injury in a collision', 'To support luggage', 'To improve rear visibility'],
    correctIndex: 1,
    explanation: 'A correctly adjusted head restraint helps reduce the risk of neck injury, particularly whiplash, in a collision.',
  },
  {
    id: 'weather-001',
    topic: 'Weather conditions',
    prompt: 'In wet weather, what should you do to your following distance?',
    options: ['Keep it the same', 'Reduce it', 'At least double it', 'Drive closer to improve visibility'],
    correctIndex: 2,
    explanation: 'Stopping distances are at least doubled on wet roads, so leave at least twice the normal separation.',
  },
  {
    id: 'signs-001',
    topic: 'Road signs',
    prompt: 'What does a red circular road sign generally give?',
    options: ['An order or prohibition', 'A tourist direction', 'A motorway service location', 'A warning of a hazard only'],
    correctIndex: 0,
    explanation: 'Most circular signs give orders. Red circles generally indicate a prohibition or restriction.',
  }
];