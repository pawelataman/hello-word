import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/global.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { authTokenCache } from "@/core/auth/token-cache";
import useAuthZoneGuard from "@/hooks/useAuthZoneGuard";

function MainLayout() {
  useAuthZoneGuard();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  const [loaded, error] = useFonts({
    "InterTight-Bold": require("@/assets/fonts/InterTight-Bold.ttf"),
    "InterTight-Medium": require("@/assets/fonts/InterTight-Medium.ttf"),
    "InterTight-Regular": require("@/assets/fonts/InterTight-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={authTokenCache}>
      <ClerkLoaded>
        <MainLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
