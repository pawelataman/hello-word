import { Stack } from 'expo-router';

export default function() {
	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="categories" options={{ title: '' }} />
			<Stack.Screen name="new-words" options={{ presentation: 'modal', title: 'Dodaj słówka' }} />
		</Stack>
	);
}

