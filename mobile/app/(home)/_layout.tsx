import { Stack } from 'expo-router';
import { SignedIn } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { HttpClientContext } from '@/core/context/client-context';
import { useClient } from '@/core/hooks/useClient';

export default function Layout() {
	const queryClient = new QueryClient();
	const httpClient = useClient();

	useReactQueryDevTools(queryClient);

	return (
		<SignedIn>
			<QueryClientProvider client={queryClient}>
				<HttpClientContext.Provider value={httpClient}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Stack>
							<Stack.Screen name="main"
										  options={{ headerShown: false, headerStyle: { backgroundColor: 'red' } }} />
							<Stack.Screen name="quiz" />
						</Stack>
					</GestureHandlerRootView>
				</HttpClientContext.Provider>
			</QueryClientProvider>
		</SignedIn>
	);
}
