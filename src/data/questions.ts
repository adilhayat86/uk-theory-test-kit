export type TheoryQuestion = {
  id: string;
  topic: string;
  difficulty: 'easy' | 'standard' | 'challenging';
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  reference: string;
  /** Public primary source for manual editorial checking. */
  sourceUrl?: string;
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
  {"id":"gb-rules-001","topic":"Road rules","difficulty":"easy","prompt":"You plan to turn just after a side street. When should you indicate?","options":["Well before the side street regardless of confusion","After passing the side street, when your signal cannot mislead anyone","Only while making the turn","Only after you have stopped"],"correctIndex":1,"explanation":"Signalling too early could suggest you intend to enter the side street; time the signal so your intention is clear.","reference":"Highway Code, Rule 103","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-002","topic":"Road rules","difficulty":"standard","prompt":"A car ahead is signalling left but continuing straight. How should you respond?","options":["Pull out because the indicator gives you priority","Sound your horn and pass on the left","Do not assume it will turn; wait until its actual movement makes the situation safe","Assume the driver has deliberately cancelled a turn"],"correctIndex":2,"explanation":"Indicators can remain on by mistake. Look for the vehicle's position and movement rather than trusting a signal alone.","reference":"Highway Code, Rule 104","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-003","topic":"Road rules","difficulty":"challenging","prompt":"Temporary traffic lights are operating at road works. What should you do?","options":["Ignore them if workers are not visible","Only stop if a police officer is present","Give way only to vehicles larger than yours","Follow them in the same way as other traffic lights"],"correctIndex":3,"explanation":"Temporary traffic controls are binding; a quiet work site does not remove the requirement to obey them.","reference":"Highway Code, Rule 109","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-004","topic":"Road rules","difficulty":"easy","prompt":"A driver flashes their headlights while approaching. What should you infer from the flash?","options":["They may be drawing attention to their presence, not granting you permission to move","They are definitely giving you priority","You must speed up to pass them","They are instructing you to stop immediately"],"correctIndex":0,"explanation":"Flashing headlights should be used to make others aware of a vehicle, not as a guaranteed invitation to proceed.","reference":"Highway Code, Rule 110","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-005","topic":"Road rules","difficulty":"standard","prompt":"At a busy junction, an approaching vehicle flashes its headlights. What is the safest response?","options":["Enter immediately because the flash means it is safe","Judge the gap and priority yourself before moving","Stop indefinitely until the other driver waves","Follow the vehicle in front without looking"],"correctIndex":1,"explanation":"A headlight flash is ambiguous. The driver pulling out remains responsible for checking the road is clear.","reference":"Highway Code, Rule 111","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-006","topic":"Road rules","difficulty":"challenging","prompt":"You are stationary in a built-up road at midnight and another driver is slow to move. When may you use your horn?","options":["To tell the driver the traffic lights have changed","Whenever you feel delayed","Only if a road user creates a danger that warrants a warning","Continuously to attract their attention"],"correctIndex":2,"explanation":"The horn is for warning of presence or danger, not expressing irritation; restrictions apply when stationary and at night in built-up areas.","reference":"Highway Code, Rule 112","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-007","topic":"Road rules","difficulty":"easy","prompt":"You are driving at night along an unlit rural road. Which lighting is normally required?","options":["Parking lights only","Rear fog lights instead of headlights","Hazard lights continuously","Headlights, adjusted so that other road users are not dazzled"],"correctIndex":3,"explanation":"Roads without street lighting require proper headlight use at night while avoiding dazzling oncoming traffic.","reference":"Highway Code, Rule 113","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-008","topic":"Road rules","difficulty":"standard","prompt":"A dense fog lifts and you can see clearly again. What should you do with the rear fog lights?","options":["Switch them off so they do not dazzle drivers behind","Keep them on until the engine is switched off","Use them instead of brake lights","Switch off your dipped headlights instead"],"correctIndex":0,"explanation":"Fog lamps can dazzle and obscure brake lamps once visibility improves, so they should not remain on without need.","reference":"Highway Code, Rule 114","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-009","topic":"Road rules","difficulty":"challenging","prompt":"When may you use hazard warning lights while driving on a motorway?","options":["Whenever you exceed the speed limit","Briefly to warn traffic behind about a hazard or obstruction ahead","As a substitute for indicating lane changes","To ask the driver ahead to speed up"],"correctIndex":1,"explanation":"The Highway Code allows this limited moving-vehicle use on motorways or unrestricted dual carriageways to alert following drivers.","reference":"Highway Code, Rule 116","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-010","topic":"Road rules","difficulty":"easy","prompt":"You see a red light ahead with enough distance to brake normally. How should you slow down?","options":["Wait and brake hard at the last moment","Pull the handbrake while moving","Brake gently early, increase pressure as needed, then ease off just before stopping","Switch off the engine to slow down"],"correctIndex":2,"explanation":"Progressive braking helps maintain control and avoids an unnecessarily jerky stop.","reference":"Highway Code, Rule 117","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-011","topic":"Road rules","difficulty":"standard","prompt":"You face an unexpected emergency and must stop quickly. What should you do first?","options":["Turn the ignition off before braking","Use the parking brake as your first response","Accelerate to pass the danger","Apply the brakes immediately while trying to retain steering control"],"correctIndex":3,"explanation":"Emergency braking should begin promptly; harsh braking that locks the wheels can remove directional control.","reference":"Highway Code, Rule 118","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-012","topic":"Road rules","difficulty":"challenging","prompt":"Your car's rear begins to slide to the left on a bend. Which steering response helps correct the skid?","options":["Steer towards the left while easing off the action that caused the skid","Steer sharply to the right regardless of conditions","Accelerate hard with the wheels straight","Apply full handbrake immediately"],"correctIndex":0,"explanation":"The Highway Code advises steering in the direction of a rear-wheel skid while removing excessive braking or acceleration.","reference":"Highway Code, Rule 119","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-013","topic":"Road rules","difficulty":"easy","prompt":"A road has a 60 mph limit, but a narrow bend is partly hidden by trees. What speed should you choose?","options":["Exactly 60 mph because that is the posted limit","A lower speed that lets you negotiate the hazard and stop within your visible distance","The speed of the fastest car around you","60 mph unless it is raining"],"correctIndex":1,"explanation":"A legal speed limit is a maximum, not a target; road layout and visibility govern the safe speed.","reference":"Highway Code, Rule 125","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-014","topic":"Road rules","difficulty":"standard","prompt":"You are following a car at motorway speeds on a dry road. Which minimum time gap is recommended?","options":["Half a second if you have good brakes","Exactly one second at all speeds","At least two seconds, increased when conditions require","No gap if traffic is flowing smoothly"],"correctIndex":2,"explanation":"At least a two-second following interval gives time to perceive and react to a vehicle slowing ahead.","reference":"Highway Code, Rule 126","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-015","topic":"Road rules","difficulty":"challenging","prompt":"A broken centre line becomes longer with shorter gaps as you drive ahead. What does this suggest?","options":["The road is becoming a motorway","You must speed up immediately","The road has no passing restrictions anywhere","A hazard may lie ahead, so take extra care before crossing the line"],"correctIndex":3,"explanation":"Longer white dashes and shorter gaps indicate a hazard-warning centre-line pattern.","reference":"Highway Code, Rule 127","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"},
  {"id":"gb-rules-016","topic":"Road rules","difficulty":"easy","prompt":"On a motorway, what do amber reflective road studs mark?","options":["The edge beside the central reservation","The left-hand edge of the carriageway","The edge of a slip road","A temporary bus lane"],"correctIndex":0,"explanation":"Amber studs are positioned on the central-reservation side; red studs typically mark the left edge.","reference":"Highway Code, Rule 132","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"}
  {"id":"gb-motorway-001","topic":"Motorways","difficulty":"standard","prompt":"A learner car driver wants to practise on a motorway. Which arrangement is permitted?","options":["Drive alone once the theory test has been passed","Travel with any licensed family member in an ordinary car","Travel with a DVSA-approved driving instructor in a dual-control car displaying L plates, or D plates in Wales","Travel with a friend who has held a licence for two years"],"correctIndex":2,"explanation":"Provisional car drivers may enter motorways only with an approved instructor in a suitably equipped, correctly plated car.","reference":"Highway Code, Rule 253","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-002","topic":"Motorways","difficulty":"easy","prompt":"Why should you check your mirrors and scan further ahead than usual on a motorway?","options":["Mirror checks are only needed when leaving the motorway","Cars are less likely to change lanes at high speeds","You have priority regardless of other drivers","Vehicles usually travel faster, leaving less time to notice and react to changes"],"correctIndex":3,"explanation":"Higher approach speeds shorten the time available to respond, making early observation essential.","reference":"Highway Code, Rule 254","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-003","topic":"Motorways","difficulty":"challenging","prompt":"An overhead motorway message warns of debris ahead that you cannot yet see. What is the sensible response?","options":["Treat the warning seriously and prepare to adjust your speed and lane as directed","Assume the message is out of date until you see debris","Drive faster to pass the affected stretch","Stop on the hard shoulder to inspect the message"],"correctIndex":0,"explanation":"Motorway warnings can describe hazards beyond your present view; prepare before reaching them.","reference":"Highway Code, Rule 255","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-004","topic":"Motorways","difficulty":"standard","prompt":"Amber motorway lights are flashing above your route. What should you do?","options":["Move into the hard shoulder at once","Ease off and prepare for a hazard, following later signs before returning to normal speed","Ignore them if you can still see the road","Treat them as permission to exceed the limit"],"correctIndex":1,"explanation":"Flashing amber warnings signal possible danger ahead; respond by reducing speed and assessing the situation.","reference":"Highway Code, Rule 257","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-005","topic":"Motorways","difficulty":"easy","prompt":"A red X is displayed above the lane you are driving in. What must you do?","options":["Carry on if no workers are visible","Use that lane only when overtaking","Move safely into an open lane and do not continue along the closed one","Stop beneath the sign and wait for it to change"],"correctIndex":2,"explanation":"A red X identifies a lane closure and driving through that lane is prohibited.","reference":"Highway Code, Rule 258","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-006","topic":"Motorways","difficulty":"challenging","prompt":"A red X closes the left lane at a motorway exit. What does that indicate about the exit?","options":["The exit is reserved for cars only","You may use the shoulder to reach the exit","All vehicles must leave by that exit","The exit cannot be used while that closure applies"],"correctIndex":3,"explanation":"A left-lane closure at the exit slip road means traffic must not use that exit while it remains closed.","reference":"Highway Code, Rule 258","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-007","topic":"Motorways","difficulty":"standard","prompt":"As you join a motorway from a slip road, who should you give priority to?","options":["Vehicles already travelling on the motorway","Drivers still behind you on the slip road","Only cars travelling faster than the speed limit","No one, because slip-road traffic has priority"],"correctIndex":0,"explanation":"Joining drivers must judge a safe gap, adjust speed and avoid forcing established motorway traffic to brake.","reference":"Highway Code, Rule 259","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-008","topic":"Motorways","difficulty":"easy","prompt":"The slip road you used continues as a new lane on the motorway. What should you normally do?","options":["Cut across all lanes as quickly as possible","Stay in the continuing lane while settling into the traffic flow","Stop at the end of the merge markings","Drive on the hard shoulder until you find a gap"],"correctIndex":1,"explanation":"If the slip road becomes an added motorway lane, remain in it rather than cutting unnecessarily into another lane.","reference":"Highway Code, Rule 259","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-009","topic":"Motorways","difficulty":"challenging","prompt":"An electronic motorway sign displays a 50 mph limit within a red circle. What does it mean?","options":["It is advice only if the normal limit is 70 mph","It applies only to goods vehicles","You must not exceed 50 mph while that signed limit applies","You may ignore it outside rush hour"],"correctIndex":2,"explanation":"Red-circled electronic speed limits are enforceable and override a higher usual maximum while active.","reference":"Highway Code, Rule 261","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-010","topic":"Motorways","difficulty":"standard","prompt":"You feel sleepy during a long motorway journey. What is the best plan?","options":["Open a window and keep driving for another hour","Drive faster so the journey ends sooner","Stop directly on the carriageway to sleep","Leave at a safe opportunity and take a proper break at a service area"],"correctIndex":3,"explanation":"Monotonous high-speed driving can worsen fatigue; motorway services provide places for safe rest.","reference":"Highway Code, Rule 262","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-011","topic":"Motorways","difficulty":"easy","prompt":"You accidentally pass the motorway junction you needed. What should you do?","options":["Continue to the next available exit and re-plan your route","Reverse carefully along the hard shoulder","Turn across the central reservation","Stop in the live lane and ask for directions"],"correctIndex":0,"explanation":"Reversing and crossing the central reservation are prohibited; use the next exit rather than an unsafe manoeuvre.","reference":"Highway Code, Rule 263","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-012","topic":"Motorways","difficulty":"challenging","prompt":"Traffic is light and you are not overtaking. Which motorway lane should you normally use?","options":["The centre lane to leave space for joining traffic","The left lane, moving right only when necessary and safe","Whichever lane has the best road surface","The right lane to maintain a steady speed"],"correctIndex":1,"explanation":"The default position is the left-hand lane, with other lanes mainly used to overtake.","reference":"Highway Code, Rule 264","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-013","topic":"Motorways","difficulty":"standard","prompt":"You tow a caravan on a motorway with three lanes. Can you normally use the far-right lane?","options":["Yes, if the trailer is small","Yes, if you signal first","No, vehicles drawing a trailer are generally prohibited from that lane","Only when the traffic in all lanes is stationary"],"correctIndex":2,"explanation":"The Highway Code prohibits trailers in the far-right lane of motorways with three or more lanes, apart from prescribed exceptions.","reference":"Highway Code, Rule 265","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-014","topic":"Motorways","difficulty":"easy","prompt":"Before changing lanes to overtake on a motorway, what extra check helps detect a hidden vehicle?","options":["Only looking at the interior mirror","Counting to three without looking","Flashing your headlights continuously","A brief sideways glance towards the blind spot after checking mirrors"],"correctIndex":3,"explanation":"Mirrors do not show every area around the vehicle; a blind-spot check helps confirm the lane is clear.","reference":"Highway Code, Rule 267","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-015","topic":"Motorways","difficulty":"challenging","prompt":"In heavy motorway congestion, the left lane moves slightly faster than the right. What should you do?","options":["Stay in your lane with the traffic, without weaving between lanes to gain places","Keep switching lanes whenever one moves quicker","Use the hard shoulder to get ahead","Brake sharply so nobody can pass you on the left"],"correctIndex":0,"explanation":"Queuing traffic may pass traffic to its right as lanes advance differently, but deliberate weaving to overtake is discouraged.","reference":"Highway Code, Rule 268","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"},
  {"id":"gb-motorway-016","topic":"Motorways","difficulty":"standard","prompt":"Your motorway exit is coming up. Which approach is recommended?","options":["Brake sharply in the right-hand lane then cross to the exit","Move into the left lane in good time, signal left and slow on the slip road as needed","Stop on the carriageway until a gap appears","Leave your indicator off until after entering the slip road"],"correctIndex":1,"explanation":"Early lane planning and signalling allow a safe, predictable exit without late manoeuvres.","reference":"Highway Code, Rule 273","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"}
];
