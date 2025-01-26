import { View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import CategoryDetails from '@/components/dictionary/CategoryDetails';
import { Suspense } from 'react';
import QuizLoading from '@/components/quiz/QuizLoading';

export default function() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<View className={'bg-gray-200'}>
			<Stack.Screen options={{ headerShown: false }} />
			<Suspense fallback={<QuizLoading />}>
				<CategoryDetails id={parseInt(id)} />
			</Suspense>
		</View>
	);
}