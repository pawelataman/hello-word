import { Text, View } from 'react-native';
import Animated, { useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Portal } from '@gorhom/portal';

export default function() {
	const size = useSharedValue(48);

	useEffect(() => {
		size.value = withRepeat(withSpring(48 + 22), 100, true);
	}, []);


	return (
		<Portal>
			<View
				className="bg-white fixed top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
				<Animated.Image
					style={{ width: size, height: size }}
					source={require('@/assets/images/icons/brain.png')}
				/>
				<Text className="font-bold text-2xl">Trwa ładowanie słówek</Text>
			</View>
		</Portal>
	);
}
