import {
  NanumPenScript_400Regular,
  useFonts as useNanumFonts,
} from '@expo-google-fonts/nanum-pen-script';
import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  useFonts as useNotoFonts,
} from '@expo-google-fonts/noto-sans-kr';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const FONT_TIMEOUT_MS = 4000;

export default function RootLayout() {
  const [nanumLoaded] = useNanumFonts({ NanumPenScript_400Regular });
  const [notoLoaded] = useNotoFonts({
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
  });
  const [timedOut, setTimedOut] = useState(false);

  const fontsReady = nanumLoaded && notoLoaded;
  const ready = fontsReady || timedOut;

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), FONT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bgBottom },
            animation: 'fade_from_bottom',
          }}
        />
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
