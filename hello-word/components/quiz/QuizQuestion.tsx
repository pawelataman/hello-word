import { Text, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import PlaybackWord from '@/components/ui/PlaybackWord';
import { useQuizStore } from '@/core/state/quiz.state';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import { LANG_CODE } from '@/core/constants/common';
import { QuizMode } from '@/core/models/models';
import { useEffect } from 'react';

interface QuizQuestionProps {
	question?: Word;
	mode: QuizMode;
}

export default function({ question, mode }: QuizQuestionProps) {
	const { quizLanguage, setAnsweringEnabled, currentQuestionStatus } = useQuizStore();
	const { getQuestionLabel } = useQuizTranslation();

	useEffect(() => {
		setAnsweringEnabled(!(mode === 'hearing'));
	}, [question, mode]);

	const showPlayback: boolean = quizLanguage?.code === LANG_CODE.PL;
	const showQuestion: boolean = mode !== 'hearing';
	const questionAnswered: boolean = currentQuestionStatus === 'answered';

	const enableAnswering = () => setAnsweringEnabled(true);

	return (
		<View className="m-5 py-16 px-2.5 rounded-lg bg-gray-100 h-48 gap-5 items-center justify-evenly">
			{(showQuestion || questionAnswered) &&
				<Text className="text-center font-bold text-4xl text-gray-900">
					{getQuestionLabel(question!)}
				</Text>
			}
			{(!questionAnswered && showPlayback) &&
				<PlaybackWord word={question!.en} lang="en" onDone={enableAnswering} />}
		</View>
	);
}
