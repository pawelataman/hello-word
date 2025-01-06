import { SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<SignedOut>
			<Stack>
				<Stack.Screen
					name={'index'}
					options={{
						headerShown: false,
					}}
				></Stack.Screen>
				<Stack.Screen
					name={'sign-in'}
					options={{ title: 'Zaloguj się' }}
				></Stack.Screen>
				<Stack.Screen
					name={'sign-up'}
					options={{ title: 'Zarejestruj się' }}
				></Stack.Screen>
			</Stack>
		</SignedOut>
	);
}
