import { Text, View } from 'react-native';
import React, { useMemo } from 'react';
import AppButton from '@/components/ui/AppButton';
import { useRouter } from 'expo-router';
import { selectNumOfQuestions, useQuizStore } from '@/core/state/quiz.state';
import { useQueryClient } from '@tanstack/react-query';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import { Word } from '@/core/api/models/quiz';

export default function() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { getAnswerLabel } = useQuizTranslation();
	const { answeredQuestions, reset, quizLanguage } = useQuizStore();
	const numOfQuestions = useQuizStore(selectNumOfQuestions);
	const points = useMemo(() => {
		return answeredQuestions.filter(aq => {

			if (typeof aq.userAnswer === 'string') {
				return aq.userAnswer === getAnswerLabel(aq.question.question);
			} else return (aq.userAnswer as Word).id === aq.question.question.id;
		}).length;

	}, [answeredQuestions]);


	const handleExit = () => {
		router.replace({ pathname: '/(home)/main' });
		reset();
	};

	const getPointsColorClass = useMemo(() => {
		if (numOfQuestions > 0) {
			return points / numOfQuestions > 0.5
				? 'text-green-500'
				: 'text-gray-500';
		}
		return '';
	}, [points, numOfQuestions]);

	const handleRestart = () => {
		queryClient.clear(); // clear queryClient cache
		reset(); // reset quiz store

		router.replace({
			pathname: '/(home)/quiz',
			params: {
				language: quizLanguage?.code,
			},
		});
	};

	return (
		<View className="w-full py-5 px-5 flex-1 items-center justify-between">
			<View className="items-center justify-center w-full flex-1 margin ">
				<Text className="text-3xl font-bold">Brawo Madzia!</Text>
				<Text className="text-3xl font-bold">Ukończyłaś quiz!</Text>
				<Text className="text-xl my-4">Twój wynik to</Text>
				<Text className="text-7xl text-gray-500 mb-6">
					<Text className={getPointsColorClass}>
						{points}
					</Text>
					/ {numOfQuestions}
				</Text>
			</View>
			<View className="flex-row flex-0 items-center gap-2.5 mt-5">
				<AppButton
					variant={'primary'}
					onPress={handleRestart}
					label="Spróbuj ponownie"
				/>
				<AppButton onPress={handleExit} label="Zakończ" variant={'tertiary'} />
			</View>
		</View>
	);
}
