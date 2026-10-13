import { StyleSheet, Text, View } from 'react-native';

import { TOTAL_STEPS } from '@/constants/questions';
import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  step: number;
}

export function ProgressBar({ step }: Props) {
  const ratio = Math.min(step / TOTAL_STEPS, 1);

  return (
    <View
      style={styles.wrap}
      accessibilityRole="progressbar"
      accessibilityLabel={`질문 진행률 ${step} / ${TOTAL_STEPS}`}
      accessibilityValue={{ min: 0, max: TOTAL_STEPS, now: step }}
    >
      <View style={styles.row}>
        <Text style={styles.label}>질문</Text>
        <Text style={styles.count}>
          {step}/{TOTAL_STEPS}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
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
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.progressFill,
  },
});
