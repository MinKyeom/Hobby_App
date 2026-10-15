import * as Linking from 'expo-linking';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  PRIVACY_POLICY,
  PRIVACY_POLICY_URL,
  SUPPORT_EMAIL,
  SUPPORT_URL,
} from '@/constants/compliance';
import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function PrivacyModal({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{PRIVACY_POLICY.title}</Text>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="닫기"
          >
            <Text style={styles.close}>닫기</Text>
          </Pressable>
        </View>
        <Text style={styles.updated}>최종 업데이트: {PRIVACY_POLICY.updatedAt}</Text>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {PRIVACY_POLICY.sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={styles.heading}>{section.heading}</Text>
              <Text style={styles.text}>{section.body}</Text>
            </View>
          ))}
          <Pressable
            onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            accessibilityRole="link"
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>웹에서 개인정보 처리방침 보기</Text>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(SUPPORT_URL)}
            accessibilityRole="link"
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>고객 지원 페이지</Text>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
            accessibilityRole="link"
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>문의 메일: {SUPPORT_EMAIL}</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 20,
    color: colors.ink,
  },
  close: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 15,
    color: colors.accent,
  },
  updated: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 12,
    color: colors.inkMuted,
    marginBottom: spacing.md,
  },
  body: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  section: {
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  heading: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 15,
    color: colors.ink,
  },
  text: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  linkBtn: {
    paddingVertical: spacing.sm,
  },
  linkText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
});
