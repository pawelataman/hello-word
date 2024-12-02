import { Stack } from "expo-router";
import { SignedIn } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

export default function Layout() {
  const queryClient = new QueryClient();
  useReactQueryDevTools(queryClient);

  return (
    <SignedIn>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="quiz" />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SignedIn>
  );
}
