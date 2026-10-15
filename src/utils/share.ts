import * as Linking from 'expo-linking';
import * as Sharing from 'expo-sharing';
import type { RefObject } from 'react';
import {
  Alert,
  InteractionManager,
  Platform,
  Share,
  type View,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';

import type { AbilityScore } from '@/constants/abilities';
import { APP_NAME } from '@/constants/brand';
import type { AnimalCharacter } from '@/types/quiz';

export type ShareChannel = 'kakao' | 'twitter' | 'facebook' | 'instagram' | 'system';

const RESULT_FILENAME = 'workplace-animal-diagnosis-result.png';

function buildShareText(animal: AnimalCharacter, abilities: AbilityScore[] = []): string {
  const top = [...abilities].sort((a, b) => b.value - a.value).slice(0, 3);
  const abilityLine =
    top.length > 0
      ? top.map((a) => `${a.name} ${a.value}`).join(' · ')
      : animal.tags.join(' ');

  return [
    `[${APP_NAME}]`,
    `나의 유형은 ${animal.emoji} ${animal.title}!`,
    `___력: ${abilityLine}`,
    '',
    '오피스 동물 진단 — 나는 어떤 동물일까?',
    '※ 재미용 진단 · 의료·상담 아님',
  ].join('\n');
}

function waitForInteractions(): Promise<void> {
  return new Promise((resolve) => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(resolve, 120);
    });
  });
}

/** 웹은 data-uri, 네이티브는 tmpfile (웹에서 tmpfile 경고 방지) */
async function captureCard(viewRef: RefObject<View | null>): Promise<string | null> {
  if (!viewRef.current) return null;
  await waitForInteractions();

  try {
    return await captureRef(viewRef, {
      format: 'png',
      quality: 1,
      result: Platform.OS === 'web' ? 'data-uri' : 'tmpfile',
      // ScrollView 안 긴 카드도 잘리거나 투명해지지 않도록
      handleGLSurfaceViewOnAndroid: true,
    });
  } catch {
    return null;
  }
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
    const file = new File([blob], RESULT_FILENAME, { type: 'image/png' });
    const nav = typeof navigator !== 'undefined' ? navigator : null;

    if (nav && typeof nav.share === 'function') {
      const payload: ShareData = { files: [file], text: message, title: APP_NAME };
      if (!nav.canShare || nav.canShare(payload)) {
        await nav.share(payload);
        return;
      }
    }
  } catch {
    // Web Share API 미지원/거부 시 다운로드로 폴백
  }

  downloadDataUri(dataUri, RESULT_FILENAME);
  await shareTextFallback(message, APP_NAME);
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
  abilities: AbilityScore[] = [],
): Promise<void> {
  const message = buildShareText(animal, abilities);

  try {
    if (channel === 'twitter' && Platform.OS === 'web') {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      await Linking.openURL(tweetUrl);
      return;
    }

    const uri = await captureCard(viewRef);
    if (!uri) {
      await shareTextFallback(message, APP_NAME);
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
      await shareTextFallback(message, APP_NAME);
    } catch {
      Alert.alert('공유 실패', '공유 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.');
    }
  }
}

async function saveOnWeb(viewRef: RefObject<View | null>): Promise<boolean> {
  const dataUri = await captureCard(viewRef);
  if (!dataUri) {
    Alert.alert('저장 실패', '결과 카드를 캡처하지 못했어요. 다시 시도해 주세요.');
    return false;
  }
  downloadDataUri(dataUri, RESULT_FILENAME);
  Alert.alert('저장 완료', '결과 이미지 다운로드가 시작되었어요.');
  return true;
}

/**
 * Android 13+ / iOS 모두: writeOnly 권한 → createAssetAsync 우선.
 * 갤러리 저장이 막히면 공유 시트로 폴백해 "이미지로 저장"이 가능하게 합니다.
 */
async function saveOnNative(viewRef: RefObject<View | null>): Promise<boolean> {
  const uri = await captureCard(viewRef);
  if (!uri) {
    Alert.alert('저장 실패', '결과 카드를 담지 못했어요. 잠시 후 다시 시도해 주세요.');
    return false;
  }

  try {
    const MediaLibrary = await import('expo-media-library/legacy');
    // writeOnly=true: 저장만 할 때 권한 부담을 줄입니다 (Android 권장)
    const permission = await MediaLibrary.requestPermissionsAsync(true);
    if (!permission.granted) {
      Alert.alert(
        '권한 필요',
        '사진첩에 저장하려면 권한이 필요해요. 설정에서 허용하거나, 공유로 저장해 주세요.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '공유로 저장',
            onPress: () => {
              void shareImageNative(uri, '결과 이미지 저장/공유');
            },
          },
        ],
      );
      return false;
    }

    try {
      await MediaLibrary.createAssetAsync(uri);
    } catch {
      // 일부 기기/Expo Go에서 createAsset 실패 시 레거시 API 재시도
      await MediaLibrary.saveToLibraryAsync(uri);
    }

    Alert.alert('저장 완료', '사진첩에 저장했어요.');
    return true;
  } catch (error) {
    const detail = error instanceof Error ? error.message : '';
    // MediaLibrary가 Expo Go/권한 이슈로 막힐 때 공유 시트로 폴백
    try {
      await shareImageNative(uri, '결과 이미지 저장/공유');
      Alert.alert(
        '공유 화면을 열었어요',
        '직접 저장이 막혀 공유 화면을 열었어요. “이미지 저장” 또는 갤러리 앱을 골라 주세요.',
      );
      return true;
    } catch {
      Alert.alert(
        '저장 실패',
        detail
          ? `이미지 저장 중 문제가 발생했어요.\n(${detail})`
          : '이미지 저장 중 문제가 발생했어요. 권한을 허용한 뒤 다시 시도해 주세요.',
      );
      return false;
    }
  }
}

export async function saveResultImage(viewRef: RefObject<View | null>): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      return await saveOnWeb(viewRef);
    }
    return await saveOnNative(viewRef);
  } catch (error) {
    const detail = error instanceof Error ? error.message : '';
    Alert.alert(
      '저장 실패',
      detail
        ? `이미지 저장 중 문제가 발생했어요.\n(${detail})`
        : '이미지 저장 중 문제가 발생했어요.',
    );
    return false;
  }
}
