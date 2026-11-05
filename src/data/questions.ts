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
  {"id":"gb-safety-001","topic":"Vehicle safety","difficulty":"standard","prompt":"Before driving a borrowed car, you notice a brake warning and a damaged rear lamp. What is the sensible action?","options":["Drive only on streets with low limits","Switch on the hazard warning lights and continue","Trust the next MOT to identify the faults","Do not drive until the car is confirmed roadworthy"],"correctIndex":3,"explanation":"The driver must use a vehicle that meets roadworthiness and lighting requirements; warning signs and defective lights need attention.","reference":"Highway Code, Rule 89","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-002","topic":"Vehicle safety","difficulty":"easy","prompt":"A medical condition may make you unable to control your vehicle safely. What should you do?","options":["Inform the DVLA as required and seek medical advice about driving","Keep driving until the licence expires","Tell only your passengers","Avoid reporting the condition if you drive short distances"],"correctIndex":0,"explanation":"Drivers must notify the licensing authority of health conditions likely to affect their driving.","reference":"Highway Code, Rule 90","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-003","topic":"Vehicle safety","difficulty":"challenging","prompt":"You are planning an eight-hour drive. What break pattern does the Highway Code recommend?","options":["No breaks unless you need fuel","At least a 15-minute break after every two hours of driving","One break of five minutes at the end","A rest only after six hours"],"correctIndex":1,"explanation":"Fatigue impairs reactions; plan regular breaks of at least fifteen minutes at roughly two-hour intervals.","reference":"Highway Code, Rule 91","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-004","topic":"Vehicle safety","difficulty":"standard","prompt":"You need glasses to read a modern number plate clearly from 20 metres. What must you do while driving?","options":["Use them only when parking","Drive closer to the vehicle ahead to read its plate","Wear the required glasses or contact lenses at all times","Carry them in the glovebox without wearing them"],"correctIndex":2,"explanation":"Drivers must meet the number-plate eyesight standard and wear corrective lenses whenever those lenses are needed to meet it.","reference":"Highway Code, Rule 92","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-005","topic":"Vehicle safety","difficulty":"easy","prompt":"You drive on a dark country lane wearing heavily tinted glasses. What is the problem?","options":["Tinted lenses automatically improve night vision","They only affect your ability to read the speedometer","Tinted glasses remove headlight glare without any drawback","They may reduce your ability to see hazards in already poor visibility"],"correctIndex":3,"explanation":"Avoid tinted lenses at night or in poor visibility when they make it harder to see the road.","reference":"Highway Code, Rule 94","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-006","topic":"Vehicle safety","difficulty":"challenging","prompt":"You drank alcohol late in the evening and plan to drive early next morning. What should concern you?","options":["Alcohol may still impair your driving the following morning","Sleep always removes all alcohol from the body","Coffee instantly restores safe reactions","You may drive if you feel confident"],"correctIndex":0,"explanation":"Alcohol takes time to leave the body, and judgement or reaction time can remain impaired well after drinking.","reference":"Highway Code, Rule 95","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-007","topic":"Vehicle safety","difficulty":"standard","prompt":"A prescribed medicine makes you drowsy. What is the safest approach to driving?","options":["Drive normally because the medicine is legal","Check medical advice and do not drive while your ability is impaired","Take extra medicine to stay alert","Only avoid motorways and continue on other roads"],"correctIndex":1,"explanation":"Legal medicines can still affect safe driving. Follow doctor or pharmacist advice and do not drive when impaired.","reference":"Highway Code, Rule 96","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-008","topic":"Vehicle safety","difficulty":"easy","prompt":"You are setting off in a car you have never driven. What should you do before leaving?","options":["Adjust the navigation screen while joining traffic","Leave the head restraint low to improve visibility","Locate the controls and adjust the seat and mirrors","Depend on the first junction to learn the controls"],"correctIndex":2,"explanation":"Knowing the controls and adjusting driving position and mirrors before moving improves control and awareness.","reference":"Highway Code, Rule 97","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-009","topic":"Vehicle safety","difficulty":"challenging","prompt":"A trailer blocks the rear view from your towing vehicle. What equipment might be required?","options":["Extra front fog lamps","A second horn fitted to the trailer","Only a reflective sticker on the boot","Additional towing mirrors giving an adequate view behind"],"correctIndex":3,"explanation":"When a load or trailer obstructs rearward visibility, suitable towing mirrors are required.","reference":"Highway Code, Rule 98","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-010","topic":"Vehicle safety","difficulty":"standard","prompt":"A caravan sways because heavy luggage has been placed at the back. What should you do before towing?","options":["Redistribute and secure the load according to the maker's guidance","Accelerate sharply so the caravan straightens","Remove the safety coupling","Increase the weight above the permitted trailer limit"],"correctIndex":0,"explanation":"Poor load distribution can produce dangerous snaking; heavy items should be placed appropriately over the axles with safe nose weight.","reference":"Highway Code, Rule 98","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-011","topic":"Vehicle safety","difficulty":"easy","prompt":"Where is it dangerous to fit a rear-facing child seat?","options":["On a rear seat with a suitable restraint","In front of an active frontal airbag","In a vehicle fitted with rear windows","In a car with a passenger-side mirror"],"correctIndex":1,"explanation":"An active frontal airbag can strike a rear-facing child seat in a collision, causing severe injury.","reference":"Highway Code, Rule 101","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-012","topic":"Vehicle safety","difficulty":"challenging","prompt":"A child needs to leave your parked car beside a busy road. Which door is usually safer to use?","options":["The door beside moving traffic","Whichever door is opened fastest","A door on the kerb side, with adult supervision","The driver door even if it faces traffic"],"correctIndex":2,"explanation":"Using the kerb-side door usually reduces exposure to passing vehicles and cyclists.","reference":"Highway Code, Rule 102","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"},
  {"id":"gb-safety-013","topic":"Vehicle safety","difficulty":"standard","prompt":"For an ordinary car, what is the legal minimum tread depth over the central three-quarters of a tyre?","options":["0.5 mm on just one part of the tyre","2.8 mm only on the outer edge","No minimum if the tyre is new","1.6 mm around the full circumference"],"correctIndex":3,"explanation":"Car tyres must retain at least 1.6 mm of tread across the central three-quarters and around their full circumference.","reference":"Highway Code, Annex 6","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"},
  {"id":"gb-safety-014","topic":"Vehicle safety","difficulty":"easy","prompt":"When is a good time to check your car's tyre pressures?","options":["Before driving, when the tyres are cold","Immediately after a long high-speed journey","Only after tyre wear becomes visible","Only during a yearly service"],"correctIndex":0,"explanation":"The Highway Code advises weekly checks on cold tyres because heat can distort pressure readings.","reference":"Highway Code, Annex 6","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"},
  {"id":"gb-safety-015","topic":"Vehicle safety","difficulty":"challenging","prompt":"Your car pulls sharply to one side whenever you brake. What does this suggest?","options":["A normal feature of anti-lock brakes","A possible braking fault or uneven tyre pressure needing prompt attention","That your headlights need adjustment","That the rear wiper is worn out"],"correctIndex":1,"explanation":"Pulling under braking may signal brake trouble or incorrect inflation and warrants professional inspection.","reference":"Highway Code, Annex 6","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"},
  {"id":"gb-safety-016","topic":"Vehicle safety","difficulty":"standard","prompt":"The engine has overheated. What should you do before opening the coolant filler cap?","options":["Open the cap immediately to release pressure","Pour cold water onto the hot engine","Let the engine cool naturally","Keep driving rapidly to cool it with airflow"],"correctIndex":2,"explanation":"Opening a hot cooling system can release dangerous hot fluid; let the engine cool before removing the cap.","reference":"Highway Code, Annex 6","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"}
  {"id":"gb-weather-001","topic":"Weather conditions","difficulty":"easy","prompt":"You start driving in heavy rain after a long spell of dry weather. What happens to normal braking distance?","options":["It can be at least twice the dry-road distance","It becomes shorter because rain cools the brakes","It stays unchanged on every road","It is reduced if your tyres are new"],"correctIndex":0,"explanation":"Wet surfaces reduce tyre grip; the Highway Code warns that stopping distances can at least double compared with dry conditions.","reference":"Highway Code, Rule 227","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-002","topic":"Weather conditions","difficulty":"standard","prompt":"Spray from a large van makes it hard to see ahead. What should you do?","options":["Follow more closely to stay within its tyre tracks","Increase your following distance and adjust speed so you can see and stop safely","Use main beam continuously at close range","Overtake immediately regardless of visibility"],"correctIndex":1,"explanation":"Spray restricts observation for everyone. More separation and lower speed provide time to react.","reference":"Highway Code, Rule 227","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-003","topic":"Weather conditions","difficulty":"challenging","prompt":"You see a shiny patch where a lorry appears to have spilt diesel during rain. What is the risk?","options":["The patch always provides extra traction","Only the windscreen will be affected","The road may offer substantially less grip","The patch is safe if the road is level"],"correctIndex":2,"explanation":"Diesel mixed with surface water can make the carriageway very slippery, increasing the risk of skidding.","reference":"Highway Code, Rule 227","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-004","topic":"Weather conditions","difficulty":"easy","prompt":"A roadside sign warns of fog ahead, but the next stretch looks clear. What should you anticipate?","options":["A guarantee the fog has cleared completely","That fog lamps must be kept on for the entire journey","A restriction that applies only to lorries","A sudden bank or drifting patch of fog farther along"],"correctIndex":3,"explanation":"Fog can be uneven and arrive without warning. The sign is reason to prepare even when visibility momentarily improves.","reference":"Highway Code, Rule 234","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-005","topic":"Weather conditions","difficulty":"standard","prompt":"In fog, a driver follows your car uncomfortably closely. What should you avoid doing?","options":["Accelerating merely to escape the tailgater","Checking your mirrors before slowing","Leaving extra space to the car in front","Using dipped headlights as needed"],"correctIndex":0,"explanation":"Speeding up to escape a close follower reduces your own ability to stop within the visible distance.","reference":"Highway Code, Rule 235","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-006","topic":"Weather conditions","difficulty":"challenging","prompt":"You approach a narrow junction in dense fog. What is the safe way to join the main road?","options":["Creep into the lane until someone sounds a horn","Stop at the correct position, listen and look carefully, then emerge only when safe","Keep the same speed to avoid delaying traffic","Follow another vehicle without looking"],"correctIndex":1,"explanation":"Limited visibility demands extra observation, including listening for traffic before emerging into the main road.","reference":"Highway Code, Rule 235","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-007","topic":"Weather conditions","difficulty":"easy","prompt":"Your windscreen starts misting on the inside during a foggy journey. What should you use?","options":["Only the hazard warning lights","The handbrake to dry the glass","The demister and wipers as appropriate to restore clear vision","A cloth while travelling at normal speed"],"correctIndex":2,"explanation":"A clear windscreen is vital; demisters and wipers help restore the view needed to keep a safe stopping distance.","reference":"Highway Code, Rule 235","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-008","topic":"Weather conditions","difficulty":"standard","prompt":"After fog clears, another motorist keeps their rear fog lamp on. Why is that a problem?","options":["It makes their tyres grip the road less","It prevents the indicators from working","It uses too little electrical power","It can dazzle following drivers and hide the effect of brake lamps"],"correctIndex":3,"explanation":"Rear fog lamps are bright and should be switched off when visibility improves to reduce glare.","reference":"Highway Code, Rule 236","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-009","topic":"Weather conditions","difficulty":"challenging","prompt":"You are passing a high-sided delivery vehicle on an exposed bridge. What hazard should you expect?","options":["Sudden crosswind effects when leaving the shelter of the larger vehicle","A guaranteed increase in tyre grip","That the bridge automatically becomes one-way","That the speed limit has been cancelled"],"correctIndex":0,"explanation":"Large vehicles and exposed structures change wind exposure; gusts can push road users sideways.","reference":"Highway Code, Rule 232","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-010","topic":"Weather conditions","difficulty":"easy","prompt":"A motorcyclist is overtaking a tall lorry in strong wind. What should you allow?","options":["Less room than you would give a car","Extra room and distance because turbulence can unsettle the motorcycle","No change in your following distance","A horn blast to steady the rider"],"correctIndex":1,"explanation":"Turbulence around high-sided vehicles can move motorcycles unexpectedly, so leave a safety margin.","reference":"Highway Code, Rule 233","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-011","topic":"Weather conditions","difficulty":"standard","prompt":"You are driving for hours in very hot weather and feel increasingly sleepy. What should you do?","options":["Turn up the heating to remain alert","Drive closer to the vehicle ahead to concentrate","Keep the vehicle ventilated and take a safe rest break when needed","Ignore fatigue until the journey ends"],"correctIndex":2,"explanation":"Heat can contribute to drowsiness; ventilation and planned breaks support alert driving.","reference":"Highway Code, Rule 237","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-012","topic":"Weather conditions","difficulty":"challenging","prompt":"Rain begins after weeks of dry summer weather. Why might the road be unexpectedly slippery?","options":["Rain always removes all road deposits immediately","Tyres become wider when wet","Summer rain increases the legal speed limit","Surface deposits can make the first rainfall reduce grip"],"correctIndex":3,"explanation":"After a dry spell, the first rain can leave surface contamination slippery before it is washed away.","reference":"Highway Code, Rule 237","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"},
  {"id":"gb-weather-013","topic":"Weather conditions","difficulty":"easy","prompt":"The low sun suddenly dazzles you on a straight road. What should you do?","options":["Slow down and stop safely if you cannot see well enough","Speed up until you pass the bright section","Follow the tail-lights of the car ahead very closely","Use the horn to warn the sunlit traffic"],"correctIndex":0,"explanation":"If sunlight prevents safe observation, slowing or stopping is safer than continuing at a speed beyond your vision.","reference":"Highway Code, Rule 237","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"}
  {"id":"gb-signs-001","topic":"Road signs","difficulty":"easy","prompt":"You are entering an area signed as a 20 mph zone. What should you expect?","options":["A recommended minimum speed of 20 mph","A local speed restriction of 20 mph within the signed zone","Motorways only beyond the sign","A 20-minute parking limit"],"correctIndex":1,"explanation":"A 20 mph zone sign establishes a local speed limit; any relevant zone-ending signs tell you where it ceases.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-002","topic":"Road signs","difficulty":"standard","prompt":"You approach a circular sign bearing a car above a motorcycle inside a red border. What is it telling you?","options":["Only cars are permitted","Motorcycles have priority over cars","Motor vehicles are prohibited beyond the sign","All vehicles must turn around immediately"],"correctIndex":2,"explanation":"The illustrated car-and-motorcycle prohibition sign means no motor vehicles, subject to any qualifying plate.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-003","topic":"Road signs","difficulty":"challenging","prompt":"The road ahead is marked with a 'No entry' sign. What does that require?","options":["Enter carefully if no other cars are approaching","Only cyclists must stop","You may enter if you use hazard lights","Do not drive a vehicle past that sign into the restricted road"],"correctIndex":3,"explanation":"A no-entry sign prohibits vehicular entry rather than merely advising caution.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-004","topic":"Road signs","difficulty":"easy","prompt":"You see a blue circular sign with a white arrow pointing ahead. What is the usual instruction?","options":["Continue straight ahead in the direction shown","There is a sharp bend warning ahead","You may park along either kerb","It is an advisory tourist direction"],"correctIndex":0,"explanation":"A blue mandatory-direction circle instructs permitted traffic to follow the arrow.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-005","topic":"Road signs","difficulty":"standard","prompt":"A blue circular sign shows a white arrow passing to the left of an obstruction. What should you do?","options":["Overtake the vehicle in front on the left","Pass to the left as the sign directs","Turn left at the next road regardless of route","Keep to the right of the obstruction"],"correctIndex":1,"explanation":"Blue keep-left symbols direct vehicles around the specified side of an island or obstacle.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-006","topic":"Road signs","difficulty":"challenging","prompt":"A circular sign with red border shows two cars, one black and one red. What is its usual meaning?","options":["Cars may only overtake on the left","There is a two-car parking bay ahead","Overtaking by motor vehicles is prohibited","The next road has two lanes"],"correctIndex":2,"explanation":"The 'No overtaking' regulatory sign restricts passing until the prohibition ends.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-007","topic":"Road signs","difficulty":"easy","prompt":"You see a sign telling you to give priority to vehicles from the opposite direction. What should you do at the narrow section?","options":["Accelerate first because you have priority","Stop only if a bus approaches","Ignore it when your vehicle is smaller","Wait and let oncoming traffic pass before entering when necessary"],"correctIndex":3,"explanation":"The priority sign requires you to let traffic from the opposing direction pass through a restricted width.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-008","topic":"Road signs","difficulty":"standard","prompt":"A circular prohibition sign shows 2.3 metres as a height limit. What should a driver of a taller vehicle do?","options":["Choose another route rather than attempting to pass","Proceed if travelling slowly","Deflate the tyres to fit under the limit","Only stop if the vehicle is wider than 2.3 metres"],"correctIndex":0,"explanation":"Height restrictions prevent vehicles above the displayed dimension from entering the restricted route.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-009","topic":"Road signs","difficulty":"challenging","prompt":"A sign prohibits vehicles over a stated width. Which measurement matters?","options":["Only the distance between the tyres","The overall width of your vehicle and load","The height of the driver's seat","The length of the wheelbase"],"correctIndex":1,"explanation":"A vehicle-width restriction concerns the complete vehicle and any projecting load.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-010","topic":"Road signs","difficulty":"easy","prompt":"A triangular sign shows the roadway narrowing on both sides. What should you prepare for?","options":["A wider road with a new overtaking lane","A compulsory right turn","Less usable road width and possible conflict with approaching traffic","The start of a motorway"],"correctIndex":2,"explanation":"A narrowing warning tells drivers to assess clearance and adjust speed or position in good time.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-011","topic":"Road signs","difficulty":"standard","prompt":"A warning triangle shows a double bend, first to the left. What should it prompt you to do?","options":["Keep accelerating because the second bend is optional","Stop at the sign and reverse","Move to the centre line and wait","Reduce speed as appropriate and prepare for successive changes in direction"],"correctIndex":3,"explanation":"The double-bend warning alerts you to a sequence of bends that may limit your view ahead.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-012","topic":"Road signs","difficulty":"challenging","prompt":"A steep descent warning appears before a long hill. What should you plan?","options":["Use a controlled speed and a suitable gear before descending","Coast in neutral to save fuel","Switch off the engine as you go downhill","Rely only on the handbrake to control speed"],"correctIndex":0,"explanation":"A steep downhill warning calls for early speed control and a gear that helps manage descent.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-013","topic":"Road signs","difficulty":"easy","prompt":"A triangular sign warns of a level crossing without a barrier. What should you expect?","options":["An airport runway reserved for cars","A railway crossing that may not have a gate blocking road traffic","A crossing protected by full-width barriers at all times","A pedestrian-only subway"],"correctIndex":1,"explanation":"Some level crossings lack physical barriers; approach cautiously and follow any crossing signals and signs.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-014","topic":"Road signs","difficulty":"standard","prompt":"A warning sign shows the edge of a quay or riverbank. What danger is it highlighting?","options":["A bridge with extra-high railings","An automatic car-wash station","A route where a vehicle could enter deep water","A safe place to drive into a river"],"correctIndex":2,"explanation":"Quayside and riverbank warning signs alert drivers to an exposed waterside edge.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-015","topic":"Road signs","difficulty":"challenging","prompt":"A triangular sign warns that pedestrians may be in the road ahead. What is the sensible response?","options":["Sound the horn repeatedly to clear the road","Increase speed to pass before they cross","Assume pedestrians are confined to a footbridge","Scan the road edges and be ready to slow or stop for pedestrians"],"correctIndex":3,"explanation":"Pedestrian warnings are advance alerts to people potentially using the carriageway.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"},
  {"id":"gb-signs-016","topic":"Road signs","difficulty":"easy","prompt":"A direction sign has a green background on a primary road. What is the main purpose of the green colour?","options":["To identify primary-route direction information","To announce that all vehicles must stop","To warn of an immediate railway crossing","To mark an emergency-only lane"],"correctIndex":0,"explanation":"Primary-route direction signs typically use green backgrounds to distinguish route guidance from other sign families.","reference":"Highway Code, Traffic signs","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/traffic-signs"}
  {"id":"gb-junction-001","topic":"Road junctions","difficulty":"standard","prompt":"You want to leave a side road, but a long lorry is turning into it using much of the carriageway. What should you do?","options":["Move alongside its cab to hurry it along","Drive between the lorry and the kerb","Wait and allow room for the lorry's full turning movement","Assume the lorry will stay entirely in one lane"],"correctIndex":2,"explanation":"Large vehicles may need more than one lane to turn; holding back prevents a dangerous squeeze.","reference":"Highway Code, Rule 170","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-002","topic":"Road junctions","difficulty":"easy","prompt":"At a side-road junction, a vehicle approaches from the right with its left indicator on. What should you do?","options":["Assume it must turn left and move immediately","Follow the vehicle ahead without checking","Signal right to force it to slow","Wait until you can confirm its intentions and the junction is safe"],"correctIndex":3,"explanation":"An indicator does not guarantee the vehicle will turn; verify a safe gap before emerging.","reference":"Highway Code, Rule 170","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-003","topic":"Road junctions","difficulty":"challenging","prompt":"You emerge from a Give Way junction marked with broken white lines. Whose traffic has priority?","options":["Traffic on the main road","Any vehicle behind you on the side road","Only vehicles approaching from your left","You always have priority if you signal"],"correctIndex":0,"explanation":"At a Give Way line, let main-road traffic pass before joining when needed.","reference":"Highway Code, Rule 172","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-004","topic":"Road junctions","difficulty":"standard","prompt":"You need to cross a dual carriageway but the central reservation is too narrow for your entire car. What is safest?","options":["Stop with the rear of your car projecting into the first carriageway","Wait until you can cross both halves in one safe movement","Reverse into the opposing lane to create space","Rely on oncoming drivers to brake"],"correctIndex":1,"explanation":"A central refuge too short for your vehicle cannot protect it between traffic streams.","reference":"Highway Code, Rule 173","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-005","topic":"Road junctions","difficulty":"easy","prompt":"A central reservation can safely hold the full length of your vehicle. How may you treat a right turn across the dual carriageway?","options":["As one continuous movement without checking the second carriageway","As permission to park in the reservation","As two separate crossings, waiting in the middle for the next safe gap","As a way to turn left against traffic"],"correctIndex":2,"explanation":"An adequately deep reservation allows you to assess each direction separately without obstructing traffic.","reference":"Highway Code, Rule 173","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-006","topic":"Road junctions","difficulty":"challenging","prompt":"You approach a yellow box junction and stationary traffic fills the road beyond it. What should you do?","options":["Enter because your traffic light is green","Stop in the centre of the box to keep your place","Drive around the queue on the wrong side","Wait before the box until you have a clear exit"],"correctIndex":3,"explanation":"Normally you must not enter a yellow box unless you can exit it without stopping in the marked area.","reference":"Highway Code, Rule 174","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-007","topic":"Road junctions","difficulty":"standard","prompt":"You want to turn right across oncoming traffic at an ordinary box junction. When can waiting inside the box be allowed?","options":["When only oncoming traffic or other right-turning vehicles prevent completion","Whenever the exit road is blocked by a stationary queue","When you wish to travel straight ahead","Whenever you want to use the box as a waiting bay"],"correctIndex":0,"explanation":"There is a limited right-turn exception, but it does not apply to a blocked exit unrelated to those vehicles.","reference":"Highway Code, Rule 174","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-008","topic":"Road junctions","difficulty":"easy","prompt":"An amber traffic light appears just as you reach its stop line, and braking now could cause a collision. What may you do?","options":["Accelerate from far away to beat the light","Continue if you are already beyond the line or too close to stop safely","Treat amber as an unrestricted green","Ignore the signal if the road is empty"],"correctIndex":1,"explanation":"The Highway Code permits proceeding at amber only in the specified circumstances where stopping would be unsafe.","reference":"Highway Code, Rule 175","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-009","topic":"Road junctions","difficulty":"challenging","prompt":"Your light turns green but traffic ahead blocks the junction. What should you do?","options":["Enter and stop across the pedestrian crossing","Sound your horn and join the queue inside","Wait until there is room to clear the junction safely","Turn right without observing traffic"],"correctIndex":2,"explanation":"A green light does not remove the need to avoid blocking the junction.","reference":"Highway Code, Rule 176","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-010","topic":"Road junctions","difficulty":"standard","prompt":"The traffic lights at a crossroads are dark and appear to have failed. How should you proceed?","options":["Assume the failed lights give you priority","Accelerate because the restriction has ended","Let only buses proceed and ignore other vehicles","Treat it as an unmarked junction and exercise exceptional care"],"correctIndex":3,"explanation":"A failed signal requires careful judgement of traffic and gaps rather than assuming a right to go.","reference":"Highway Code, Rule 176","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-011","topic":"Road junctions","difficulty":"easy","prompt":"A green filter arrow lights up for left turns while the main red light remains on. What is permitted?","options":["Proceed left in the indicated direction when it is safe","Go straight ahead through the red signal","Turn right across all traffic","Use any lane to travel wherever you prefer"],"correctIndex":0,"explanation":"A green filter arrow applies only to its direction; other movements remain controlled by the main lights.","reference":"Highway Code, Rule 177","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-012","topic":"Road junctions","difficulty":"challenging","prompt":"At a red light, two stop lines mark an advanced cyclist waiting area. Where should a car normally stop?","options":["Between the two lines in the cyclist area","At the first line, before the cycle reservoir","Across the pedestrian crossing","As close to the vehicle ahead as possible"],"correctIndex":1,"explanation":"Advanced stop lines reserve a forward area for cycles; motor traffic must stop at the first line when the signal requires it.","reference":"Highway Code, Rule 178","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-013","topic":"Road junctions","difficulty":"standard","prompt":"You intend to turn right from a normal two-way road. Where should you usually position the car before turning?","options":["Against the left kerb no matter how wide the road","Across both carriageways","Just left of the road centre or in a marked right-turn space","In a cycle lane to prevent cyclists passing"],"correctIndex":2,"explanation":"Safe right-turn positioning helps other vehicles understand your intentions and may leave room to pass on the left.","reference":"Highway Code, Rule 179","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-014","topic":"Road junctions","difficulty":"easy","prompt":"Before completing a right turn, which final check is especially important?","options":["Look only at the speedometer","Turn tightly across the corner to save time","Rely on your indicator to stop oncoming traffic","Look for traffic overtaking you, including in the blind spot"],"correctIndex":3,"explanation":"A vehicle or motorcycle may be passing while you wait; checking mirrors and blind spot avoids cutting across it.","reference":"Highway Code, Rule 180","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-junction-015","topic":"Road junctions","difficulty":"challenging","prompt":"You turn left across a cycle track. A cyclist is approaching along it from the opposite direction. What should you do?","options":["Give way before crossing the track","Expect the cyclist to stop because you are in a car","Enter the track to make the cyclist move away","Use the horn while continuing to turn"],"correctIndex":0,"explanation":"When turning across a cycle track or lane, give way to users of that route even when approaching from the other direction.","reference":"Highway Code, Rule 183","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"}
  {"id":"gb-roundabout-001","topic":"Roundabouts","difficulty":"easy","prompt":"You are approaching an unfamiliar roundabout with lane arrows painted on the road. What should guide your choice of lane?","options":["Only the lane occupied by the fastest car","The lane nearest the centre regardless of exit","Whichever lane lets you overtake first","The destination signs and the lane markings for your intended exit"],"correctIndex":3,"explanation":"Roundabout lanes can be allocated to particular exits, so read signs and markings early and plan your position.","reference":"Highway Code, Rule 184","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-002","topic":"Roundabouts","difficulty":"standard","prompt":"As you approach a roundabout, when should you decide which exit to take?","options":["Before reaching it, so you can select the correct approach lane","Only after passing the first exit","Once you are level with the central island","After another driver sounds a horn"],"correctIndex":0,"explanation":"Early route choice allows enough time for mirror checks, signals and safe lane positioning.","reference":"Highway Code, Rule 184","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-003","topic":"Roundabouts","difficulty":"challenging","prompt":"Why is the mirror-signal-manoeuvre routine useful at a roundabout?","options":["It means you always have priority","It helps you track surrounding traffic and communicate your intended movements","It allows you to ignore lane arrows","It removes the need to check the right-hand side"],"correctIndex":1,"explanation":"Roundabouts involve multiple traffic streams, and systematic observation helps prevent unexpected conflicts.","reference":"Highway Code, Rule 184","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-004","topic":"Roundabouts","difficulty":"easy","prompt":"A roundabout's signs and traffic lights are directing the entry differently from the usual rule. What should you follow?","options":["Always the rule that traffic from the right must stop","Only the vehicle directly in front","The specific signs, signals and markings controlling that entrance","The centre line even if arrows disagree"],"correctIndex":2,"explanation":"Traffic controls can alter the normal give-way arrangements, so follow the actual instructions at the junction.","reference":"Highway Code, Rule 185","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-005","topic":"Roundabouts","difficulty":"standard","prompt":"You see an indicator flashing on a car already circulating on a roundabout. What is safest?","options":["Assume it will definitely exit immediately","Join because the other driver has signalled","Ignore all vehicles that are indicating","Judge its actual position and movement instead of trusting the indicator alone"],"correctIndex":3,"explanation":"Drivers may signal incorrectly or forget to cancel; observe before entering.","reference":"Highway Code, Rule 185","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-006","topic":"Roundabouts","difficulty":"challenging","prompt":"The car in front at a roundabout starts forward then brakes. What should you check before you move?","options":["That the space ahead is actually clear and the car has moved away","Only whether the vehicle behind is close","That your radio is turned off","Only the farthest exit sign"],"correctIndex":0,"explanation":"Looking forward prevents a collision with the vehicle ahead when it unexpectedly stops again.","reference":"Highway Code, Rule 185","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-007","topic":"Roundabouts","difficulty":"easy","prompt":"You are taking a right-hand exit at a roundabout without contrary lane markings. What should you normally signal on approach?","options":["Left from the start until leaving","Right, then left after passing the exit before yours","No signal under any circumstances","Hazard lights throughout the roundabout"],"correctIndex":1,"explanation":"For a right-hand exit, a right signal on approach communicates intention; signal left before exiting at the proper point.","reference":"Highway Code, Rule 186","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-008","topic":"Roundabouts","difficulty":"standard","prompt":"You are travelling to an intermediate exit straight ahead at a standard roundabout. What is usually correct on approach?","options":["Signal right throughout the roundabout","Signal left before the first exit even if you are passing it","Select the suitable lane and normally do not signal until signalling left to leave","Use hazard lights to show you are not turning"],"correctIndex":2,"explanation":"Intermediate exits generally call for the appropriate approach lane, then a left signal after the exit before yours.","reference":"Highway Code, Rule 186","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-009","topic":"Roundabouts","difficulty":"challenging","prompt":"When leaving a roundabout by the third exit, when should you normally begin signalling left?","options":["Before entering the roundabout regardless of destination","After you have completely left the roundabout","Only once another driver flashes headlights","After passing the exit immediately before the one you need"],"correctIndex":3,"explanation":"A well-timed left signal indicates which exit you will take without confusing drivers at earlier exits.","reference":"Highway Code, Rule 186","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-010","topic":"Roundabouts","difficulty":"easy","prompt":"A cyclist is travelling around a roundabout in the same lane as you. What should you do?","options":["Give space and do not overtake within that lane","Pass closely on the inside to avoid delay","Use your horn to make the cyclist move left","Assume the cyclist must leave at the next exit"],"correctIndex":0,"explanation":"Cyclists move more slowly and need room; overtaking them within the same roundabout lane risks cutting across their path.","reference":"Highway Code, Rule 186","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-011","topic":"Roundabouts","difficulty":"standard","prompt":"A horse rider remains in the left-hand lane while continuing past an exit. How should you respond?","options":["Assume they must take the next left exit","Allow them space and avoid cutting across their path","Move alongside and force a lane change","Sound the horn repeatedly until they turn"],"correctIndex":1,"explanation":"Horse riders may stay left while going around a roundabout, and drivers must anticipate their continuing movement.","reference":"Highway Code, Rule 186","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-012","topic":"Roundabouts","difficulty":"challenging","prompt":"A long articulated lorry is circulating ahead of you and appears to straddle two lanes. What should you do?","options":["Overtake between the lorry and the central island","Move beside the trailer on the inside","Keep well clear and allow for its wider turning path","Assume its rear wheels follow the front exactly"],"correctIndex":2,"explanation":"Long vehicles sometimes need extra space or multiple lanes to turn safely.","reference":"Highway Code, Rule 187","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-013","topic":"Roundabouts","difficulty":"easy","prompt":"You are leaving a busy roundabout and see a pedestrian starting to cross the exit road. What should you do?","options":["Accelerate out before the person reaches your lane","Use the horn to make them run","Drive into the crossing space and stop beside them","Be ready to yield and let the pedestrian cross safely"],"correctIndex":3,"explanation":"Roundabout exits require careful observation for people crossing; be ready to give way under the relevant junction priority rules.","reference":"Highway Code, Rule 187","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-014","topic":"Roundabouts","difficulty":"standard","prompt":"You approach a mini-roundabout marked by a painted central circle. How should most vehicles pass it?","options":["Around the centre markings unless the vehicle is too large to do so","Straight across the circle whenever the route is shortest","Against the direction of circulating traffic","Onto the pavement if the painted area is narrow"],"correctIndex":0,"explanation":"The central markings at a mini-roundabout must normally be circled, with limited practical exceptions for large vehicles.","reference":"Highway Code, Rule 188","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"},
  {"id":"gb-roundabout-015","topic":"Roundabouts","difficulty":"challenging","prompt":"Two mini-roundabouts are joined close together. How should you deal with them?","options":["Treat both as one junction and ignore the second give-way point","Treat each as a separate roundabout, assessing traffic from the right at each","Stop between them regardless of conditions","Always take the right lane through both"],"correctIndex":1,"explanation":"Every mini-roundabout has its own approach and priority decision.","reference":"Highway Code, Rule 189","sourceUrl":"https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"}
];
