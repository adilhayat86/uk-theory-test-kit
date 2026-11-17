import React, { useEffect, useState } from 'react';
import { AppState, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { caseStudies, isCaseStudyId } from '../data/caseStudies';
import type { CaseStudy } from '../data/caseStudies';
import { colors } from '../theme';

type Props = {
  caseStudyId: string;
  /** Pass route visibility when retaining a screen in the navigation stack. */
  active?: boolean;
};

export default function CaseStudyVideo({ caseStudyId, active = true }: Props) {
  if (!isCaseStudyId(caseStudyId)) {
    return <Text accessibilityRole="alert" style={styles.error}>This video is unavailable. Return to the exam overview and try again.</Text>;
  }
  const study = caseStudies[caseStudyId];
  return <LocalVideo key={study.id} study={study} active={active} />;
}

function LocalVideo({ study, active }: { study: CaseStudy; active: boolean }) {
  const [replayError, setReplayError] = useState(false);
  const player = useVideoPlayer(study.source, (created) => {
    created.loop = false;
    created.muted = true;
    created.allowsExternalPlayback = false;
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEffect(() => {
    if (!active) player.pause();
  }, [active, player]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active') player.pause();
    });
    return () => subscription.remove();
  }, [player]);

  async function replay() {
    setReplayError(false);
    try {
      if (status === 'error') await player.replaceAsync(study.source);
      player.replay();
    } catch {
      setReplayError(true);
    }
  }

  return <View style={styles.frame}>
    <Text style={styles.title}>{study.title}</Text>
    <Text style={styles.description}>{study.description}</Text>
    <VideoView
      player={player}
      style={styles.video}
      contentFit="contain"
      nativeControls
      fullscreenOptions={{ enable: true }}
      allowsPictureInPicture={false}
      accessibilityLabel={'Case study video: ' + study.title}
    />
    {status === 'loading' ? <Text accessibilityLiveRegion="polite" style={styles.description}>Loading offline video…</Text> : null}
    {status === 'error' || replayError ? <Text accessibilityRole="alert" style={styles.error}>The video could not be opened. Try Replay video.</Text> : null}
    <View style={styles.controls}>
      <Pressable accessibilityRole="button" accessibilityLabel={isPlaying ? 'Pause case study video' : 'Play case study video'}
        accessibilityState={{ disabled: !active || status === 'error' }} disabled={!active || status === 'error'}
        onPress={() => { if (isPlaying) player.pause(); else player.play(); }} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause video' : 'Play video'}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Replay case study video" disabled={!active}
        accessibilityState={{ disabled: !active }} onPress={() => { void replay(); }} style={styles.button}>
        <Text style={styles.buttonText}>Replay video</Text>
      </Pressable>
    </View>
    <Text style={styles.note}>{study.durationSeconds}-second silent animation · Replay whenever you need.</Text>
  </View>;
}

const styles = StyleSheet.create({
  frame: { marginVertical: 12, gap: 8 },
  title: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  video: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#17202c', borderRadius: 10 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  button: { minHeight: 44, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.primarySoft, borderRadius: 10, justifyContent: 'center' },
  buttonText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  note: { color: colors.muted, fontSize: 11, lineHeight: 17 },
  error: { color: colors.danger, fontSize: 13, lineHeight: 19 },
});
