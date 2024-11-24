import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import "../global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "InterTight-Bold": require("@/assets/fonts/InterTight-Bold.ttf"),
    "InterTight-Medium": require("@/assets/fonts/InterTight-Medium.ttf"),
    "InterTight-Regular": require("@/assets/fonts/InterTight-Regular.ttf"),
  });

  const queryClient = new QueryClient();
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="quiz" />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
