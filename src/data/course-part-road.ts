import type { CourseLesson } from './course';

// Original instruction; primary sources checked 17 November 2026. Independent editorial approval pending.
export const roadLessons: CourseLesson[] = [
  {
    "id": "lesson-signals-and-lights",
    "moduleId": "module-road-rules",
    "title": "Signals, lights and clear communication",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Give signals that inform without misleading.",
      "Use lights and warnings for their proper purpose."
    ],
    "sections": [
      {
        "id": "lesson-signals-and-lights-section-1",
        "title": "Communicate a plan, not a demand",
        "paragraphs": [
          "Check mirrors and the situation around you before signalling a change of direction or position. Signal early enough to help others, but not so early that a different turn appears intended. If you plan to turn just beyond a side road, an early indicator may persuade someone at that side road to emerge. Cancel the signal after use. A signal explains your intention; it does not give priority or make a manoeuvre safe. Continue observing while the manoeuvre develops."
        ]
      },
      {
        "id": "lesson-signals-and-lights-section-2",
        "title": "Interpret other people cautiously",
        "paragraphs": [
          "Another vehicle’s indicator may have been left on. A headlight flash is a warning of that vehicle’s presence, not a promise that the driver will wait or that every other lane is clear. Never transfer responsibility for a decision to an assumed invitation. You MUST obey traffic lights, signs giving orders and directions from authorised people. Temporary controls at road works deserve the same attention as permanent controls. Wait for a clear view and a safe situation rather than guessing from someone else’s signal."
        ]
      },
      {
        "id": "lesson-signals-and-lights-section-3",
        "title": "Use warnings without creating another hazard",
        "paragraphs": [
          "Use headlights at night when required and avoid dazzling other road users. You MUST use headlights when visibility is seriously reduced; front or rear fog lights may be used in such conditions, but MUST be switched off when visibility improves. Use the horn as a warning of presence, not to express impatience. Hazard lights have specific warning uses: they do not authorise illegal parking or excuse poor lane discipline. Learn the controls while parked so that searching for a switch does not distract you from the road."
        ],
        "imageAssetId": "headlights-example"
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You intend to turn left immediately after a side street. You check behind and delay the indicator until it will no longer suggest the first turn. A driver at the junction flashes headlights. You continue to assess the road yourself rather than assuming the flash guarantees a safe path or changes the traffic lights."
    },
    "takeaways": [
      "Time signals so they are useful and unambiguous.",
      "A flash or indicator is not a guarantee of another person’s action.",
      "Use lights and warnings correctly, including switching fog lights off again."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 103 to 116",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, Rule 226",
        "url": "https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237"
      }
    ],
    "questionIds": [
      "gb-rules-001",
      "gb-rules-002",
      "gb-rules-003",
      "gb-rules-004",
      "gb-rules-005",
      "gb-rules-006",
      "gb-rules-007",
      "gb-rules-008",
      "gb-rules-009"
    ]
  },
  {
    "id": "lesson-speed-space-control",
    "moduleId": "module-road-rules",
    "title": "Choosing speed, space and control",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Distinguish a maximum speed from a safe speed.",
      "Create time to stop and use smooth, effective control."
    ],
    "sections": [
      {
        "id": "lesson-speed-space-control-section-1",
        "title": "Choose a speed for the view",
        "paragraphs": [
          "A speed limit is a maximum, not a target. You MUST NOT exceed the limit for the road or vehicle, but bends, parked cars, pedestrians, weather and restricted views may require much less. For ordinary cars without trailers, national limits are 60 mph on single carriageways and 70 mph on dual carriageways and motorways. Different vehicle types and towing combinations have different limits. Street-lit roads generally have a 30 mph limit in England and Scotland and 20 mph in Wales, unless signs show otherwise."
        ]
      },
      {
        "id": "lesson-speed-space-control-section-2",
        "title": "Make space work for you",
        "paragraphs": [
          "Drive at a speed that allows you to stop within the distance visible to be clear. On high-speed roads in dry conditions, the Highway Code advises at least a two-second following gap. Choose a fixed roadside point and compare when each vehicle passes it. Wet conditions require at least double the normal gap; poor grip or visibility may need considerably more. A larger gap also improves the view beyond a tall vehicle. If someone follows you too closely, increase space ahead so you can slow progressively rather than retaliating."
        ],
        "imageAssetId": "following-gap"
      },
      {
        "id": "lesson-speed-space-control-section-3",
        "title": "Keep control while slowing",
        "paragraphs": [
          "Look well ahead and brake in good time with smooth inputs for ordinary slowing. An emergency may require immediate firm braking. With ABS, follow the handbook; the usual emergency advice is firm footbrake pressure held until sufficiently slowed, not pumping the pedal. ABS helps steering control but does not guarantee a shorter stop. Avoid coasting in neutral or with the clutch held down, because it removes engine braking and can reduce control. Harsh steering, braking or acceleration can exceed available grip and cause a skid."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "On a dark road with a national limit, your headlights reveal a bend well before its exit becomes visible. You slow below the limit so you can stop within your clear view. Rain begins, so you increase the gap to the car ahead. You keep a suitable gear rather than coasting downhill toward the bend."
    },
    "takeaways": [
      "Use the lower of the legal maximum and the speed conditions allow.",
      "Measure a useful time gap and increase it when conditions worsen.",
      "Smooth ordinary control and effective emergency braking are different skills."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 117 to 126",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      }
    ],
    "questionIds": [
      "gb-rules-010",
      "gb-rules-011",
      "gb-rules-012",
      "gb-rules-013",
      "gb-rules-014",
      "course-handling-001",
      "course-handling-003",
      "course-handling-004",
      "course-handling-005",
      "course-handling-006",
      "course-handling-007",
      "course-handling-008"
    ]
  },
  {
    "id": "lesson-markings-road-layout",
    "moduleId": "module-road-rules",
    "title": "Reading markings and the road layout",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Use lines, studs and physical layout as early information.",
      "Check the road type without relying on lane count or navigation."
    ],
    "sections": [
      {
        "id": "lesson-markings-road-layout-section-1",
        "title": "Read the road before reaching a hazard",
        "paragraphs": [
          "Painted lines and lane arrows help explain the road ahead, often before the hazard itself is visible. A broken centre line whose markings grow longer and gaps shorter warns of a hazard ahead. Start checking your speed, view and position instead of treating it as decoration. Lane arrows and destination markings help you choose a lane early. Do not make a sudden move simply because a navigation instruction arrived late; a missed turn is safer to correct by a new route."
        ]
      },
      {
        "id": "lesson-markings-road-layout-section-2",
        "title": "Understand separation and restrictions",
        "paragraphs": [
          "A dual carriageway has a central reservation separating opposing traffic; two lanes in each direction without that separation are not enough to make it one. This matters when interpreting national limits, but the maximum still depends on the vehicle and any lower signs. Different centre-line arrangements carry different overtaking and crossing restrictions. Read them together with signs and your view rather than assuming that every long straight road permits a pass. Never use a clear marking as a substitute for checking people and traffic."
        ]
      },
      {
        "id": "lesson-markings-road-layout-section-3",
        "title": "Use night-time clues carefully",
        "paragraphs": [
          "Reflective studs help show the road’s shape and boundaries in darkness. Amber studs mark the central-reservation edge of a motorway or dual carriageway. Other colours identify different edges and lane features; learn their meaning rather than following the lights of the vehicle ahead. Wet surfaces, glare and road works may make markings harder to interpret. Reduce speed when information is unclear, follow temporary layouts and keep a stopping margin. A familiar route can change, so continue looking for current signs and markings on every journey."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "An unfamiliar road has two lanes each way but no central reservation. You do not assume it has the same national limit as a dual carriageway. Farther ahead, longer broken centre markings warn of a hazard. You ease speed and inspect the view before considering any lane change, despite the sat nav asking for a turn."
    },
    "takeaways": [
      "Read markings as early clues to hazards and lane choice.",
      "A central reservation, not lane count, defines a dual carriageway.",
      "Use studs and markings alongside signs, visibility and observation."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 127 to 143",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, Rule 124",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      }
    ],
    "questionIds": [
      "gb-rules-015",
      "gb-rules-016",
      "course-handling-002",
      "sign-recognition-006",
      "gb-signs-001"
    ]
  },
  {
    "id": "lesson-sign-language",
    "moduleId": "module-signs",
    "title": "The language of traffic signs",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Recognise the main sign families before reading their detail.",
      "Connect shape, colour and symbol with the required driving decision."
    ],
    "sections": [
      {
        "id": "lesson-sign-language-section-1",
        "title": "Start with the sign family",
        "paragraphs": [
          "Traffic signs use a visual language so that a driver can recognise a function quickly. Circles usually give orders, upright triangles usually warn and rectangles usually provide information. Colour adds meaning: a red ring normally restricts an action, while a blue circle generally gives a positive instruction or identifies a route for particular road users. These are useful starting clues, not a licence to guess an unfamiliar symbol. Look at the whole sign, including any text or additional plate, before deciding what it means."
        ],
        "imageAssetId": "dft-red-ring"
      },
      {
        "id": "lesson-sign-language-section-2",
        "title": "Learn the important exceptions",
        "paragraphs": [
          "The eight-sided STOP sign and the inverted GIVE WAY triangle stand out from the usual families. Their shapes help recognition even before lettering is read. A red-bordered speed sign states a maximum, while the national-speed-limit sign directs you to the limit for that road and vehicle class; it is not one universal number. A blue circular arrow differs from a triangular warning showing a bend: one gives an instruction, while the other alerts you to a change or danger ahead."
        ]
      },
      {
        "id": "lesson-sign-language-section-3",
        "title": "Turn recognition into a safe action",
        "paragraphs": [
          "Reading a sign correctly is only the first step. Ask what it requires you to change: stop, give way, choose a permitted route, reduce speed for a hazard or plan an exit. You MUST obey signs giving orders. Warnings and information still need an appropriate response, even though their purpose differs. A sign does not remove the need to observe people, traffic and surface conditions. Practise recognising the symbol and explaining the action in your own words, rather than remembering only a colour or an answer letter."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You see an upright red triangle before a bend and later a blue circle with a left arrow on a traffic island. For the first, you inspect the bend and adjust speed to the conditions. For the second, you plan to pass the island on the instructed side. Recognising the families prevents you treating both arrows as the same type of message."
    },
    "takeaways": [
      "Use shape and colour as clues, then read the symbol and plates.",
      "Learn STOP and GIVE WAY as distinctive exceptions.",
      "Explain the driving action, not just the sign’s name."
    ],
    "sources": [
      {
        "title": "DfT Know Your Traffic Signs: The signing system",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system"
      },
      {
        "title": "Highway Code, Rule 109",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      }
    ],
    "questionIds": [
      "signs-001",
      "gb-signs-004",
      "gb-signs-016",
      "sign-recognition-003"
    ]
  },
  {
    "id": "lesson-orders-and-limits",
    "moduleId": "module-signs",
    "title": "Orders, restrictions and speed limits",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Apply common regulatory signs without confusing similar symbols.",
      "Check restrictions against the vehicle, route and additional plates."
    ],
    "sections": [
      {
        "id": "lesson-orders-and-limits-section-1",
        "title": "Read exactly what is restricted",
        "paragraphs": [
          "Red-bordered signs can prohibit entry, a turn, overtaking or a class of vehicle. The familiar No entry sign has a horizontal white bar on red; the car-and-motorcycle symbol means No motor vehicles. Do not substitute one meaning for the other just because both prevent some traffic proceeding. Supplementary plates may define times, exceptions or other details. Read them when deciding whether a restriction applies to you, and choose a safe alternative if the road is not available."
        ],
        "imageAssetId": "dft-no-entry"
      },
      {
        "id": "lesson-orders-and-limits-section-2",
        "title": "Respect instructions and limits",
        "paragraphs": [
          "A blue circular arrow may require a direction or the side on which to pass an obstruction. STOP requires a complete stop before crossing the stop line, followed by a proper check before entering the major road. GIVE WAY requires priority to traffic on the major road; stop if that is necessary to give way safely. Height, width and weight restrictions must be considered before reaching a narrowing or bridge. Know the relevant dimensions and limits of the vehicle and load rather than relying on the vehicle ahead."
        ]
      },
      {
        "id": "lesson-orders-and-limits-section-3",
        "title": "Keep maximum and suitable speed separate",
        "paragraphs": [
          "A red-ring speed sign sets a maximum in miles per hour, if it is safe to travel that fast. Larger terminal signs mark a change; smaller repeaters may remind you of a limit where provided. A 20 mph zone can include traffic-calming features, so continue looking for road humps, pedestrians and narrowings. A national-limit sign means the appropriate limit for your vehicle and road type. Even with no other traffic visible, a signed maximum does not promise that the next bend or weather condition is safe at that speed."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You approach an unfamiliar street and notice a red restriction sign with a supplementary plate. Instead of following a van through, you check whether your own vehicle is permitted and use another route if not. At a later STOP sign you stop at the line, check both the main road and the area you will enter, and move only when safe."
    },
    "takeaways": [
      "Similar shapes can carry different restrictions.",
      "Read plates and know the relevant vehicle or load limits.",
      "Obey maximum speeds and choose a lower speed when needed."
    ],
    "sources": [
      {
        "title": "DfT Know Your Traffic Signs: Regulatory signs",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
      },
      {
        "title": "DfT Know Your Traffic Signs: Speed limit signs",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs"
      },
      {
        "title": "Highway Code, Rule 171",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      }
    ],
    "questionIds": [
      "gb-signs-001",
      "gb-signs-002",
      "gb-signs-003",
      "gb-signs-004",
      "gb-signs-005",
      "gb-signs-006",
      "gb-signs-007",
      "gb-signs-008",
      "gb-signs-009",
      "sign-recognition-001",
      "sign-recognition-002",
      "sign-recognition-003",
      "sign-recognition-004",
      "sign-recognition-005",
      "sign-recognition-006",
      "sign-recognition-007"
    ]
  },
  {
    "id": "lesson-warnings-and-directions",
    "moduleId": "module-signs",
    "title": "Warnings, information and route planning",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Use warning signs to plan before reaching the hazard.",
      "Read direction information early without making sudden manoeuvres."
    ],
    "sections": [
      {
        "id": "lesson-warnings-and-directions-section-1",
        "title": "Prepare for the hazard ahead",
        "paragraphs": [
          "An upright red-bordered triangle warns rather than grants priority. Its symbol tells you what to look for: a bend, narrowing, junction, pedestrian activity, slippery surface or another feature. Reduce speed and choose a position that leaves time and room to respond. A bend symbol does not tell you an exact safe speed or guarantee a clear road beyond it. A steep-descent warning is a cue to plan speed and a suitable gear early, not to wait until the car is gathering speed downhill."
        ],
        "imageAssetId": "dft-bend-right"
      },
      {
        "id": "lesson-warnings-and-directions-section-2",
        "title": "Read the supporting information",
        "paragraphs": [
          "A plate can show distance to a hazard or explain the warning. A junction diagram may indicate the road arrangement, but it cannot show every road user arriving now. A crossing warning asks you to search for people and prepare to stop; it is different from the traffic control at the crossing itself. Pay attention to signs for level crossings and water or quay edges. If information is unclear, slow sufficiently to investigate from safety rather than committing to a manoeuvre you cannot complete."
        ]
      },
      {
        "id": "lesson-warnings-and-directions-section-3",
        "title": "Plan the route without being trapped by it",
        "paragraphs": [
          "Direction-sign backgrounds help identify the route network: motorway direction signs use blue, primary-route directions green and non-primary directions white. Other information signs have their own purposes, including parking, a no-through road or a change in road layout. Read destinations and lane information early, then use mirrors and signals for any necessary move. A sign or sat nav may help choose the route, but neither justifies a sharp cut across another lane. If you miss the turn, continue safely and find another route."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A warning sign shows a double bend before a direction sign for your destination. You slow for the limited view and read the lane information early. A following vehicle occupies the lane you would need, so you continue on the safe route instead of cutting across it. The direction sign helps planning; it does not make your chosen exit compulsory at any cost."
    },
    "takeaways": [
      "Warnings are cues for observation and early adjustment.",
      "Read plates and assess the actual hazard, not only the picture.",
      "Missing a turn is preferable to a sudden unsafe lane change."
    ],
    "sources": [
      {
        "title": "DfT Know Your Traffic Signs: Warning signs",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
      },
      {
        "title": "DfT Know Your Traffic Signs: The signing system",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/the-signing-system"
      },
      {
        "title": "DfT Know Your Traffic Signs: Information signs",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/information-signs"
      }
    ],
    "questionIds": [
      "gb-signs-010",
      "gb-signs-011",
      "gb-signs-012",
      "gb-signs-013",
      "gb-signs-014",
      "gb-signs-015",
      "gb-signs-016",
      "sign-recognition-008"
    ]
  },
  {
    "id": "lesson-junction-priority",
    "moduleId": "module-junctions",
    "title": "Approaching junctions and giving way",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Identify the control and make a safe observation plan.",
      "Choose a gap that fits the whole manoeuvre and vehicle."
    ],
    "sections": [
      {
        "id": "lesson-junction-priority-section-1",
        "title": "Prepare before the line",
        "paragraphs": [
          "Read signs and markings early, check mirrors and adjust speed so you can assess the junction without rushing. Look for pedestrians, cyclists and motorcycles as well as larger vehicles. Buildings, hedges, parked cars and a large turning vehicle can hide another road user. An indicator on an approaching car may be incorrect or left on. Wait until the situation is genuinely clear rather than treating the signal, a headlight flash or another person’s wave as permission to emerge."
        ]
      },
      {
        "id": "lesson-junction-priority-section-2",
        "title": "Respect STOP and GIVE WAY",
        "paragraphs": [
          "At a STOP sign with its solid stop line, you MUST come to a complete stop before crossing the line. Then check carefully and move only when the way is clear. At a Give Way line you MUST give way to traffic on the major road; stopping may be needed, but the sign does not itself demand a fixed pause of a particular number of seconds. A large vehicle turning into your road may need extra space. Keep back and wait rather than trying to squeeze alongside its turning path."
        ],
        "imageAssetId": "stop-example"
      },
      {
        "id": "lesson-junction-priority-section-3",
        "title": "Check the space beyond the first gap",
        "paragraphs": [
          "A safe gap must last long enough for your whole vehicle to complete the move without forcing another road user to alter course or speed. When crossing or turning right at a dual carriageway, assess the central reservation. If it is wide enough to hold the entire vehicle safely, the manoeuvre may be treated in stages. If it cannot hold the whole vehicle, wait for a safe opportunity to complete the full crossing. Include the length of any trailer, not merely the car, when assessing the space."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You intend to emerge from a side road while a lorry turns into it. The lorry blocks your view of a motorcycle beyond it and uses much of the entrance. You stay behind the line until it has passed and your view is clear. You then select a gap for the whole manoeuvre instead of following the lorry’s signal."
    },
    "takeaways": [
      "Stop fully where required and give way to the main-road traffic.",
      "Look for people hidden by vehicles or the roadside.",
      "Assess a central reservation against the whole vehicle’s length."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 170 to 173",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "DfT Know Your Traffic Signs: Regulatory signs",
        "url": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
      }
    ],
    "questionIds": [
      "junction-001",
      "gb-junction-001",
      "gb-junction-002",
      "gb-junction-003",
      "gb-junction-004",
      "gb-junction-005"
    ]
  },
  {
    "id": "lesson-turning-and-people",
    "moduleId": "module-junctions",
    "title": "Turning while protecting other road users",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Plan position, observation and signals before a turn.",
      "Give pedestrians and cyclists the room and priority they need."
    ],
    "sections": [
      {
        "id": "lesson-turning-and-people-section-1",
        "title": "Plan the path before turning",
        "paragraphs": [
          "Use mirrors, a clear signal and an appropriate position so others can understand your intention. A right turn from an ordinary two-way road normally starts near the centre of the road without cutting the corner. A left turn should not sweep across someone travelling alongside. Slow enough to make the final observations properly, and check the road you will enter as well as the road you are leaving. Signalling does not remove the responsibility to make a safe turn."
        ]
      },
      {
        "id": "lesson-turning-and-people-section-2",
        "title": "Look where someone could be hidden",
        "paragraphs": [
          "Cyclists and motorcyclists may approach alongside slow traffic or be obscured by another vehicle. Look for them again before completing a right turn. Do not turn across a cyclist going straight ahead if that would make the cyclist stop or swerve. A cycle track can carry cyclists approaching from either direction, so check both ways before crossing it. Avoid overtaking a cyclist just before a left turn and then cutting across their route. Leave space and wait behind instead when necessary."
        ]
      },
      {
        "id": "lesson-turning-and-people-section-3",
        "title": "Include pedestrians in the decision",
        "paragraphs": [
          "At a junction, you should give way to pedestrians crossing or waiting to cross the road into or from which you are turning. This includes the entrance or exit of the road, not only a marked pedestrian crossing. Slow sufficiently to recognise people waiting near the kerb and allow time for older or disabled people to cross. Do not hurry them with the vehicle or a horn. Priority is guidance for preventing conflict, not a reason to force your way through an unsafe situation."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You signal left into a side street. A cyclist continues straight along the road on your left, and a pedestrian waits at the side street’s mouth. You remain behind the cyclist rather than overtaking and cutting across. You give the pedestrian time to cross and turn only after checking that both the route and the receiving road are clear."
    },
    "takeaways": [
      "Observe both roads and the full path of the turn.",
      "Do not cut across a cyclist continuing ahead.",
      "Give way to pedestrians crossing or waiting at the junction."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 170, 179 to 183",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code, Rules 206 and 211",
        "url": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
      }
    ],
    "questionIds": [
      "junction-002",
      "gb-junction-013",
      "gb-junction-014",
      "gb-junction-015"
    ]
  },
  {
    "id": "lesson-lights-and-boxes",
    "moduleId": "module-junctions",
    "title": "Traffic lights, box junctions and waiting areas",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Respond to lights without entering a space you cannot clear.",
      "Apply the box-junction exception accurately."
    ],
    "sections": [
      {
        "id": "lesson-lights-and-boxes-section-1",
        "title": "Understand the traffic signal",
        "paragraphs": [
          "You MUST stop at red. Amber also means stop unless you have already crossed the stop line or are so close that stopping might cause a collision. Do not accelerate merely to beat a changing light. A green signal means you may proceed if the way is clear; it does not authorise blocking the junction or taking priority over someone still crossing. A green filter arrow permits the indicated direction when appropriate, while you continue to check the path and other road users."
        ]
      },
      {
        "id": "lesson-lights-and-boxes-section-2",
        "title": "Check the exit before entering",
        "paragraphs": [
          "You MUST NOT enter a yellow box junction until your exit road or lane is clear. There is a specific exception when turning right and prevented only by oncoming traffic or other vehicles waiting to turn right. Do not stretch that exception to cover a stationary queue blocking the road you want to enter. Look beyond the first car and allow room for your whole vehicle. A following driver’s impatience or a green light does not make a blocked exit acceptable."
        ],
        "imageAssetId": "box-junction-example"
      },
      {
        "id": "lesson-lights-and-boxes-section-3",
        "title": "Respect waiting areas and uncertainty",
        "paragraphs": [
          "At lights with an advanced cyclist waiting area, a driver must normally stop at the first stop line and leave the marked area for cyclists. Do not use it to gain a better position in the queue. Keep watching for people on both sides of the road as the signal changes. If traffic lights fail, treat the junction with great caution, assess the other traffic and proceed only when safe. Do not assume that your usual green phase or main-road status makes the failed signals harmless."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "Your signal turns green, but the queue beyond the yellow box has not moved far enough to fit your car. You wait before the box. Later, when turning right, the exit is clear but oncoming vehicles prevent completion; that is the different situation covered by the right-turn exception. You keep checking pedestrians and cyclists while waiting."
    },
    "takeaways": [
      "Green does not mean enter a blocked junction.",
      "Use the right-turn box exception only in its stated situation.",
      "Leave cyclist waiting areas clear and treat failed signals cautiously."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 174 to 178",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code, Rule 109",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      }
    ],
    "questionIds": [
      "gb-junction-006",
      "gb-junction-007",
      "gb-junction-008",
      "gb-junction-009",
      "gb-junction-010",
      "gb-junction-011",
      "gb-junction-012"
    ]
  }
];

