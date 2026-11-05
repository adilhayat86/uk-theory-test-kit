import type { TheoryQuestion } from './questions';

/** Original review questions, cross-checked with GOV.UK Highway Code rules. */
export const additionalQuestions: TheoryQuestion[] = [
  {
    "id": "signals-001",
    "topic": "Signals and lights",
    "difficulty": "standard",
    "prompt": "A car ahead is indicating left, but the indicator might have been left on by mistake. What should you do?",
    "options": [
      "Assume it will turn left immediately",
      "Wait until its actions confirm it is safe",
      "Overtake without checking",
      "Sound your horn so it turns"
    ],
    "correctIndex": 1,
    "explanation": "Indicators can be left on accidentally. Watch what the driver actually does and proceed only when it is safe.",
    "reference": "Highway Code, Rule 104"
  },
  {
    "id": "signals-002",
    "topic": "Signals and lights",
    "difficulty": "easy",
    "prompt": "What is the proper purpose of flashing your headlights?",
    "options": [
      "To let another driver go first",
      "To let others know you are there",
      "To ask someone to speed up",
      "To show irritation at slow drivers"
    ],
    "correctIndex": 1,
    "explanation": "Use a headlight flash only to alert others to your presence; it is not a priority signal.",
    "reference": "Highway Code, Rule 110"
  },
  {
    "id": "signals-003",
    "topic": "Signals and lights",
    "difficulty": "standard",
    "prompt": "An approaching driver flashes their headlights at a junction. What should you assume?",
    "options": [
      "You definitely have priority",
      "They are inviting you to cross",
      "Nothing about priority; decide whether it is safe yourself",
      "All traffic lights can be ignored"
    ],
    "correctIndex": 2,
    "explanation": "A flash may only be intended to make the vehicle visible. Never treat it as a guaranteed invitation to proceed.",
    "reference": "Highway Code, Rule 111"
  },
  {
    "id": "signals-004",
    "topic": "Signals and lights",
    "difficulty": "standard",
    "prompt": "When should you normally use the horn while driving?",
    "options": [
      "When you need to warn other road users of your presence",
      "Whenever you are waiting in a queue",
      "To tell pedestrians to hurry up",
      "To thank a friend you recognise"
    ],
    "correctIndex": 0,
    "explanation": "Use the horn only when moving and when you need to alert others to your presence, subject to danger exceptions.",
    "reference": "Highway Code, Rule 112"
  },
  {
    "id": "signals-005",
    "topic": "Night driving",
    "difficulty": "standard",
    "prompt": "On a dark road, headlights from an approaching vehicle dazzle you. What should you do?",
    "options": [
      "Increase speed to pass the vehicle",
      "Look directly into its headlights",
      "Slow down and stop if necessary",
      "Switch to full beam and keep going"
    ],
    "correctIndex": 2,
    "explanation": "If dazzled by oncoming headlights, reduce speed and stop if needed until you can see safely.",
    "reference": "Highway Code, Rule 115"
  },
  {
    "id": "signals-006",
    "topic": "Signals and lights",
    "difficulty": "challenging",
    "prompt": "When may hazard warning lights be used on a moving vehicle?",
    "options": [
      "Whenever it is raining heavily",
      "Only to warn following drivers of danger ahead on a motorway or unrestricted dual carriageway",
      "Whenever you want to park briefly",
      "Anytime a slow car is ahead"
    ],
    "correctIndex": 1,
    "explanation": "While driving, hazard lights are restricted to brief warning of hazards or obstructions ahead on motorways or unrestricted dual carriageways.",
    "reference": "Highway Code, Rule 116"
  },
  {
    "id": "markings-001",
    "topic": "Road markings",
    "difficulty": "standard",
    "prompt": "You approach double white centre lines with the line on your side broken. When may you cross them to overtake?",
    "options": [
      "Only if safe and you can finish before a solid line begins on your side",
      "At any time if you signal",
      "Only at night",
      "Never, regardless of the circumstances"
    ],
    "correctIndex": 0,
    "explanation": "A broken line nearest you permits crossing to overtake only where it is safe and you can return before a solid line on your side.",
    "reference": "Highway Code, Rule 128"
  },
  {
    "id": "markings-002",
    "topic": "Road markings",
    "difficulty": "challenging",
    "prompt": "Double white lines have the solid line nearest you. What is the general rule?",
    "options": [
      "You may cross whenever overtaking a car",
      "You must not cross or straddle them except for specific permitted circumstances",
      "They are only a warning in dry weather",
      "They apply only to lorries"
    ],
    "correctIndex": 1,
    "explanation": "A solid white line on your side generally prevents crossing or straddling; Rule 129 sets out limited exceptions.",
    "reference": "Highway Code, Rule 129"
  },
  {
    "id": "lanes-001",
    "topic": "Lane discipline",
    "difficulty": "easy",
    "prompt": "Before changing lanes on a multi-lane road, what should you do?",
    "options": [
      "Move first and check mirrors later",
      "Check mirrors and if needed the blind spot, then signal and move only when clear",
      "Signal first and force others to slow down",
      "Only look straight ahead"
    ],
    "correctIndex": 1,
    "explanation": "Use mirrors and a quick sideways blind-spot check as needed. Change lane without forcing others to alter speed or course.",
    "reference": "Highway Code, Rule 133"
  },
  {
    "id": "lanes-002",
    "topic": "Cyclists",
    "difficulty": "standard",
    "prompt": "A cycle lane has a solid white boundary line and is within its operating hours. What must you avoid?",
    "options": [
      "Using the lane to drive or park",
      "Looking for cyclists before turning",
      "Giving cyclists enough room",
      "Checking the lane's road markings"
    ],
    "correctIndex": 0,
    "explanation": "You must not drive or park in a cycle lane marked by a solid line while it is in operation.",
    "reference": "Highway Code, Rule 140"
  },
  {
    "id": "phone-001",
    "topic": "Vehicle control",
    "difficulty": "standard",
    "prompt": "You are stopped in a queue of traffic with the engine running. What rule generally applies to a hand-held phone?",
    "options": [
      "You may text because your wheels are still",
      "You must not use a hand-held interactive device while driving, subject to narrow exceptions",
      "It is safe if held below the dashboard",
      "You may browse when the traffic lights are red"
    ],
    "correctIndex": 1,
    "explanation": "The prohibition generally still applies when stopped in traffic; safely park before handling the phone unless a legal exception applies.",
    "reference": "Highway Code, Rule 149"
  },
  {
    "id": "traffic-001",
    "topic": "Traffic and congestion",
    "difficulty": "standard",
    "prompt": "In a slow-moving queue near a side road, which action is recommended?",
    "options": [
      "Block the junction so no one can enter",
      "Allow access to and from the side road",
      "Keep moving even when pedestrians are crossing",
      "Switch between lanes repeatedly"
    ],
    "correctIndex": 1,
    "explanation": "In queues, leave room for side-road access and for pedestrians and cyclists to cross ahead.",
    "reference": "Highway Code, Rule 151"
  },
  {
    "id": "moving-off-001",
    "topic": "Vehicle control",
    "difficulty": "easy",
    "prompt": "What extra check should you make before moving away from the kerb?",
    "options": [
      "Only the speedometer",
      "Mirrors and a final look for blind spots",
      "Only your rear window",
      "Only that the radio is switched off"
    ],
    "correctIndex": 1,
    "explanation": "Check the road with mirrors, look around for blind spots and move only when it is safe.",
    "reference": "Highway Code, Rule 159"
  },
  {
    "id": "cyclists-001",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "When overtaking a cyclist at up to 30 mph, what clearance does the Highway Code suggest as a guide?",
    "options": [
      "Around 20 centimetres",
      "At least 1.5 metres, with more at higher speeds",
      "Exactly half a metre",
      "No gap if you sound your horn"
    ],
    "correctIndex": 1,
    "explanation": "The Highway Code advises at least 1.5 metres at up to 30 mph and additional clearance at higher speeds.",
    "reference": "Highway Code, Rule 163"
  },
  {
    "id": "horses-001",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "You need to pass a horse rider on the road. What approach does the Highway Code advise?",
    "options": [
      "Accelerate past as quickly as possible",
      "Stay close to the rider so other traffic can pass",
      "Pass under 10 mph and leave at least 2 metres of space",
      "Sound the horn before overtaking"
    ],
    "correctIndex": 2,
    "explanation": "Pass horse riders and horse-drawn vehicles slowly, under 10 mph, and give at least two metres of clearance.",
    "reference": "Highway Code, Rule 163"
  },
  {
    "id": "roundabout-003",
    "topic": "Roundabouts",
    "difficulty": "standard",
    "prompt": "When driving through a mini-roundabout, what should you do about its central markings?",
    "options": [
      "Drive straight across them whenever convenient",
      "Go around them unless your large vehicle is physically unable",
      "Always stop on the markings",
      "Cross the markings to shorten the turn"
    ],
    "correctIndex": 1,
    "explanation": "Vehicles must pass around a mini-roundabout's central markings except large vehicles physically unable to do so.",
    "reference": "Highway Code, Rule 188"
  },
  {
    "id": "roundabout-004",
    "topic": "Roundabouts",
    "difficulty": "standard",
    "prompt": "How should you treat two mini-roundabouts close together?",
    "options": [
      "Treat them as one big roundabout",
      "Give way only at the first",
      "Treat each roundabout separately and give way to traffic from the right",
      "Ignore the markings if traffic is light"
    ],
    "correctIndex": 2,
    "explanation": "At a double mini-roundabout, treat each separately and apply the normal give-way rules.",
    "reference": "Highway Code, Rule 189"
  },
  {
    "id": "care-001",
    "topic": "Vulnerable road users",
    "difficulty": "easy",
    "prompt": "Which road users deserve particular attention because they may be most at risk from traffic?",
    "options": [
      "Only drivers in large cars",
      "Pedestrians, cyclists, horse riders and motorcyclists",
      "Only buses and coaches",
      "Only drivers with full licences"
    ],
    "correctIndex": 1,
    "explanation": "The hierarchy of road users places greater responsibility on those who can cause the greatest harm to reduce danger to others.",
    "reference": "Highway Code, Rule 204"
  },
  {
    "id": "cyclists-002",
    "topic": "Cyclists",
    "difficulty": "standard",
    "prompt": "You are turning across a junction while a cyclist continues straight ahead. What should you do?",
    "options": [
      "Turn in front and expect them to brake",
      "Give way rather than force them to stop or swerve",
      "Sound your horn and continue",
      "Move closer to the cyclist to discourage them"
    ],
    "correctIndex": 1,
    "explanation": "Do not turn at a junction if doing so would cause a cyclist going straight ahead to stop or swerve.",
    "reference": "Highway Code, Rule 211"
  },
  {
    "id": "cyclists-003",
    "topic": "Cyclists",
    "difficulty": "standard",
    "prompt": "Why might a cyclist ride near the centre of a lane on a narrow road?",
    "options": [
      "To deliberately delay every driver",
      "To be safer and more visible where passing space is limited",
      "Because cycling on the left is prohibited",
      "Because they cannot use a bicycle lane"
    ],
    "correctIndex": 1,
    "explanation": "Cyclists may use the centre of a narrow lane to be seen and to prevent unsafe passing. Give them time and room.",
    "reference": "Highway Code, Rule 213"
  },
  {
    "id": "large-vehicles-001",
    "topic": "Large vehicles",
    "difficulty": "standard",
    "prompt": "A large lorry ahead needs extra road space to turn. What is the safer response?",
    "options": [
      "Move alongside it to pass during the turn",
      "Give it the room and time it needs, stopping if necessary",
      "Try to squeeze between it and the kerb",
      "Flash your headlights continuously"
    ],
    "correctIndex": 1,
    "explanation": "Large vehicles have wide turning paths and blind spots. Hold back rather than enter an area the driver may not see.",
    "reference": "Highway Code, Rule 221"
  },
  {
    "id": "motorway-002",
    "topic": "Motorways",
    "difficulty": "easy",
    "prompt": "Which road user is prohibited from using a UK motorway?",
    "options": [
      "A cyclist",
      "A car driver with a full licence",
      "A coach driver in an authorised vehicle",
      "An appropriately licensed motorcyclist on a suitable motorcycle"
    ],
    "correctIndex": 0,
    "explanation": "Cyclists are not permitted to use motorways. Rule 253 lists other prohibited road users and vehicles.",
    "reference": "Highway Code, Rule 253"
  },
  {
    "id": "motorway-003",
    "topic": "Motorways",
    "difficulty": "easy",
    "prompt": "When not overtaking on a motorway, which lane should you normally use?",
    "options": [
      "The left lane",
      "The right lane",
      "The centre lane",
      "Any lane irrespective of traffic"
    ],
    "correctIndex": 0,
    "explanation": "Stay in the left-hand lane except when overtaking, then return left once it is safe.",
    "reference": "Highway Code, Rule 264"
  },
  {
    "id": "motorway-004",
    "topic": "Motorways",
    "difficulty": "challenging",
    "prompt": "On a congested motorway, the left lane is moving slightly faster than the right lane. What may you do?",
    "options": [
      "Weave between lanes to pass slow drivers",
      "Continue at the speed of traffic in your lane without weaving",
      "Move left specifically to overtake every vehicle",
      "Use the hard shoulder as a passing lane"
    ],
    "correctIndex": 1,
    "explanation": "In congested traffic, a left lane may move ahead of the lane to its right. You may keep pace in your lane but must not weave to overtake.",
    "reference": "Highway Code, Rule 268"
  },
  {
    "id": "motorway-005",
    "topic": "Motorways",
    "difficulty": "standard",
    "prompt": "What is the permitted purpose of a signed emergency area on a motorway?",
    "options": [
      "Stopping for a routine phone call",
      "Stopping in an emergency only",
      "Waiting for friends",
      "Resting on a long trip"
    ],
    "correctIndex": 1,
    "explanation": "Emergency areas are only for emergencies, not routine stops or breaks.",
    "reference": "Highway Code, Rule 270"
  },
  {
    "id": "breakdown-001",
    "topic": "Breakdowns",
    "difficulty": "standard",
    "prompt": "Where is generally the safest place to stop when you can still leave a motorway despite a developing fault?",
    "options": [
      "In a live traffic lane",
      "A motorway service area",
      "Alongside the centre barrier",
      "Directly at the end of a slip road"
    ],
    "correctIndex": 1,
    "explanation": "A service area is designed for stopping and is safer than the hard shoulder or exposed motorway edge.",
    "reference": "Highway Code, Rule 275"
  },
  {
    "id": "breakdown-002",
    "topic": "Breakdowns",
    "difficulty": "standard",
    "prompt": "Your vehicle has broken down on a motorway. What does the Highway Code say about warning triangles?",
    "options": [
      "Place one in the motorway lane",
      "Place one 10 metres behind the vehicle",
      "Never use a warning triangle on a motorway",
      "Place one on the central reservation"
    ],
    "correctIndex": 2,
    "explanation": "Warning triangles can create serious danger on motorways and must not be used there.",
    "reference": "Highway Code, Rule 276"
  },
  {
    "id": "breakdown-003",
    "topic": "Breakdowns",
    "difficulty": "challenging",
    "prompt": "Cargo falls from your vehicle onto a motorway. What should you do about the obstruction?",
    "options": [
      "Walk back and remove it yourself",
      "Stop in a safe location and contact the emergency services",
      "Ask a passenger to collect it",
      "Reverse along the hard shoulder to reach it"
    ],
    "correctIndex": 1,
    "explanation": "Do not try to remove motorway debris yourself. Stop in a place of relative safety and call the emergency services.",
    "reference": "Highway Code, Rule 280"
  },
  {
    "id": "incident-001",
    "topic": "First aid and incidents",
    "difficulty": "standard",
    "prompt": "At a road collision, when should you move an injured person from a vehicle?",
    "options": [
      "Immediately, in every incident",
      "Only if they are in immediate danger",
      "Whenever other traffic is delayed",
      "When the driver asks to leave the car"
    ],
    "correctIndex": 1,
    "explanation": "Do not move an injured person from a vehicle unless there is immediate danger; leave medical handling to trained responders.",
    "reference": "Highway Code, Rule 283"
  }
];
