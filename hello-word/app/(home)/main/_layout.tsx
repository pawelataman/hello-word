import { Tabs } from 'expo-router';
import Brain from '@/components/ui/svg/Brain';
import Person from '@/components/ui/svg/Person';
import SettingsIcon from '@/components/ui/svg/SettingsIcon';
import { Platform, StyleSheet } from 'react-native';

export default function() {

	return (
		<Tabs screenOptions={{
			tabBarActiveTintColor: '#22c55e',
			tabBarStyle: {
				height: Platform.select({ ios: 92, android: 64 }),
				paddingTop: 12,
				paddingBottom: 12,
			},
			tabBarShowLabel: false,
		}}>
			<Tabs.Screen name="profile" options={{
				title: 'Profil',
				tabBarIcon: ({ color }) => (<>
					<Person width={32} height={32} fill={color} />
				</>),
				tabBarLabelStyle: styles.tabBarLabelStyle,
				animation: 'shift',


			}}></Tabs.Screen>
			<Tabs.Screen name="index" options={{
				tabBarLabelStyle: styles.tabBarLabelStyle,
				animation: 'shift',
				tabBarIcon: ({ color }) => (<>
					<Brain width={32} height={32} fill={color} />

				</>),
			}}></Tabs.Screen>
			<Tabs.Screen name="settings" options={{
				title: 'Opcje', tabBarIcon: ({ color }) => (<>
					<SettingsIcon width={32} height={32} fill={color} />
				</>),
				animation: 'shift',
				tabBarLabelStyle: styles.tabBarLabelStyle,
			}}></Tabs.Screen>
		</Tabs>
	);
}


const styles = StyleSheet.create({
	tabBarLabelStyle: {
		fontSize: 12,
		marginTop: 4,
	},
});