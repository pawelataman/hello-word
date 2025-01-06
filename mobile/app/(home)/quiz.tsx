import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { Suspense, useCallback, useMemo } from 'react';
import { LANG_EN, QUIZ_LANGUAGES } from '@/core/constants/common';
import QuizLoading from '@/components/quiz/QuizLoading';
import { ErrorBoundary } from 'react-error-boundary';
import Quiz from '@/components/quiz/Quiz';
import { QuizMode } from '@/core/models/models';
import QuizSettings from '@/components/quiz/QuizSettings';
import ArrowLeft from '@/assets/images/icons/arrow_left.svg';

export default function() {
	const router = useRouter();
	const { language, mode } = useLocalSearchParams<{
		language: string;
		mode: QuizMode;
	}>();
	const quizLanguage = useMemo(
		() => QUIZ_LANGUAGES.find((lang) => lang.code === language) || LANG_EN,
		[language],
	);

	const ErrorComponent = useCallback(
		() => (
			<View>
				<Text className={'text-center text-red-500'}>There was an error</Text>
			</View>
		),
		[],
	);

	const beforeNavigateBack = useCallback(() => {
		Alert.alert('', 'Zakończyć quiz ?', [
			{
				text: 'Anuluj',
				style: 'cancel',
			},
			{ text: 'Zakończ', onPress: () => router.back() },
		]);
	}, [router]);

	return (
		<View className="bg-white">
			<SafeAreaView>
				<View className="h-full bg-white">
					<Stack.Screen
						options={{
							headerTitleAlign: 'center',
							title: '',
							headerShadowVisible: false,
							headerBackTitle: '',
							headerTintColor: 'black',
							headerLeft: (props) =>
								<TouchableOpacity onPressOut={beforeNavigateBack} className={'pt-2'}>
									<ArrowLeft width={36} height={36} color={props.tintColor} />
								</TouchableOpacity>,
							headerRight: (props) => <QuizSettings tintColor={props.tintColor} />,

						}}
					></Stack.Screen>

					<ErrorBoundary
						fallback={<ErrorComponent />}
						onError={(error, info) => console.log('error', error, info)}
					>
						<Suspense fallback={<QuizLoading />}>
							<Quiz language={quizLanguage} mode={mode} />
						</Suspense>
					</ErrorBoundary>
				</View>
			</SafeAreaView>
		</View>
	);
}
