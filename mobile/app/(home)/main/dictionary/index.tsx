import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function() {
	const router = useRouter();

	const onFab = () => {
		router.push('/main/dictionary/new-words');
	};
	return (
		<View className="flex-1 relative bg-gray-200">
			<Stack.Screen options={{ title: 'Słownik' }} />
			<View className="absolute w-20 h-20 bg-green-500 bottom-8 right-8 rounded-full">

				<TouchableOpacity onPress={onFab} className={'h-full w-full justify-center items-center'}>
					<AntDesign name="plus" size={32} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

