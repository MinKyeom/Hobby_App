import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrivacyModal } from '@/components/PrivacyModal';
import { APP_NAME, APP_SUBTITLE, APP_TAGLINE } from '@/constants/brand';
import { APP_PURPOSE } from '@/constants/compliance';
import { colors, radii, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';
import type { Role } from '@/types/quiz';

export default function HomeScreen() {
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const go = (role: Role) => {
    startQuiz(role);
    router.push('/quiz');
  };

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgMid, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <Animated.View entering={FadeInDown.duration(450)} style={styles.blobRow}>
            <Text style={styles.blob}>🦁</Text>
            <Text style={styles.blob}>🐼</Text>
            <Text style={styles.blob}>🐧</Text>
            <Text style={styles.blob}>🦊</Text>
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(60).duration(500)} style={styles.brand}>
            {APP_NAME}
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(120).duration(500)} style={styles.title}>
            {APP_TAGLINE}
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(180).duration(500)} style={styles.subtitle}>
            {APP_SUBTITLE}
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(220).duration(500)} style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>부하편 · 상사편</Text>
            </View>
            <View style={[styles.chip, styles.chipAlt]}>
              <Text style={styles.chipText}>5문항 분기</Text>
            </View>
            <View style={[styles.chip, styles.chipSun]}>
              <Text style={styles.chipText}>___력 리포트</Text>
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(260).duration(500)} style={styles.note}>
            {APP_PURPOSE}
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(300).duration(500)} style={styles.guest}>
            회원가입 없이 바로 · 실명/회사명 입력 없음
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(280).duration(500)} style={styles.actions}>
          <Pressable
            onPress={() => go('boss')}
            accessibilityRole="button"
            accessibilityLabel="상사편 진단 시작"
            style={({ pressed }) => [styles.cta, styles.bossCta, pressed && styles.pressed]}
          >
            <View style={[styles.emojiBubble, styles.bossBubble]}>
              <Text style={styles.ctaEmoji}>🦁</Text>
            </View>
            <View style={styles.ctaTextWrap}>
              <Text style={styles.ctaTitle}>상사편 진단</Text>
              <Text style={styles.ctaDesc}>배분력 · 멘탈케어력 · 몰입조율력</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </Pressable>

          <Pressable
            onPress={() => go('employee')}
            accessibilityRole="button"
            accessibilityLabel="부하편 진단 시작"
            style={({ pressed }) => [styles.cta, styles.empCta, pressed && styles.pressed]}
          >
            <View style={[styles.emojiBubble, styles.empBubble]}>
              <Text style={styles.ctaEmoji}>🐝</Text>
            </View>
            <View style={styles.ctaTextWrap}>
              <Text style={styles.ctaTitle}>부하편 진단</Text>
              <Text style={styles.ctaDesc}>응답력 · 수습력 · 퇴근감각력</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </Pressable>

          <Pressable onPress={() => setPrivacyOpen(true)} hitSlop={8}>
            <Text style={styles.privacyLink}>개인정보 처리방침</Text>
          </Pressable>
        </Animated.View>

        <PrivacyModal visible={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing.xl,
  },
  blobRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.sm,
  },
  blob: {
    fontSize: 28,
    backgroundColor: 'rgba(255,255,255,0.55)',
    overflow: 'hidden',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  brand: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 36,
    color: colors.accent,
    lineHeight: 44,
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 26,
    color: colors.ink,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.inkMuted,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.md,
  },
  chip: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  chipAlt: {
    backgroundColor: '#D7EEF8',
  },
  chipSun: {
    backgroundColor: '#FFE8B8',
  },
  chipText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.ink,
  },
  note: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
    marginTop: spacing.md,
  },
  guest: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.md,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderWidth: 1.5,
    shadowColor: colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  bossCta: {
    backgroundColor: '#FFF0E8',
    borderColor: '#F5C4B0',
  },
  empCta: {
    backgroundColor: '#E7F7FB',
    borderColor: '#B5DCE6',
  },
  emojiBubble: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bossBubble: { backgroundColor: '#FFD8C8' },
  empBubble: { backgroundColor: '#C8EAF2' },
  ctaEmoji: { fontSize: 28 },
  ctaTextWrap: { flex: 1, gap: 4 },
  ctaTitle: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 17,
    color: colors.ink,
  },
  ctaDesc: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 12,
    color: colors.inkMuted,
  },
  arrow: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 18,
    color: colors.inkMuted,
  },
  privacyLink: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: spacing.sm,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
