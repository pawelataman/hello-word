import { SafeAreaView, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { Suspense, useCallback, useEffect } from 'react';
import { QUIZ_LANGUAGES } from '@/core/constants/common';
import QuizLoading from '@/components/quiz/QuizLoading';
import { useQuizStore } from '@/core/state/quiz.state';
import { ErrorBoundary } from 'react-error-boundary';
import Quiz from '@/components/quiz/Quiz';

export default function() {
	const { setQuizLanguage, reset } = useQuizStore();
	const searchParams = useLocalSearchParams<{
		language: string
	}>();

	useEffect(() => {
		const quizLanguage = QUIZ_LANGUAGES.find(
			(lang) => lang.code === searchParams.language,
		);

		setQuizLanguage(quizLanguage!);
	}, [searchParams.language]);

	const ErrorComponent = useCallback(
		() => (
			<View>
				<Text className={'text-center text-red-500'}>There was an error</Text>
			</View>
		),
		[],
	);

	return (
		<View className="bg-white">
			<SafeAreaView>
				<View className="h-full bg-white">
					<Stack.Screen
						options={{ headerTitleAlign: 'center', title: 'Quiz', headerBackTitle: 'Start' }}
					></Stack.Screen>
					<ErrorBoundary
						fallback={<ErrorComponent />}
						onError={(error, info) => console.log('error', error, info)}
					>
						<Suspense fallback={<QuizLoading />}>
							<Quiz />
						</Suspense>
					</ErrorBoundary>
				</View>
			</SafeAreaView>
		</View>
	);
}
