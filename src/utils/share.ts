import { Asset, requestPermissionsAsync } from 'expo-media-library';
import * as Linking from 'expo-linking';
import * as Sharing from 'expo-sharing';
import type { RefObject } from 'react';
import { Alert, Platform, Share, type View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

import type { AnimalCharacter } from '@/types/quiz';

export type ShareChannel = 'kakao' | 'twitter' | 'facebook' | 'instagram' | 'system';

function buildShareText(animal: AnimalCharacter): string {
  return [
    `[직장 동물 농장]`,
    `나의 소통 성향은 ${animal.emoji} ${animal.title}!`,
    animal.tags.join(' '),
    '',
    '유쾌한 직장 소통 심리 테스트 — 너는 어떤 동물 유형일까?',
    '※ 특정 인물을 비하하려는 목적이 아닌 소통 성향 테스트입니다.',
  ].join('\n');
}

async function captureCard(viewRef: RefObject<View | null>): Promise<string | null> {
  if (!viewRef.current) return null;
  return captureRef(viewRef, {
    format: 'png',
    quality: 1,
    result: 'tmpfile',
  });
}

async function shareImageFile(uri: string, dialogTitle: string): Promise<void> {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Sharing unavailable');
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'image/png',
    dialogTitle,
    UTI: 'public.png',
  });
}

async function shareTextFallback(message: string, title: string): Promise<void> {
  await Share.share(
    { message, title },
    Platform.OS === 'android' ? { dialogTitle: title } : undefined,
  );
}

/**
 * 결과 카드 이미지를 캡처한 뒤 SNS별 공유를 엽니다.
 * - 카카오톡/인스타/페이스북: OS 공유 시트에서 앱 선택 (이미지)
 * - X(트위터): 텍스트 인텐트 + 이미지 공유 시트
 * - 더 보기: 시스템 공유 시트 전체
 */
export async function shareViaChannel(
  channel: ShareChannel,
  viewRef: RefObject<View | null>,
  animal: AnimalCharacter,
): Promise<void> {
  const message = buildShareText(animal);

  try {
    const uri = await captureCard(viewRef);

    switch (channel) {
      case 'twitter': {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        if (await Linking.canOpenURL(tweetUrl)) {
          await Linking.openURL(tweetUrl);
        }
        if (uri) {
          // 카드 이미지는 공유 시트에서 X/갤러리 등으로 추가 첨부 가능
          await shareImageFile(uri, 'X(트위터)에 이미지 첨부·공유');
        } else {
          await shareTextFallback(message, 'X(트위터) 공유');
        }
        return;
      }
      case 'facebook': {
        if (uri) {
          await shareImageFile(uri, '페이스북으로 공유');
          return;
        }
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(message)}`;
        await Linking.openURL(fbUrl);
        return;
      }
      case 'instagram': {
        if (!uri) {
          Alert.alert('안내', '인스타그램 공유를 위해 결과 카드를 준비하지 못했어요.');
          return;
        }
        await shareImageFile(uri, '인스타그램으로 공유');
        return;
      }
      case 'kakao': {
        if (uri) {
          await shareImageFile(uri, '카카오톡으로 공유');
          return;
        }
        await shareTextFallback(message, '카카오톡 공유');
        return;
      }
      case 'system':
      default: {
        if (uri) {
          await shareImageFile(uri, '결과 공유하기');
          return;
        }
        await shareTextFallback(message, '직장 동물 농장');
      }
    }
  } catch {
    try {
      await shareTextFallback(message, '직장 동물 농장');
    } catch {
      Alert.alert('공유 실패', '공유 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.');
    }
  }
}

export async function saveResultImage(viewRef: RefObject<View | null>): Promise<boolean> {
  try {
    const permission = await requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '결과 이미지를 저장하려면 사진 라이브러리 접근이 필요해요.');
      return false;
    }

    const uri = await captureCard(viewRef);
    if (!uri) {
      Alert.alert('저장 실패', '결과 카드를 캡처하지 못했어요.');
      return false;
    }

    await Asset.create(uri);
    Alert.alert('저장 완료', '결과 이미지가 사진첩에 저장되었어요.');
    return true;
  } catch {
    Alert.alert('저장 실패', '이미지 저장 중 문제가 발생했어요.');
    return false;
  }
}
