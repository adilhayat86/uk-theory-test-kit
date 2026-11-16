// Curated original diagrams, shown only after an answer/reveal. Human editorial sign-off remains pending.
export const teachingAssets = {
  "head-restraint": { source: require("../assets/illustrations-v2/images/vehicle_head_restraint_position_original_02.png"), label: "Head restraint adjustment", visualDescription: "Head restraint beside the back of a seated person's head", width: 1250, height: 1000 },
  "tyre-tread": { source: require("../assets/illustrations-v2/images/vehicle_tyre_tread_depth_original_01.png"), label: "Check tyre tread depth", visualDescription: "Tread depth gauge measuring a tyre groove", width: 1250, height: 1000 },
  "tyre-pressure": { source: require("../assets/illustrations-v2/images/vehicle_tyre_pressure_check_original_01.png"), label: "Check tyre pressures", visualDescription: "Pressure gauge connected to a tyre valve", width: 1250, height: 1000 },
  "coolant": { source: require("../assets/illustrations-v2/images/vehicle_coolant_reservoir_original_01.png"), label: "Engine coolant reservoir", visualDescription: "Illustration of a vehicle coolant reservoir", width: 1250, height: 1000 },
  "brake-lights": { source: require("../assets/illustrations-v2/images/vehicle_brake_lights_original_02.png"), label: "Working brake lights", visualDescription: "Rear of a car with brake lamps illuminated", width: 1250, height: 1000 },
  "motorway-join": { source: require("../assets/illustrations-v2/images/motorway_joining_slip_road_original_01.png"), label: "Joining traffic gives way", visualDescription: "Slip road joining a motorway carriageway", width: 1600, height: 900 },
  "following-gap": { source: require("../assets/illustrations-v2/images/motorway_two_second_gap_original_01.png"), label: "Leave at least two seconds in dry conditions", visualDescription: "Two cars separated by a following gap", width: 1600, height: 900 },
};

export const questionTeachingImages = {
  "safety-001": "head-restraint",
  "gb-safety-013": "tyre-tread",
  "gb-safety-014": "tyre-pressure",
  "gb-safety-016": "coolant",
  "gb-safety-001": "brake-lights",
  "gb-motorway-007": "motorway-join",
  "gb-rules-014": "following-gap",
} satisfies Record<string, keyof typeof teachingAssets>;
