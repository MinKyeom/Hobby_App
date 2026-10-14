import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { choiceBadgeColors, colors, radii, spacing } from '@/constants/theme';

interface Props {
  label: string;
  index: number;
  emoji?: string;
  onPress: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChoiceButton({ label, index, emoji, onPress }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const letter = LETTERS[index] ?? `${index + 1}`;
  const badgeColor = choiceBadgeColors[index % choiceBadgeColors.length];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      accessibilityRole="button"
      accessibilityLabel={`선택지 ${letter}: ${label}`}
      style={[styles.button, animatedStyle]}
    >
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{letter}</Text>
      </View>
      <View style={styles.textWrap}>
        {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.cream,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    fontFamily: 'NotoSansKR_700Bold',
    color: colors.white,
    fontSize: 13,
  },
  textWrap: {
    flex: 1,
    gap: 4,
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: colors.ink,
  },
});
