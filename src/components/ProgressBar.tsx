import { StyleSheet, Text, View } from 'react-native';

import { TOTAL_STEPS } from '@/constants/questions';
import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  step: number;
}

export function ProgressBar({ step }: Props) {
  return (
    <View
      style={styles.wrap}
      accessibilityRole="progressbar"
      accessibilityLabel={`질문 진행 ${step} / ${TOTAL_STEPS}`}
      accessibilityValue={{ min: 0, max: TOTAL_STEPS, now: step }}
    >
      <View style={styles.row}>
        <Text style={styles.label}>진행</Text>
        <Text style={styles.count}>
          {step} / {TOTAL_STEPS}
        </Text>
      </View>
      <View style={styles.dots}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const n = i + 1;
          const done = n < step;
          const current = n === step;
          return (
            <View
              key={n}
              style={[styles.dot, done && styles.dotDone, current && styles.dotCurrent]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
  },
  count: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 14,
    color: colors.accent,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    flex: 1,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.progressTrack,
  },
  dotDone: {
    backgroundColor: colors.accentSoft,
  },
  dotCurrent: {
    backgroundColor: colors.accent,
  },
});
