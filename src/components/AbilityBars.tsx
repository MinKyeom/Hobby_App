import { StyleSheet, Text, View } from 'react-native';

import type { AbilityScore } from '@/constants/abilities';
import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  abilities: AbilityScore[];
  roleLabel: string;
}

export function AbilityBars({ abilities, roleLabel }: Props) {
  return (
    <View style={styles.wrap} accessibilityLabel={`${roleLabel} 능력치 리포트`}>
      <Text style={styles.heading}>{roleLabel} ___력 리포트</Text>
      <Text style={styles.sub}>
        선택에 따라 계산된 소통 능력치예요. 점수보다 아래 맞춤 팁을 참고해 보세요.
      </Text>
      {abilities.map((ability) => (
        <View key={ability.id} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={styles.name}>{ability.name}</Text>
            <Text style={styles.value}>
              {ability.value}
              <Text style={styles.level}> {ability.levelLabel}</Text>
            </Text>
          </View>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: `${ability.value}%`,
                  backgroundColor:
                    ability.value >= 70
                      ? colors.accent
                      : ability.value >= 45
                        ? colors.sky
                        : colors.coral,
                },
              ]}
            />
          </View>
          <Text style={styles.desc}>{ability.desc}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  heading: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.ink,
  },
  sub: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colors.inkMuted,
    marginTop: -6,
  },
  row: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 14,
    color: colors.ink,
  },
  value: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.accent,
  },
  level: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.inkMuted,
  },
  track: {
    height: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  desc: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 11,
    lineHeight: 16,
    color: colors.inkMuted,
  },
});
