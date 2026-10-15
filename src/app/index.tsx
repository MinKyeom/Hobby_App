import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrivacyModal } from '@/components/PrivacyModal';
import {
  APP_EDITIONS,
  APP_NAME_SHORT,
  APP_SUBTITLE,
  APP_TAGLINE,
} from '@/constants/brand';
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
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.hero}>
            <Animated.View entering={FadeInDown.duration(400)} style={styles.blobRow}>
              <Text style={styles.blob}>🐝</Text>
              <Text style={styles.blob}>🦁</Text>
              <Text style={styles.blob}>🐼</Text>
              <Text style={styles.blob}>🦊</Text>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(40).duration(450)}
              style={styles.brand}
              accessibilityRole="header"
            >
              {APP_NAME_SHORT}
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(80).duration(450)} style={styles.editions}>
              {APP_EDITIONS}
            </Animated.Text>

            <Animated.Text entering={FadeInDown.delay(120).duration(450)} style={styles.title}>
              {APP_TAGLINE}
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(160).duration(450)} style={styles.subtitle}>
              {APP_SUBTITLE}
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.chipRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>약 1분</Text>
              </View>
              <View style={[styles.chip, styles.chipAlt]}>
                <Text style={styles.chipText}>5문항</Text>
              </View>
              <View style={[styles.chip, styles.chipSun]}>
                <Text style={styles.chipText}>가입 없음</Text>
              </View>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.delay(240).duration(450)} style={styles.actions}>
            <Text style={styles.guide}>어떤 편으로 시작할까요?</Text>

            <Pressable
              onPress={() => go('employee')}
              accessibilityRole="button"
              accessibilityLabel="부하편 시작"
              style={({ pressed }) => [styles.cta, styles.empCta, pressed && styles.pressed]}
            >
              <View style={[styles.emojiBubble, styles.empBubble]}>
                <Text style={styles.ctaEmoji}>🐝</Text>
              </View>
              <View style={styles.ctaTextWrap}>
                <Text style={styles.ctaTitle}>부하편</Text>
                <Text style={styles.ctaDesc}>내 소통 유형 보기</Text>
                <Text style={styles.ctaMeta}>응답력 · 수습력 · 퇴근감각력</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>

            <Pressable
              onPress={() => go('boss')}
              accessibilityRole="button"
              accessibilityLabel="상사편 시작"
              style={({ pressed }) => [styles.cta, styles.bossCta, pressed && styles.pressed]}
            >
              <View style={[styles.emojiBubble, styles.bossBubble]}>
                <Text style={styles.ctaEmoji}>🦁</Text>
              </View>
              <View style={styles.ctaTextWrap}>
                <Text style={styles.ctaTitle}>상사편</Text>
                <Text style={styles.ctaDesc}>리더 소통 유형 보기</Text>
                <Text style={styles.ctaMeta}>배분력 · 멘탈케어력 · 몰입조율력</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>

            <Pressable
              onPress={() => setPrivacyOpen(true)}
              hitSlop={10}
              accessibilityRole="link"
              accessibilityLabel="개인정보 처리방침 보기"
            >
              <Text style={styles.privacyLink}>개인정보 처리방침</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>

        <PrivacyModal visible={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  blobRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: spacing.sm,
  },
  blob: {
    fontSize: 26,
    backgroundColor: 'rgba(255,255,255,0.55)',
    overflow: 'hidden',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  brand: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 48,
    color: colors.accent,
    lineHeight: 56,
    textAlign: 'center',
  },
  editions: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.ink,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: -2,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 20,
    color: colors.ink,
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    color: colors.inkMuted,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.md,
  },
  chip: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  chipAlt: { backgroundColor: '#D7EEF8' },
  chipSun: { backgroundColor: '#FFE8B8' },
  chipText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.ink,
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  guide: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 2,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.lg,
    paddingVertical: 18,
    paddingHorizontal: spacing.lg,
    borderWidth: 1.5,
    minHeight: 92,
    shadowColor: colors.shadow,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
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
  ctaTextWrap: { flex: 1, gap: 3 },
  ctaTitle: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 19,
    color: colors.ink,
  },
  ctaDesc: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.ink,
  },
  ctaMeta: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 12,
    color: colors.inkMuted,
  },
  arrow: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 20,
    color: colors.inkMuted,
  },
  privacyLink: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: spacing.xs,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
