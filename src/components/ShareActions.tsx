import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { ShareChannel } from '@/utils/share';

interface Props {
  busy: boolean;
  onShare: (channel: ShareChannel) => void;
  onSave: () => void;
  onRetry: () => void;
}

type ChannelDef = {
  id: ShareChannel;
  label: string;
  hint: string;
  bg: string;
  fg: string;
  renderIcon: (color: string) => ReactNode;
};

const CHANNELS: ChannelDef[] = [
  {
    id: 'kakao',
    label: '카카오톡',
    hint: '공유 시트에서 선택',
    bg: '#FEE500',
    fg: '#191919',
    renderIcon: (color) => (
      <MaterialCommunityIcons name="chat-processing" size={26} color={color} />
    ),
  },
  {
    id: 'twitter',
    label: 'X',
    hint: '공유 시트에서 선택',
    bg: '#0F1419',
    fg: '#FFFFFF',
    renderIcon: (color) => <FontAwesome6 name="x-twitter" size={22} color={color} />,
  },
  {
    id: 'facebook',
    label: '페이스북',
    hint: '공유 시트에서 선택',
    bg: '#1877F2',
    fg: '#FFFFFF',
    renderIcon: (color) => <FontAwesome6 name="facebook-f" size={24} color={color} />,
  },
  {
    id: 'instagram',
    label: '인스타그램',
    hint: '공유 시트에서 선택',
    bg: '#E1306C',
    fg: '#FFFFFF',
    renderIcon: (color) => <FontAwesome6 name="instagram" size={24} color={color} />,
  },
  {
    id: 'system',
    label: '더 보기',
    hint: '모든 앱으로 공유',
    bg: colors.accent,
    fg: '#FFFFFF',
    renderIcon: (color) => <FontAwesome6 name="share-nodes" size={22} color={color} />,
  },
];

export function ShareActions({ busy, onShare, onSave, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading} accessibilityRole="header">
        결과 공유하기
      </Text>
      <Text style={styles.sub}>
        아이콘을 누르면 결과 카드와 함께 공유 시트가 열려요
      </Text>

      <View style={styles.iconRow}>
        {CHANNELS.map((ch) => (
          <Pressable
            key={ch.id}
            disabled={busy}
            onPress={() => onShare(ch.id)}
            accessibilityRole="button"
            accessibilityLabel={`${ch.label}으로 공유`}
            accessibilityHint={ch.hint}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && styles.pressed,
              busy && styles.disabled,
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: ch.bg }]}>
              {ch.renderIcon(ch.fg)}
            </View>
            <Text style={styles.iconLabel} numberOfLines={1}>
              {ch.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        disabled={busy}
        onPress={onSave}
        accessibilityRole="button"
        accessibilityLabel="결과 이미지 저장"
        style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
      >
        {busy ? (
          <ActivityIndicator color={colors.accent} />
        ) : (
          <View style={styles.secondaryInner}>
            <FontAwesome6 name="download" size={16} color={colors.accent} />
            <Text style={styles.secondaryText}>결과 이미지 저장</Text>
          </View>
        )}
      </Pressable>

      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="다시 테스트하기"
        style={({ pressed }) => [styles.retry, pressed && styles.pressed]}
      >
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
    lineHeight: 20,
    color: colors.inkMuted,
    marginTop: -8,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 4,
  },
  iconBtn: {
    width: '18%',
    minWidth: 58,
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconLabel: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 11,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  secondary: {
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.white,
    minHeight: 52,
    justifyContent: 'center',
  },
  secondaryInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
