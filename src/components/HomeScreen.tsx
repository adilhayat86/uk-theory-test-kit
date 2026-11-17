import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { PracticeSession } from '../domain/practiceSession';
import type { LearningOverview } from '../domain/learningProgress';
import { colors } from '../theme';

type Props = { session: PracticeSession | null; overview: LearningOverview;
  onNext: () => void; onResume: () => void; onProgress: () => void };
export default function HomeScreen({session,overview,onNext,onResume,onProgress}:Props) {
  const unfinished=!!session && session.currentIndex<session.questionIds.length;
  return <View style={s.screen}>
    <Text accessibilityRole="header" style={s.title}>Your progress</Text>
    <Pressable accessibilityRole="button" accessibilityLabel="View progress details" onPress={onProgress} style={s.card}>
      <Text style={s.count}>{overview.tried} / {overview.total}</Text>
      <Text style={s.body}>questions explored</Text>
      <View accessibilityRole="progressbar" accessibilityLabel="Question coverage" accessibilityValue={{min:0,max:100,now:overview.coveragePercent}} style={s.track}>
        <View style={[s.fill,{width:`${overview.coveragePercent}%`}]} />
      </View>
      <Text style={s.body}>{overview.correctLastTime} correct last try · {overview.needsReview} to revisit</Text>
      <Text style={s.link}>View progress details ›</Text>
    </Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel={unfinished?'Continue practice':'Start practice'}
      onPress={unfinished?onResume:onNext} style={s.primary}>
      <Text style={s.primaryText}>{unfinished?'Continue practice':'Start practice'}</Text>
    </Pressable>
    <Text style={s.hint}>{unfinished?`Question ${session.currentIndex+1} of ${session.questionIds.length}`:'Up to 10 questions, chosen for you'}</Text>
    {session&&!unfinished?<Pressable accessibilityRole="button" accessibilityLabel="Review last practice result" onPress={onResume} style={s.secondary}>
      <Text style={s.link}>Review last result</Text></Pressable>:null}
  </View>;
}
const s=StyleSheet.create({
  screen:{gap:16},title:{fontSize:24,fontWeight:'800',color:colors.ink,marginTop:8},
  card:{padding:20,borderRadius:16,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border},
  count:{fontSize:32,fontWeight:'800',color:colors.ink},body:{fontSize:13,lineHeight:21,color:colors.muted,marginTop:5},
  track:{height:7,backgroundColor:colors.primarySoft,borderRadius:4,overflow:'hidden',marginVertical:16},
  fill:{height:7,backgroundColor:colors.primary},link:{fontSize:13,color:colors.primary,fontWeight:'700',marginTop:12},
  primary:{backgroundColor:colors.primary,minHeight:52,padding:14,borderRadius:12,alignItems:'center',justifyContent:'center'},
  primaryText:{color:colors.white,fontSize:16,fontWeight:'700'},hint:{color:colors.muted,fontSize:12,textAlign:'center'},
  secondary:{minHeight:44,alignItems:'center',justifyContent:'center'}
});
