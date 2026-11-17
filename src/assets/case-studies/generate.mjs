import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const require=createRequire(import.meta.url);
const sharp=require(process.env.CASE_STUDY_SHARP_MODULE || 'sharp');
const dir=path.dirname(fileURLToPath(import.meta.url));
const WIDTH=960,HEIGHT=540,FPS=20,SECONDS=20;
const C={ink:'#202b3b',road:'#5b6572',edge:'#e6e2d5',grass:'#d9e7ca',blue:'#2e66d4',gray:'#e3e9ee',red:'#b84d57'};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=(v)=>{v=clamp(v);return v*v*(3-2*v);};
function rect(x,y,w,h,fill,rx=0,extra=''){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;}
function text(x,y,value,size=16,fill=C.ink,weight=500){return `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${value}</text>`;}
function car(x,y,color=C.blue,dir=1,brake=false,van=false){
 return `<g transform="translate(${x} ${y}) scale(${dir} 1)">${rect(-34,-19,68,38,'#142331',10)}${rect(-32,-17,64,34,color,9)}${rect(-15,-13,30,26,van?'#b7c2cb':'#edf5fc',5)}${rect(14,-11,7,22,'#34485e',2)}${rect(-21,-11,5,22,'#34485e',2)}${rect(-25,-20,12,4,'#273342',2)}${rect(15,-20,12,4,'#273342',2)}${rect(-25,16,12,4,'#273342',2)}${rect(15,16,12,4,'#273342',2)}${rect(28,-12,4,7,'#ffeeb1',1)}${rect(28,5,4,7,'#ffeeb1',1)}${rect(-32,-12,4,7,brake?'#ff5353':'#a83942',1)}${rect(-32,5,4,7,brake?'#ff5353':'#a83942',1)}</g>`;
}
function cyclist(x,y,t){const a=Math.sin(t*6)*4;return `<g transform="translate(${x} ${y})"><ellipse cx="-13" cy="0" rx="9" ry="3.5" fill="none" stroke="#202b3b" stroke-width="3"/><ellipse cx="15" cy="0" rx="9" ry="3.5" fill="none" stroke="#202b3b" stroke-width="3"/><path d="M-13 0L0 -6L15 0L-4 4Z" fill="none" stroke="#e1a14e" stroke-width="3"/><path d="M-3 -9L${a} -15M-3 8L${-a} 14" stroke="#273442" stroke-width="4" stroke-linecap="round"/><ellipse cx="1" cy="0" rx="10" ry="7" fill="#e2a743"/><circle cx="9" cy="0" r="5" fill="#f5d3a8"/></g>`;}
function person(x,y,t){const a=Math.sin(t*5)*4;return `<g transform="translate(${x} ${y})"><path d="M-5 6L${-5+a} 16M5 6L${5-a} 16M-7 0L-12 6M7 0L12 6" fill="none" stroke="#25364b" stroke-width="5" stroke-linecap="round"/><ellipse cy="0" rx="9" ry="10" fill="#d29445"/><circle cy="-13" r="7" fill="#f1c69f"/></g>`;}
function base(title,subtitle){return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">${rect(0,0,960,540,'#f6f7f2')}${rect(0,0,960,83,'#ffffff')}${text(28,34,title,23,C.ink,700)}${text(28,62,subtitle,15,'#627083')}${rect(756,21,15,15,C.blue,4)}${text(780,34,'Your vehicle',15)}${rect(0,83,960,400,C.grass)}`;}
function finish(svg){return svg+rect(0,483,960,57,'#ffffff')+text(28,516,'Original animated driving scenario · Great Britain · Silent video',15,'#627083')+'</svg>';}
function twoWay(){let s=rect(0,144,960,262,C.edge)+rect(0,170,960,210,C.road);s+=`<path d="M0 275H960" stroke="#f8f5e8" stroke-width="3" stroke-dasharray="30 24"/>`;s+=`<path d="M0 173H960M0 377H960" stroke="#f8f5e8" stroke-width="3"/>`;s+=text(35,126,'→',24,'#6d7d67',700)+text(896,435,'←',24,'#6d7d67',700);return s;}
function zebra(t){let s=base('A town road','Watch the vehicles and the pedestrian.')+twoWay().replace('M0 275H960','M0 275H490M625 275H960');
 for(let y=178;y<378;y+=28)s+=rect(525,y,60,16,'#fffdf2');
 s+=`<path d="M486 182V262M623 288V368" stroke="#fffdf2" stroke-width="4" stroke-dasharray="8 6"/>`;
 for(const [x,y] of [[507,154],[603,396]]){s+=`<path d="M${x} ${y-12}V${y+12}" stroke="#263240" stroke-width="5"/>`;s+=`<circle cx="${x}" cy="${y-12}" r="9" fill="${Math.floor(t*2)%2?'#ffd063':'#f3b23d'}" stroke="#263240" stroke-width="2"/>`;}
 for(const yy of [182,368])for(const xx of [330,630])s+=`<path d="M${xx} ${yy}l20 -8l20 8l20 -8l20 8l20 -8l20 8l20 -8" fill="none" stroke="#fffdf2" stroke-width="2"/>`;
 const blue=t<4?140+300*ease(t/4):t<15?440:440+500*ease((t-15)/5);
 const other=t<4?890-230*ease(t/4):t<15?660:660-610*ease((t-15)/5);
 const py=t<5?152:t<13?152+250*ease((t-5)/8):402;
 s+=car(other,325,C.gray,-1,t>=4&&t<15)+car(blue,224,C.blue,1,t>=4&&t<15)+person(555,py,t);
 s+=rect(32,423,150,33,'#c5d6b5',12)+rect(762,104,155,31,'#c5d6b5',12);return finish(s);
}
function rain(t){let s='';for(let i=0;i<85;i++){let x=(i*83+t*55)%1000-20,y=90+(i*43+t*100)%380;s+=`<path d="M${x} ${y}l-8 16" stroke="#dcebf9" stroke-width="2" opacity=".55"/>`;}return s;}
function wet(t){let s=base('A wet dual carriageway','Watch the spacing between the two cars.')+rect(0,126,960,318,C.edge)+rect(0,144,960,137,'#5c6d7b')+rect(0,300,960,127,'#5c6d7b');
 s+=`<path d="M0 214H960M0 365H960" stroke="#edf0ed" stroke-width="3" stroke-dasharray="27 23"/><path d="M0 148H960M0 276H960M0 304H960M0 422H960" stroke="#edf0ed" stroke-width="3"/>`;
 s+=rect(0,282,960,17,'#aab7a0')+`<path d="M0 290H960" stroke="#e3e8e0" stroke-width="3"/>`;
 const lead=400+22*t,blue=180+(t<4?22*t:88+11*(t-4));
 s+=car(lead,181,C.gray)+car(blue,181,C.blue)+car(890-28*t,397,'#b6c7d0',-1);
 s+=rect(562,107,6,28,'#798976')+rect(554,104,22,17,'#eff3e5',3);
 s+=rain(t);return finish(s);
}
function cyclistScene(t){let s=base('A road with parked vehicles','Watch the cyclist, the blue car and oncoming traffic.')+twoWay();
 s+=car(505,190,'#d7dce0',1,false,true)+car(720,190,'#c6cfd6',1,false,true);
 const bike=420+6*t;
 const bikeY=225+22*ease((t-3)/5);
 let blue=210+6*Math.min(t,12)+65*Math.max(0,t-12);
 const y=t<12?225:t<14?225+100*ease((t-12)/2):t<18?325:325-100*ease((t-18)/2);
 const oncoming=1010-85*t;
 s+=cyclist(bike,bikeY,t)+car(oncoming,325,C.red,-1)+car(blue,y,C.blue,1,t>=6&&t<12);
 return finish(s);
}
const scenes=[['town-crossing',zebra],['wet-following-gap',wet],['cyclist-and-parked-vehicles',cyclistScene]];
for(const [id,scene] of scenes){
 const target=path.join(dir,id+'.mp4');
 const proc=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgba','-video_size',`${WIDTH}x${HEIGHT}`,'-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',target],{stdio:['pipe','inherit','inherit']});
 const done=once(proc,'close');
 for(let i=0;i<FPS*SECONDS;i++){
  const svg=scene(i/FPS);
  const raw=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
  if(!proc.stdin.write(raw))await once(proc.stdin,'drain');
 }
 proc.stdin.end();const [code]=await done;if(code!==0)throw new Error(`ffmpeg failed for ${id}: ${code}`);
 for(const sec of [0,8,16]){
  const svg=scene(sec);fs.writeFileSync(path.join(dir,'review-frames',`${id}-${sec}s.svg`),svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir,'review-frames',`${id}-${sec}s.png`));
 }
 console.log(id,fs.statSync(target).size,'bytes');
}
