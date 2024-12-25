import { View } from 'react-native';
import AnswerButton from '@/components/quiz/QuizAnswerButton';
import { useQuiz } from '@/core/hooks/useQuiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import React, { useContext, useEffect, useMemo } from 'react';
import QuizFinished from './QuizFinished';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import QuizProgress from './QuizProgress';
import { HttpClientContext } from '@/core/context/client-context';
import { selectCurrentQuestion, selectQuizStatus, useQuizStore } from '@/core/state/quiz.state';
import { Language } from '@/core/models/models';
import { shuffle } from '@/utils/array';

const TOTAL_QUESTIONS_REQUEST = 10;

interface QuizProps {
	language: Language;
}

export default function({ language }: QuizProps) {
	const { getAnswerLabel } = useQuizTranslation();
	const { handleAnswer } = useQuiz();
	const { initializeQuiz } = useQuizStore();
	const quizStatus = useQuizStore(selectQuizStatus);
	const currentQuestion = useQuizStore(selectCurrentQuestion);
	const { getQuiz } = useContext(HttpClientContext)!;
	const { data } = useSuspenseQuery({
		queryKey: ['quiz'],
		queryFn: () => getQuiz(TOTAL_QUESTIONS_REQUEST),
	});

	if (!data) return;


	//shuffled answers
	const answers = useMemo(() => {
		if (currentQuestion) {
			return shuffle(currentQuestion?.answers);
		}
		return [];
	}, [currentQuestion]);


	useEffect(() => {
		initializeQuiz(data, language);
	}, [data]);

	return (
		<>
			{quizStatus === 'ongoing' && (
				<View className="h-full">
					<View>
						<QuizProgress />
					</View>
					<View className="flex-1 justify-around">
						<QuizQuestion question={currentQuestion?.question} />
						<View className="px-5 flex-row flex-wrap justify-between gap-y-5">
							{answers.map((ans) => (
								<AnswerButton
									onPress={() => handleAnswer(ans)}
									label={getAnswerLabel(ans)}
									id={ans.id}
									key={ans.id}
								/>
							))}
						</View>
					</View>
				</View>
			)}
			{quizStatus === 'finished' && <QuizFinished />}
		</>
	);
}
