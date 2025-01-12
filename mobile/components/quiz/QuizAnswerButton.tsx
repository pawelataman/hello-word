import { GestureResponderEvent, Pressable, Text } from 'react-native';
import { useMemo } from 'react';
import { HighlightMode } from '@/core/models/models';
import { useQuizStore } from '@/core/state/quiz.state';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import { Word } from '@/core/api/models/quiz';

interface AnswerButtonProps {
	onPress: (ev: GestureResponderEvent) => void;
	answer: Word;
	index: number;
}

export default function({ onPress, answer, index }: AnswerButtonProps) {
	const { getAnswerLabel } = useQuizTranslation();
	const { questionIndex, answeredQuestions, currentQuestionStatus, answeringEnabled } = useQuizStore();

	const highlighted = useMemo<HighlightMode>(() => {
		if (questionIndex > answeredQuestions.length || questionIndex === -1) return 'idle';

		const answeredQuestion = answeredQuestions[questionIndex];
		if (!answeredQuestion || answeredQuestion.type === 'typed') return 'idle';

		if (answer.id === answeredQuestion.question.question.id) return 'correct';

		if ((answeredQuestion.userAnswer as Word).id === answer.id && answer.id !== answeredQuestion.question.id) {
			return 'incorrect';
		}


		return 'idle';

	}, [questionIndex, answeredQuestions]);

	const disabled = useMemo<boolean>(() => {
		return currentQuestionStatus === 'answered' || !answeringEnabled;
	}, [currentQuestionStatus, answeringEnabled]);


	const getHighlightColor = (disabled: boolean) => {
		if (highlighted === 'correct') {
			return `bg-green-500 border-2 border-green-500`;
		}

		if (highlighted === 'incorrect') {
			return `bg-red-500 border-2 border-red-500`;
		}

		const defaultStyle = 'bg-gray-50 border-2 border-gray-200';
		if (disabled) {
			return defaultStyle.concat(' opacity-40');
		}

		return defaultStyle;
	};

	const getTextColor = () => {
		if (highlighted === 'correct' || highlighted === 'incorrect') {
			return `text-white`;
		}
		return 'text-gray-900';
	};

	return (
		<Pressable
			className={`${getHighlightColor(disabled)} w-full py-2 pr-2 pl-2 rounded-lg flex-row items-center gap-2`}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				className={'text-lg font-medium bg-gray-200 px-3 py-1 rounded-md'}>{String.fromCharCode(65 + index)}</Text>
			<Text className={`${getTextColor()} text-lg font-medium break-words whitespace-break-spaces`}>
				{getAnswerLabel(answer)}
			</Text>
		</Pressable>
	);
}
