import { View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import { useRouter } from 'expo-router';

export default function() {
	const router = useRouter();

	const handleAdd = () => {
		router.back();
	};
	return (
		<View className="flex-1 p-4">
			<AppButton variant={'secondary'} label={'Dodaj'} onPress={handleAdd} />
		</View>
	);
}

