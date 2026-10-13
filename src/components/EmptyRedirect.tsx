import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface Props {
  message?: string;
}

/** role/result 없을 때 빈 화면 대신 안내 후 홈으로 이동 */
export function EmptyRedirect({ message = '홈으로 이동 중…' }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/');
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.wrap} accessibilityLabel={message}>
      <ActivityIndicator color={colors.accent} size="large" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.bgBottom,
  },
  text: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    color: colors.inkMuted,
  },
});
