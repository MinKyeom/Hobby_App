import * as Linking from 'expo-linking';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LICENSES_URL, OPEN_SOURCE_NOTICES } from '@/constants/compliance';
import { colors, radii, spacing } from '@/constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

/** 결과 카드와 분리된 오픈소스·이미지 출처 고지 (MIT About/Credits 관행) */
export function LicensesModal({ visible, onClose }: Props) {
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
          <Text style={styles.title}>{OPEN_SOURCE_NOTICES.title}</Text>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="닫기"
          >
            <Text style={styles.close}>닫기</Text>
          </Pressable>
        </View>
        <Text style={styles.updated}>최종 업데이트: {OPEN_SOURCE_NOTICES.updatedAt}</Text>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.intro}>{OPEN_SOURCE_NOTICES.intro}</Text>
          {OPEN_SOURCE_NOTICES.sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={styles.heading}>{section.heading}</Text>
              <Text style={styles.text}>{section.body}</Text>
            </View>
          ))}
          <Pressable
            onPress={() => Linking.openURL(LICENSES_URL)}
            accessibilityRole="link"
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>웹에서 오픈소스·출처 보기</Text>
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
  intro: {
    fontFamily: 'NotoSansKR_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
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
    fontSize: 13,
    lineHeight: 20,
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
