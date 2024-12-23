import { Tabs } from 'expo-router';

export default function() {
	return (
		<Tabs>
			<Tabs.Screen name="profile" options={{ title: 'Profil' }}></Tabs.Screen>
			<Tabs.Screen name="index"></Tabs.Screen>
			<Tabs.Screen name="settings" options={{ title: 'Opcje' }}></Tabs.Screen>
		</Tabs>
	);
}