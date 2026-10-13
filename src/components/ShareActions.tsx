import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { ShareChannel } from '@/utils/share';

interface Props {
  busy: boolean;
  onShare: (channel: ShareChannel) => void;
  onSave: () => void;
  onRetry: () => void;
}

const CHANNELS: { id: ShareChannel; label: string; hint: string }[] = [
  { id: 'kakao', label: '카카오톡', hint: '결과 카드 이미지 공유' },
  { id: 'twitter', label: 'X (트위터)', hint: '텍스트 + 이미지' },
  { id: 'facebook', label: '페이스북', hint: '피드/스토리 공유' },
  { id: 'instagram', label: '인스타그램', hint: '이미지로 공유' },
  { id: 'system', label: '더 보기', hint: '시스템 공유 시트' },
];

export function ShareActions({ busy, onShare, onSave, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>결과 공유하기</Text>
      <Text style={styles.sub}>나의 소통 성향 동물 카드를 친구에게 보내보세요</Text>

      <View style={styles.grid}>
        {CHANNELS.map((ch) => (
          <Pressable
            key={ch.id}
            disabled={busy}
            onPress={() => onShare(ch.id)}
            style={({ pressed }) => [
              styles.channel,
              pressed && styles.pressed,
              busy && styles.disabled,
            ]}
          >
            <Text style={styles.channelLabel}>{ch.label}</Text>
            <Text style={styles.channelHint}>{ch.hint}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        disabled={busy}
        onPress={onSave}
        style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
      >
        {busy ? (
          <ActivityIndicator color={colors.accent} />
        ) : (
          <Text style={styles.secondaryText}>결과 이미지 저장</Text>
        )}
      </Pressable>

      <Pressable onPress={onRetry} style={({ pressed }) => [styles.retry, pressed && styles.pressed]}>
        <Text style={styles.retryText}>다시 테스트하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  heading: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 18,
    color: colors.ink,
  },
  sub: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 13,
    color: colors.inkMuted,
    marginTop: -8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  channel: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.cream,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minWidth: '46%',
  },
  channelLabel: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 15,
    color: colors.ink,
  },
  channelHint: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 11,
    color: colors.inkMuted,
    marginTop: 4,
  },
  secondary: {
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  secondaryText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 15,
    color: colors.accent,
  },
  retry: {
    borderRadius: radii.md,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    alignItems: 'center',
  },
  retryText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.55,
  },
});
