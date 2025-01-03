import { GestureResponderEvent, Pressable, Text } from 'react-native';
import { useMemo } from 'react';
import { HighlightMode } from '@/core/models/models';
import { useQuizStore } from '@/core/state/quiz.state';

interface AnswerButtonProps {
	onPress: (ev: GestureResponderEvent) => void;
	label: string;
	id: number;
}

export default function({ id, onPress, label }: AnswerButtonProps) {

	const { questionIndex, answeredQuestions, currentQuestionStatus, answeringEnabled } = useQuizStore();

	const highlighted = useMemo<HighlightMode>(() => {
		if (questionIndex > answeredQuestions.length || questionIndex === -1) return 'idle';

		const answeredQuestion = answeredQuestions[questionIndex];

		if (!answeredQuestion) return 'idle';
		if (id === answeredQuestion.correctAnswerId) return 'correct';
		if (id === answeredQuestion.userAnswerId) return 'incorrect';

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
			return `bg-red-500`;
		}


		const defaultStyle = 'bg-gray-50 border-2 border-gray-200';
		if (disabled) {
			return defaultStyle.concat(' opacity-40');
		}

		return 'bg-gray-50 border-2 border-gray-200';
	};

	const getTextColor = () => {
		if (highlighted === 'correct' || highlighted === 'incorrect') {
			return `text-white`;
		}
		return 'text-gray-900';
	};

	return (
		<Pressable
			className={`${getHighlightColor(disabled)} w-[45%] h-32 py-5 px-5 rounded-lg justify-center }`}
			onPress={onPress}
			disabled={disabled}
		>
			<Text className={`${getTextColor()} text-xl text-center font-medium break-words`}>
				{label}
			</Text>
		</Pressable>
	);
}
