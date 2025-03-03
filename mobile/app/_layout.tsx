import { authTokenCache } from "@/core/auth/token-cache";
import AppLoader from "@/core/components/AppLoader";
import useAuthZoneGuard from "@/core/hooks/useAuthZoneGuard";
import "@/global.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { PortalProvider } from "@gorhom/portal";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

if (__DEV__) {
  require("../ReactotronConfig");
}
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

function MainLayout() {
  useAuthZoneGuard();

  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1, zIndex: 999 }}>
        <PortalProvider>
          <AppLoader>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
            </Stack>
          </AppLoader>
        </PortalProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
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
