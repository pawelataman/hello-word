import AnswerButton from '@/components/quiz/QuizAnswerButton';
import React, { useMemo } from 'react';
import { Word } from '@/core/api/models/quiz';
import { useQuizStore } from '@/core/state/quiz.state';
import AppButton from '@/components/ui/AppButton';
import { View } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_AUTO_NEXT_QUESTION, storage } from '@/core/constants/storage';

interface QuizChosenAnswersProps {
	answers: Word[];
	submitAnswer: (ans: Word) => void;
}

export default function({ answers, submitAnswer }: QuizChosenAnswersProps) {
	const { currentQuestionStatus, nextQuestion } = useQuizStore();
	const isAnswered = useMemo(() => currentQuestionStatus === 'answered', [currentQuestionStatus]);
	const [autoNextQuestion] = useMMKVBoolean(CONFIG_AUTO_NEXT_QUESTION, storage);

	return <>
		{
			answers.map((ans) => (
				<AnswerButton
					onPress={() => submitAnswer(ans)}
					key={ans.id}
					answer={ans}
				/>
			))}

		<View className={'h-20 items-center justify-center w-full'}>
			{
				isAnswered && !autoNextQuestion && <AppButton variant={'tertiary'} label={'Następne pytanie'}
															  onPress={nextQuestion} />
			}
		</View>

	</>;
}

