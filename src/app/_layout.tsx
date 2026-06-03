import "../global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const IS_AUTHENTICATED = false; // Mock auth state — Supabase entegrasyonunda değişecek

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    if (!IS_AUTHENTICATED && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (IS_AUTHENTICATED && !inAppGroup) {
      router.replace("/(app)/");
    }
  }, [fontsLoaded, fontError, segments]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Slot />;
}
