import type { TheoryQuestion } from './questions';

// Original course checks. Primary sources checked 17 November 2026; independent editorial approval pending.
export const courseQuestions: TheoryQuestion[] = [
  {
    "id": "course-foundations-001",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A friend lends you a car. What must you establish about insurance before driving?",
    "options": [
      "That a valid policy covers your use of that car",
      "That the owner pays any insurance premium",
      "That the car has an MOT certificate",
      "That you have driven a similar car before"
    ],
    "correctIndex": 0,
    "explanation": "The owner being insured does not automatically insure every borrower. Check cover for your own use.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-002",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "What is the minimum motor insurance required for using a car on the road?",
    "options": [
      "Cover only for theft of your car",
      "Cover for injury or damage caused to third parties",
      "A repair warranty",
      "Breakdown recovery membership"
    ],
    "correctIndex": 1,
    "explanation": "Third-party insurance is the legal minimum. Recovery cover and warranties serve different purposes.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-003",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A car has a current MOT certificate but a badly damaged tyre. What should happen before it is driven?",
    "options": [
      "Wait until the next MOT",
      "Drive only below the speed limit",
      "Repair the defect and ensure it is roadworthy",
      "Rely on the certificate regardless of its condition"
    ],
    "correctIndex": 2,
    "explanation": "An MOT records a test at a point in time. The driver remains responsible for roadworthiness whenever the car is used.",
    "reference": "Highway Code, Rule 97 and Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-foundations-004",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A learner passes theory but has not passed the practical test. What may they do?",
    "options": [
      "Drive alone on quiet roads",
      "Drive alone during daylight",
      "Drive alone if displaying L plates",
      "Continue learning with an eligible supervisor"
    ],
    "correctIndex": 3,
    "explanation": "A theory pass does not remove the requirement to pass the practical test before driving unaccompanied.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-005",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Who meets the basic age and experience requirements to privately supervise a learner car driver?",
    "options": [
      "Someone at least 21 with a suitable full licence held for at least three years",
      "A 19-year-old with two years of driving experience",
      "Any adult with a theory pass",
      "A provisional licence holder over 25"
    ],
    "correctIndex": 0,
    "explanation": "Supervisors need the appropriate full licence, at least three years of holding it, and must be at least 21. Insurance and vehicle rules also apply.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-006",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Which learner plates may be used in Wales?",
    "options": [
      "A handwritten rear-window notice alone",
      "Clearly visible red L plates, red D plates, or both",
      "Only green plates",
      "No plates when supervised by a parent"
    ],
    "correctIndex": 1,
    "explanation": "Learner plates must be visible front and rear. Wales permits red D plates as an alternative to red L plates.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-007",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "You change your home address. What must you do about your driving licence?",
    "options": [
      "Wait for the next practical test",
      "Tell only the breakdown company",
      "Notify DVLA",
      "Make no change while the photocard is in date"
    ],
    "correctIndex": 2,
    "explanation": "DVLA must be told when the licence holder changes name or address, even if the photocard has not expired.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-008",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Police request driving documents that you cannot produce immediately. What may be required?",
    "options": [
      "Waiting until insurance renewal",
      "Providing only a vehicle photograph",
      "Ignoring the request if no collision occurred",
      "Production at a police station within seven days"
    ],
    "correctIndex": 3,
    "explanation": "Annex 3 explains that requested licence, insurance and applicable MOT documents may have to be produced within seven days.",
    "reference": "Highway Code, Annex 3",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
  },
  {
    "id": "course-foundations-009",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A driver behind pressures you while a queue ahead moves unpredictably. What is the safest response?",
    "options": [
      "Keep a safe gap and make unhurried decisions",
      "Copy the following driver’s speed",
      "Close every gap ahead",
      "Use the horn to express annoyance"
    ],
    "correctIndex": 0,
    "explanation": "Pressure does not justify removing a safety margin. Space and patience provide time for developing hazards.",
    "reference": "Highway Code, Rules 126 and 147",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-010",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A ball rolls out between parked cars. What should you anticipate?",
    "options": [
      "The road beyond must be clear",
      "A child may follow it",
      "Only moving vehicles matter",
      "The ball is the only hazard"
    ],
    "correctIndex": 1,
    "explanation": "A small visible clue can predict a hidden road user. Reduce speed and prepare to stop before a child appears.",
    "reference": "Highway Code, Rules 205 to 208",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-foundations-011",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Why make a final blind-spot check before moving away from the kerb?",
    "options": [
      "It replaces mirror checks",
      "It gives you priority",
      "A road user may be outside the mirrors’ view",
      "It always removes the need to signal"
    ],
    "correctIndex": 2,
    "explanation": "Mirrors leave unseen areas. Check all around before moving off, then proceed only when safe.",
    "reference": "Highway Code, Rule 159",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
  },
  {
    "id": "course-foundations-012",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Another driver makes a mistake and gestures angrily. What should you do?",
    "options": [
      "Follow to explain the rules",
      "Flash repeatedly in retaliation",
      "Block their next lane change",
      "Allow space and avoid an argument"
    ],
    "correctIndex": 3,
    "explanation": "Considerate driving avoids confrontation. Another driver’s error does not justify creating a new danger.",
    "reference": "Highway Code, Rule 147",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-013",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A cyclist’s intentions near a junction are unclear. How should you plan?",
    "options": [
      "Keep room to react if their position changes",
      "Assume their position cannot change",
      "Overtake before finding out",
      "Sound the horn until they move"
    ],
    "correctIndex": 0,
    "explanation": "Allow for uncertainty instead of guessing. A safe gap protects the cyclist and gives you time to respond.",
    "reference": "Highway Code, Rules 211 to 213",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-foundations-014",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A message arrives while you wait at a red traffic light. What should you do?",
    "options": [
      "Read it because the car is stationary",
      "Leave the phone alone and park safely before handling it",
      "Hold it below the steering wheel",
      "Ask the driver behind to warn you when lights change"
    ],
    "correctIndex": 1,
    "explanation": "The hand-held device restriction applies while driving, including waiting at lights or in queues. Limited exceptions are not routine permission to read messages.",
    "reference": "Highway Code, Rule 149",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-015",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A pedestrian does not react to your car. What must you avoid assuming?",
    "options": [
      "That slowing may help",
      "That extra space is useful",
      "That they have seen or heard you",
      "That caution is appropriate"
    ],
    "correctIndex": 2,
    "explanation": "Some people cannot see or hear an approaching car. Protect them rather than relying on a response.",
    "reference": "Highway Code, Rules 204 to 207",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-foundations-016",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A bend hides the road ahead. What should determine your approach speed?",
    "options": [
      "The speed of the following car",
      "The legal maximum alone",
      "How familiar the road name sounds",
      "Whether you can stop within the distance visible to be clear"
    ],
    "correctIndex": 3,
    "explanation": "A hidden obstruction may occupy the unseen road. A legal maximum is not a target when the view is restricted.",
    "reference": "Highway Code, Rules 125 and 126",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-017",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Which plan supports a safer long journey?",
    "options": [
      "Allow extra time and suitable rest stops",
      "Remove breaks to avoid arriving late",
      "Rely on speeding to recover delays",
      "Start tired while roads are quiet"
    ],
    "correctIndex": 0,
    "explanation": "Planning breaks, fuel or charge and possible delays reduces pressure to hurry and helps manage fatigue.",
    "reference": "Highway Code, Rules 91 and 97",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-foundations-018",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "You expect to wait parked on a public road for several minutes. What should you generally do?",
    "options": [
      "Keep it running to show occupancy",
      "Switch off the engine instead of idling unnecessarily",
      "Rev it periodically",
      "Keep it running whenever windows are closed"
    ],
    "correctIndex": 1,
    "explanation": "Unnecessary stationary running creates emissions and noise. Rule 123 distinguishes this from being stationary in traffic or diagnosing faults.",
    "reference": "Highway Code, Rule 123",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-019",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Which driving approach supports economy while retaining control?",
    "options": [
      "Alternate hard acceleration and late braking",
      "Coast downhill in neutral",
      "Look ahead and accelerate and slow smoothly",
      "Tailgate to reduce wind resistance"
    ],
    "correctIndex": 2,
    "explanation": "Planning avoids wasteful speed changes. Coasting reduces control and tailgating removes reaction space.",
    "reference": "Highway Code, Rules 122 and 123",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-020",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Before a motorway journey in an electric car, what should you plan?",
    "options": [
      "An emergency-area charging stop",
      "Driving until charge is exhausted",
      "Charging only after entering a closed lane",
      "Sufficient charge and suitable recharging opportunities"
    ],
    "correctIndex": 3,
    "explanation": "Rule 97 recommends enough fuel or charge, particularly on motorways. Emergency stopping places are not routine charging stops.",
    "reference": "Highway Code, Rule 97",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-foundations-021",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "A sat nav directs you into a road signed No entry. What should you follow?",
    "options": [
      "The traffic sign and a safe alternative route",
      "The shorter sat-nav route",
      "The sat nav if someone follows",
      "Whichever route avoids delay"
    ],
    "correctIndex": 0,
    "explanation": "Traffic signs giving orders must be obeyed. Navigation equipment does not override them.",
    "reference": "Highway Code, Rules 109 and 150",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-foundations-022",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Why deal with unnecessary weight and unsecured items before setting off?",
    "options": [
      "They increase the legal speed limit",
      "Load affects handling and loose items can injure occupants",
      "They remove the need for pressure checks",
      "Loose luggage protects people in sudden stops"
    ],
    "correctIndex": 1,
    "explanation": "Stow luggage securely and follow load and tyre-pressure guidance. Items can move violently when the car slows.",
    "reference": "Highway Code, Rule 98 and Annex 6",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-foundations-023",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Severe snow is forecast and your trip can be postponed. What is sensible?",
    "options": [
      "Leave without checking the route",
      "Drive faster to outrun the weather",
      "Avoid the non-essential journey",
      "Follow any vehicle regardless of conditions"
    ],
    "correctIndex": 2,
    "explanation": "Rule 228 advises against driving in icy or snowy weather unless the journey is essential.",
    "reference": "Highway Code, Rule 228",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
  },
  {
    "id": "course-foundations-024",
    "topic": "Foundations",
    "difficulty": "standard",
    "prompt": "Why are tyre-pressure checks part of economical and safe driving?",
    "options": [
      "Soft tyres make gentle braking unnecessary",
      "One pressure suits every car and load",
      "Only the spare tyre needs checking",
      "Incorrect inflation affects handling, wear and efficient operation"
    ],
    "correctIndex": 3,
    "explanation": "Check cold tyres against manufacturer guidance for the load. Incorrect inflation can harm control and increase unnecessary wear and fuel use.",
    "reference": "Highway Code, Rule 123 and Annex 6",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
  },
  {
    "id": "course-incidents-001",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "A motorway car develops a problem but can still reach the next service area safely. Where should it stop?",
    "options": [
      "In the service area away from moving traffic",
      "In a live lane beside a sign",
      "On the central reservation",
      "At the narrowest hard-shoulder point"
    ],
    "correctIndex": 0,
    "explanation": "A designed parking location offers greater separation from fast traffic. Reach relative safety if possible.",
    "reference": "Highway Code, Rules 275 to 278",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-002",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "You stop on a motorway hard shoulder and can safely leave the car. Where should passengers go?",
    "options": [
      "Between its rear bumper and traffic",
      "Out on the side away from traffic, then well away from the vehicle",
      "Beside the traffic-side door",
      "Onto the barrier next to the car"
    ],
    "correctIndex": 1,
    "explanation": "If safe and possible, exit furthest from traffic and wait well away, behind a barrier where present while checking for hazards beyond it.",
    "reference": "Highway Code, Rules 275 to 278",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-003",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Occupants of a car stopped in a motorway live lane cannot leave safely. What should they do?",
    "options": [
      "Run across the lanes",
      "Stand behind the car to wave traffic away",
      "Keep belts and hazards on and call 999 for police immediately",
      "Try a repair before contacting anyone"
    ],
    "correctIndex": 2,
    "explanation": "If a safe exit away from traffic is not possible, remain belted with hazards on and seek immediate police help.",
    "reference": "Highway Code, Rule 277",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-004",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Why must you not place a warning triangle on a motorway?",
    "options": [
      "Triangles are only for fog",
      "It would cancel the hazard lights",
      "Recovery staff are always already present",
      "Placing it would expose you to fast-moving traffic"
    ],
    "correctIndex": 3,
    "explanation": "Never use a warning triangle on a motorway. Do not enter the carriageway to warn traffic or retrieve items.",
    "reference": "Highway Code, Rules 276 and 277",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-005",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "A suitcase falls from your car into a motorway lane. What should you do?",
    "options": [
      "Reach relative safety and call emergency services; do not retrieve it",
      "Walk back along the lane",
      "Reverse to shield it",
      "Send a passenger to collect it"
    ],
    "correctIndex": 0,
    "explanation": "Do not remove obstructions yourself from a motorway or other high-speed road. Report them from a place of relative safety.",
    "reference": "Highway Code, Rule 280",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-006",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Before rejoining from a motorway emergency area after a breakdown, what must you do?",
    "options": [
      "Follow a passenger’s hand signal alone",
      "Use the emergency telephone and follow the operator’s exit advice",
      "Reverse into the nearest lane",
      "Wait for another broken-down car to follow"
    ],
    "correctIndex": 1,
    "explanation": "Rule 278 requires use of the telephone and compliance with exit advice. A lane closure may be needed.",
    "reference": "Highway Code, Rule 278",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-007",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "A disability prevents safe exit from a broken-down motorway car. What is advised?",
    "options": [
      "Ask a passing driver to lift you into traffic",
      "Walk along the carriageway",
      "Stay belted with hazards on and call 999 for police",
      "Wait without contacting anyone"
    ],
    "correctIndex": 2,
    "explanation": "Rule 279 advises remaining belted, using hazards and seeking police help when normal safe-exit advice cannot be followed.",
    "reference": "Highway Code, Rule 279",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-008",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "What most helps emergency services locate a motorway breakdown?",
    "options": [
      "Only the car’s colour",
      "Only the last town passed",
      "Only the intended destination",
      "Road number, direction and nearby location-marker details"
    ],
    "correctIndex": 3,
    "explanation": "Direction of travel and driver-location signs or marker posts help identify the correct carriageway and position.",
    "reference": "Highway Code, Rule 277",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-009",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "You approach flashing emergency lights around a bend. What should you do?",
    "options": [
      "Slow early, watch for workers and debris and follow directions",
      "Maintain speed until the damaged vehicle appears",
      "Look mainly at the incident",
      "Assume every lane is open"
    ],
    "correctIndex": 0,
    "explanation": "People and obstructions may be in the road before they become visible. Follow police and traffic-officer directions.",
    "reference": "Highway Code, Rule 281",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-010",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "An incident is on the opposite carriageway. What should you avoid?",
    "options": [
      "Watching your own road",
      "Slowing unnecessarily to stare",
      "Keeping a safe gap",
      "Checking for hazards affecting your lane"
    ],
    "correctIndex": 1,
    "explanation": "Rubbernecking distracts drivers and can create another collision or queue. Stay alert without unnecessary slowing.",
    "reference": "Highway Code, Rule 282",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-011",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "You are involved in a collision causing injury or property damage. What is the immediate legal requirement?",
    "options": [
      "Continue if your own car looks undamaged",
      "Wait until home to leave a message",
      "Stop",
      "Drive away if another person is upset"
    ],
    "correctIndex": 2,
    "explanation": "You must stop after an incident causing the injury or damage covered by Rule 286, then address safety, assistance and required details.",
    "reference": "Highway Code, Rule 286",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-012",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Someone reasonably requests your details after a damage collision. What should you provide?",
    "options": [
      "Only a social-media username",
      "Only your garage’s name",
      "Only an estimated repair cost",
      "Name, address, registration and relevant owner details"
    ],
    "correctIndex": 3,
    "explanation": "Rule 286 requires specified identifying details when reasonably requested. Police reporting duties apply if details cannot be given.",
    "reference": "Highway Code, Rule 286",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-013",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "You cannot provide required details after a collision. When must it be reported to police?",
    "options": [
      "As soon as reasonably practicable and within 24 hours",
      "At the next insurance renewal",
      "Within a month",
      "Only if the car cannot be driven"
    ],
    "correctIndex": 0,
    "explanation": "Rule 286 requires reporting as soon as reasonably practicable and in any case within 24 hours when details are not given.",
    "reference": "Highway Code, Rule 286",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-014",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Why ask people not to smoke at a collision scene?",
    "options": [
      "Smoke automatically prevents insurance claims",
      "Fuel or other flammable material may be present",
      "It stops every engine restarting",
      "It replaces calling emergency services"
    ],
    "correctIndex": 1,
    "explanation": "Fire and further collisions are key dangers. Avoid ignition sources and get appropriate help from safety.",
    "reference": "Highway Code, Rule 283 and Annex 7",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-015",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "A goods vehicle with hazardous-material markings has crashed. What is the safe priority?",
    "options": [
      "Open the containers",
      "Touch spills to identify them",
      "Keep away and report the markings to emergency services if safely visible",
      "Stand in fumes to direct traffic"
    ],
    "correctIndex": 2,
    "explanation": "Do not handle dangerous substances or take exposure risks. Tell emergency services what can be observed from safety.",
    "reference": "Highway Code, Rules 284 and 285",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-016",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Where should uninjured people wait after a collision, if they can be moved safely?",
    "options": [
      "Between damaged vehicles",
      "Beside leaking fuel",
      "In the lane emergency vehicles will use",
      "In relative safety away from vehicles and traffic"
    ],
    "correctIndex": 3,
    "explanation": "Move uninjured people away from further impact and other dangers. Injured people should not be moved unless in immediate danger.",
    "reference": "Highway Code, Rule 283",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-017",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Before approaching an injured person after a road collision, what comes first?",
    "options": [
      "Check whether the scene is safe to approach",
      "Check the vehicle’s tax",
      "Ask their intended destination",
      "Take photographs for social media"
    ],
    "correctIndex": 0,
    "explanation": "Check moving traffic, fire, fuel and other dangers. Creating another casualty makes the emergency worse.",
    "reference": "Highway Code, Annex 7: Deal with danger",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-018",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "What casualty information should an emergency caller give?",
    "options": [
      "A guessed diagnosis only",
      "Location and observed problems such as entrapment or no response",
      "Only the repair cost",
      "Only which driver seemed at fault"
    ],
    "correctIndex": 1,
    "explanation": "Describe observations such as difficulty breathing, serious bleeding, entrapment or unresponsiveness, and give an accurate location.",
    "reference": "Highway Code, Annex 7: Get help",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-019",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "An injured motorcyclist still has a helmet on. What should an untrained helper normally do?",
    "options": [
      "Remove it to help conversation",
      "Twist it loose before checking danger",
      "Leave it in place and follow emergency-service instructions",
      "Use it as a road marker"
    ],
    "correctIndex": 2,
    "explanation": "Do not remove a helmet unless essential; Rule 283 also specifies training. Obtain professional guidance instead of attempting an unfamiliar procedure.",
    "reference": "Highway Code, Rule 283 and Annex 7",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-020",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "An injured occupant is inside a vehicle without immediate danger from its position. What should you normally avoid?",
    "options": [
      "Offering reassurance",
      "Calling for an ambulance",
      "Explaining their position to the operator",
      "Moving them out"
    ],
    "correctIndex": 3,
    "explanation": "Moving a casualty may worsen injury. Do not move injured people unless there is immediate danger.",
    "reference": "Highway Code, Rule 283 and Annex 7",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
  },
  {
    "id": "course-incidents-021",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "An injured person asks for a drink while awaiting an ambulance. What should you do?",
    "options": [
      "Do not give food or drink; reassure them and follow professional instructions",
      "Offer alcohol to reduce shock",
      "Give a large meal",
      "Give whatever drink is available"
    ],
    "correctIndex": 0,
    "explanation": "Annex 7 advises against giving casualties food or drink. Keep them comfortable and follow the emergency operator.",
    "reference": "Highway Code, Annex 7: Help those involved",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-022",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "How can a bystander help while emergency services are coming?",
    "options": [
      "Encourage walking in traffic",
      "Give reassurance and help keep casualties warm and dry without unsafe movement",
      "Leave to look for someone to blame",
      "Promise medical help is unnecessary"
    ],
    "correctIndex": 1,
    "explanation": "Calm reassurance and protection from cold and rain can help. Do not make unsupported medical promises or allow people to wander into traffic.",
    "reference": "Highway Code, Annex 7: Help those involved",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-023",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "A casualty does not respond when spoken to. What should an untrained helper do?",
    "options": [
      "Assume they are asleep and leave",
      "Give food to wake them",
      "Tell the emergency operator and follow their instructions",
      "Move each limb repeatedly"
    ],
    "correctIndex": 2,
    "explanation": "Unresponsiveness is important information for emergency services. Seek urgent professional guidance; an app is not practical first-aid training.",
    "reference": "Highway Code, Annex 7: Get help and emergency care",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-incidents-024",
    "topic": "Breakdowns and incidents",
    "difficulty": "standard",
    "prompt": "Why is reading a first-aid summary different from being trained?",
    "options": [
      "Reading authorises every procedure",
      "Reading removes the need for emergency services",
      "Reading guarantees recovery",
      "Emergencies require practical skills and professional guidance"
    ],
    "correctIndex": 3,
    "explanation": "Annex 7 gives general guidance and recommends proper training. A revision lesson cannot certify practical first-aid competence.",
    "reference": "Highway Code, Annex 7: Be prepared",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
  },
  {
    "id": "course-loading-001",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Before adding a heavy roof load, what should you check?",
    "options": [
      "Vehicle and carrier load limits and how to secure it",
      "Only whether the boot is full",
      "Only the destination’s weather",
      "Only whether the aerial is hidden"
    ],
    "correctIndex": 0,
    "explanation": "Secure the load and do not overload the vehicle or carrier. Follow manufacturer limits and fitting instructions.",
    "reference": "Highway Code, Rule 98",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-loading-002",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "You add passengers and heavy luggage. Which setting may need adjustment?",
    "options": [
      "The speedometer to read lower",
      "Tyre pressures according to manufacturer guidance for that load",
      "The seat-belt alarm to stay off",
      "The legal tread-depth limit"
    ],
    "correctIndex": 1,
    "explanation": "Tyre pressures must suit the vehicle and load. Use the handbook or vehicle label rather than guessing.",
    "reference": "Highway Code, Annex 6: Tyres",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
  },
  {
    "id": "course-loading-003",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Where should heavy items normally be distributed in a caravan or trailer?",
    "options": [
      "At the very back",
      "All on one side",
      "Evenly, with heavy items over the axle area within specified limits",
      "Loose near the door"
    ],
    "correctIndex": 2,
    "explanation": "Rule 98 recommends even distribution, heavy items over the axles and the correct tow-ball load. Excess rear weight can contribute to instability.",
    "reference": "Highway Code, Rule 98",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-loading-004",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Which statement about towing entitlement is correct?",
    "options": [
      "Any car licence permits every trailer",
      "Only the trailer’s colour matters",
      "A theory pass grants every entitlement",
      "Check that your licence permits the proposed combination"
    ],
    "correctIndex": 3,
    "explanation": "Do not tow more than the licence permits. Check current GOV.UK entitlement and vehicle limits before choosing a combination; do not rely on assumptions about licence dates.",
    "reference": "Highway Code, Rule 98",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-loading-005",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Why secure a load even for a short trip?",
    "options": [
      "It can move during braking or cornering and endanger people",
      "Loads move only on motorways",
      "Short trips suspend load rules",
      "Loose items improve steering"
    ],
    "correctIndex": 0,
    "explanation": "Distance does not remove the risk. Stow and restrain items so normal or emergency driving cannot release them.",
    "reference": "Highway Code, Rule 98 and Annex 6",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-loading-006",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Before towing, which trailer check is necessary?",
    "options": [
      "Only the paintwork",
      "Its tyres, lights and braking system where fitted",
      "Only that the coupling is near the car",
      "Only the caravan window height"
    ],
    "correctIndex": 1,
    "explanation": "Both the towing vehicle and trailer must be roadworthy. Rule 98 specifically identifies trailer tyres, lights and brakes.",
    "reference": "Highway Code, Rule 98",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-loading-007",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "How does towing affect decisions about gaps and manoeuvres?",
    "options": [
      "Assume braking is always shorter",
      "Use any gap suitable for the car alone",
      "Allow more time and space for the whole combination",
      "Ignore extra length when turning"
    ],
    "correctIndex": 2,
    "explanation": "Extra length and weight affect manoeuvring, acceleration and braking. Plan for the whole combination.",
    "reference": "Highway Code, Rule 160",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
  },
  {
    "id": "course-loading-008",
    "topic": "Vehicle safety",
    "difficulty": "standard",
    "prompt": "Luggage blocks the view and a loose bag rests on the parcel shelf. What should happen before departure?",
    "options": [
      "Drive slowly without changing it",
      "Ask passengers to hold it throughout",
      "Remove a mirror for a better forward view",
      "Rearrange and secure the load for adequate vision and control"
    ],
    "correctIndex": 3,
    "explanation": "Secure luggage and maintain the view needed for safe driving. A loose item can become dangerous in a sudden stop.",
    "reference": "Highway Code, Rule 98 and Annex 6",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
  },
  {
    "id": "course-handling-001",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "At night, how should speed relate to the road illuminated ahead?",
    "options": [
      "Allow stopping within the distance visible to be clear",
      "Match the furthest reflector you notice",
      "Use the maximum regardless of view",
      "Use one fixed speed for dipped headlights"
    ],
    "correctIndex": 0,
    "explanation": "Reduced visibility leaves less distance to deal with an obstruction. Choose a speed that permits stopping within the clear view.",
    "reference": "Highway Code, Rules 125 and 126",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-002",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "What makes a road a dual carriageway for ordinary speed-limit purposes?",
    "options": [
      "Two painted lanes each way alone",
      "A central reservation separating opposing directions",
      "Width greater than one car",
      "A 40 mph sign"
    ],
    "correctIndex": 1,
    "explanation": "A central reservation defines a dual carriageway. Lane count alone does not determine the road type.",
    "reference": "Highway Code, Rule 136",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-003",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "What national limit applies to a normal car without a trailer on a single carriageway?",
    "options": [
      "70 mph",
      "50 mph",
      "60 mph",
      "40 mph"
    ],
    "correctIndex": 2,
    "explanation": "The national maximum is 60 mph for this vehicle on a single carriageway. Conditions may require a much lower speed.",
    "reference": "Highway Code, Rule 124: Speed limits",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-004",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "What national motorway limit applies to a car towing a trailer?",
    "options": [
      "70 mph",
      "50 mph",
      "40 mph",
      "60 mph"
    ],
    "correctIndex": 3,
    "explanation": "A car towing a trailer has a national motorway maximum of 60 mph. Lower signs and conditions still govern the safe speed.",
    "reference": "Highway Code, Rule 124: Speed limits",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-005",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "Why should you avoid coasting downhill in neutral?",
    "options": [
      "It removes engine braking and reduces control",
      "It guarantees a tyre will burst",
      "It stops every brake light working",
      "It changes the legal speed limit"
    ],
    "correctIndex": 0,
    "explanation": "Coasting can let speed increase, increase reliance on the footbrake and make selecting the right gear harder.",
    "reference": "Highway Code, Rule 122",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-006",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "In an emergency stop in an ABS-equipped car, what is the usual advice subject to its handbook?",
    "options": [
      "Pump continuously",
      "Apply the footbrake firmly and maintain pressure until sufficiently slowed",
      "Release whenever ABS operates",
      "Use only the parking brake"
    ],
    "correctIndex": 1,
    "explanation": "Rule 120 advises sustained firm footbrake pressure. ABS helps retain steering control but does not guarantee a shorter stop.",
    "reference": "Highway Code, Rule 120",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-007",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "A driver follows too closely. What gives you more room to slow gradually if needed?",
    "options": [
      "Brake sharply in retaliation",
      "Exceed the speed limit",
      "Increase the gap from the vehicle ahead",
      "Keep looking behind instead of ahead"
    ],
    "correctIndex": 2,
    "explanation": "More space ahead reduces dependence on sudden braking. Do not retaliate or speed to escape pressure.",
    "reference": "Highway Code, Rules 126 and 147",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-handling-008",
    "topic": "Road rules",
    "difficulty": "standard",
    "prompt": "Your navigation route needs changing while driving. What should you do?",
    "options": [
      "Study the screen through the next junction",
      "Ask another driver to hold your lane",
      "Program it while tailgating",
      "Find a safe place to stop before adjusting it"
    ],
    "correctIndex": 3,
    "explanation": "Navigation equipment can distract from observation and control. Make route changes while safely stopped.",
    "reference": "Highway Code, Rules 149 and 150",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  {
    "id": "course-sharing-001",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A bus signals to leave a stop. What should you do when safe?",
    "options": [
      "Give it priority and watch for people crossing nearby",
      "Accelerate into the gap",
      "Assume passengers can see through the bus",
      "Sound the horn and maintain speed regardless"
    ],
    "correctIndex": 0,
    "explanation": "Give buses priority when safely possible, especially when leaving stops. People may emerge from behind or ahead of them.",
    "reference": "Highway Code, Rule 223",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-002",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A long lorry starts a left turn from away from the kerb. What should you avoid?",
    "options": [
      "Waiting at a safe distance",
      "Passing through the gap on its left",
      "Giving it extra room",
      "Preparing to stop"
    ],
    "correctIndex": 1,
    "explanation": "Large vehicles need turning space and may have blind spots beside them. Do not enter a squeeze point.",
    "reference": "Highway Code, Rule 221",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-003",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A tall coach blocks your view ahead. What improves your view and planning?",
    "options": [
      "Move closer to its bumper",
      "Move across the centre line without a clear view",
      "Drop back to increase separation",
      "Rely only on its brake lights"
    ],
    "correctIndex": 2,
    "explanation": "A larger gap helps you see around the vehicle and react to hazards hidden beyond it.",
    "reference": "Highway Code, Rule 222",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-004",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "An ambulance approaches while you wait at a red light. What should you do?",
    "options": [
      "Automatically drive through red",
      "Immediately mount the pavement",
      "Stop watching pedestrians",
      "Make room if safely possible while obeying the signal"
    ],
    "correctIndex": 3,
    "explanation": "Help emergency vehicles without breaking traffic signs or endangering others. Do not panic or make unsafe movements.",
    "reference": "Highway Code, Rule 219",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-005",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "Your route crosses an approaching tram’s track. What is important to remember?",
    "options": [
      "The tram cannot steer around you",
      "It can swerve like a car",
      "It can always stop instantly",
      "Its route follows the nearest car"
    ],
    "correctIndex": 0,
    "explanation": "Trams are confined to tracks and can be quiet. Respect signals and leave space rather than expecting them to swerve.",
    "reference": "Highway Code, Rule 224",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-006",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A vehicle ahead has a flashing amber beacon. What should you anticipate?",
    "options": [
      "It invites immediate overtaking",
      "It may be slow, stationary or working",
      "It means the same as a green light",
      "It guarantees an empty road"
    ],
    "correctIndex": 1,
    "explanation": "Amber beacons may mark slow vehicles, road work or incident-support activity. Approach cautiously and assess space.",
    "reference": "Highway Code, Rule 225",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-007",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A small mobility vehicle is on the road without a visible amber beacon. What should you do?",
    "options": [
      "Assume it travels as fast as a car",
      "Pass closely because it is narrow",
      "Allow for low speed and the occupant’s vulnerability",
      "Expect a beacon on every road"
    ],
    "correctIndex": 2,
    "explanation": "Not every mobility vehicle displays a beacon on every road. Its low speed and vulnerable occupant still require patience and room.",
    "reference": "Highway Code, Rules 204 and 220",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  },
  {
    "id": "course-sharing-008",
    "topic": "Vulnerable road users",
    "difficulty": "standard",
    "prompt": "A large vehicle travels below your car’s permitted speed. What should you consider?",
    "options": [
      "It must be obstructing deliberately",
      "Your limit forces it to accelerate",
      "Tailgating will improve its visibility",
      "Its legal limit or speed limiter may be lower"
    ],
    "correctIndex": 3,
    "explanation": "Large vehicles can have lower limits or speed limiters. Be patient and overtake only when safe and legal.",
    "reference": "Highway Code, Rule 222",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
  }
];
