import type { CourseLesson } from './course';

/** Original source-checked lesson drafts; independent editorial review pending. */
export const basicLessons: CourseLesson[] = [
  {
    "id": "lesson-driver-fitness",
    "moduleId": "module-foundations",
    "title": "Being fit to drive",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Recognise when health, tiredness or substances make driving unsafe.",
      "Plan a safe response before the journey starts."
    ],
    "sections": [
      {
        "id": "lesson-driver-fitness-section-1",
        "title": "Start with the driver",
        "paragraphs": [
          "A safe car cannot compensate for a driver who cannot concentrate or control it. Assess your sleep, vision, health and medicines before collecting the keys. Feeling determined to finish a journey is not evidence of fitness. A heavy meal, a warm cabin and a monotonous road can make tiredness harder to recognise. Plan a realistic journey rather than treating rest as something to earn after arrival. If you are already tired, postpone the drive or arrange another driver."
        ]
      },
      {
        "id": "lesson-driver-fitness-section-2",
        "title": "Know the legal duties",
        "paragraphs": [
          "You MUST meet the eyesight requirement and wear glasses or contact lenses while driving if you need them to meet it. You MUST report to DVLA a health condition likely to affect driving. You MUST NOT drive while impaired by alcohol, drugs or medicines. Scotland has lower legal alcohol limits than England and Wales; counting drinks is not a reliable test of safety. Alcohol can still impair you the next morning, and coffee does not remove it from your body."
        ]
      },
      {
        "id": "lesson-driver-fitness-section-3",
        "title": "Manage the journey",
        "paragraphs": [
          "The Highway Code recommends a break of at least 15 minutes after every two hours of driving. That is planning advice, not permission to continue until two hours have passed when you become sleepy sooner. Stop somewhere suitable, such as a service area or designated parking place. A hard shoulder or emergency area is not a rest stop. Ask a pharmacist or doctor about a medicine that may affect driving; a legal prescription does not make impaired driving safe.",
          "At night or in poor visibility, do not use tinted glasses, lenses or visors if they restrict your vision."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You slept poorly and are due to drive for several hours. Before leaving, you arrange a later departure and a rested driver rather than relying on an open window. If sleepiness develops on the road, you look for a safe stopping place instead of pushing on to the planned break."
    },
    "takeaways": [
      "Decide fitness before moving.",
      "Treat sleepiness as a reason to stop safely.",
      "Follow eyesight, medical-reporting and impairment requirements."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 90 to 97",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      }
    ],
    "questionIds": [
      "gb-safety-002",
      "gb-safety-003",
      "gb-safety-004",
      "gb-safety-005",
      "gb-safety-006",
      "gb-safety-007"
    ]
  },
  {
    "id": "lesson-documents",
    "moduleId": "module-foundations",
    "title": "Licence, insurance and legal readiness",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Check that the driver and vehicle are legally ready for the trip.",
      "Distinguish a certificate from ongoing roadworthiness."
    ],
    "sections": [
      {
        "id": "lesson-documents-section-1",
        "title": "Permission belongs to this journey",
        "paragraphs": [
          "Before driving, confirm that your licence covers the vehicle category and that valid insurance covers your use of that vehicle. A friend owning an insured car does not automatically make you an insured borrower. Ask about restrictions instead of assuming that comprehensive cover allows every person to drive every car. You MUST hold the appropriate valid licence and insurance. Keep your licence details up to date and notify DVLA when your name or address changes."
        ]
      },
      {
        "id": "lesson-documents-section-2",
        "title": "The vehicle must remain roadworthy",
        "paragraphs": [
          "An ordinary car normally needs its first MOT after three years and then annually, with exceptions for some vehicles. Check the current requirement for the particular vehicle rather than memorising an exception as a general rule. A valid MOT is a record of a test, not a promise that a tyre, light or brake cannot subsequently become defective. The car must be legal and roadworthy whenever used. Tax or an applicable exemption, registration duties and insurance are separate responsibilities."
        ]
      },
      {
        "id": "lesson-documents-section-3",
        "title": "Learning has conditions",
        "paragraphs": [
          "A car learner needs a valid provisional licence and an eligible supervisor. For ordinary private supervision, the supervisor must be at least 21 and have held the suitable full licence for at least three years. Learner plates must be clearly displayed front and rear; red D plates are an alternative in Wales. A theory pass alone does not allow unsupervised driving. Motorway learning has additional instructor and dual-control requirements. If police request documents, comply with the production instructions, including the seven-day arrangement when applicable.",
          "For road use, the legal minimum is third-party insurance covering your use of the vehicle for injury or damage caused to others; an MOT certificate or breakdown membership is not insurance."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A relative offers their spare car for an afternoon lesson. You check your provisional entitlement, the supervisor’s eligibility, learner plates and insurance for your use. Although its MOT is current, a damaged tyre means the lesson waits until the car is roadworthy. No single document replaces the other checks."
    },
    "takeaways": [
      "Check licence and insurance for the specific use.",
      "Treat MOT, roadworthiness and tax as separate checks.",
      "A theory pass does not remove supervision requirements."
    ],
    "sources": [
      {
        "title": "Highway Code, Annex 3",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-3-motor-vehicle-documentation-and-learner-driver-requirements"
      },
      {
        "title": "Highway Code, Rule 97",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      }
    ],
    "questionIds": [
      "course-foundations-001",
      "course-foundations-002",
      "course-foundations-003",
      "course-foundations-004",
      "course-foundations-005",
      "course-foundations-006",
      "course-foundations-007",
      "course-foundations-008"
    ]
  },
  {
    "id": "lesson-observation-attitude",
    "moduleId": "module-foundations",
    "title": "Observation, attitude and developing hazards",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Turn visible clues into a plan before danger develops.",
      "Respond calmly to uncertainty and other people’s mistakes."
    ],
    "sections": [
      {
        "id": "lesson-observation-attitude-section-1",
        "title": "Look for what could happen",
        "paragraphs": [
          "Observation is more than spotting objects directly ahead. Scan the distance, the middle of your route and the space nearby, while checking mirrors often enough to understand what is beside and behind you. Parked vehicles can hide a child, a junction can hide a cyclist, and a bus can hide a crossing pedestrian. Ask what could enter your path and what space you would need to respond. A potential hazard becomes urgent when it starts affecting your intended route."
        ]
      },
      {
        "id": "lesson-observation-attitude-section-2",
        "title": "Check before changing your plan",
        "paragraphs": [
          "Use mirrors before changing speed or direction and check the relevant blind spot when necessary. Before moving off, make an all-round final check and move only when safe. Another person’s indicator may have been left on, while a headlight flash only draws attention to the vehicle’s presence. Neither grants you priority. Reduce uncertainty by waiting for a clear view and a genuinely safe gap, rather than substituting an assumed signal for observation."
        ]
      },
      {
        "id": "lesson-observation-attitude-section-3",
        "title": "Keep a useful attitude",
        "paragraphs": [
          "Pressure and anger encourage rushed decisions. If someone tailgates or behaves aggressively, keep your own driving calm, avoid retaliation and preserve space ahead. Never try to teach another driver a lesson by blocking or braking sharply. Some people cannot see or hear your approach, so do not assume a horn or eye contact guarantees a response. Put phones and distractions aside before moving; waiting at a red light is still part of driving, not a routine opportunity to handle a phone.",
          "Choose a speed that lets you stop well within the distance you can see to be clear; a posted limit does not guarantee that distance is available."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A ball rolls from behind a parked van while a driver behind is close to your bumper. You ease your speed early and create time to stop for a possible child. You do not wait for a child to emerge, and you do not accelerate to satisfy the following driver. The clue, not the pressure, controls your plan."
    },
    "takeaways": [
      "Look for hidden people as well as visible vehicles.",
      "A signal does not guarantee another person’s action.",
      "Create time and space instead of reacting with anger."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 103 to 106, 147 to 150",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, Rules 159 to 161",
        "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
      },
      {
        "title": "Highway Code, Rules 204 to 213",
        "url": "https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225"
      }
    ],
    "questionIds": [
      "course-foundations-009",
      "course-foundations-010",
      "course-foundations-011",
      "course-foundations-012",
      "course-foundations-013",
      "course-foundations-014",
      "course-foundations-015",
      "course-foundations-016"
    ]
  },
  {
    "id": "lesson-planning-environment",
    "moduleId": "module-foundations",
    "title": "Planning a considerate, efficient journey",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Prepare route, breaks, fuel or charge before setting off.",
      "Use economical habits that also preserve control."
    ],
    "sections": [
      {
        "id": "lesson-planning-environment-section-1",
        "title": "Remove pressure before departure",
        "paragraphs": [
          "Check the route, traffic and weather, then allow enough time for delays and breaks. Know where the controls are before entering traffic and set navigation while safely parked. A long journey needs enough fuel or charge and realistic places to replenish it; motorway emergency areas are not routine refuelling or charging stops. Consider postponing a non-essential journey during severe snow or ice. Changing the plan before departure is often safer than trying to solve a foreseeable problem at speed."
        ]
      },
      {
        "id": "lesson-planning-environment-section-2",
        "title": "Drive smoothly without losing control",
        "paragraphs": [
          "Looking ahead lets you ease off early rather than alternate hard acceleration with late braking. Keep a safe following gap so that minor speed changes ahead do not force sudden reactions. Check cold tyre pressures against the manufacturer’s guidance for the load, and avoid carrying unnecessary weight. These habits support efficient operation as well as control. Do not coast in neutral or hold the clutch down to save fuel: removing engine braking can make downhill speed and vehicle control harder to manage."
        ]
      },
      {
        "id": "lesson-planning-environment-section-3",
        "title": "Respect people and the environment",
        "paragraphs": [
          "You MUST NOT leave an unattended parked vehicle with its engine running or run it unnecessarily while stationary on a public road. Rule 123 distinguishes unnecessary idling from waiting in traffic or diagnosing a fault. For a longer parked wait, switching off reduces noise and emissions. Keep exhaust and other vehicle systems maintained. Secure luggage and charging cables so that an efficient trip does not create hazards for passengers or pedestrians. Avoid changing navigation equipment while driving; stop somewhere safe first.",
          "Satnav directions never override signs, restrictions or the conditions you can see. If a direction conflicts with a No entry sign, obey the sign and find a lawful route."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You plan an unfamiliar motorway trip in an electric car. You choose a charging stop with reserve charge, build in a break and set the route before moving. During a delay, you keep a safe gap and adjust the arrival plan instead of speeding later. At the destination, you park close enough to the charger to avoid a trailing cable across the walkway."
    },
    "takeaways": [
      "Plan for delays, rest and fuel or charge.",
      "Smooth driving is different from coasting.",
      "Avoid unnecessary parked idling and unsecured loads."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 91, 97 and 98",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      },
      {
        "title": "Highway Code, Rules 122, 123, 149 and 150",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, Annex 6",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
      }
    ],
    "questionIds": [
      "course-foundations-017",
      "course-foundations-018",
      "course-foundations-019",
      "course-foundations-020",
      "course-foundations-021",
      "course-foundations-022",
      "course-foundations-023",
      "course-foundations-024"
    ]
  },
  {
    "id": "lesson-cockpit-restraints",
    "moduleId": "module-vehicle-care",
    "title": "Controls, visibility and restraints",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Prepare a driving position that gives control and a clear view.",
      "Protect occupants with suitable restraints and secure luggage."
    ],
    "sections": [
      {
        "id": "lesson-cockpit-restraints-section-1",
        "title": "Set up before moving",
        "paragraphs": [
          "In an unfamiliar car, find the lights, indicators, wipers, demisters and hazard switch while parked. Adjust the seat so that you can operate the pedals and steering comfortably without stretching. Position mirrors to give the best available view, while remembering that blind spots remain. Adjust the head restraint correctly to reduce injury risk. Clean and demist windows and mirrors; a small clear patch is not adequate observation. Footwear and clothing should allow proper control throughout the journey."
        ]
      },
      {
        "id": "lesson-cockpit-restraints-section-2",
        "title": "Use protection correctly",
        "paragraphs": [
          "You MUST use seat belts where required, even on a short journey. Children need the restraint appropriate to the legal requirements and to their size, with fitting instructions followed carefully. A rear-facing baby seat MUST NOT be used in a seat protected by an active frontal airbag. Check the vehicle and restraint instructions rather than improvising a fitting. A loose or twisted belt, an unsuitable seat or an incorrect installation may leave someone poorly protected even though a restraint is present."
        ]
      },
      {
        "id": "lesson-cockpit-restraints-section-3",
        "title": "Keep the cabin safe",
        "paragraphs": [
          "Stow luggage securely so it cannot move into people or controls during a sharp stop. Keep the driver’s view and mirrors usable, and do not let a phone or navigation mount obstruct essential vision. Passengers, particularly children, should normally leave on the kerb side when safe. Before opening a door, look all around for cyclists and other passing people. Preparing the cabin is part of driving responsibility, not a task to finish while pulling away from the kerb."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "Before driving a borrowed car, you adjust the seat and mirrors, find the demister and fit a child restraint according to its instructions. A bag on the rear shelf is moved into secure storage. You check the child can leave safely on arrival instead of waiting until traffic is passing the open door."
    },
    "takeaways": [
      "Adjust controls and visibility while parked.",
      "Use and fit restraints correctly for every trip.",
      "Secure loose items and check before opening doors."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 97, 99 to 102",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      },
      {
        "title": "Highway Code, Annex 6",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
      },
      {
        "title": "Highway Code, Rule 239",
        "url": "https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252"
      }
    ],
    "questionIds": [
      "safety-001",
      "gb-safety-008",
      "gb-safety-011",
      "gb-safety-012",
      "illustrated-vehicle-005",
      "illustrated-vehicle-006",
      "illustrated-vehicle-007",
      "illustrated-vehicle-008"
    ]
  },
  {
    "id": "lesson-checks-tyres-fluids",
    "moduleId": "module-vehicle-care",
    "title": "Tyres, brakes, lights and fluids",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Recognise checks that support roadworthiness.",
      "Respond to a defect without relying on an old certificate."
    ],
    "sections": [
      {
        "id": "lesson-checks-tyres-fluids-section-1",
        "title": "Use a regular checking routine",
        "paragraphs": [
          "Take time to inspect tyres, lights, windows and the area around the car before a journey. The car and any trailer MUST be roadworthy. Check that lights, indicators, brakes, steering, wipers, washers and demisters operate, and keep lights, number plates and windows clean and unobstructed. A current MOT does not cancel this responsibility. A defect that appears between tests still needs attention; discovering it early is preferable to finding it while joining fast traffic or approaching a crossing."
        ]
      },
      {
        "id": "lesson-checks-tyres-fluids-section-2",
        "title": "Understand the contact with the road",
        "paragraphs": [
          "For ordinary cars, tyres MUST have at least 1.6 millimetres of tread across the central three-quarters and around the entire circumference. They must be inflated to the manufacturer’s specification for the load. Check pressures when cold, because heat can make readings misleading. Look for damage and uneven wear as well as depth. A car pulling to one side while braking may have a fault that needs professional attention. Do not use one symptom as proof that a journey is safe to continue."
        ],
        "imageAssetId": "tyre-tread"
      },
      {
        "id": "lesson-checks-tyres-fluids-section-3",
        "title": "Check fluids without creating danger",
        "paragraphs": [
          "Follow the handbook for oil, coolant, brake-fluid and washer checks, including the correct level marks and vehicle conditions. Do not open a hot coolant filler cap: heat and pressure can cause serious injury. Low brake fluid or a persistent warning can indicate a serious problem rather than a simple need to top up. If a check is unfamiliar or a defect affects safety, obtain competent assistance. Keep the vehicle out of use until the fault has been assessed and made safe."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "You notice low tread on one tyre and a brake warning after start-up. Instead of relying on last month’s MOT, you arrange inspection and alternative transport. The next day, with the car cool and safely parked, you use the handbook to check the recommended pressures and fluid levels rather than guessing from another vehicle."
    },
    "takeaways": [
      "MOT validity does not guarantee present roadworthiness.",
      "Check tyre depth, damage and cold pressures.",
      "Use the handbook and treat brake or overheating faults seriously."
    ],
    "sources": [
      {
        "title": "Highway Code, Rules 89 and 97",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      },
      {
        "title": "Highway Code, Annex 6",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
      }
    ],
    "questionIds": [
      "gb-safety-001",
      "gb-safety-013",
      "gb-safety-014",
      "gb-safety-015",
      "gb-safety-016",
      "illustrated-vehicle-001",
      "illustrated-vehicle-002",
      "illustrated-vehicle-003",
      "illustrated-vehicle-004"
    ]
  },
  {
    "id": "lesson-loading-towing",
    "moduleId": "module-vehicle-care",
    "title": "Carrying loads and towing safely",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Check limits, secure loads and maintain visibility.",
      "Allow for a trailer’s extra weight and length."
    ],
    "sections": [
      {
        "id": "lesson-loading-towing-section-1",
        "title": "Plan for the entire load",
        "paragraphs": [
          "Adding people, luggage or a roof carrier changes the vehicle, even before a trailer is attached. You MUST NOT overload the car or trailer, and you must remain within licence entitlement and vehicle limits. Check current towing entitlement and the manufacturer’s figures for the proposed combination rather than relying on a friend’s licence or an old rule about test dates. Roof carriers have their own fitting and load limits. Make these checks before accepting a load, not after reaching the roadside."
        ]
      },
      {
        "id": "lesson-loading-towing-section-2",
        "title": "Distribute and secure it",
        "paragraphs": [
          "Heavy items in a caravan or trailer should be distributed evenly around the axle area, within the specified overall and tow-ball limits. Too much weight at the rear can encourage instability. Secure items against braking, cornering and movement; passengers holding a loose bag is not reliable restraint. Keep adequate vision through mirrors, fitting suitable towing mirrors if the trailer blocks the required rear view. Adjust tyre pressures for the load using the vehicle’s instructions, and check trailer tyres, brakes and lights."
        ]
      },
      {
        "id": "lesson-loading-towing-section-3",
        "title": "Drive as a combination",
        "paragraphs": [
          "Allow more time and room to accelerate, brake, turn and pass other road users. A gap that fits a solo car may be too short for a towing combination. Trailer speed limits and motorway lane restrictions differ from those for a solo car, so check the relevant rules and signs. If the combination becomes unstable, do not assume that driving faster will cure it. Stop safely and have loading, equipment or other causes assessed before continuing. Loading is part of safe control, not merely a storage problem."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A holiday trailer hides your normal rear view and most of the luggage is piled behind its axle. You check entitlement and vehicle limits, redistribute and secure the load and fit appropriate mirrors before departure. On the road you select a larger gap and earlier braking points for the combination, rather than driving as though the trailer were not attached."
    },
    "takeaways": [
      "Check entitlement and manufacturer limits.",
      "Distribute weight, secure it and preserve the required view.",
      "Use combination-appropriate gaps, speeds and lane choices."
    ],
    "sources": [
      {
        "title": "Highway Code, Rule 98",
        "url": "https://www.gov.uk/guidance/the-highway-code/rules-for-drivers-and-motorcyclists-89-to-102"
      },
      {
        "title": "Highway Code, Rules 124 and 160",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Highway Code, motorway lane discipline",
        "url": "https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273"
      }
    ],
    "questionIds": [
      "course-loading-001",
      "course-loading-002",
      "course-loading-003",
      "course-loading-004",
      "course-loading-005",
      "course-loading-006",
      "course-loading-007",
      "course-loading-008",
      "gb-safety-009",
      "gb-safety-010",
      "gb-motorway-013",
      "illustrated-vehicle-007"
    ]
  },
  {
    "id": "lesson-urgent-warnings",
    "moduleId": "module-dashboard",
    "title": "Warnings that need prompt action",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Distinguish a start-up check from a warning during a journey.",
      "Choose a safe stopping response rather than a guessed repair."
    ],
    "sections": [
      {
        "id": "lesson-urgent-warnings-section-1",
        "title": "Read the warning in context",
        "paragraphs": [
          "Many lamps illuminate briefly when the car performs its start-up check. A light that remains on, returns while driving or appears with a message may mean something different. Learn the controls and warning displays in the vehicle’s handbook before departure. Colour is a useful attention cue, but it is not a diagnosis: a symbol, accompanying message and the manufacturer’s instructions determine the response. The same general symbol can have different details in different cars, so avoid relying on a photograph alone."
        ]
      },
      {
        "id": "lesson-urgent-warnings-section-2",
        "title": "Protect people before investigating",
        "paragraphs": [
          "A red oil-pressure or temperature warning can signal a problem that makes continued running damaging or unsafe. A red brake warning that remains after the parking brake is released requires serious attention. Reduce speed in a controlled way and find a safe place to stop, following the vehicle’s instructions. Do not stop abruptly in a live lane merely to look at the dashboard when a safer stopping place is reachable. If the car cannot reach relative safety, use the breakdown procedure and call for appropriate help."
        ],
        "imageAssetId": "dash-oil"
      },
      {
        "id": "lesson-urgent-warnings-section-3",
        "title": "Do not confuse a check with a repair",
        "paragraphs": [
          "A charging warning may mean the electrical system is not charging, rather than simply identifying a flat battery. A low fluid warning may reflect a leak or other fault. Repeatedly restarting, ignoring a warning because the car still moves, or topping up without understanding the fault can make matters worse. Do not remove a hot coolant cap. Arrange competent assessment and use the handbook’s instructions for that exact vehicle. Roadside revision cannot replace professional diagnosis or a safe repair."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "A red temperature symbol appears during a journey. You keep control, find a suitable safe stopping place and follow the handbook rather than continuing to the destination. You do not open the hot cooling system. If stopping leaves you exposed to high-speed traffic, protecting the occupants and getting help takes priority over examining the engine."
    },
    "takeaways": [
      "Read the symbol, message and handbook together.",
      "Stop safely for serious warnings; avoid abrupt unsafe stops.",
      "A lamp identifies a concern, not a complete diagnosis."
    ],
    "sources": [
      {
        "title": "Highway Code, Annex 6: Warning displays and fluids",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
      },
      {
        "title": "Highway Code, Rules 275 to 279",
        "url": "https://www.gov.uk/guidance/the-highway-code/breakdowns-and-incidents-274-to-287"
      },
      {
        "title": "Example manufacturer guidance: Ford C-MAX warning lamps (use your own vehicle handbook)",
        "url": "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1298234&Uid=G1276543&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G539493&userMarket=GBR&vFilteringEnabled=False&variantid=2263"
      }
    ],
    "questionIds": [
      "illustrated-dashboard-001",
      "illustrated-dashboard-002",
      "illustrated-dashboard-006",
      "illustrated-dashboard-007",
      "gb-safety-001",
      "gb-safety-016"
    ]
  },
  {
    "id": "lesson-systems-indicators",
    "moduleId": "module-dashboard",
    "title": "System warnings and normal indicators",
    "version": 1,
    "minutes": 2,
    "objectives": [
      "Recognise common safety-system alerts and operating indicators.",
      "Use a persistent warning to guide a safe next action."
    ],
    "sections": [
      {
        "id": "lesson-systems-indicators-section-1",
        "title": "Notice when a system is reporting trouble",
        "paragraphs": [
          "Amber ABS, engine-management, tyre-pressure or restraint-system warnings commonly draw attention to a system that needs checking. The exact response depends on the vehicle, whether the lamp is steady or flashing, and any other warning or change in behaviour. A car appearing to drive normally does not prove that every safety system is available. Read the message and handbook, adjust the journey if required and seek competent advice. Never remove a warning lamp’s power or cover it to avoid the concern."
        ]
      },
      {
        "id": "lesson-systems-indicators-section-2",
        "title": "Separate intervention from a persistent fault",
        "paragraphs": [
          "A traction or stability symbol may flash while a system responds to reduced grip, whereas a persistent warning can indicate a fault or a disabled function. Neither is permission to drive beyond the conditions. If tyres are losing grip, make your own inputs smoother and increase space instead of relying on electronics to solve the problem. A tyre-pressure alert calls for a safe opportunity to assess the tyres according to instructions, not an attempt to investigate while moving in traffic."
        ],
        "imageAssetId": "dash-stability"
      },
      {
        "id": "lesson-systems-indicators-section-3",
        "title": "Recognise reminders and status",
        "paragraphs": [
          "Not every illuminated symbol is a fault. A seat-belt reminder means occupants and restraints need attention before continuing. A low-fuel indication should prompt a sensible refuelling plan before the car becomes stranded. A blue main-beam indicator shows a lighting mode; dip the headlights when necessary to avoid dazzling others. These examples teach a method: identify what is active, connect it with the driving situation, then take the appropriate action. Do not memorise one colour as meaning that every journey may continue unchanged."
        ]
      }
    ],
    "scenario": {
      "title": "Put it into practice",
      "text": "On a wet bend the stability symbol flashes briefly, so you ease your inputs and allow more room. Later, an amber symbol stays on during ordinary driving. You treat that as a different situation, find a safe place to read the message and handbook, and arrange a check rather than assuming it is still a normal intervention."
    },
    "takeaways": [
      "A flashing intervention and a persistent warning may differ.",
      "Driver assistance does not create grip or remove responsibility.",
      "Know normal indicators as well as fault warnings."
    ],
    "sources": [
      {
        "title": "Highway Code, Annex 6: Warning displays",
        "url": "https://www.gov.uk/guidance/the-highway-code/annex-6-vehicle-maintenance-safety-and-security"
      },
      {
        "title": "Highway Code, Rules 113 to 116 and 120",
        "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
      },
      {
        "title": "Example manufacturer guidance: Ford C-MAX warning lamps (use your own vehicle handbook)",
        "url": "https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1298234&Uid=G1276543&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G539493&userMarket=GBR&vFilteringEnabled=False&variantid=2263"
      }
    ],
    "questionIds": [
      "illustrated-dashboard-003",
      "illustrated-dashboard-004",
      "illustrated-dashboard-005",
      "illustrated-dashboard-008",
      "illustrated-dashboard-009",
      "illustrated-dashboard-010",
      "illustrated-dashboard-011",
      "illustrated-dashboard-012"
    ]
  }
];
