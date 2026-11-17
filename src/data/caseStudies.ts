export type CaseStudy = {
  id: string;
  title: string;
  /** Neutral orientation; no answer or rule is disclosed before answering. */
  description: string;
  durationSeconds: number;
  source: number;
};

/** Original silent diagram animations. Their MP4 files are bundled for offline playback. */
export const caseStudies = {
  'case-zebra-crossing': {
    id: 'case-zebra-crossing',
    title: 'A town road',
    description: 'A blue car approaches a crossing on a two-way town road. Watch the vehicles and the pedestrian.',
    durationSeconds: 20,
    source: require('../assets/case-studies/town-crossing.mp4'),
  },
  'case-wet-following': {
    id: 'case-wet-following',
    title: 'A wet dual carriageway',
    description: 'Two cars travel along a rain-soaked dual carriageway. Watch their spacing and lane positions.',
    durationSeconds: 20,
    source: require('../assets/case-studies/wet-following-gap.mp4'),
  },
  'case-cyclist-oncoming': {
    id: 'case-cyclist-oncoming',
    title: 'A road with parked vehicles',
    description: 'A blue car follows a cyclist on a two-way road with parked vehicles. Watch the other traffic.',
    durationSeconds: 20,
    source: require('../assets/case-studies/cyclist-and-parked-vehicles.mp4'),
  },
} as const satisfies Record<string, CaseStudy>;

export type CaseStudyId = keyof typeof caseStudies;
export const caseStudyIds = Object.keys(caseStudies) as CaseStudyId[];
export function isCaseStudyId(value: string): value is CaseStudyId {
  return Object.prototype.hasOwnProperty.call(caseStudies, value);
}
