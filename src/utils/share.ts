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

/** 웹은 data-uri, 네이티브는 tmpfile (웹에서 tmpfile 경고 방지) */
async function captureCard(viewRef: RefObject<View | null>): Promise<string | null> {
  if (!viewRef.current) return null;
  return captureRef(viewRef, {
    format: 'png',
    quality: 1,
    result: Platform.OS === 'web' ? 'data-uri' : 'tmpfile',
  });
}

function downloadDataUri(dataUri: string, filename: string) {
  if (typeof document === 'undefined') return;
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function shareImageNative(uri: string, dialogTitle: string): Promise<void> {
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

async function shareImageWeb(dataUri: string, message: string): Promise<void> {
  try {
    const response = await fetch(dataUri);
    const blob = await response.blob();
    const file = new File([blob], 'workplace-animal-farm-result.png', { type: 'image/png' });
    const nav = typeof navigator !== 'undefined' ? navigator : null;

    if (nav && typeof nav.share === 'function') {
      const payload: ShareData = { files: [file], text: message, title: '직장 동물 농장' };
      if (!nav.canShare || nav.canShare(payload)) {
        await nav.share(payload);
        return;
      }
    }
  } catch {
    // Web Share API 미지원/거부 시 다운로드로 폴백
  }

  downloadDataUri(dataUri, 'workplace-animal-farm-result.png');
  await shareTextFallback(message, '직장 동물 농장');
}

async function shareTextFallback(message: string, title: string): Promise<void> {
  await Share.share(
    { message, title },
    Platform.OS === 'android' ? { dialogTitle: title } : undefined,
  );
}

/**
 * SNS 버튼은 결과 카드 이미지를 OS/브라우저 공유로 전달합니다.
 */
export async function shareViaChannel(
  channel: ShareChannel,
  viewRef: RefObject<View | null>,
  animal: AnimalCharacter,
): Promise<void> {
  const message = buildShareText(animal);

  try {
    if (channel === 'twitter' && Platform.OS === 'web') {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      await Linking.openURL(tweetUrl);
      return;
    }

    const uri = await captureCard(viewRef);
    if (!uri) {
      await shareTextFallback(message, '직장 동물 농장');
      return;
    }

    if (Platform.OS === 'web') {
      await shareImageWeb(uri, message);
      return;
    }

    const titles: Record<ShareChannel, string> = {
      kakao: '카카오톡 등 앱 선택하여 공유',
      twitter: 'X(트위터) 등 앱 선택하여 공유',
      facebook: '페이스북 등 앱 선택하여 공유',
      instagram: '인스타그램 등 앱 선택하여 공유',
      system: '결과 공유하기',
    };

    await shareImageNative(uri, titles[channel]);
  } catch {
    try {
      await shareTextFallback(message, '직장 동물 농장');
    } catch {
      Alert.alert('공유 실패', '공유 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.');
    }
  }
}

async function saveOnWeb(viewRef: RefObject<View | null>): Promise<boolean> {
  const dataUri = await captureCard(viewRef);
  if (!dataUri) return false;
  downloadDataUri(dataUri, 'workplace-animal-farm-result.png');
  Alert.alert('저장 완료', '결과 이미지 다운로드가 시작되었어요.');
  return true;
}

async function saveOnNative(viewRef: RefObject<View | null>): Promise<boolean> {
  const MediaLibrary = await import('expo-media-library/legacy');
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('권한 필요', '결과 이미지를 저장하려면 사진 라이브러리 접근이 필요해요.');
    return false;
  }

  const uri = await captureCard(viewRef);
  if (!uri) {
    Alert.alert('저장 실패', '결과 카드를 캡처하지 못했어요.');
    return false;
  }

  await MediaLibrary.saveToLibraryAsync(uri);
  Alert.alert('저장 완료', '결과 이미지가 사진첩에 저장되었어요.');
  return true;
}

export async function saveResultImage(viewRef: RefObject<View | null>): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      return await saveOnWeb(viewRef);
    }
    return await saveOnNative(viewRef);
  } catch {
    Alert.alert('저장 실패', '이미지 저장 중 문제가 발생했어요.');
    return false;
  }
}
