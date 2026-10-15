import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing } from '@/constants/theme';
import type { ShareChannel } from '@/utils/share';

interface Props {
  busy: boolean;
  onShare: (channel: ShareChannel) => void;
  onSave: () => void;
  /** 하단 고정 바에 저장 버튼이 있을 때 숨김 */
  hideSave?: boolean;
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

export function ShareActions({ busy, onShare, onSave, hideSave = false }: Props) {
  return (
    <View style={styles.wrap}>
      {!hideSave ? (
        <Pressable
          disabled={busy}
          onPress={onSave}
          accessibilityRole="button"
          accessibilityLabel="결과 이미지 저장"
          style={({ pressed }) => [styles.primarySave, pressed && styles.pressed]}
        >
          {busy ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <View style={styles.primaryInner}>
              <FontAwesome6 name="download" size={16} color={colors.white} />
              <Text style={styles.primaryText}>이미지로 저장</Text>
            </View>
          )}
        </Pressable>
      ) : null}

      <Text style={styles.heading} accessibilityRole="header">
        SNS로 공유하기
      </Text>
      <Text style={styles.sub}>원하는 앱 아이콘을 눌러 주세요</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  primarySave: {
    borderRadius: radii.md,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    alignItems: 'center',
    minHeight: 54,
    justifyContent: 'center',
  },
  primaryInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryText: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.white,
  },
  heading: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 16,
    color: colors.ink,
    marginTop: spacing.xs,
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
    justifyContent: 'space-between',
    gap: 6,
    paddingVertical: 4,
  },
  iconBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    minWidth: 56,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconLabel: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 11,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.55,
  },
});
