import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  label: string;
  index: number;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChoiceButton({ label, index, onPress }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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
      accessibilityLabel={`선택지 ${index === 0 ? 'A' : 'B'}: ${label}`}
      style={[styles.button, animatedStyle]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{index === 0 ? 'A' : 'B'}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
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
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    fontFamily: 'NotoSansKR_700Bold',
    color: colors.white,
    fontSize: 13,
  },
  label: {
    flex: 1,
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: colors.ink,
  },
});
