import { Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Stack.Screen options={{ headerShown: false }} />
			<Text>{id}</Text>
		</View>
	);
}