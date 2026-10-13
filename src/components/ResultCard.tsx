import { Image } from 'expo-image';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { AnimalCharacter } from '@/types/quiz';

interface Props {
  animal: AnimalCharacter;
  photographer: string;
}

export const ResultCard = forwardRef<View, Props>(function ResultCard(
  { animal, photographer },
  ref,
) {
  return (
    <View ref={ref} collapsable={false} style={styles.card}>
      <Text style={styles.brand}>직장 동물 농장</Text>
      <Text style={styles.kicker}>소통 성향 유형 카드</Text>
      <View style={styles.imageWrap}>
        <Image source={animal.localImage} style={styles.image} contentFit="cover" />
        <View style={styles.emojiBadge}>
          <Text style={styles.emoji}>{animal.emoji}</Text>
        </View>
      </View>
      <Text style={styles.intro}>이 유형은</Text>
      <Text style={styles.title}>{animal.title}</Text>
      <Text style={styles.introTail}>입니다. 이렇게 소통해 보세요!</Text>
      <View style={styles.tags}>
        {animal.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionLabel}>유형 특징</Text>
      <Text style={styles.body}>{animal.traits}</Text>
      <Text style={styles.sectionLabel}>맞춤 소통 팁</Text>
      <Text style={styles.body}>{animal.tip}</Text>
      <Text style={styles.credit}>Photo: {photographer} / Pexels</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    gap: spacing.sm,
  },
  brand: {
    fontFamily: 'NanumPenScript_400Regular',
    fontSize: 28,
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
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.accentSoft,
    marginVertical: spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emojiBadge: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  intro: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 22,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 32,
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
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  tagText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 12,
    color: colors.accent,
  },
  sectionLabel: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 13,
    color: colors.mustard,
    marginTop: spacing.xs,
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
