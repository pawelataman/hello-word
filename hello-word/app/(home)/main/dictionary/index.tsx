import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Słownik' }} />
			<Text> </Text>
		</View>
	);
}

const styles = StyleSheet.create({});