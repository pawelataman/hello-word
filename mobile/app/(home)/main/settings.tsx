import { View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import { extractClerkErrorMessage } from '@/utils/clerk';
import { useToast } from '@/core/hooks/useToast';
import { useAppStore } from '@/core/state/app.state';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function() {
	const { showToast } = useToast();
	const { setIsLoading } = useAppStore();
	const { signOut } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await signOut();
			router.replace('/');
		} catch (e) {
			showToast(extractClerkErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className="p-4 flex-1 justify-end bg-gray-200">
			<AppButton
				variant={'tertiary'}
				label={'Wyloguj'}
				onPress={() => handleLogout()}
			></AppButton>
		</View>
	);
}

