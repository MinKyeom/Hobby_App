import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoiceButton } from '@/components/ChoiceButton';
import { ProgressBar } from '@/components/ProgressBar';
import { colors, spacing } from '@/constants/theme';
import { useQuizStore } from '@/store/quizStore';

export default function QuizScreen() {
  const role = useQuizStore((s) => s.role);
  const currentQuestionId = useQuizStore((s) => s.currentQuestionId);
  const result = useQuizStore((s) => s.result);
  const getCurrentQuestion = useQuizStore((s) => s.getCurrentQuestion);
  const selectChoice = useQuizStore((s) => s.selectChoice);
  const reset = useQuizStore((s) => s.reset);

  const question = getCurrentQuestion();

  useEffect(() => {
    if (!role) {
      router.replace('/');
    }
  }, [role]);

  useEffect(() => {
    if (result) {
      router.replace('/result');
    }
  }, [result]);

  if (!question) {
    return null;
  }

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={styles.flex}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <Pressable
            onPress={() => {
              reset();
              router.replace('/');
            }}
            hitSlop={12}
          >
            <Text style={styles.back}>← 처음으로</Text>
          </Pressable>
          <ProgressBar step={question.step} />
        </View>

        <Animated.View
          key={currentQuestionId}
          entering={FadeInRight.duration(320)}
          style={styles.body}
        >
          <Text style={styles.roleTag}>
            {role === 'boss' ? '🦁 상사 소통 성향' : '🐝 부하 직원 소통 성향'}
          </Text>
          <Text style={styles.prompt}>{question.prompt}</Text>
          <View style={styles.choices}>
            {question.choices.map((choice, index) => (
              <ChoiceButton
                key={`${question.id}-${choice.id}`}
                label={choice.label}
                index={index}
                onPress={() => selectChoice(choice.id, choice.nextId)}
              />
            ))}
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  top: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  back: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.inkMuted,
  },
  body: {
    flex: 1,
    paddingTop: spacing.xl,
    gap: spacing.lg,
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
  choices: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});
