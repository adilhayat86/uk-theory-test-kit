import type { CourseLesson } from './course';

// Original lessons. Primary Highway Code sources checked 17 November 2026; independent editorial review pending.
export const conditionLessons: CourseLesson[] = [
  {
    "id": "motorways-joining-and-leaving",
    "moduleId": "module-motorways",
    "title": "Joining and leaving a motorway",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Join without forcing existing traffic to change course.",
      "Recognise an added lane and plan an exit early.",
      "Recover safely after missing a junction."
    ],
    "sections": [
      {
        "id": "motorways-joining-and-leaving-section-1",
        "title": "Prepare before the slip road",
        "paragraphs": [
          "Motorway traffic can close a gap much faster than it appears to from a side road. Plan your route before setting off so that lane decisions do not compete with reading a map. A learner car driver may use a motorway only with an approved driving instructor in a dual-controlled car displaying red L plates, or D plates in Wales. Once on the slip road, look well ahead and use mirrors to build a picture of the left lane, rather than staring at one vehicle. Adjust speed to fit a safe gap while staying within the limit."
        ]
      },
      {
        "id": "motorways-joining-and-leaving-section-2",
        "title": "Join the flow, not a race",
        "paragraphs": [
          "Traffic already on the motorway has priority. A signal tells other drivers what you intend; it does not reserve a gap or require them to move aside. Keep checking the gap as it develops, including any blind area relevant to a sideways move. Do not cross solid white lines or treat the hard shoulder as an extension of the slip road. If your slip road becomes an extra motorway lane, normally remain in that lane instead of making an unnecessary immediate lane change."
        ],
        "imageAssetId": "motorway-join"
      },
      {
        "id": "motorways-joining-and-leaving-section-3",
        "title": "Leave with time and space",
        "paragraphs": [
          "After joining, remain in the left lane long enough to settle into the traffic before considering an overtake. For an exit, read the signs early, get into the appropriate lane in good time and signal your intention. Reduce speed on the slip road as required by its shape and signs; a motorway cruising speed can feel deceptively slow after a long journey. If you miss the exit, continue to the next junction. Never reverse, cross the central reservation or turn back against the traffic flow."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "Your planned exit appears while you are overtaking two vehicles. There is no safe gap back to the left before the exit. Continue safely past the junction and re-plan at the next exit. Losing a few minutes is preferable to cutting across lanes at the last moment."
    },
    "takeaways": [
      "Existing motorway traffic has priority.",
      "An added lane does not require an immediate merge.",
      "A missed exit means continuing to the next one."
    ],
    "questionIds": [
      "gb-motorway-001",
      "gb-motorway-002",
      "gb-motorway-007",
      "gb-motorway-008",
      "gb-motorway-011",
      "gb-motorway-016"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 253–263 and 272–273",
        "url": "https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"
      }
    ]
  },
  {
    "id": "motorways-lanes-and-signals",
    "moduleId": "module-motorways",
    "title": "Lane discipline and motorway signals",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Choose lanes according to the task, not their apparent speed.",
      "Respond correctly to warnings, mandatory limits and red X closures.",
      "Check safely before changing lanes."
    ],
    "sections": [
      {
        "id": "motorways-lanes-and-signals-section-1",
        "title": "Use the left lane as the normal lane",
        "paragraphs": [
          "The motorway's lanes are not divided into slow drivers and fast drivers. Keep left unless overtaking, then return left when it is safe. Before moving, use mirrors, assess traffic ahead and behind, and check any blind area that could hide a vehicle. Give a useful signal and move smoothly into a genuine gap. Leaving a safe following distance still matters while overtaking. A vehicle towing a trailer must not normally use the right-hand lane of a motorway with three or more lanes."
        ]
      },
      {
        "id": "motorways-lanes-and-signals-section-2",
        "title": "Treat information as an early warning",
        "paragraphs": [
          "Motorway signs may warn of a hazard that is still beyond your view. Amber flashing signals are a reason to reduce speed and prepare for what lies ahead, not to wait until the obstruction becomes visible. A speed limit shown inside a red circle is compulsory. Follow advance instructions before a lane closure so that you can change lanes safely rather than braking or swerving beneath the final sign. The presence of a warning does not remove your responsibility to choose an appropriate speed for the actual conditions."
        ]
      },
      {
        "id": "motorways-lanes-and-signals-section-3",
        "title": "A closed lane is not spare road space",
        "paragraphs": [
          "A red X with flashing red lights means the lane is closed. Do not drive in it; hazards and people may be present even if the first stretch looks empty. Emergency services may also need that lane to reach an incident. A closure of the left lane at an exit can make that exit unavailable. In congestion, stay in your lane when queues are moving at different speeds; do not weave between lanes to gain a few car lengths. Reassess every move rather than following another driver through a restriction."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You are approaching a red X over the left lane and your satnav says to use that lane for the next exit. Follow the motorway signs and move safely to an open lane. Let the route change rather than entering a closed lane because a navigation instruction is inconvenient."
    },
    "takeaways": [
      "Keep left except when overtaking.",
      "Red-circle speed limits and red X closures must be obeyed.",
      "Plan lane changes early and check the blind area."
    ],
    "questionIds": [
      "gb-motorway-003",
      "gb-motorway-004",
      "gb-motorway-005",
      "gb-motorway-006",
      "gb-motorway-009",
      "gb-motorway-012",
      "gb-motorway-013",
      "gb-motorway-014",
      "gb-motorway-015"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 255–258 and 264–268",
        "url": "https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"
      }
    ]
  },
  {
    "id": "motorways-stopping-and-emergencies",
    "moduleId": "module-motorways",
    "title": "Stopping, fatigue and motorway emergencies",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Distinguish a rest stop from an emergency stop.",
      "Choose a place of relative safety.",
      "Explain what to do when safe exit is impossible."
    ],
    "sections": [
      {
        "id": "motorways-stopping-and-emergencies-section-1",
        "title": "Stop for the right reason in the right place",
        "paragraphs": [
          "Motorway monotony can make you sleepy even when traffic is light. Plan breaks and use a service area or leave at an exit if you need rest. A hard shoulder or emergency area is not a place for a telephone call, a route check or a short sleep. Do not use a hard shoulder as an extra running lane unless the signs permit it. If a problem develops but the vehicle can continue safely, aim for the next service area or leave the motorway rather than stopping beside fast traffic."
        ]
      },
      {
        "id": "motorways-stopping-and-emergencies-section-2",
        "title": "Go left, then get safe",
        "paragraphs": [
          "If continuing is not possible, move left and use an emergency area or hard shoulder if you can. Stop as far left as possible, turn the wheels left and switch on hazard warning lights. Use sidelights if darkness or poor visibility requires them. If it is safe and possible, leave by the side away from traffic and move well away from the vehicle and carriageway, behind a safety barrier where available. Check the ground beyond a barrier for drops or other hazards. Keep passengers together and children under control."
        ]
      },
      {
        "id": "motorways-stopping-and-emergencies-section-3",
        "title": "Get help without creating another emergency",
        "paragraphs": [
          "If you cannot reach relative safety and cannot leave the vehicle safely, stay inside with seat belts and hazard lights on and call 999 for the police, or use the vehicle's SOS button. Explain your location and direction of travel. Do not attempt roadside repairs on a motorway or walk into a live lane to retrieve an object. Never place a warning triangle on a motorway. From an emergency area, use its emergency telephone and follow the operator's instructions before attempting to rejoin; a lane may need to be closed first."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "An engine warning appears just before a service-area entrance. The car can still be driven safely. Use the service area rather than stopping on the hard shoulder. If the car instead loses power in a live lane and no safe exit is possible, keep belts on, use hazards and summon urgent help."
    },
    "takeaways": [
      "Use services for rest; emergency areas are for emergencies.",
      "Stay away from moving traffic if safe exit is possible.",
      "If safe exit is impossible, stay belted and call 999."
    ],
    "questionIds": [
      "motorway-001",
      "gb-motorway-010",
      "gb-motorway-011",
      "course-incidents-001",
      "course-incidents-002",
      "course-incidents-003",
      "course-incidents-004",
      "course-incidents-006",
      "course-incidents-007"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 262 and 269–270",
        "url": "https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"
      },
      {
        "title": "Highway Code, Rules 275–279",
        "url": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
      }
    ]
  },
  {
    "id": "weather-rain-and-following-space",
    "moduleId": "module-weather",
    "title": "Rain, grip and following space",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Explain how wet weather changes stopping and observation.",
      "Choose a suitable following gap.",
      "Respond smoothly when tyres lose contact with the road."
    ],
    "sections": [
      {
        "id": "weather-rain-and-following-space-section-1",
        "title": "Plan for less grip and a poorer view",
        "paragraphs": [
          "A wet road gives the tyres less grip, so the distance needed to stop is at least double the dry-road distance. Rain and spray can also hide the hazard that would make you brake. Reduce speed to suit the view and leave enough space to see past the vehicle ahead. Take extra care near pedestrians, cyclists and motorcyclists, whose position or stability may change around water. After a long dry spell, the first rain can make the surface particularly slippery; familiar roads still need a fresh assessment."
        ]
      },
      {
        "id": "weather-rain-and-following-space-section-2",
        "title": "Use time, then increase it for conditions",
        "paragraphs": [
          "At high speed, a dry-road following gap should be at least two seconds. Choose a fixed roadside feature, note when the vehicle ahead passes it, and count until your own vehicle reaches it. On a wet road, at least double that gap. Four seconds is therefore a minimum starting point in wet high-speed conditions, not a promise that every speed and surface is safe. Increase the space further when visibility or grip is worse. Dropping back also improves the chance of seeing a brake-light warning early."
        ],
        "caseStudyId": "case-wet-following"
      },
      {
        "id": "weather-rain-and-following-space-section-3",
        "title": "Avoid sudden reactions to surface water",
        "paragraphs": [
          "If steering becomes unusually light or unresponsive in heavy rain, water may be preventing the tyres from gripping the road. Ease off the accelerator and slow gradually rather than making an abrupt steering or braking input. Look well ahead so that reducing speed happens before deep water or a bend whenever possible. A shiny diesel spill can be extremely slippery, especially when wet. Do not assume that a large vehicle ahead will uncover every hazard for you; its spray can make following closely both less visible and less controllable."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A van ahead throws spray over your windscreen. Instead of staying close to use its tail-lights as a guide, increase the gap and reduce speed until you can see enough clear road. If the van brakes suddenly, the extra space gives you time to react and stop."
    },
    "takeaways": [
      "Wet stopping distances are at least double dry distances.",
      "At least double the two-second high-speed gap in rain.",
      "Ease off smoothly if steering loses response in water."
    ],
    "questionIds": [
      "weather-001",
      "weather-003",
      "gb-weather-001",
      "gb-weather-002",
      "gb-weather-003",
      "gb-weather-012"
    ],
    "sources": [
      {
        "title": "Highway Code, Rule 126",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, Rule 227",
        "url": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
      }
    ]
  },
  {
    "id": "weather-visibility-wind-and-heat",
    "moduleId": "module-weather",
    "title": "Fog, wind and bright weather",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Choose lights that help without dazzling others.",
      "Anticipate sudden changes in wind and visibility.",
      "Respond safely to glare and heat-related fatigue."
    ],
    "sections": [
      {
        "id": "weather-visibility-wind-and-heat-section-1",
        "title": "Drive within the view you actually have",
        "paragraphs": [
          "Before entering fog, check mirrors and reduce speed. A clear patch after a fog warning does not mean the whole route has cleared; another bank may appear suddenly. Keep a gap that allows you to stop within the distance you can see is clear. Do not simply follow the red lights ahead, because their apparent visibility can encourage an unsafe speed or gap. Use wipers and demisters to keep the windscreen clear. If another driver follows too closely, do not accelerate into a view you cannot safely use."
        ]
      },
      {
        "id": "weather-visibility-wind-and-heat-section-2",
        "title": "Use lights for conditions, then change them back",
        "paragraphs": [
          "When visibility is seriously reduced, generally when you cannot see beyond 100 metres, headlights must be used. Front or rear fog lights may also be used in those conditions, but must be switched off when visibility improves. Unnecessary fog lights can dazzle and make brake lights harder to distinguish. At a junction in fog, stop correctly, look and listen carefully before emerging. Once you know it is safe, move positively without stopping where you would block the path of approaching traffic. Lighting is an aid to observation, not a substitute for it."
        ]
      },
      {
        "id": "weather-visibility-wind-and-heat-section-3",
        "title": "Expect movement you cannot predict exactly",
        "paragraphs": [
          "Crosswinds can push a car or vulnerable road user sideways. Be especially prepared on exposed bridges, open stretches and gaps in hedges. Passing a large vehicle may change the wind pressure around you, and a motorcyclist can be especially affected by that turbulence. Give space rather than trying to pass closely. In hot weather, ventilation can improve comfort but does not cure tiredness: arrange a safe rest stop if you become sleepy. If low sun dazzles you, reduce speed and, if necessary, stop safely rather than driving without an adequate view."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A fog bank clears as you reach an exposed bridge. Reassess both problems: switch off unnecessary fog lights, but keep enough space for the gusts that may affect you or the motorcyclist ahead. Better visibility does not remove the separate risk from wind."
    },
    "takeaways": [
      "Use headlights in seriously reduced visibility.",
      "Switch fog lights off when the conditions improve.",
      "Allow extra room for gusts, glare and unstable road users."
    ],
    "questionIds": [
      "weather-002",
      "wind-001",
      "gb-weather-004",
      "gb-weather-005",
      "gb-weather-006",
      "gb-weather-007",
      "gb-weather-008",
      "gb-weather-009",
      "gb-weather-010",
      "gb-weather-011",
      "gb-weather-013"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 226 and 232–237",
        "url": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
      }
    ]
  },
  {
    "id": "winter-prepare-before-driving",
    "moduleId": "module-winter",
    "title": "Preparing for snow and ice",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Decide whether a winter journey is necessary.",
      "Clear the vehicle properly before departure.",
      "Prepare for delays and changing route conditions."
    ],
    "sections": [
      {
        "id": "winter-prepare-before-driving-section-1",
        "title": "Decide before the car moves",
        "paragraphs": [
          "Snow and ice can make a normally simple journey difficult to control or complete. Check local forecasts and travel warnings rather than judging only the road outside your home. The Highway Code advises against driving in these conditions unless the journey is essential. If it is essential, allow more time, consider the route and identify safer alternatives or stopping places. A time commitment does not make an unsafe journey necessary; changing an appointment may be the safer decision. Tell someone your plan when there is a realistic chance of becoming stranded."
        ]
      },
      {
        "id": "winter-prepare-before-driving-section-2",
        "title": "Clear more than a small viewing hole",
        "paragraphs": [
          "You must be able to see, so remove snow and ice from every window, not just a patch in front of the steering wheel. Clear mirrors and demist the inside of the glass thoroughly. Lights must be clean and number plates visible and legible. Remove snow that could fall from the vehicle into the path of other road users, including snow on the roof that might slide across your own view when braking. Complete these jobs while parked safely, before expecting the ventilation or wipers to solve them on the move."
        ]
      },
      {
        "id": "winter-prepare-before-driving-section-3",
        "title": "Carry help and keep checking the plan",
        "paragraphs": [
          "For an essential winter journey, take items that help if you are delayed: de-icer and scraper, warm clothing and boots, a torch, first-aid kit, jump leads and a shovel, with food and a warm drink. Prepare the vehicle for the conditions rather than relying only on an emergency bag. Check that the intended route is not already blocked and that more severe weather is not forecast. Once travelling, listen to travel information and variable signs. Conditions may change over a short distance, so be willing to stop safely or revise the plan."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You have cleared the windscreen but the side windows, lights and roof remain covered. The destination is only a mile away. Finish clearing the vehicle before departure, then reassess whether the journey is essential. A short distance still requires visibility and must not shed a hazard behind you."
    },
    "takeaways": [
      "Avoid non-essential journeys in snow or ice.",
      "Clear windows, mirrors, lights, plates and loose roof snow.",
      "Prepare for delays and reassess the route."
    ],
    "questionIds": [
      "gb-winter-001",
      "gb-winter-002",
      "gb-winter-003",
      "gb-winter-004",
      "gb-winter-005",
      "gb-winter-006",
      "gb-winter-010"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 228–230",
        "url": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
      }
    ]
  },
  {
    "id": "winter-control-and-stopping",
    "moduleId": "module-winter",
    "title": "Maintaining control on ice",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Explain why stopping space must grow greatly.",
      "Use gentle inputs before bends and when starting.",
      "Recognise that treatment does not guarantee grip."
    ],
    "sections": [
      {
        "id": "winter-control-and-stopping-section-1",
        "title": "Leave room for a much longer stop",
        "paragraphs": [
          "Ice can reduce grip so much that stopping distances may be ten times the dry-road distance. Leave a very large gap rather than copying the distance used by a driver ahead. Drive carefully even where a road has been treated: gritting is not a guarantee that every shaded patch, bridge or junction is clear. Conditions can vary within a short stretch, and information signs may warn of hazards you have not reached. Reduce demands on the tyres before the difficult surface rather than waiting for the car to slide."
        ]
      },
      {
        "id": "winter-control-and-stopping-section-2",
        "title": "Make acceleration, braking and steering gentle",
        "paragraphs": [
          "Avoid sudden actions, because a tyre needs grip to change speed or direction. In a manual car, use a suitably high gear at a slow, safe speed and accelerate gently to reduce the chance of wheelspin. Before a bend, brake progressively while travelling straight, then steer smoothly around it at the reduced speed. Do not brake hard only after entering the bend. Vehicle controls and transmission instructions vary, so use the manufacturer's advice alongside the general principle of avoiding sharp changes in force. Extra technology cannot create grip where the surface provides very little."
        ],
        "imageAssetId": "dft-slippery-road"
      },
      {
        "id": "winter-control-and-stopping-section-3",
        "title": "Observe the surface and the vehicles treating it",
        "paragraphs": [
          "Very little tyre noise can be a clue that the road is icy. If you are uncertain about grip, only test it by gentle braking in a safe place where that action will not put anyone at risk. A winter maintenance vehicle may be spreading salt or throwing snow into adjoining space, so keep clear and be cautious around it. Do not pass a snowplough unless the lane you intend to use has been cleared. Progress is secondary to having a safe path, a useful view and enough stopping room."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A gritted main road leads into a shaded bend and the tyre noise becomes unusually quiet. Ease speed down on the straight, keep a much larger following gap and steer gently. Do not interpret the earlier grit treatment as permission to keep the same speed through a potentially icy bend."
    },
    "takeaways": [
      "Stopping on ice may require ten times the dry-road distance.",
      "Slow before bends and avoid sudden controls.",
      "Treated roads and snow-clearing vehicles still need caution."
    ],
    "questionIds": [
      "winter-001",
      "gb-winter-007",
      "gb-winter-008",
      "gb-winter-009",
      "gb-winter-011",
      "gb-winter-012",
      "gb-winter-013",
      "gb-winter-014",
      "gb-winter-015"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 230–231",
        "url": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
      }
    ]
  },
  {
    "id": "parking-restrictions-and-access",
    "moduleId": "module-parking",
    "title": "Reading parking restrictions",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Distinguish waiting restrictions from stopping restrictions.",
      "Read zone signs, markings and reserved bays together.",
      "Keep crossings, junctions and access routes usable."
    ],
    "sections": [
      {
        "id": "parking-restrictions-and-access-section-1",
        "title": "Read the whole restriction",
        "paragraphs": [
          "Yellow lines control waiting, and their operating times come from nearby plates or the signs at a Controlled Parking Zone entrance. Double yellow lines mean no waiting at any time even without a separate upright sign. A stopping restriction is stricter than a waiting restriction: do not assume that remaining in the driver's seat makes a brief stop acceptable. Clearways and signed school entrance markings require particular attention. Look for the complete combination of lines, signs and local conditions before deciding where a passenger can get out or a delivery can be made."
        ]
      },
      {
        "id": "parking-restrictions-and-access-section-2",
        "title": "Use bays only for their stated purpose",
        "paragraphs": [
          "A marked parking place may have conditions concerning time, payment or eligible users. A Blue Badge bay is reserved for those entitled to use it; a vacant bay is not general permission. Controlled-zone entry signs can supply the usual waiting times, while particular bays may have their own instructions. Do not park in an operating tram lane that is not available to your vehicle. In London and Scotland, pavement parking is prohibited, with exceptions only in limited circumstances. Elsewhere, you should not park on the pavement unless signs permit it. Pavement parking can obstruct wheelchair users, people with visual impairments and people with pushchairs."
        ],
        "imageAssetId": "dft-parking"
      },
      {
        "id": "parking-restrictions-and-access-section-3",
        "title": "Think about the space others need",
        "paragraphs": [
          "A space can be physically large enough for your car but still unsafe or unlawful to use. Keep the zig-zag approaches to pedestrian crossings clear. Do not stop or park opposite or within 10 metres of a junction unless in an authorised parking space. Do not obstruct emergency access, a fire-station entrance or an entrance that others need to use. Look beyond the length of your own car: a wheelchair user, an emergency vehicle or a driver emerging from a junction may need the space you would remove. Choose an off-street parking area or a suitable marked bay wherever possible."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "There is a car-sized gap beside double yellow lines near a junction. A passenger says you can wait there because you will remain in the vehicle. Check the restriction and the junction position; staying at the wheel does not turn waiting into unrestricted parking. Choose a lawful place that preserves visibility and access."
    },
    "takeaways": [
      "Check signs and markings together, including zone entry signs.",
      "A free space is not automatically a permitted space.",
      "Keep crossings, junctions and emergency access clear."
    ],
    "questionIds": [
      "parking-001",
      "parking-002",
      "gb-parking-005",
      "gb-parking-006",
      "gb-parking-007",
      "gb-parking-008",
      "gb-parking-009",
      "gb-parking-010",
      "gb-parking-011",
      "gb-parking-012"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 238–245",
        "url": "https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252"
      }
    ]
  },
  {
    "id": "parking-secure-and-visible",
    "moduleId": "module-parking",
    "title": "Leaving a parked vehicle safely",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Secure a parked car and protect passing road users.",
      "Check the night-parking lighting rules.",
      "Avoid hazards caused by doors, passengers or charging leads."
    ],
    "sections": [
      {
        "id": "parking-secure-and-visible-section-1",
        "title": "Complete the stop before leaving",
        "paragraphs": [
          "Roadside parking should normally face with the traffic flow and be close to the side. Before leaving, switch off the engine, headlights and fog lights and apply the parking brake. Make the vehicle secure and put valuables out of sight. On a hill, combine the parking brake with the appropriate gear and wheel position: uphill, a forward gear and wheels away from the kerb; downhill, reverse and wheels towards the kerb. Use Park for an automatic. Follow the vehicle's instructions for its controls rather than assuming the parking brake alone completes every situation."
        ]
      },
      {
        "id": "parking-secure-and-visible-section-2",
        "title": "Doors and passengers create moving hazards",
        "paragraphs": [
          "You must not hit another road user when opening a door. Check all around, including mirrors and the view over your shoulder, for cyclists and other traffic. Where possible, using the hand farther from the door encourages the body to turn and improves that shoulder check. Passengers, especially children, are generally safer leaving on the kerb side. Do not place the car so close to a Blue Badge vehicle that its occupants lose needed space. At an electric charger, keep cables from becoming a trip hazard and replace them neatly when finished."
        ]
      },
      {
        "id": "parking-secure-and-visible-section-3",
        "title": "A parked car must still be visible",
        "paragraphs": [
          "At night, do not park facing against traffic unless in a recognised parking space. Parking lights are required on a road or lay-by where the speed limit is greater than 30 mph. Some vehicles, including ordinary cars, can be parked without lights on roads limited to 30 mph or less only under the conditions in the Code, such as a recognised parking place or being close to the kerb, facing with traffic and at least 10 metres from a junction. Do not apply that exception to every vehicle or projecting load. Parking on a road in fog is particularly hazardous; if unavoidable, leave parking lights or sidelights on."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You park after dark on a 40 mph road. Switching off the headlights does not remove the requirement for parking lights. After securing the car, check the lighting rule and look for passing cyclists before opening the door. Ask a child passenger to leave on the kerb side."
    },
    "takeaways": [
      "Secure the vehicle and use the correct parking procedure.",
      "Check before opening any door.",
      "Night parking has direction and lighting requirements."
    ],
    "questionIds": [
      "parking-003",
      "parking-002",
      "gb-parking-001",
      "gb-parking-002",
      "gb-parking-003",
      "gb-parking-004",
      "gb-parking-013"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 239 and 248–252",
        "url": "https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252"
      }
    ]
  },
  {
    "id": "incidents-breakdown-response",
    "moduleId": "module-incidents",
    "title": "Responding to a breakdown",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Choose a safer stopping place before calling recovery.",
      "Explain the safe-exit and unsafe-exit responses.",
      "Give useful location information and avoid dangerous retrieval."
    ],
    "sections": [
      {
        "id": "incidents-breakdown-response-section-1",
        "title": "Think about relative safety first",
        "paragraphs": [
          "When a vehicle develops a problem, the first decision is where people and the vehicle will be least exposed to moving traffic. A service area or another place designed for parking is safer than a hard shoulder beside high-speed traffic. If you can continue safely to an exit or service area, do so. If not, move left towards an emergency area or hard shoulder where possible, stop far left with wheels turned left and use hazard lights. Do not continue driving a vehicle that cannot be controlled safely just to reach a preferred stopping place."
        ]
      },
      {
        "id": "incidents-breakdown-response-section-2",
        "title": "Choose the response that is actually safe",
        "paragraphs": [
          "If safe and possible, leave on the side away from traffic and get passengers well away from the vehicle and carriageway, behind a barrier where available. Do not stand where the car could be forced into you. If you cannot reach a place of relative safety and cannot exit safely, remain inside with belts and hazards on and call 999 for the police or use the SOS button. A disability may prevent safe exit even where another person could get out. Explain that situation urgently rather than attempting an unsafe transfer into traffic."
        ]
      },
      {
        "id": "incidents-breakdown-response-section-3",
        "title": "Help rescuers find you without entering danger",
        "paragraphs": [
          "Give the road, direction and location as accurately as possible. Motorway marker posts, driver location signs and an appropriate mapping application can help; quote visible numbers rather than guessing a junction. An emergency telephone can provide assistance, and recovery operators should know if you are a vulnerable motorist. Never place a warning triangle on a motorway or retrieve luggage from a live lane. If an object falls onto a motorway, reach relative safety and call 999. Before leaving an emergency area after recovery, use its telephone and follow the operator's instructions for a safe rejoin."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A suitcase comes off a roof rack onto a motorway lane. Do not run back to collect it, even if it appears close. Stop in a place of relative safety and call the emergency services with the road, direction and best available location details so traffic can be managed safely."
    },
    "takeaways": [
      "Reach relative safety where possible.",
      "If safe exit is impossible, stay belted and call 999.",
      "Do not retrieve objects or put a triangle on a motorway."
    ],
    "questionIds": [
      "course-incidents-001",
      "course-incidents-002",
      "course-incidents-003",
      "course-incidents-004",
      "course-incidents-005",
      "course-incidents-006",
      "course-incidents-007",
      "course-incidents-008"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 275–280",
        "url": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
      }
    ]
  },
  {
    "id": "incidents-collision-duties",
    "moduleId": "module-incidents",
    "title": "At a collision: protect, report and exchange details",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Reduce the risk of a second collision.",
      "Recognise dangerous-goods hazards.",
      "State the duty to stop and provide or report details."
    ],
    "sections": [
      {
        "id": "incidents-collision-duties-section-1",
        "title": "Avoid becoming part of the incident",
        "paragraphs": [
          "Flashing emergency lights may be the first warning of an incident beyond a bend or over a crest. Reduce speed and be ready to stop or change lane safely. Follow police and traffic-officer directions. Workers, debris and stationary vehicles may occupy space that normally carries traffic. When an incident is on the other carriageway, keep attention on your own road rather than slowing unnecessarily to look. That distraction can create another collision or a queue. Treat every approach as a changing scene and preserve enough room to respond."
        ]
      },
      {
        "id": "incidents-collision-duties-section-2",
        "title": "Protect people without adding hazards",
        "paragraphs": [
          "If you are involved or stop to help, use a place of relative safety where possible and warn others with hazard lights. Ask for engines to be switched off and for nobody to smoke. Move uninjured people away from vehicles and moving traffic if that can be done safely. A vehicle marked for dangerous goods may create hazards that are not visible, including flammable material. Keep well away and tell emergency services what markings can be read from a safe place. Do not approach a leaking load or use a mobile phone close to a vehicle carrying flammable goods."
        ]
      },
      {
        "id": "incidents-collision-duties-section-3",
        "title": "Stopping and reporting are separate responsibilities",
        "paragraphs": [
          "After a collision causing injury or damage to another person, vehicle, animal or property, you must stop. Give your own and the vehicle owner's name and address and the vehicle registration to someone with reasonable grounds to request them. If required name and address details are not given at the time, report to police as soon as reasonably practicable and within 24 hours. Where another person is injured and the insurance certificate is not produced as required at the scene, the Code also requires police reporting as soon as possible and within 24 hours, and production of the certificate within seven days."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "After a low-speed collision, both drivers can move safely out of the road and nobody appears injured. Do not simply drive away because the damage is small. Stop, exchange the required details and follow reporting requirements if those details cannot be provided. Remain alert to other traffic while dealing with the situation."
    },
    "takeaways": [
      "Approach incidents cautiously and follow official directions.",
      "Keep clear of dangerous goods and prevent smoking.",
      "Stop, exchange required details and report when required."
    ],
    "questionIds": [
      "course-incidents-009",
      "course-incidents-010",
      "course-incidents-011",
      "course-incidents-012",
      "course-incidents-013",
      "course-incidents-014",
      "course-incidents-015",
      "course-incidents-016"
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 281–287",
        "url": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
      }
    ]
  },
  {
    "id": "incidents-helping-casualties",
    "moduleId": "module-incidents",
    "title": "Helping people while emergency services respond",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Put scene safety before approaching a casualty.",
      "Give clear information to an emergency call handler.",
      "Avoid harmful movement and recognise the limits of this lesson."
    ],
    "sections": [
      {
        "id": "incidents-helping-casualties-section-1",
        "title": "Check danger before giving help",
        "paragraphs": [
          "A person needing help can draw attention away from fast traffic, broken glass, spilled fuel or a vehicle that may move. Check that it is safe to approach, and keep yourself and uninjured people away from the path of traffic. If possible, use other bystanders to help without creating a crowd around the casualty. Have someone call 999 or 112 promptly. Give the exact location, direction of travel and number of vehicles, then describe what is actually observed: for example, someone trapped, heavy bleeding, breathing difficulty or no response when spoken to."
        ]
      },
      {
        "id": "incidents-helping-casualties-section-2",
        "title": "Do not improvise treatment",
        "paragraphs": [
          "Do not normally move an injured person from a vehicle unless there is immediate danger. Do not remove a motorcyclist's helmet unless it is essential and you are trained to do so. Reassure casualties, keep them warm and dry where possible, and do not give food or drink. Stay with them if it is safe, watch for changes and pass those changes to the emergency service. An untrained helper should follow the call handler's instructions, explaining clearly what they can and cannot do rather than guessing at a medical technique."
        ]
      },
      {
        "id": "incidents-helping-casualties-section-3",
        "title": "Use training and professional guidance",
        "paragraphs": [
          "If someone does not respond, tell the emergency call handler immediately and follow their questions and directions about breathing and urgent care. Do not delay calling because you are trying to diagnose an injury yourself. First-aid skills can make a difference, but a short driving lesson is not a replacement for practical first-aid training. The Highway Code's first-aid annex is a general guide and any help at the roadside is temporary until professional care arrives. Keep your own safety under review throughout: a change in traffic or fire risk may change what assistance is possible."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A motorcyclist is injured but the immediate position is safe. A bystander proposes taking off the helmet and giving water. Keep the helmet in place unless essential and appropriately trained, give no food or drink, call for emergency help and follow the call handler's guidance while reassuring the casualty."
    },
    "takeaways": [
      "Check danger, summon help and describe observations clearly.",
      "Avoid unnecessary movement, helmet removal, food or drink.",
      "Follow emergency guidance; seek practical first-aid training."
    ],
    "questionIds": [
      "course-incidents-017",
      "course-incidents-018",
      "course-incidents-019",
      "course-incidents-020",
      "course-incidents-021",
      "course-incidents-022",
      "course-incidents-023",
      "course-incidents-024"
    ],
    "sources": [
      {
        "title": "Highway Code, Rule 283",
        "url": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
      },
      {
        "title": "Highway Code, Annex 7: First aid on the road",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-7-first-aid-on-the-road"
      }
    ]
  }
];
