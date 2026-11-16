import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { LearningOverview, TopicLearningProgress } from '../domain/learningProgress';
import { colors } from '../theme';

export function CoverageCard({overview,onPress}:{overview:LearningOverview;onPress?:()=>void}) {
  const body=<>
    <View style={s.heading}><Text style={s.kicker}>QUESTION COVERAGE</Text>{onPress ? <Text style={s.details}>Details ↗</Text> : null}</View>
    <View style={s.metricRow}><Text style={s.percent}>{overview.coveragePercent}<Text style={s.percentSign}>%</Text></Text>
      <View style={s.metricCopy}><Text style={s.fraction}>{overview.tried} / {overview.total}</Text><Text style={s.whiteBody}>questions explored</Text></View></View>
    <View accessibilityRole="progressbar" accessibilityLabel="Question bank coverage" accessibilityValue={{min:0,max:100,now:overview.coveragePercent}} style={s.track}>
      <View style={[s.segment,{backgroundColor:colors.lime,width:`${overview.total ? overview.correctLastTime/overview.total*100:0}%`}]} />
      <View style={[s.segment,{backgroundColor:'#F1BA94',width:`${overview.total ? overview.needsReview/overview.total*100:0}%`}]} />
    </View>
    <View style={s.legend}>
      <Legend color={colors.lime} text={`${overview.correctLastTime} correct last try`} />
      <Legend color="#F1BA94" text={`${overview.needsReview} to revisit`} />
      <Legend color="#8F87EF" text={`${overview.unseen} unseen`} />
    </View>
  </>;
  return onPress ? <Pressable accessibilityRole="button" accessibilityLabel={`View your learning progress, ${overview.tried} of ${overview.total} questions explored, ${overview.correctLastTime} correct last try, ${overview.needsReview} to revisit, ${overview.unseen} unseen`} onPress={onPress} style={s.hero}>{body}</Pressable>
    : <View style={s.hero}>{body}</View>;
}
function Legend({color,text}:{color:string;text:string}) {
  return <View style={s.legendItem}><View accessible={false} style={[s.dot,{backgroundColor:color}]} /><Text style={s.legendText}>{text}</Text></View>;
}

export function TopicProgressRow({item,onPress}:{item:TopicLearningProgress;onPress:()=>void}) {
  const status=item.tried===0?'Not started':item.needsReview>0?`${item.needsReview} to revisit`:item.unseen>0?'Keep exploring':'All correct last try';
  return <Pressable accessibilityRole="button" accessibilityLabel={`Study ${item.topic}, ${item.tried} of ${item.total} explored, ${status}`} onPress={onPress} style={s.topic}>
    <View style={s.topicTop}><Text style={s.topicTitle}>{item.topic}</Text><Text accessible={false} style={s.arrow}>↗</Text></View>
    <View style={s.topicTrack}><View style={[s.topicFill,{width:`${item.coveragePercent}%`}]} /></View>
    <View style={s.topicBottom}><Text style={s.topicDetail}>{item.tried}/{item.total} explored</Text><Text style={[s.status,item.needsReview>0&&s.review]}>{status}</Text></View>
  </Pressable>;
}

const s=StyleSheet.create({
  hero:{backgroundColor:colors.primary,borderRadius:23,padding:20},
  heading:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'},
  kicker:{color:colors.white,fontSize:10,fontWeight:'800',letterSpacing:1},
  details:{color:'#E1DEFF',fontSize:11,fontWeight:'700'},
  metricRow:{flexDirection:'row',alignItems:'center',gap:18,flexWrap:'wrap',marginTop:12,marginBottom:18},
  percent:{fontSize:52,fontWeight:'900',color:colors.white,letterSpacing:-2},
  percentSign:{fontSize:27,letterSpacing:-1},
  metricCopy:{flexShrink:1},fraction:{fontSize:17,color:colors.white,fontWeight:'800'},
  whiteBody:{fontSize:12,color:'#E1DEFF',marginTop:3},
  track:{height:10,backgroundColor:'#6E65DE',borderRadius:6,overflow:'hidden',flexDirection:'row'},
  segment:{height:10},legend:{flexDirection:'row',gap:10,flexWrap:'wrap',marginTop:14},
  legendItem:{flexDirection:'row',alignItems:'center',gap:5},dot:{width:6,height:6,borderRadius:3},
  legendText:{color:colors.white,fontSize:10,lineHeight:15},
  topic:{padding:15,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface,borderRadius:16,marginBottom:9,minHeight:88},
  topicTop:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8},
  topicTitle:{fontSize:14,fontWeight:'800',color:colors.ink,flexShrink:1},arrow:{fontSize:18,color:colors.primary},
  topicTrack:{height:4,borderRadius:3,backgroundColor:colors.primarySoft,marginTop:11,overflow:'hidden'},
  topicFill:{height:4,backgroundColor:colors.primary,borderRadius:3},
  topicBottom:{flexDirection:'row',gap:8,justifyContent:'space-between',flexWrap:'wrap',marginTop:8},
  topicDetail:{fontSize:10,color:colors.muted},status:{fontSize:10,color:colors.primary,fontWeight:'700'},review:{color:'#9E4826'},
});
