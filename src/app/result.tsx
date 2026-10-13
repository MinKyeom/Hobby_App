import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResultCard } from '@/components/ResultCard';
import { ShareActions } from '@/components/ShareActions';
import { RESULT_DISCLAIMER } from '@/constants/compliance';
import { colors, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';
import { getAnimalImage } from '@/utils/pexels';
import { saveResultImage, shareViaChannel, type ShareChannel } from '@/utils/share';

export default function ResultScreen() {
  const result = useQuizStore((s) => s.result);
  const reset = useQuizStore((s) => s.reset);
  const cardRef = useRef<View>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!result) {
      router.replace('/');
    }
  }, [result]);

  if (!result) {
    return null;
  }

  const imageMeta = getAnimalImage(result);

  const onShare = async (channel: ShareChannel) => {
    setBusy(true);
    try {
      await shareViaChannel(channel, cardRef, result);
    } finally {
      setBusy(false);
    }
  };

  const onSave = async () => {
    setBusy(true);
    try {
      await saveResultImage(cardRef);
    } finally {
      setBusy(false);
    }
  };

  const onRetry = () => {
    reset();
    router.replace('/');
  };

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(400)}>
            <Text style={styles.headline}>소통 성향 결과</Text>
            <ResultCard
              ref={cardRef}
              animal={result}
              photographer={imageMeta.photographer}
            />
          </Animated.View>

          <View style={styles.shareBlock}>
            <ShareActions
              busy={busy}
              onShare={onShare}
              onSave={onSave}
              onRetry={onRetry}
            />
          </View>

          <Text style={styles.disclaimer}>{RESULT_DISCLAIMER}</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  headline: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 40,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  shareBlock: {
    marginTop: spacing.sm,
  },
  disclaimer: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colors.inkMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
});
