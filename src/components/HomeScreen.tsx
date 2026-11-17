import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { brandAssets } from '../data/brandAssets';
import type { PracticeSession } from '../domain/practiceSession';
import type { LearningOverview } from '../domain/learningProgress';
import { colors } from '../theme';
import { CoverageCard, TopicProgressRow } from './LearningOverview';

type Props = {
  session: PracticeSession | null; overview: LearningOverview;
  onNext: () => void; onResume: () => void; onDiscard: () => void;
  onPractice: () => void; onProgress: () => void; onTopic: (topic: string) => void;
  onPicturePractice: () => void; onSigns: () => void; onFlashcards: () => void;
  onTimed: () => void; onArtworkReview?: () => void;
};

export default function HomeScreen({ session, overview, onNext, onResume, onDiscard,
  onPractice, onProgress, onTopic, onPicturePractice, onSigns, onFlashcards, onTimed, onArtworkReview }: Props) {
  const unfinished = session !== null && session.currentIndex < session.questionIds.length;
  const focusTopics = [...overview.topics].sort((a,b) => b.needsReview-a.needsReview || a.coveragePercent-b.coveragePercent).slice(0,3);
  const nextTitle = overview.needsReview > 0 ? 'Turn mistakes into progress.'
    : overview.unseen > 0 ? 'Discover something new.' : 'Keep your knowledge fresh.';
  return <View>
    <Text style={s.eyebrow}>YOUR LEARNING JOURNEY</Text>
    <Text accessibilityRole="header" style={s.title}>One step closer.</Text>
    <Text style={s.subtitle}>See where you are. Know what to do next.</Text>
    <CoverageCard overview={overview} onPress={onProgress} />
    <View style={s.next}>
      <View style={s.nextHeading}><Text style={s.eyebrow}>YOUR NEXT STEP</Text><View style={s.badge}><Text style={s.badgeText}>PERSONAL TO YOU</Text></View></View>
      <Text style={s.nextTitle}>{unfinished ? 'Pick up your saved session.' : nextTitle}</Text>
      <Text style={s.body}>{unfinished ? `Question ${session.currentIndex+1} of ${session.questionIds.length} · your answers are saved.`
        : overview.needsReview > 0 ? `${overview.needsReview} questions need another look. Start with up to 10, chosen from your latest mistakes.`
        : overview.unseen > 0 ? `${overview.unseen} questions still to explore. Take up to 10 at your own pace.`
        : 'A mixed session helps you revisit the questions you have explored.'}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={unfinished ? 'Continue practice' : 'Start next session'}
        onPress={unfinished ? onResume : onNext} style={s.primary}>
        <Text style={s.primaryText}>{unfinished ? 'Continue session' : 'Start next session'}  →</Text>
      </Pressable>
      {session && !unfinished ? <Pressable accessibilityRole="button" accessibilityLabel="Review last practice result"
        onPress={onResume} style={s.textButton}>
        <Text style={s.link}>Review last practice result →</Text>
      </Pressable> : null}
      {session ? <Pressable accessibilityRole="button" accessibilityLabel="Discard practice session" onPress={onDiscard} style={s.textButton}>
        <Text style={s.smallLink}>{unfinished ? 'Discard this session' : 'Clear last session'}</Text>
      </Pressable> : <Text style={s.footnote}>Study answers update your question coverage.</Text>}
    </View>
    <View style={s.sectionHeading}><Text accessibilityRole="header" style={s.sectionTitle}>Your focus areas</Text>
      <Pressable accessibilityRole="button" onPress={onProgress} style={s.sectionLink}><Text style={s.link}>View all →</Text></Pressable></View>
    {focusTopics.map(topic => <TopicProgressRow key={topic.topic} item={topic} onPress={() => onTopic(topic.topic)} />)}
    <Text accessibilityRole="header" style={[s.sectionTitle,{marginTop:20,marginBottom:12}]}>Learn your way</Text>
    <View style={s.grid}>
      <Tool title="Picture practice" detail="Learn with illustrations" icon="signs" onPress={onPicturePractice} />
      <Tool title="Flashcards" detail="Think, then reveal" icon="flashcards" onPress={onFlashcards} />
      <Tool title="Road signs" detail="Learn in context" icon="signs" onPress={onSigns} />
      <Tool title="Timed practice" detail="A short knowledge check" icon="timed" onPress={onTimed} />
    </View>
    <Pressable accessibilityRole="button" onPress={onPractice} style={s.textButton}><Text style={s.link}>Browse all topics and practice options →</Text></Pressable>
    <Text style={s.scope}>Great Britain car theory · works offline</Text>
    {onArtworkReview ? <Pressable accessibilityRole="button" accessibilityLabel="My images" onPress={onArtworkReview} style={s.textButton}>
      <Text style={s.smallLink}>My images · draft collection</Text>
    </Pressable> : null}
  </View>;
}

function Tool({title,detail,icon,onPress}:{title:string;detail:string;icon:keyof typeof brandAssets;onPress:()=>void}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title==='Picture practice'?'Start picture practice':title} onPress={onPress} style={s.tool}>
    <Image accessible={false} source={brandAssets[icon]} style={s.icon} />
    <Text style={s.toolTitle}>{title}</Text><Text style={s.toolDetail}>{detail}</Text>
  </Pressable>;
}

const s=StyleSheet.create({
  eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.2,color:colors.primary},
  title:{fontSize:29,fontWeight:'900',color:colors.ink,marginTop:7},
  subtitle:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:6,marginBottom:20},
  next:{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:22,padding:18,marginTop:16},
  nextHeading:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8,flexWrap:'wrap'},
  badge:{backgroundColor:colors.lime,borderRadius:6,paddingHorizontal:7,paddingVertical:5},
  badgeText:{fontSize:8,fontWeight:'800',letterSpacing:0.6,color:colors.ink},
  nextTitle:{fontSize:21,lineHeight:28,fontWeight:'800',color:colors.ink,marginTop:13},
  body:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:8},
  primary:{backgroundColor:colors.primary,padding:14,minHeight:50,alignItems:'center',justifyContent:'center',borderRadius:13,marginTop:16},
  primaryText:{color:colors.white,fontSize:14,fontWeight:'800'},
  footnote:{fontSize:10,lineHeight:16,color:colors.muted,textAlign:'center',marginTop:10},
  textButton:{minHeight:44,paddingVertical:12,alignItems:'center',justifyContent:'center'},
  smallLink:{fontSize:11,color:colors.muted,fontWeight:'700'},
  sectionHeading:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10,marginTop:18,marginBottom:5},
  sectionTitle:{fontSize:18,fontWeight:'800',color:colors.ink,flexShrink:1},
  sectionLink:{minHeight:44,justifyContent:'center',paddingHorizontal:3},
  link:{fontSize:12,lineHeight:19,color:colors.primary,fontWeight:'800'},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  tool:{width:'47%',flexGrow:1,borderRadius:16,padding:15,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface},
  icon:{width:25,height:25,marginBottom:10},
  toolTitle:{fontSize:14,fontWeight:'800',color:colors.ink},
  toolDetail:{fontSize:11,lineHeight:17,color:colors.muted,marginTop:4},
  scope:{fontSize:10,color:colors.muted,textAlign:'center',marginTop:12},
});
