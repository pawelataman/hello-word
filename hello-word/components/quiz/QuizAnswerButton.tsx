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

	const { questionIndex, answeredQuestions, currentQuestionStatus } = useQuizStore();

	const highlighted = useMemo<HighlightMode>(() => {
		if (questionIndex > answeredQuestions.length || questionIndex === -1) return 'idle';

		const answeredQuestion = answeredQuestions[questionIndex];

		if (!answeredQuestion) return 'idle';
		if (id === answeredQuestion.correctAnswerId) return 'correct';
		if (id === answeredQuestion.userAnswerId) return 'incorrect';

		return 'idle';

	}, [questionIndex, answeredQuestions]);

	const disabled = useMemo<boolean>(() => {
		return currentQuestionStatus === 'answered';
	}, [currentQuestionStatus]);


	const getHighlightColor = () => {
		if (highlighted === 'correct') {
			return `bg-green-500`;
		}

		if (highlighted === 'incorrect') {
			return `bg-red-500`;
		}

		return 'bg-gray-100';
	};

	const getTextColor = () => {
		if (highlighted === 'correct' || highlighted === 'incorrect') {
			return `text-white`;
		}
		return 'text-gray-900';
	};

	return (
		<Pressable
			className={`${getHighlightColor()} w-[45%] h-32 py-5 px-5 rounded-lg justify-center }`}
			onPress={onPress}
			disabled={disabled}
		>
			<Text className={`${getTextColor()} text-xl text-center font-medium`}>
				{label}
			</Text>
		</Pressable>
	);
}
