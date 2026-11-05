import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';

const RED = '#C9252F';
const BLUE = '#194DA1';
const BLACK = '#16181C';
const WHITE = '#FFFFFF';

/** Locally rendered, vector teaching diagrams. Not pixel-perfect traffic sign artwork. */
export default function RoadSignVisual({
  artwork, size = 114,
}: { artwork: string; size?: number }) {
  const isSpeed = artwork.startsWith('limit-');
  const isWarning = [
    'traffic-lights', 'crossroads', 'bend-right', 'road-narrows',
    'roundabout', 'slippery', 'roadworks',
  ].includes(artwork);
  const isBlueCircle = ['turn-left','ahead-only','keep-left'].includes(artwork);
  const isRedCircle = ['no-entry','no-u-turn'].includes(artwork);
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120"
      accessibilityRole="image" accessibilityLabel={`Illustrated ${artwork.replace(/-/g, ' ')} road sign`}>
      {isSpeed || artwork === 'national-limit' || isRedCircle ? (
        <Circle cx={60} cy={60} r={49} fill={WHITE} stroke={artwork === 'national-limit' ? BLACK : RED} strokeWidth={artwork === 'national-limit' ? 3 : 10} />
      ) : null}
      {isSpeed ? (
        <SvgText x={60} y={77} fontSize={42} fontWeight="bold" textAnchor="middle" fill={BLACK}>
          {artwork.split('-')[1]}
        </SvgText>
      ) : null}
      {artwork === 'national-limit' ? (
        <Path d="M23 96 L97 24" stroke={BLACK} strokeWidth={13} />
      ) : null}
      {artwork === 'stop' ? (
        <G>
          <Polygon points="41,7 79,7 108,34 108,83 81,110 39,110 12,83 12,34" fill={RED} stroke={WHITE} strokeWidth={3}/>
          <SvgText x={60} y={72} fontSize={32} fontWeight="bold" textAnchor="middle" fill={WHITE}>STOP</SvgText>
        </G>
      ) : null}
      {artwork === 'give-way' ? (
        <Polygon points="7,20 113,20 60,112" fill={WHITE} stroke={RED} strokeWidth={11} strokeLinejoin="round" />
      ) : null}
      {artwork === 'no-entry' ? (
        <Rect x={21} y={54} width={78} height={12} rx={2} fill={WHITE} />
      ) : null}
      {artwork === 'no-u-turn' ? (
        <G>
          <Path d="M81 91 V47 Q81 25 60 25 Q39 25 39 48 V72" stroke={BLACK} strokeWidth={8} fill="none" strokeLinecap="round" />
          <Path d="M27 59 L39 78 L51 59" fill="none" stroke={BLACK} strokeWidth={7} strokeLinejoin="round"/>
          <Line x1={22} y1={100} x2={98} y2={22} stroke={RED} strokeWidth={11}/>
        </G>
      ) : null}
      {['no-waiting','no-stopping'].includes(artwork) ? (
        <G>
          <Circle cx={60} cy={60} r={49} fill={BLUE} stroke={RED} strokeWidth={9}/>
          <Line x1={24} y1={96} x2={96} y2={24} stroke={RED} strokeWidth={10}/>
          {artwork === 'no-stopping' ? <Line x1={24} y1={24} x2={96} y2={96} stroke={RED} strokeWidth={10}/> : null}
        </G>
      ) : null}
      {isBlueCircle ? <Circle cx={60} cy={60} r={51} fill={BLUE} /> : null}
      {artwork === 'turn-left' ? (
        <Path d="M78 99 V62 Q78 39 55 39 H29 M45 22 L28 39 L45 56"
          fill="none" stroke={WHITE} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round"/>
      ) : null}
      {artwork === 'ahead-only' ? (
        <Path d="M60 96 V23 M39 45 L60 23 L81 45"
          fill="none" stroke={WHITE} strokeWidth={13} strokeLinejoin="round" strokeLinecap="round"/>
      ) : null}
      {artwork === 'keep-left' ? (
        <Path d="M89 27 L32 89 M35 63 L31 91 L60 88"
          fill="none" stroke={WHITE} strokeWidth={13} strokeLinejoin="round" strokeLinecap="round"/>
      ) : null}
      {isWarning ? (
        <Polygon points="60,8 115,108 5,108" fill={WHITE} stroke={RED} strokeWidth={9} strokeLinejoin="round"/>
      ) : null}
      {artwork === 'traffic-lights' ? (
        <G>
          <Rect x={48} y={43} width={24} height={55} rx={4} fill={BLACK}/>
          <Circle cx={60} cy={55} r={7} fill={RED}/>
          <Circle cx={60} cy={71} r={7} fill="#F6B333"/>
          <Circle cx={60} cy={87} r={7} fill="#299963"/>
        </G>
      ) : null}
      {artwork === 'crossroads' ? (
        <Path d="M60 41 V98 M33 67 H87" stroke={BLACK} strokeWidth={11} strokeLinecap="square"/>
      ) : null}
      {artwork === 'bend-right' ? (
        <G>
          <Path d="M48 96 V82 C48 54 65 55 77 44" stroke={BLACK} strokeWidth={9} fill="none" strokeLinecap="round"/>
          <Path d="M62 45 L79 40 L81 59" stroke={BLACK} strokeWidth={8} fill="none" strokeLinejoin="round"/>
        </G>
      ) : null}
      {artwork === 'road-narrows' ? (
        <G>
          <Path d="M36 93 L50 46 M84 93 L70 46" stroke={BLACK} strokeWidth={9} strokeLinecap="round"/>
        </G>
      ) : null}
      {artwork === 'roundabout' ? (
        <G>
          <Path d="M58 43 C82 43 87 66 77 79 M77 79 C65 93 44 86 41 71 M41 71 C38 55 45 47 58 43"
            fill="none" stroke={BLACK} strokeWidth={7} strokeLinecap="round"/>
          <Path d="M61 33 L61 50 L74 41 M82 75 L70 81 L83 91 M34 61 L43 72 L53 63"
            fill="none" stroke={BLACK} strokeWidth={6} strokeLinejoin="round"/>
        </G>
      ) : null}
      {artwork === 'slippery' ? (
        <G>
          <Path d="M34 73 L39 60 H81 L87 73 L89 82 H31 Z" fill={BLACK}/>
          <Rect x={47} y={63} width={26} height={8} fill={WHITE}/>
          <Circle cx={41} cy={85} r={7} fill={BLACK}/>
          <Circle cx={79} cy={85} r={7} fill={BLACK}/>
          <Path d="M30 91 Q40 84 30 77 M90 91 Q100 84 90 77" stroke={BLACK} strokeWidth={3} fill="none"/>
        </G>
      ) : null}
      {artwork === 'roadworks' ? (
        <G>
          <Circle cx={60} cy={46} r={9} fill={BLACK}/>
          <Path d="M59 55 L51 74 L74 84 M53 64 L35 71 M65 64 L78 72" stroke={BLACK} strokeWidth={7} fill="none" strokeLinecap="round"/>
          <Path d="M83 49 L74 93 M69 93 H86" stroke={BLACK} strokeWidth={5} fill="none"/>
        </G>
      ) : null}
      {artwork === 'parking' ? (
        <G><Rect x={8} y={8} width={104} height={104} rx={5} fill={BLUE}/>
          <SvgText x={60} y={92} fontSize={82} fontWeight="bold" textAnchor="middle" fill={WHITE}>P</SvgText>
        </G>
      ) : null}
      {artwork === 'one-way' ? (
        <G>
          <Rect x={8} y={24} width={104} height={72} rx={4} fill={BLUE}/>
          <Path d="M25 60 H91 M70 39 L92 60 L70 81" fill="none" stroke={WHITE} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round"/>
        </G>
      ) : null}
      {artwork === 'motorway' ? (
        <G><Rect x={8} y={8} width={104} height={104} rx={4} fill={BLUE}/>
          <Path d="M41 99 L52 25 M79 99 L68 25 M35 49 H85" stroke={WHITE} strokeWidth={9} fill="none"/>
        </G>
      ) : null}
      {artwork === 'no-through-road' ? (
        <G><Rect x={8} y={8} width={104} height={104} rx={4} fill={BLUE}/>
          <Rect x={38} y={30} width={44} height={16} rx={1} fill={RED}/>
          <Rect x={48} y={46} width={24} height={58} fill={WHITE}/>
        </G>
      ) : null}
      {![
        'stop','give-way','no-entry','limit-20','limit-30','limit-40','national-limit',
        'no-waiting','no-stopping','turn-left','ahead-only','keep-left','no-u-turn',
        'traffic-lights','crossroads','bend-right','road-narrows','roundabout',
        'slippery','roadworks','parking','one-way','motorway','no-through-road',
      ].includes(artwork) ? (
        <G><Circle cx={60} cy={60} r={50} fill={WHITE} stroke={BLACK}/>
          <SvgText x={60} y={78} fontSize={52} textAnchor="middle" fill={BLACK}>?</SvgText>
        </G>
      ) : null}
    </Svg>
  );
}
