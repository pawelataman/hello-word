import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { Suspense, useCallback, useMemo, useRef } from 'react';
import { LANG_EN, QUIZ_LANGUAGES } from '@/core/constants/common';
import QuizLoading from '@/components/quiz/QuizLoading';
import { ErrorBoundary } from 'react-error-boundary';
import Quiz from '@/components/quiz/Quiz';
import { QuizMode } from '@/core/models/models';
import ArrowLeft from '@/assets/images/icons/arrow_left.svg';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { bottomSheetBackdrop } from '@/components/ui/BottomSheetBackDrop';
import SettingsIcon from '@/components/ui/svg/SettingsIcon';
import QuizSettings from '@/components/quiz/QuizSettings';

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
	const bottomSheetRef = useRef<BottomSheet>(null);


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
						headerRight: (props) => <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
							<SettingsIcon width={28} height={28}
										  fill={props.tintColor} />
						</TouchableOpacity>,

					}}
				></Stack.Screen>

				<ErrorBoundary
					fallback={<ErrorComponent />}
					onError={(error, info) => console.log('error', error, info)}
				>
					<Suspense fallback={<QuizLoading />}>
						<Quiz language={quizLanguage} mode={mode} />

						<Portal>
							<BottomSheet
								ref={bottomSheetRef}
								index={-1}
								backdropComponent={bottomSheetBackdrop}
								handleComponent={null}
							>
								<BottomSheetView>
									<QuizSettings />
								</BottomSheetView>
							</BottomSheet>
						</Portal>
					</Suspense>
				</ErrorBoundary>
			</View>
		</View>
	);
}
