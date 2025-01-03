import { View } from 'react-native';
import AnswerButton from '@/components/quiz/QuizAnswerButton';
import { useQuiz } from '@/core/hooks/useQuiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import React, { useContext, useEffect, useMemo } from 'react';
import QuizFinished from './QuizFinished';
import QuizProgress from './QuizProgress';
import { HttpClientContext } from '@/core/context/client-context';
import { selectCurrentQuestion, selectQuizStatus, useQuizStore } from '@/core/state/quiz.state';
import { Language, QuizMode } from '@/core/models/models';
import { shuffle } from '@/utils/array';
import QuizWritableAnswer from '@/components/quiz/QuizWritableAnswer';

const TOTAL_QUESTIONS_REQUEST = 10;

interface QuizProps {
	language: Language;
	mode: QuizMode;
}

export default function({ language, mode }: QuizProps) {
	const { handleChooseAnswer } = useQuiz();
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
		initializeQuiz(data, language, mode);
	}, [data]);

	const isWriting = mode === 'writing';

	return (
		<>
			{quizStatus === 'ongoing' && (
				<View className="h-full">

					<QuizProgress />

					<View className="justify-between mb-12 flex-1">
						<QuizQuestion question={currentQuestion?.question} mode={mode} />
						{
							!isWriting && (<View className="px-5 flex-row flex-wrap justify-between gap-y-5">
								{answers.map((ans) => (
									<AnswerButton
										onPress={() => handleChooseAnswer(ans)}
										key={ans.id}
										answer={ans}
									/>
								))}
							</View>)
						}
						{
							isWriting &&
							<QuizWritableAnswer answer={currentQuestion!.question} onSubmit={() => {
							}} />
						}

					</View>
				</View>
			)}
			{quizStatus === 'finished' && <QuizFinished />}
		</>

	);
}
