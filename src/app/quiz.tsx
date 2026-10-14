import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoiceButton } from '@/components/ChoiceButton';
import { EmptyRedirect } from '@/components/EmptyRedirect';
import { ProgressBar } from '@/components/ProgressBar';
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

  const question = getCurrentQuestion();

  useEffect(() => {
    if (result) {
      router.replace('/result');
    }
  }, [result]);

  if (!role) {
    return <EmptyRedirect message="홈에서 테스트를 시작해 주세요" />;
  }

  if (!question) {
    if (result) return <EmptyRedirect message="결과를 준비하는 중…" />;
    return <EmptyRedirect />;
  }

  const canGoBack = answers.length > 0;

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
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={canGoBack ? '이전 문항' : '처음으로'}
            >
              <Text style={styles.back}>{canGoBack ? '← 이전' : '← 처음으로'}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                reset();
                router.replace('/');
              }}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="홈으로"
            >
              <Text style={styles.home}>홈</Text>
            </Pressable>
          </View>
          <ProgressBar step={question.step} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            key={currentQuestionId}
            entering={FadeInRight.duration(280)}
            style={styles.body}
          >
            <View style={styles.rolePill}>
              <Text style={styles.roleTag}>
                {role === 'boss' ? '🦁 상사 소통 성향' : '🐝 부하 직원 소통 성향'}
              </Text>
            </View>
            <Text style={styles.prompt} accessibilityRole="header">
              {question.prompt}
            </Text>
            <Text style={styles.hint}>가장 가까운 답을 골라 주세요 · 선택에 따라 다음 질문이 달라져요</Text>
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
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  rolePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cream,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.line,
  },
  roleTag: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.accent,
  },
  prompt: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 22,
    lineHeight: 34,
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
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});
