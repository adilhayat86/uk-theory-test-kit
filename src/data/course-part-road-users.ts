import type { CourseLesson } from './course';

// Original teaching prose; primary Highway Code sources checked 17 November 2026.
export const roadUserLessons: CourseLesson[] = [
  {
    "id": "roundabout-approach",
    "moduleId": "module-roundabouts",
    "title": "Approaching a roundabout with a plan",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Choose an approach lane from signs and markings.",
      "Distinguish the usual priority rule from a controlled entry.",
      "Check the vehicle ahead before moving."
    ],
    "sections": [
      {
        "id": "read-the-layout",
        "title": "Read the layout before the give-way line",
        "paragraphs": [
          "A roundabout is a sequence of decisions, not a single glance to the right. First identify your exit, then read the approach signs, lane arrows and any signals. Choose your lane early enough to avoid a last-second swerve. If local markings differ from a familiar layout, use the information at this junction rather than a memorised lane rule. A navigation instruction helps you choose a destination; it does not override road markings.",
          "Use your mirrors before changing speed or position. Reduce speed to give yourself time to assess the entry and select a suitable gear. Your approach should leave you able to stop smoothly when there is no safe opportunity to join. A vehicle behind you does not make a doubtful gap suitable."
        ],
        "imageAssetId": "dft-roundabout"
      },
      {
        "id": "assess-the-entry",
        "title": "Check the entry and the traffic around it",
        "paragraphs": [
          "At an ordinary entry, give priority to traffic approaching from the right unless signs, markings or traffic lights direct otherwise. Observe vehicles already circulating, including ones with unclear signals. An indicator is a useful clue, but compare it with the vehicle’s position and movement. Do not enter simply because a driver appears to be signalling to leave.",
          "Keep alternating your view between the circulating traffic and the space immediately ahead. The driver in front may begin to move and then stop. If you keep looking right while your own car rolls forward, you can run into that vehicle even though you correctly identified a gap."
        ]
      },
      {
        "id": "first-exit",
        "title": "Use clear signals for the first exit",
        "paragraphs": [
          "For the first exit to the left, the usual approach is the left-hand lane with a left signal, unless signs or markings specify another arrangement. Keep an appropriate left position as you circulate and continue the signal to leave. Signal timing should help others understand your actual route, not suggest you are turning into an earlier entrance."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "You are behind a car at a small roundabout. It rolls forward while you look right, but you then see its brake lights. Keep your own car stopped and reassess both views. When the space ahead is clear and a suitable entry opportunity exists, make a final forward check before moving. The apparent gap on the roundabout was only one part of the decision."
    },
    "takeaways": [
      "Read the exit, lane guidance and controls early.",
      "Judge movements as well as indicators.",
      "A final forward check prevents a common queue collision."
    ],
    "sources": [
      {
        "title": "Highway Code: roundabouts, Rules 184–186",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      }
    ],
    "questionIds": [
      "roundabout-001",
      "roundabout-002",
      "gb-roundabout-001",
      "gb-roundabout-002",
      "gb-roundabout-003",
      "gb-roundabout-004",
      "gb-roundabout-005",
      "gb-roundabout-006"
    ]
  },
  {
    "id": "roundabout-circulation",
    "moduleId": "module-roundabouts",
    "title": "Circulating, leaving and sharing the roundabout",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Time exit signals and lane changes safely.",
      "Allow for cyclists, horses and long vehicles.",
      "Apply the normal approach to mini-roundabouts."
    ],
    "sections": [
      {
        "id": "prepare-your-exit",
        "title": "Prepare to leave without cutting across someone",
        "paragraphs": [
          "For an exit to the right, or a full circuit, the usual approach is a right signal and the right-hand lane unless local guidance says otherwise. Keep that position until you need to change lanes for your exit. For an intermediate exit, choose the appropriate approach lane and normally give no approach signal. In both cases, signal left after passing the exit before yours.",
          "A left signal does not create a clear route across another lane. Check mirrors and the area beside you before changing course. Follow the road’s lane guidance and leave only when you can do so safely. If a planned move would force another road user to brake or swerve, continue safely and find another route rather than forcing the exit."
        ]
      },
      {
        "id": "allow-for-other-paths",
        "title": "Expect other road users to take different paths",
        "paragraphs": [
          "Cyclists, horse riders and horse-drawn vehicles may remain in the left-hand lane while continuing around the roundabout. Do not assume that their lane position means they will take the next exit. Give cyclists priority, allow room for their route and do not overtake them within their lane. A right signal from a rider may indicate that they are continuing around.",
          "Long vehicles can need more than one lane to negotiate the curve. Stay out of the narrowing space beside them. Also check the approach and exit roads for people crossing. Give way to people crossing the exit road, and be ready to stop rather than concentrating only on circulating vehicles."
        ]
      },
      {
        "id": "mini-roundabouts",
        "title": "Treat each mini-roundabout as its own decision",
        "paragraphs": [
          "A painted central circle is still a roundabout. Most vehicles must pass around its markings; the exception is a large vehicle physically unable to do so. Space is limited, so plan early and avoid a U-turn. At a pair or series of mini-roundabouts, reassess priority and traffic separately at each one. Getting through the first does not settle the second."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "You intend to leave at the third exit. A cyclist in the left lane continues beyond the second exit while a lorry occupies extra space ahead. Do not squeeze between them or turn across the cyclist. Keep a safe position, observe their movements, and leave only when your path is clear. Follow the lane guidance and take a safe alternative route if that exit cannot be taken without a conflict."
    },
    "takeaways": [
      "Check the lane beside you before leaving.",
      "Left-lane riders may be continuing around.",
      "Reassess every mini-roundabout separately."
    ],
    "sources": [
      {
        "title": "Highway Code: roundabouts, Rules 186–190",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code: pedestrian priority, Rule H2",
        "url": "https://www.gov.uk/guidance/the-highway-code/introduction"
      }
    ],
    "questionIds": [
      "gb-roundabout-007",
      "gb-roundabout-008",
      "gb-roundabout-009",
      "gb-roundabout-010",
      "gb-roundabout-011",
      "gb-roundabout-012",
      "gb-roundabout-013",
      "gb-roundabout-014",
      "gb-roundabout-015"
    ]
  },
  {
    "id": "overtaking-decisions",
    "moduleId": "module-overtaking",
    "title": "Deciding whether an overtake is worth starting",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Check the complete route past a slower vehicle.",
      "Recognise locations where an overtake is unsafe or prohibited.",
      "Respond safely when another driver passes you."
    ],
    "sections": [
      {
        "id": "look-for-the-whole-route",
        "title": "Plan the complete manoeuvre",
        "paragraphs": [
          "Before an overtake, identify both the space for moving out and the space for returning. You need enough clear road ahead, a suitable gap beyond the vehicle you will pass, and a check that someone behind is not already overtaking you. Use mirrors and any necessary blind-spot observation before moving. An empty patch beside your car is not proof that the whole manoeuvre can be completed.",
          "Following a lorry too closely reduces your view and makes the decision harder. Increase your separation so that you can see more of the road ahead. Remember that a long vehicle takes more time and distance to pass. Another car’s successful overtake does not reserve a second opportunity for you."
        ]
      },
      {
        "id": "recognise-a-no",
        "title": "Recognise a clear reason to wait",
        "paragraphs": [
          "Do not attempt an overtake when a bend, hill crest or other obstruction prevents a clear assessment of the road ahead. A narrowing road or a nearby junction can create a conflict before you have returned safely. Where a no-overtaking sign applies, do not overtake until the restriction is cancelled. Observe the relevant road markings too. A straight stretch alone is not permission to disregard them.",
          "When a parked vehicle or another obstruction is on your side, give way to approaching traffic before moving around it. Waiting behind the obstruction can be the complete, correct plan. Avoid committing yourself to a position that depends on the oncoming driver rescuing the situation."
        ],
        "imageAssetId": "dft-no-overtaking"
      },
      {
        "id": "cooperate-with-a-pass",
        "title": "Make room for other people’s decisions",
        "paragraphs": [
          "When someone overtakes you, keep a steady course and do not accelerate to compete. If they move into your following space, rebuild a safe gap without an aggressive response. Drivers of slow vehicles should consider a safe opportunity to let a queue pass, rather than holding traffic unnecessarily. Cooperation does not require a sudden stop or an unsafe pull-in."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "A car ahead pulls out to pass a tractor near the brow of a hill. From your position you cannot see a return gap beyond the tractor. Stay back instead of following the car out. It may use the only available space, meet approaching traffic or abandon its own attempt. Your independent view must justify your manoeuvre; its movement cannot do that for you."
    },
    "takeaways": [
      "Check the road ahead, behind and beyond the slower vehicle.",
      "An uncertain view is a reason to wait.",
      "Never turn another driver’s overtake into a race."
    ],
    "sources": [
      {
        "title": "Highway Code: overtaking, Rules 162–169",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      }
    ],
    "questionIds": [
      "overtaking-001",
      "overtaking-002",
      "gb-overtaking-001",
      "gb-overtaking-002",
      "gb-overtaking-006",
      "gb-overtaking-007",
      "gb-overtaking-008",
      "gb-overtaking-010",
      "gb-overtaking-011",
      "gb-overtaking-012",
      "gb-overtaking-014",
      "gb-overtaking-015"
    ]
  },
  {
    "id": "overtaking-vulnerable-users",
    "moduleId": "module-overtaking",
    "title": "Giving people enough room when you pass",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Use the Highway Code clearance guidance.",
      "Explain when to wait instead of passing.",
      "Avoid passing conflicts at turns and crossings."
    ],
    "sections": [
      {
        "id": "space-is-part-of-the-manoeuvre",
        "title": "Plan speed and sideways clearance together",
        "paragraphs": [
          "A person on a cycle or horse, or walking in the carriageway, has little protection if a vehicle passes too closely. Treat the space beside them as part of your overtaking plan. At speeds up to 30 mph, the Highway Code gives at least 1.5 metres as guidance for passing a cyclist; allow more room at higher speeds. That distance is not a target that makes every pass safe in every condition.",
          "Pass a horse rider or horse-drawn vehicle below 10 mph, allowing at least 2 metres. For someone walking in the road, keep your speed low and allow at least 2 metres. Allow extra space in bad weather or darkness. If the road and approaching traffic do not let you provide suitable clearance, wait behind. Do not turn the guidance into an excuse to force a gap."
        ]
      },
      {
        "id": "read-the-persons-route",
        "title": "Understand why a rider may change position",
        "paragraphs": [
          "A cyclist may use the centre of a narrow lane or move out to avoid a drain, pothole or parked vehicle. Riding two abreast can help a group’s safety and visibility. A shoulder check may be an early clue that a rider intends to change direction. Leave time for that movement rather than accelerating into the space they need.",
          "Before turning left, do not overtake a cyclist travelling straight ahead and then cut across them. The delay you avoid would come at the cost of a serious conflict. Likewise, do not pass the nearest vehicle stopped to let someone use a pedestrian crossing: the person may be hidden in front of it."
        ],
        "caseStudyId": "case-cyclist-oncoming"
      },
      {
        "id": "finish-with-patience",
        "title": "Complete the pass without another conflict",
        "paragraphs": [
          "When an opportunity becomes suitable, make the manoeuvre deliberately and within the speed limit. Return to your normal road position only after there is enough separation from the person you passed. Avoid sharp steering or acceleration near a horse, and be ready to wait longer if the rider signals for you to slow down or stop."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "You follow a cyclist past parked cars while a vehicle approaches from the opposite direction. There is not enough road width for your car to pass with suitable clearance. Hold back at a safe following distance. When the oncoming vehicle has passed, reassess the complete route and the cyclist’s position. Waiting has created a safer opportunity; it has not made an immediate overtake compulsory."
    },
    "takeaways": [
      "Clearance and low speed both matter.",
      "Wait when there is not enough room.",
      "Never pass a cyclist merely to turn across their route."
    ],
    "sources": [
      {
        "title": "Highway Code: passing clearances and restrictions, Rules 163–165",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code: cyclists and horses, Rules 211–215",
        "url": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
      }
    ],
    "questionIds": [
      "gb-overtaking-003",
      "gb-overtaking-004",
      "gb-overtaking-005",
      "gb-overtaking-009",
      "gb-overtaking-013"
    ]
  },
  {
    "id": "crossings-zebra-parallel",
    "moduleId": "module-crossings",
    "title": "Reading zebra and parallel crossings",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Identify the responsibilities for waiting and crossing users.",
      "Keep crossing approaches and the crossing itself clear.",
      "Explain why a wave is not a safe invitation."
    ],
    "sections": [
      {
        "id": "find-the-people-not-just-the-stripes",
        "title": "Look for people on both sides",
        "paragraphs": [
          "A crossing is a place where someone’s route may intersect yours within seconds. Scan the pavement on both sides as well as the stripes ahead. Reduce speed early enough to stop smoothly. A parked van, a queue or darkness may conceal someone approaching the crossing. Treat a blocked view as a reason for extra care, not as evidence that no one is there.",
          "The zig-zag area helps protect visibility around the crossing. You must not park on the crossing or within its zig-zag markings. You must not overtake the moving vehicle nearest the crossing, or the nearest vehicle stopped to give way. Passing it can put you directly into the path of a person you could not previously see."
        ],
        "imageAssetId": "zebra-crossing"
      },
      {
        "id": "know-when-to-yield",
        "title": "Distinguish waiting from crossing",
        "paragraphs": [
          "At a zebra crossing you should give way to a person waiting to cross; once a pedestrian has entered the crossing, giving way is a legal requirement. A parallel crossing adds a cycle route alongside the pedestrian stripes. Apply the corresponding waiting and crossing responsibilities to both pedestrians and cyclists there.",
          "Your own stopped car does not make the opposite lane safe. Do not wave, flash headlights or sound the horn to invite someone across. They must assess the whole road, including vehicles you may not see. Let an older or disabled person finish at their own pace, without edging towards them."
        ],
        "caseStudyId": "case-zebra-crossing"
      },
      {
        "id": "leave-an-exit",
        "title": "Leave a usable path through the crossing",
        "paragraphs": [
          "In a queue, wait before the crossing unless you can clear it completely. Stopping across it forces people into an awkward route between vehicles. A zebra or parallel crossing divided by a central island is treated as two crossings. This does not remove the need to observe people approaching either part, and it must not be confused with the different rule for a straight-through pelican crossing."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "A delivery van partly hides the far end of a zebra crossing. The car ahead stops, but you cannot yet see why. Stay behind it and prepare to stop rather than using the empty lane to pass. A pedestrian then appears from in front of the van. After that person finishes, check both approaches again before moving; another person may already be about to use the crossing."
    },
    "takeaways": [
      "Look beyond the crossing surface to both pavements.",
      "Do not overtake a vehicle nearest a crossing.",
      "Leave crossing space clear in queues."
    ],
    "sources": [
      {
        "title": "Highway Code: pedestrian crossings, Rules 191–195",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code: waiting and crossing priority, Rule H2",
        "url": "https://www.gov.uk/guidance/the-highway-code/introduction"
      }
    ],
    "questionIds": [
      "rules-001",
      "crossings-001",
      "gb-crossings-001",
      "gb-crossings-002",
      "gb-crossings-003",
      "gb-crossings-004",
      "gb-crossings-005",
      "gb-crossings-006",
      "gb-crossings-007",
      "gb-crossings-008",
      "gb-crossings-009",
      "gb-crossings-010"
    ]
  },
  {
    "id": "crossings-signals",
    "moduleId": "module-crossings",
    "title": "Understanding signals and central islands",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Apply the pelican flashing-amber rule correctly.",
      "Give way to anyone still crossing when your light changes.",
      "Recognise crossing types with different signal sequences."
    ],
    "sections": [
      {
        "id": "a-signal-is-not-the-whole-view",
        "title": "Observe people as well as the light",
        "paragraphs": [
          "At a signal-controlled crossing, read the vehicle signal and the physical situation together. Red requires you to stop at the line. A green signal permits movement only when the route is clear; it is not an instruction to drive at someone still crossing. Keep checking the full crossing area before releasing the brake and moving.",
          "The first vehicle in a queue has a particularly important final observation to make. Drivers behind may be responding to its movement rather than seeing the pedestrian for themselves. Move off deliberately after the crossing is clear, rather than letting pressure from behind decide when you start."
        ]
      },
      {
        "id": "know-the-flashing-amber-exception",
        "title": "Use flashing amber only where it exists",
        "paragraphs": [
          "A pelican crossing has a flashing-amber stage after red. During flashing amber, you must give way to any pedestrian still on the crossing. If no one remains on it, you may proceed cautiously. The permission is conditional on what you can actually see. A person screened by another vehicle has not become safe to ignore.",
          "Puffin, toucan and equestrian crossings do not use that flashing-amber stage. Their vehicle lights follow the ordinary traffic-light sequence. A toucan accommodates people cycling as well as walking, so watch for both. Avoid making decisions from the crossing’s nickname alone; follow its actual signals and markings."
        ]
      },
      {
        "id": "understand-the-island",
        "title": "Check whether the island divides the crossing",
        "paragraphs": [
          "A pelican crossing that runs straight across the road is one crossing even when it has a central island. You must wait for pedestrians coming from its other side. This differs from a zebra crossing split by an island. At every crossing, give way to someone still crossing after your signal becomes green. If signals are not working, approach with extreme caution, and do not enter unless you can clear the crossing completely."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "At a straight-through pelican crossing, your signal begins flashing amber. A person has reached the island from the opposite side and continues across. Remain stopped: the island has not created a separate crossing that lets you move first. When that person has finished and you can see the crossing is clear, proceed cautiously if flashing amber remains. At a puffin crossing, do not wait for a flashing-amber stage that will never appear."
    },
    "takeaways": [
      "Flashing amber is a conditional pelican stage.",
      "A green light does not cancel a person’s crossing.",
      "A straight-through pelican remains one crossing across an island."
    ],
    "sources": [
      {
        "title": "Highway Code: signal-controlled crossings, Rules 196–199",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code: traffic-light meanings",
        "url": "https://www.gov.uk/guidance/the-highway-code/light-signals-controlling-traffic"
      },
      {
        "title": "Highway Code: pedestrian and toucan crossing guidance",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-pedestrians-1-to-35"
      }
    ],
    "questionIds": [
      "gb-crossings-011",
      "gb-crossings-012",
      "gb-crossings-013",
      "gb-crossings-014",
      "gb-crossings-015"
    ]
  },
  {
    "id": "sharing-people",
    "moduleId": "module-sharing",
    "title": "Anticipating people whose needs are easy to miss",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Apply greater responsibility without assuming other people will act predictably.",
      "Recognise circumstances needing extra time and observation.",
      "Give riders, children and pedestrians room to act safely."
    ],
    "sections": [
      {
        "id": "look-for-people-before-conflict",
        "title": "Build a picture beyond the car in front",
        "paragraphs": [
          "A car’s size and speed mean its driver can cause substantial harm. The hierarchy of road users asks those able to cause the greatest harm to take greater care; it does not remove anyone else’s responsibility. Use that principle before a conflict develops. In a shopping street, scan gaps between parked cars and around stopped buses. A child concentrating on a friend or an ice-cream van may not be watching traffic.",
          "Before crossing a pavement or cycle route to reach a driveway, give way to pedestrians using the pavement and cyclists using the cycle lane or track. When reversing, inspect the area all around, including the space a turning front corner will sweep through. Do not assume that a person who was visible a moment ago remains clear of the vehicle."
        ]
      },
      {
        "id": "allow-time-without-pressure",
        "title": "Make allowance without demanding a response",
        "paragraphs": [
          "Someone’s sight, hearing or mobility needs may not be obvious. An older pedestrian or someone using a walking aid may require extra time to cross. Do not hurry them with the car’s position or engine noise. A white cane with a red band may indicate deafblindness; a horn or hand gesture may not be understood.",
          "Near schools and playgrounds, search for children. Flashing amber lights below a school warning sign call for very slow driving until clear of the area. A stopped school bus is another cue to look for children. A school crossing patrol displaying its stop sign requires you to stop. Look beyond the sign bearer for people still crossing, rather than treating the sign as the only hazard."
        ]
      },
      {
        "id": "make-space-for-unexpected-movement",
        "title": "Make space for riders and animals",
        "paragraphs": [
          "Cyclists can use the centre of a narrow lane and may ride two abreast for safety. A glance over a shoulder can precede a change of position. Check for cycles and motorcycles filtering beside slow traffic before turning across it. Pass horses calmly, below 10 mph and with at least 2 metres of clearance when safe; otherwise wait. When animals block a road, be prepared to stop; if a herd blocks it, stop and switch off the engine until it clears. Noise and impatience can make their movement harder to predict."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "You are waiting to turn right through a gap in a slow-moving queue. A driver waves you across, but the queue hides the route beside it. Do not accept the wave as proof of safety. Check for a filtering cyclist or motorcycle and for pedestrians crossing the side road. Wait until you can assess the whole route, then make the turn without forcing another person to change course."
    },
    "takeaways": [
      "Scan the spaces where people may emerge.",
      "Allow additional time without intimidation.",
      "A helpful wave cannot replace your own observation."
    ],
    "sources": [
      {
        "title": "Highway Code: hierarchy, Rules H1–H3",
        "url": "https://www.gov.uk/guidance/the-highway-code/introduction"
      },
      {
        "title": "Highway Code: people requiring extra care, Rules 204–218",
        "url": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
      }
    ],
    "questionIds": [
      "pedestrians-001",
      "pedestrians-002",
      "gb-vulnerable-001",
      "gb-vulnerable-002",
      "gb-vulnerable-003",
      "gb-vulnerable-004",
      "gb-vulnerable-005",
      "gb-vulnerable-006",
      "gb-vulnerable-007",
      "gb-vulnerable-008",
      "gb-vulnerable-009",
      "gb-vulnerable-010",
      "gb-vulnerable-011",
      "gb-vulnerable-012",
      "gb-vulnerable-013",
      "gb-vulnerable-014"
    ]
  },
  {
    "id": "sharing-large-special-vehicles",
    "moduleId": "module-sharing",
    "title": "Sharing with buses, large vehicles and emergency traffic",
    "version": 1,
    "minutes": 3,
    "objectives": [
      "Allow for large-vehicle blind spots and turning paths.",
      "Respond calmly to emergency vehicles while obeying controls.",
      "Anticipate quiet, slow and special vehicles."
    ],
    "sections": [
      {
        "id": "leave-the-space-a-large-vehicle-needs",
        "title": "Leave room for size and limited visibility",
        "paragraphs": [
          "A large vehicle may need to start a turn farther from the kerb or occupy extra road width as it turns. Do not enter the gap beside it merely because that space looks temporarily empty. Its path can narrow that gap as the turn develops, and its driver may not be able to see your car.",
          "Increase your following separation behind a lorry or coach when its body blocks your view. More distance gives you a better picture of junctions, hazards and possible stopping points ahead. Be patient with a lower travelling speed: many large vehicles have different speed limits or a speed limiter. The speed allowed for your car does not tell you what that vehicle is permitted or able to do."
        ]
      },
      {
        "id": "recognise-special-movements",
        "title": "Recognise vehicles with different movement patterns",
        "paragraphs": [
          "Give buses, coaches and trams priority when you can do so safely, particularly when they signal to leave a stop. Check for passengers who may cross nearby. A tram cannot steer away from a conflict, and quiet electric movement may be difficult to detect by sound alone. Observe the track and route rather than relying on engine noise.",
          "A flashing amber beacon can warn of a slow or stationary vehicle, recovery work or a large load. Reduce speed and find out what space is available before passing. A small mobility vehicle may not show an amber beacon on an ordinary road; absence of a flashing light is not evidence that everything ahead is travelling at normal traffic speed."
        ]
      },
      {
        "id": "help-without-creating-another-danger",
        "title": "Help emergency traffic without another danger",
        "paragraphs": [
          "When an emergency vehicle approaches, assess its likely route and make room calmly where safe. Its presence does not itself authorise you to cross a red light or mount the pavement. Avoid harsh braking or stopping where a bend, crest or narrow section creates a fresh hazard. Check mirrors and surroundings before pulling aside; the emergency driver may already have chosen a route around you."
        ]
      }
    ],
    "scenario": {
      "title": "Work through the situation",
      "text": "You are first at a red signal when an ambulance approaches from behind. Keep behind the stop line rather than entering the junction just to create space. Observe its position and the surrounding traffic. When lawful and safe movement becomes possible, make space deliberately without cutting across someone else. Helping means reducing the overall risk, not transferring it to pedestrians or crossing traffic."
    },
    "takeaways": [
      "A temporary gap beside a turning lorry can disappear.",
      "Use distance to improve a blocked view.",
      "Emergency traffic still needs your calm, lawful response."
    ],
    "sources": [
      {
        "title": "Highway Code: other vehicles, Rules 219–225",
        "url": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
      },
      {
        "title": "Highway Code: traffic-light meanings",
        "url": "https://www.gov.uk/guidance/the-highway-code/light-signals-controlling-traffic"
      }
    ],
    "questionIds": [
      "course-sharing-001",
      "course-sharing-002",
      "course-sharing-003",
      "course-sharing-004",
      "course-sharing-005",
      "course-sharing-006",
      "course-sharing-007",
      "course-sharing-008"
    ]
  }
];

