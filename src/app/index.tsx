import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrivacyModal } from '@/components/PrivacyModal';
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
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <Animated.Text entering={FadeInDown.duration(500)} style={styles.brand}>
            직장 동물 농장
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(80).duration(500)} style={styles.title}>
            나는 어떤 동물일까?
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(140).duration(500)} style={styles.subtitle}>
            상사 & 부하 직원 소통 성향 심리 테스트
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200).duration(500)} style={styles.note}>
            {APP_PURPOSE}
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(240).duration(500)} style={styles.guest}>
            회원가입·로그인 없이 바로 시작 · 실명/회사명 입력 없음
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(260).duration(500)} style={styles.actions}>
          <Pressable
            onPress={() => go('boss')}
            style={({ pressed }) => [styles.cta, styles.bossCta, pressed && styles.pressed]}
          >
            <Text style={styles.ctaEmoji}>🦁</Text>
            <View style={styles.ctaTextWrap}>
              <Text style={styles.ctaTitle}>상사 성향 알아보기</Text>
              <Text style={styles.ctaDesc}>리더십·피드백 스타일을 동물 유형으로</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => go('employee')}
            style={({ pressed }) => [styles.cta, styles.empCta, pressed && styles.pressed]}
          >
            <Text style={styles.ctaEmoji}>🐝</Text>
            <View style={styles.ctaTextWrap}>
              <Text style={styles.ctaTitle}>부하 직원 성향 알아보기</Text>
              <Text style={styles.ctaDesc}>협업·보고 스타일을 동물 유형으로</Text>
            </View>
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
    paddingTop: spacing.xxl,
  },
  brand: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 54,
    color: colors.accent,
    lineHeight: 62,
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 28,
    color: colors.ink,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 16,
    color: colors.inkMuted,
    marginTop: spacing.xs,
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
  },
  bossCta: {
    backgroundColor: '#FFF1E8',
    borderColor: '#F0C2A8',
  },
  empCta: {
    backgroundColor: '#E8F5F7',
    borderColor: '#B7D7DE',
  },
  ctaEmoji: {
    fontSize: 36,
  },
  ctaTextWrap: {
    flex: 1,
    gap: 4,
  },
  ctaTitle: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 18,
    color: colors.ink,
  },
  ctaDesc: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
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
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
