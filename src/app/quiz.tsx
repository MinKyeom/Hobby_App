import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoiceButton } from '@/components/ChoiceButton';
import { EmptyRedirect } from '@/components/EmptyRedirect';
import { ProgressBar } from '@/components/ProgressBar';
import { abilitiesForRole } from '@/constants/abilities';
import { colors, radii, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';

export default function QuizScreen() {
  const role = useQuizStore((s) => s.role);
  const currentQuestionId = useQuizStore((s) => s.currentQuestionId);
  const answers = useQuizStore((s) => s.answers);
  const result = useQuizStore((s) => s.result);
  const getCurrentQuestion = useQuizStore((s) => s.getCurrentQuestion);
  const selectChoice = useQuizStore((s) => s.selectChoice);
  const goBack = useQuizStore((s) => s.goBack);
  const reset = useQuizStore((s) => s.reset);
  const scrollRef = useRef<ScrollView>(null);

  const question = getCurrentQuestion();

  useEffect(() => {
    if (result) {
      router.replace('/result');
    }
  }, [result]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentQuestionId]);

  if (!role) {
    return <EmptyRedirect message="홈에서 진단을 시작해 주세요" />;
  }

  if (!question) {
    if (result) return <EmptyRedirect message="결과를 불러오는 중…" />;
    return <EmptyRedirect />;
  }

  const canGoBack = answers.length > 0;
  const ability = abilitiesForRole(role).find((a) => a.step === question.step);
  const roleLabel = role === 'boss' ? '🦁 상사편' : '🐝 부하편';

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgMid, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <View style={styles.navRow}>
            <Pressable
              onPress={() => {
                if (canGoBack) {
                  goBack();
                  return;
                }
                reset();
                router.replace('/');
              }}
              hitSlop={14}
              accessibilityRole="button"
              accessibilityLabel={canGoBack ? '이전 문항' : '처음으로'}
              style={styles.navBtn}
            >
              <Text style={styles.back}>{canGoBack ? '← 이전 문항' : '← 처음으로'}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                reset();
                router.replace('/');
              }}
              hitSlop={14}
              accessibilityRole="button"
              accessibilityLabel="홈으로"
              style={styles.navBtn}
            >
              <Text style={styles.home}>홈</Text>
            </Pressable>
          </View>
          <ProgressBar step={question.step} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            key={currentQuestionId}
            entering={FadeInRight.duration(240)}
            style={styles.body}
          >
            <View style={styles.metaRow}>
              <View style={styles.rolePill}>
                <Text style={styles.roleTag}>{roleLabel}</Text>
              </View>
              {ability ? (
                <View style={styles.abilityPill}>
                  <Text style={styles.abilityTag}>{ability.name}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.prompt} accessibilityRole="header">
              {question.prompt}
            </Text>
            <Text style={styles.hint}>나와 가장 가까운 답을 골라 주세요</Text>
            <View style={styles.choices}>
              {question.choices.map((choice, index) => (
                <ChoiceButton
                  key={`${question.id}-${choice.id}`}
                  label={choice.label}
                  emoji={choice.emoji}
                  index={index}
                  onPress={() => selectChoice(choice.id, choice.nextId, choice.scores)}
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  top: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    minHeight: 36,
    justifyContent: 'center',
  },
  back: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.inkMuted,
  },
  home: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.accent,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  body: {
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rolePill: {
    backgroundColor: colors.cream,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.line,
  },
  roleTag: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.accent,
  },
  abilityPill: {
    backgroundColor: '#FFF3D6',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#F0D9A0',
  },
  abilityTag: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 12,
    color: '#9A6A10',
  },
  prompt: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 21,
    lineHeight: 32,
    color: colors.ink,
  },
  hint: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
    marginTop: -4,
  },
  choices: {
    gap: 12,
    marginTop: spacing.xs,
  },
});
