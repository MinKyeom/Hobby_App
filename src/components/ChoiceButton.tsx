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
        scale.value = withSpring(0.98);
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
        <Text style={styles.label}>
          {emoji ? `${emoji}  ` : ''}
          {label}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.cream,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    minHeight: 64,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: 'NotoSansKR_700Bold',
    color: colors.white,
    fontSize: 13,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 15,
    lineHeight: 23,
    color: colors.ink,
  },
  chevron: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 22,
    color: colors.accentSoft,
    marginTop: -2,
  },
});
