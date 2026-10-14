import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyRedirect } from '@/components/EmptyRedirect';
import { ResultCard } from '@/components/ResultCard';
import { ShareActions } from '@/components/ShareActions';
import { APP_NAME_SHORT } from '@/constants/brand';
import { RESULT_DISCLAIMER } from '@/constants/compliance';
import { colors, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';
import { getAnimalImage } from '@/utils/pexels';
import { saveResultImage, shareViaChannel, type ShareChannel } from '@/utils/share';

export default function ResultScreen() {
  const result = useQuizStore((s) => s.result);
  const abilities = useQuizStore((s) => s.abilities);
  const role = useQuizStore((s) => s.role);
  const reset = useQuizStore((s) => s.reset);
  const cardRef = useRef<View>(null);
  const [busy, setBusy] = useState(false);

  if (!result || !role) {
    return <EmptyRedirect message="결과가 없어요. 홈으로 이동해요" />;
  }

  const imageMeta = getAnimalImage(result);

  const onShare = async (channel: ShareChannel) => {
    setBusy(true);
    try {
      await shareViaChannel(channel, cardRef, result, abilities);
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
    <LinearGradient colors={[colors.bgTop, colors.bgMid, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(400)}>
            <Text style={styles.eyebrow}>{APP_NAME_SHORT}</Text>
            <Text style={styles.headline} accessibilityRole="header">
              짠! 당신의 동물은
            </Text>
            <Text style={styles.subhead}>
              {result.emoji} {result.animalName}
            </Text>
            <ResultCard
              ref={cardRef}
              animal={result}
              photographer={imageMeta.photographer}
              abilities={abilities}
              role={role}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(120).duration(400)} style={styles.shareBlock}>
            <ShareActions
              busy={busy}
              onShare={onShare}
              onSave={onSave}
              onRetry={onRetry}
            />
          </Animated.View>

          <Text style={styles.disclaimer} accessibilityRole="text">
            {RESULT_DISCLAIMER}
          </Text>
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
  eyebrow: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  headline: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 40,
    color: colors.accent,
    textAlign: 'center',
  },
  subhead: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.md,
    marginTop: 4,
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
