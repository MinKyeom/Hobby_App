import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AbilityBars } from '@/components/AbilityBars';
import type { AbilityScore } from '@/constants/abilities';
import { APP_NAME_SHORT } from '@/constants/brand';
import { colors, radii, spacing } from '@/constants/theme';
import type { AnimalCharacter, Role } from '@/types/quiz';

interface Props {
  animal: AnimalCharacter;
  photographer: string;
  abilities: AbilityScore[];
  role: Role;
}

export const ResultCard = forwardRef<View, Props>(function ResultCard(
  { animal, photographer, abilities, role },
  ref,
) {
  const roleLabel = role === 'boss' ? '상사편' : '부하편';
  const artBg =
    role === 'boss'
      ? (['#FFE8DC', '#FFF6E8', '#E8F8F4'] as const)
      : (['#DFF3F0', '#EAF6FF', '#FFF6E8'] as const);

  return (
    <View ref={ref} collapsable={false} style={styles.card}>
      <Text style={styles.brand}>{APP_NAME_SHORT}</Text>
      <Text style={styles.kicker}>{roleLabel} · 웃긴 동물 일러스트 카드</Text>

      <LinearGradient colors={[...artBg]} style={styles.imageWrap}>
        <Image
          source={animal.localImage}
          style={styles.image}
          contentFit="contain"
          accessibilityLabel={`${animal.animalName} 일러스트`}
        />
        <View style={styles.tierChip}>
          <Text style={styles.tierText}>{animal.tier.toUpperCase()}</Text>
        </View>
      </LinearGradient>

      <Text style={styles.intro}>당신은</Text>
      <Text style={styles.animalNameBig}>
        {animal.emoji} {animal.animalName}
      </Text>
      <Text style={styles.title}>{animal.title}</Text>
      <Text style={styles.introTail}>이렇게 소통해 보면 더 편해져요!</Text>
      <View style={styles.tags}>
        {animal.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>유형 특징</Text>
        <Text style={styles.body}>{animal.traits}</Text>
      </View>
      <View style={[styles.sectionBox, styles.tipBox]}>
        <Text style={[styles.sectionLabel, styles.tipLabel]}>맞춤 소통 팁</Text>
        <Text style={styles.body}>{animal.tip}</Text>
      </View>
      {abilities.length > 0 ? (
        <View style={styles.abilityBlock}>
          <AbilityBars abilities={abilities} roleLabel={roleLabel} />
        </View>
      ) : null}
      <Text style={styles.credit}>
        Illustration: {photographer} ({animal.creditSource}) · CC BY-SA 4.0
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  brand: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 30,
    color: colors.accent,
    textAlign: 'center',
  },
  kicker: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: -4,
  },
  imageWrap: {
    height: 260,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  image: {
    width: '72%',
    height: '72%',
  },
  tierChip: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.sunny,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  tierText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 11,
    color: colors.ink,
  },
  intro: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  animalNameBig: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 26,
    color: colors.accent,
    textAlign: 'center',
    lineHeight: 34,
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 18,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 28,
  },
  introTail: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.bgTop,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  tagText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.accent,
  },
  sectionBox: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 6,
  },
  tipBox: {
    backgroundColor: '#FFF7E6',
    borderColor: '#F0D9A0',
  },
  sectionLabel: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 13,
    color: colors.accent,
  },
  tipLabel: {
    color: '#C47A12',
  },
  abilityBlock: {
    marginTop: spacing.sm,
  },
  body: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  credit: {
    marginTop: spacing.sm,
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 11,
    color: colors.inkMuted,
    textAlign: 'center',
  },
});
