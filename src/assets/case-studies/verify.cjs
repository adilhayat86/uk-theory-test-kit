const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const cp=require('node:child_process');
const ts=require('typescript');
function data(file){
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const context={exports:{},require:(asset)=>path.resolve(path.dirname(file),asset)};
 vm.runInNewContext(js,context);return context.exports;
}
const studies=data('src/data/caseStudies.ts').caseStudies;
const questions=data('src/data/caseStudyQuestions.ts').caseStudyQuestions;
if(Object.keys(studies).length!==3||questions.length!==9)throw new Error('Expected3videosand9questions');
const report=[];
for(const [id,study]of Object.entries(studies)){
 const related=questions.filter(q=>q.caseStudyVideoAssetId===id);
 if(related.length!==3)throw new Error('Expected exactly3linkedquestions: '+id);
 for(const q of related){
  if(q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.correctIndex)||q.correctIndex<0||q.correctIndex>3||!q.sourceUrl.startsWith('https://www.gov.uk/'))throw new Error('Invalid question '+q.id);
 }
 const probe=JSON.parse(cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration,size','-show_entries','stream=codec_name,codec_type,width,height,r_frame_rate,pix_fmt','-of','json',study.source],{encoding:'utf8'}));
 if(probe.streams.length!==1||probe.streams[0].codec_type!=='video'||probe.streams[0].codec_name!=='h264'||probe.streams[0].pix_fmt!=='yuv420p'||Number(probe.format.duration)!==study.durationSeconds)throw new Error('Invalidvideo '+id);
 report.push({id,duration:Number(probe.format.duration),bytes:Number(probe.format.size),video:probe.streams[0],questionIds:related.map(q=>q.id)});
}
if(new Set(questions.map(q=>q.id)).size!==questions.length)throw new Error('Duplicate questions');
const config=require('expo/metro-config').getDefaultConfig(process.cwd());
if(!config.resolver.assetExts.includes('mp4'))throw new Error('MetroMP4assetextensionmissing');
fs.writeFileSync('src/assets/case-studies/verification.json',JSON.stringify({validatedAt:'2026-11-17',sourceChecks:'PrimaryGOVreferences; independenthumanreviewpending',studies:report},null,2)+'\n');
console.log(JSON.stringify(report,null,2));
