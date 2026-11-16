import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { LearningOverview } from '../domain/learningProgress';
import type { ProgressSummary } from '../domain/progress';
import { colors } from '../theme';
import { CoverageCard, TopicProgressRow } from './LearningOverview';
import TimedProgress from './TimedProgress';

type Props={overview:LearningOverview;summary:ProgressSummary;active:boolean;onNew:()=>void;onRetry:()=>void;onMixed:()=>void;onTimed:()=>void;onTopic:(topic:string)=>void};
export default function ProgressScreen({overview,summary,active,onNew,onRetry,onMixed,onTimed,onTopic}:Props) {
  const topicsStarted=overview.topics.filter(t=>t.tried>0).length;
  return <View>
    <Text style={s.eyebrow}>EVERY ANSWER MOVES YOU FORWARD</Text>
    <Text accessibilityRole="header" style={s.title}>Your progress</Text>
    <Text style={s.subtitle}>A clear picture of what you have explored and what needs another look.</Text>
    <CoverageCard overview={overview} />
    <View style={s.accuracy}>
      <Text style={s.accuracyValue}>{summary.totalAttempts ? `${summary.accuracyPercent}%` : '—'}</Text>
      <View style={s.accuracyCopy}><Text style={s.cardTitle}>Answer accuracy</Text><Text style={s.body}>{summary.correctAttempts} correct across {summary.totalAttempts} attempts</Text></View>
    </View>
    <Text accessibilityRole="header" style={s.sectionTitle}>Your learning route</Text>
    <Goal number="01" title="Explore the question bank" detail={`${overview.tried} of ${overview.total} questions · ${topicsStarted} of ${overview.topics.length} topics started`}
      action={overview.unseen>0?'Explore new questions':'Revisit the full bank'} onPress={overview.unseen>0?onNew:onMixed} />
    <Goal number="02" title="Work through your mistakes" detail={overview.tried===0?'Your latest mistakes will appear here after practice.':overview.needsReview>0?`${overview.needsReview} questions were incorrect on your last try.`:'No unresolved mistakes in the questions you have tried.'}
      action={overview.needsReview>0?'Revisit mistakes':undefined} onPress={onRetry} />
    <Goal number="03" title="Keep building your knowledge" detail={`${overview.correctLastTime} questions correct on the last try. A mixed session helps you check them again.`}
      action="Start mixed practice" onPress={onMixed} />
    <Text accessibilityRole="header" style={s.sectionTitle}>Progress by topic</Text>
    {overview.topics.map(item=><TopicProgressRow key={item.topic} item={item} onPress={()=>onTopic(item.topic)} />)}
    {active ? <TimedProgress onOpen={onTimed} /> : null}
    <View style={s.note}><Text style={s.cardTitle}>What these numbers mean</Text>
      <Text style={s.body}>Coverage counts questions you have answered. Correct last try and to revisit use your most recent answer; they change as you practise. Accuracy includes repeated attempts.</Text>
      <Text style={s.body}>These are study measures for this {overview.total}-question bank, not a prediction of an official test result. Progress stays on this device.</Text></View>
  </View>;
}
function Goal({number,title,detail,action,onPress}:{number:string;title:string;detail:string;action?:string;onPress:()=>void}) {
  return <View style={s.goal}><View style={s.goalHeading}><Text style={s.number}>{number}</Text><Text style={s.cardTitle}>{title}</Text></View>
    <Text style={s.body}>{detail}</Text>{action ? <Pressable accessibilityRole="button" onPress={onPress} style={s.goalAction}><Text style={s.actionText}>{action} →</Text></Pressable> : null}</View>;
}
const s=StyleSheet.create({
  eyebrow:{color:colors.primary,fontSize:9,fontWeight:'800',letterSpacing:1},
  title:{fontSize:29,color:colors.ink,fontWeight:'900',marginTop:8},
  subtitle:{fontSize:13,lineHeight:20,color:colors.muted,marginTop:6,marginBottom:19},
  accuracy:{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:16,padding:16,flexDirection:'row',alignItems:'center',gap:16,flexWrap:'wrap',marginTop:12},
  accuracyValue:{fontSize:30,fontWeight:'900',color:colors.primary},accuracyCopy:{flexShrink:1},
  cardTitle:{fontSize:14,fontWeight:'800',color:colors.ink,flexShrink:1},
  body:{fontSize:12,lineHeight:19,color:colors.muted,marginTop:5},
  sectionTitle:{fontSize:19,fontWeight:'800',color:colors.ink,marginTop:23,marginBottom:12},
  goal:{borderRadius:17,padding:17,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface,marginBottom:10},
  goalHeading:{flexDirection:'row',alignItems:'center',gap:10},number:{fontSize:11,fontWeight:'900',color:colors.primary,backgroundColor:colors.primarySoft,padding:8,borderRadius:8},
  goalAction:{minHeight:44,justifyContent:'center',marginTop:6},actionText:{fontSize:12,fontWeight:'800',color:colors.primary},
  note:{borderRadius:17,padding:17,backgroundColor:colors.primarySoft,marginTop:12},
});
