import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyRedirect } from '@/components/EmptyRedirect';
import { ResultCard } from '@/components/ResultCard';
import { ShareActions } from '@/components/ShareActions';
import { RESULT_DISCLAIMER } from '@/constants/compliance';
import { colors, radii, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';
import { getAnimalImage } from '@/utils/pexels';
import { saveResultImage, shareViaChannel, type ShareChannel } from '@/utils/share';

export default function ResultScreen() {
  const result = useQuizStore((s) => s.result);
  const abilities = useQuizStore((s) => s.abilities);
  const role = useQuizStore((s) => s.role);
  const reset = useQuizStore((s) => s.reset);
  const cardRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
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

  const scrollToShare = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgMid, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(350)}>
            <Text style={styles.kicker}>오늘의 결과</Text>
            <Text style={styles.headline} accessibilityRole="header">
              {result.emoji} {result.animalName}
            </Text>
            <Text style={styles.subhead}>아래에서 저장하거나 SNS로 공유해 보세요</Text>
            <ResultCard
              ref={cardRef}
              animal={result}
              photographer={imageMeta.photographer}
              abilities={abilities}
              role={role}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(100).duration(350)} style={styles.shareBlock}>
            <ShareActions busy={busy} onShare={onShare} onSave={onSave} hideSave />
          </Animated.View>

          <Text style={styles.disclaimer} accessibilityRole="text">
            {RESULT_DISCLAIMER}
          </Text>
        </ScrollView>

        {/* 하단 고정: 저장 / 공유로 이동 / 다시하기 */}
        <SafeAreaView edges={['bottom']} style={styles.stickyWrap}>
          <View style={styles.stickyBar}>
            <Pressable
              disabled={busy}
              onPress={onSave}
              accessibilityRole="button"
              accessibilityLabel="결과 이미지 저장"
              style={({ pressed }) => [styles.stickyPrimary, pressed && styles.pressed]}
            >
              {busy ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <FontAwesome6 name="download" size={14} color={colors.white} />
                  <Text style={styles.stickyPrimaryText}>저장</Text>
                </>
              )}
            </Pressable>
            <Pressable
              onPress={scrollToShare}
              accessibilityRole="button"
              accessibilityLabel="공유 영역으로 이동"
              style={({ pressed }) => [styles.stickySecondary, pressed && styles.pressed]}
            >
              <FontAwesome6 name="share-nodes" size={14} color={colors.accent} />
              <Text style={styles.stickySecondaryText}>공유</Text>
            </Pressable>
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              accessibilityLabel="다시 진단하기"
              style={({ pressed }) => [styles.stickyGhost, pressed && styles.pressed]}
            >
              <Text style={styles.stickyGhostText}>다시하기</Text>
            </Pressable>
          </View>
        </SafeAreaView>
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
    paddingBottom: 110,
    gap: spacing.xl,
  },
  kicker: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 4,
  },
  headline: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 40,
    color: colors.accent,
    textAlign: 'center',
    lineHeight: 48,
  },
  subhead: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    color: colors.inkMuted,
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
  stickyWrap: {
    backgroundColor: 'rgba(255,251,245,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  stickyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingTop: 10,
    paddingBottom: 8,
  },
  stickyPrimary: {
    flex: 1.2,
    minHeight: 48,
    borderRadius: radii.md,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  stickyPrimaryText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 15,
    color: colors.white,
  },
  stickySecondary: {
    flex: 1,
    minHeight: 48,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  stickySecondaryText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 15,
    color: colors.accent,
  },
  stickyGhost: {
    paddingHorizontal: 10,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyGhostText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
  },
  pressed: {
    opacity: 0.88,
  },
});
