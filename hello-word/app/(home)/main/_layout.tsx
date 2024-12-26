import { Tabs } from 'expo-router';
//import Brain from '@/components/ui/svg/Brain';
//import Person from '@/components/ui/svg/Person';
import { Platform, StyleSheet } from 'react-native';
import Book from '@/assets/images/icons/book_open.svg';
import Brain from '@/assets/images/icons/brain.svg';
import Settings from '@/assets/images/icons/settings.svg';
import Person from '@/assets/images/icons/person.svg';


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
					<Person width={32} height={32} color={color} />
				</>),
				headerShadowVisible: false,
				tabBarLabelStyle: styles.tabBarLabelStyle,
				animation: 'shift',


			}}></Tabs.Screen>
			<Tabs.Screen name="index" options={{
				tabBarLabelStyle: styles.tabBarLabelStyle,
				animation: 'shift',
				headerShadowVisible: false,

				tabBarIcon: ({ color }) => (<>
					<Brain width={32} height={32} color={color} />

				</>),
			}}></Tabs.Screen>

			<Tabs.Screen name="dictionary" options={{
				tabBarIcon: ({ color }) => (<>
					<Book width={32} height={32} color={color} />
				</>),
				animation: 'shift',
				headerShown: false,
				tabBarLabelStyle: styles.tabBarLabelStyle,
			}}></Tabs.Screen>

			<Tabs.Screen name="settings" options={{
				title: 'Opcje', tabBarIcon: ({ color }) => (<>
					<Settings width={32} height={32} color={color} />
				</>),
				animation: 'shift',
				headerShadowVisible: false,
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