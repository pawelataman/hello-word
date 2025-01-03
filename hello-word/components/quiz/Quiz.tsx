import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
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
import Bulb from '@/assets/images/icons/bulb.svg';

const TOTAL_QUESTIONS_REQUEST = 10;

interface QuizProps {
	language: Language;
	mode: QuizMode;
}

export default function({ language, mode }: QuizProps) {
	const { handleChooseAnswer, handleTypedAnswer } = useQuiz();
	const { initializeQuiz, currentQuestionStatus } = useQuizStore();
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

	const isWriting = useMemo(() => mode === 'writing', [mode]);
	const isAnswered = useMemo(() => currentQuestionStatus === 'answered', [currentQuestionStatus]);

	const giveUpAnswer = () => {
		handleTypedAnswer('Some random incorrect answer');
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
							  keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
		>
			{quizStatus === 'ongoing' && (
				<View className="h-full">
					<QuizProgress />
					<View className="px-5 justify-between items-center mb-12 flex-1">
						<View className={'w-full my-5'}>
							<QuizQuestion question={currentQuestion?.question} mode={mode} />
						</View>
						{
							isWriting &&
							<TouchableOpacity disabled={isAnswered} onPress={giveUpAnswer}
											  className={'self-end px-4 py-1 rounded-xl justify-end items-center gap-4 flex-row border-2 border-gray-100 '}>
								<Text className={'font-semibold'}>Sprawdź odpowiedź</Text>
								<Bulb color={'#22c55e'} fill={'white'} width={28} height={28} />
							</TouchableOpacity>
						}

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
							<View className={'flex-1 justify-center'}>
								<QuizWritableAnswer answer={currentQuestion!.question}
													submitAnswer={handleTypedAnswer} />
							</View>

						}

					</View>
				</View>
			)}
			{quizStatus === 'finished' && <QuizFinished />}
		</KeyboardAvoidingView>

	);
}
