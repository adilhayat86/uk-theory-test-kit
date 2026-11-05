/**
 * Original educational descriptions referencing DfT "Know Your Traffic Signs".
 * Illustrated sign diagrams are drawn in RoadSignVisual.tsx and are not
 * raster copies of DVSA licensed practice assets.
 * Applies to England, Scotland and Wales; check NI separately.
 */
export type RoadSignCategory = 'Orders' | 'Warnings' | 'Information';

export type RoadSign = {
  id: string;
  category: RoadSignCategory;
  artwork: string;
  label: string;
  meaning: string;
  tip: string;
  sourceUrl: string;
};

export const roadSigns: RoadSign[] = [
  {
    "id": "stop",
    "category": "Orders",
    "artwork": "stop",
    "label": "STOP",
    "meaning": "Come to a complete stop before the solid white line and give way.",
    "tip": "The STOP sign is an exception to the usual circular shape of order signs.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "give-way",
    "category": "Orders",
    "artwork": "give-way",
    "label": "Give way",
    "meaning": "Give way to traffic on the major road.",
    "tip": "A downward-pointing triangle makes this priority sign distinctive.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "no-entry",
    "category": "Orders",
    "artwork": "no-entry",
    "label": "No entry",
    "meaning": "Vehicular traffic must not enter beyond this sign unless a permitted exception is shown.",
    "tip": "The white horizontal bar on red means no entry for vehicles.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "limit-20",
    "category": "Orders",
    "artwork": "limit-20",
    "label": "20 mph maximum",
    "meaning": "Do not exceed the displayed speed in miles per hour.",
    "tip": "The signed limit is a maximum, not a target speed.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs"
  },
  {
    "id": "limit-30",
    "category": "Orders",
    "artwork": "limit-30",
    "label": "30 mph maximum",
    "meaning": "Do not exceed 30 mph where this speed-limit sign applies.",
    "tip": "Limits can also be varied by road type, vehicle class and local signing.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs"
  },
  {
    "id": "limit-40",
    "category": "Orders",
    "artwork": "limit-40",
    "label": "40 mph maximum",
    "meaning": "Do not exceed 40 mph where this speed-limit sign applies.",
    "tip": "Red-ring speed-limit signs indicate legally enforceable maximum limits.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs"
  },
  {
    "id": "national-limit",
    "category": "Orders",
    "artwork": "national-limit",
    "label": "National speed limit applies",
    "meaning": "The national speed limit for your type of vehicle and road applies.",
    "tip": "It does not always mean 70 mph: the limit depends on the road and vehicle.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/speed-limit-signs"
  },
  {
    "id": "no-waiting",
    "category": "Orders",
    "artwork": "no-waiting",
    "label": "No waiting",
    "meaning": "Waiting is prohibited during the times shown on accompanying signs or plates.",
    "tip": "The single red diagonal on blue indicates a waiting restriction.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "no-stopping",
    "category": "Orders",
    "artwork": "no-stopping",
    "label": "No stopping",
    "meaning": "Stopping is prohibited as indicated by this sign and any accompanying restrictions.",
    "tip": "Two crossing red diagonals indicate a more restrictive stopping prohibition.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "turn-left",
    "category": "Orders",
    "artwork": "turn-left",
    "label": "Turn left ahead",
    "meaning": "Vehicles must turn left in the direction shown by the arrow.",
    "tip": "A blue circle normally gives a positive instruction.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "ahead-only",
    "category": "Orders",
    "artwork": "ahead-only",
    "label": "Ahead only",
    "meaning": "Vehicles must proceed straight ahead.",
    "tip": "Mandatory directions are commonly shown with white arrows on blue circles.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "keep-left",
    "category": "Orders",
    "artwork": "keep-left",
    "label": "Keep left",
    "meaning": "Pass to the left of the traffic island or obstruction as indicated.",
    "tip": "Follow the white arrow on the blue circular sign.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "no-u-turn",
    "category": "Orders",
    "artwork": "no-u-turn",
    "label": "No U-turn",
    "meaning": "You must not make a U-turn where this prohibition applies.",
    "tip": "The red diagonal bar across the turning arrow indicates a banned manoeuvre.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "traffic-lights",
    "category": "Warnings",
    "artwork": "traffic-lights",
    "label": "Traffic signals ahead",
    "meaning": "Be ready for traffic lights ahead and adjust your approach.",
    "tip": "Most warning signs are red-bordered triangles.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "crossroads",
    "category": "Warnings",
    "artwork": "crossroads",
    "label": "Crossroads ahead",
    "meaning": "A crossroads lies ahead; look out for traffic entering from side roads.",
    "tip": "Approach at a speed that lets you respond to other traffic.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "bend-right",
    "category": "Warnings",
    "artwork": "bend-right",
    "label": "Bend to the right",
    "meaning": "A bend in the road ahead turns to the right.",
    "tip": "Reduce speed if needed before the bend and stay in your lane.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "road-narrows",
    "category": "Warnings",
    "artwork": "road-narrows",
    "label": "Road narrows on both sides",
    "meaning": "The available road width reduces ahead.",
    "tip": "Be prepared to give space to oncoming vehicles and vulnerable road users.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "roundabout",
    "category": "Warnings",
    "artwork": "roundabout",
    "label": "Roundabout ahead",
    "meaning": "A roundabout is coming up.",
    "tip": "Check signs, lanes, traffic from your right and road markings.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "slippery",
    "category": "Warnings",
    "artwork": "slippery",
    "label": "Slippery road",
    "meaning": "The road surface may offer reduced grip.",
    "tip": "Use smoother steering and braking and allow more space.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/warning-signs"
  },
  {
    "id": "roadworks",
    "category": "Warnings",
    "artwork": "roadworks",
    "label": "Road works ahead",
    "meaning": "Road works or an obstruction are likely ahead.",
    "tip": "Follow temporary signs and be ready to reduce speed.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/signs-for-road-works-and-temporary-situations"
  },
  {
    "id": "parking",
    "category": "Information",
    "artwork": "parking",
    "label": "Parking place",
    "meaning": "A parking area or place is indicated.",
    "tip": "Always check any additional times, charges and restrictions.",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/traffic-signs"
  },
  {
    "id": "one-way",
    "category": "Information",
    "artwork": "one-way",
    "label": "One-way traffic",
    "meaning": "Traffic moves only in the direction indicated.",
    "tip": "Check the arrow before entering the road.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/regulatory-signs"
  },
  {
    "id": "motorway",
    "category": "Information",
    "artwork": "motorway",
    "label": "Start of motorway",
    "meaning": "Motorway regulations apply from this point.",
    "tip": "Certain classes of road user are prohibited from entering motorways.",
    "sourceUrl": "https://www.gov.uk/government/publications/know-your-traffic-signs/motorway-signs-signals-and-road-markings"
  },
  {
    "id": "no-through-road",
    "category": "Information",
    "artwork": "no-through-road",
    "label": "No through road",
    "meaning": "The road has no route through for motor vehicles.",
    "tip": "You may still be able to access premises and turn around safely.",
    "sourceUrl": "https://www.gov.uk/guidance/the-highway-code/traffic-signs"
  }
];

export const roadSignCategories: RoadSignCategory[] = ['Orders','Warnings','Information'];
