import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
