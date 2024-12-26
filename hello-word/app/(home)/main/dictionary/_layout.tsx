import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function() {
	return (
		<Stack>
			<Stack.Screen name="index" />
		</Stack>
	);
}

const styles = StyleSheet.create({});