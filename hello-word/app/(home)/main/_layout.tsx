import { Tabs } from 'expo-router';
import Brain from '@/components/ui/svg/Brain';
import Person from '@/components/ui/svg/Person';
import SettingsIcon from '@/components/ui/svg/SettingsIcon';
import { StyleSheet } from 'react-native';

export default function() {

	return (
		<Tabs screenOptions={{
			tabBarActiveTintColor: '#22c55e',
			tabBarStyle: {
				height: 92,
				paddingTop: 12,
			},
			tabBarShowLabel: false,
		}}>
			<Tabs.Screen name="profile" options={{
				title: 'Profil',
				tabBarIcon: ({ color }) => (<>
					<Person width={32} height={32} fill={color} />
				</>),
				tabBarLabelStyle: styles.tabBarLabelStyle,


			}}></Tabs.Screen>
			<Tabs.Screen name="index" options={{
				tabBarLabelStyle: styles.tabBarLabelStyle,
				tabBarIcon: ({ color }) => (<>
					<Brain width={32} height={32} fill={color} />
				</>),
			}}></Tabs.Screen>
			<Tabs.Screen name="settings" options={{
				title: 'Opcje', tabBarIcon: ({ color }) => (<>
					<SettingsIcon width={32} height={32} fill={color} />
				</>),
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