import { Text, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import PlaybackWord from '@/components/ui/PlaybackWord';
import { selectCurrentQuestion, useQuizStore } from '@/core/state/quiz.state';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import { LANG_CODE } from '@/core/constants/common';
import { QuizMode } from '@/core/models/models';
import { useCallback, useEffect, useMemo } from 'react';

interface QuizQuestionProps {
	question?: Word;
	mode: QuizMode;
}

export default function({ question, mode }: QuizQuestionProps) {
	const { quizLanguage, setAnsweringEnabled, currentQuestionStatus, quizMode, answeredQuestions } = useQuizStore();
	const currentQuestion = useQuizStore(selectCurrentQuestion);
	const { getQuestionLabel, getAnswerLabel } = useQuizTranslation();

	const lastAnsweredCorrect = useMemo(() => {
		if (answeredQuestions.length) {
			const lastAnswered = answeredQuestions[answeredQuestions.length - 1];
			return lastAnswered.isCorrect;
		}
	}, [answeredQuestions]);

	useEffect(() => {
		setAnsweringEnabled(!(mode === 'hearing'));
	}, [question, mode]);

	const showPlayback: boolean = quizLanguage?.code === LANG_CODE.PL;
	const showQuestion: boolean = mode !== 'hearing';
	const questionAnswered: boolean = currentQuestionStatus === 'answered';

	const enableAnswering = () => setAnsweringEnabled(true);

	const WritingModeQuestion = useCallback(() => <View className="justify-around">
		<Text
			className={`text-center font-bold ${currentQuestionStatus === 'answered' ? 'text-xl' : 'text-2xl'}  text-gray-900`}>
			{getQuestionLabel(question!)}
		</Text>
		{
			currentQuestionStatus === 'answered' &&
			<Text
				className={`text-center font-bold text-2xl ${lastAnsweredCorrect ? 'text-green-500' : 'text-red-500'} mt-4`}>
				{getAnswerLabel(currentQuestion!.question)}
			</Text>
		}

	</View>, [currentQuestionStatus, lastAnsweredCorrect, currentQuestion]);


	return (
		<View className="p-2 rounded-lg bg-gray-100 h-36 gap-5 items-center justify-evenly">
			{
				quizMode !== 'writing' && (showQuestion || questionAnswered) &&
				<Text className="text-center font-bold text-2xl text-gray-900">
					{getQuestionLabel(question!)}
				</Text>
			}
			{
				quizMode === 'writing' && <WritingModeQuestion />
			}
			{(!questionAnswered && showPlayback) &&
				<PlaybackWord word={question!.en} lang="en" onDone={enableAnswering} />}
		</View>
	);
}
