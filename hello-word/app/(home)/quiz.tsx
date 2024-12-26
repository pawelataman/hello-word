import { Alert, SafeAreaView, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { Suspense, useCallback, useMemo } from 'react';
import { LANG_EN, QUIZ_LANGUAGES } from '@/core/constants/common';
import QuizLoading from '@/components/quiz/QuizLoading';
import { ErrorBoundary } from 'react-error-boundary';
import Quiz from '@/components/quiz/Quiz';
import { HeaderBackButton } from '@react-navigation/elements';
import QuizSettings from '@/components/quiz/QuizSettings';

export default function() {
	const router = useRouter();
	const searchParams = useLocalSearchParams<{
		language: string
	}>();
	const quizLanguage = useMemo(() => QUIZ_LANGUAGES.find(
		(lang) => lang.code === searchParams.language,
	) || LANG_EN, [searchParams.language]);

	const ErrorComponent = useCallback(
		() => (
			<View>
				<Text className={'text-center text-red-500'}>There was an error</Text>
			</View>
		),
		[],
	);

	const beforeNavigateBack = () => {
		Alert.alert('', 'Zakończyć quiz ?', [
			{
				text: 'Anuluj',
				style: 'cancel',
			},
			{ text: 'Zakończ', onPress: () => router.back() },
		]);
	};

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
							headerLeft: (props) => <HeaderBackButton  {...props}
																	  onPress={() => beforeNavigateBack()} />,
							headerRight: (props) => <QuizSettings tintColor={props.tintColor} />,

						}}
					></Stack.Screen>

					<ErrorBoundary
						fallback={<ErrorComponent />}
						onError={(error, info) => console.log('error', error, info)}
					>
						<Suspense fallback={<QuizLoading />}>
							<Quiz language={quizLanguage} />
						</Suspense>
					</ErrorBoundary>
				</View>
			</SafeAreaView>
		</View>
	);
}
