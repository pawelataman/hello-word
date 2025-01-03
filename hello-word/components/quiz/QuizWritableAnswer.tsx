import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import { useSegmentAnswer } from '@/core/hooks/useSegmentAnswer';
import QuizWritableAnswerSegment from '@/components/quiz/QuizWritableAnswerSegment';
import { useMemo, useState } from 'react';
import AppButton from '@/components/ui/AppButton';
import { useQuiz } from '@/core/hooks/useQuiz';
import { useQuizStore } from '@/core/state/quiz.state';

interface QuizWritableAnswerProps {
	answer: Word,
	onSubmit: (ans: Word) => void
}

export default function({ answer, onSubmit }: QuizWritableAnswerProps) {

	const { handleTypedAnswer } = useQuiz();
	const { currentQuestionStatus, nextQuestion } = useQuizStore();
	const [valid, setIsValid] = useState<boolean>(false);
	const { segments, checkIsFilled } = useSegmentAnswer(answer);
	const isAnswered = useMemo(() => currentQuestionStatus === 'answered', [currentQuestionStatus]);

	const segmentAnswers = useMemo(() => {
		return segments.map(() => '', []);
	}, [segments]);

	const onSegmentChange = (value: string, index: number) => {
		segmentAnswers[index] = value;
		setIsValid(checkIsFilled(segmentAnswers));
	};

	const checkAnswers = () => {
		const answer = segmentAnswers.join(' ');
		handleTypedAnswer(answer);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
							  keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
							  className="flex-grow justify-around">
			<View className={'flex-grow justify-between gap-24'}>

				<View className=" gap-x-8 flex-row flex-wrap justify-center">
					{
						segments.map((segment, index) => <View className="flex-row" key={index}>
							<QuizWritableAnswerSegment index={index} segment={segment} onChange={onSegmentChange} />
						</View>)
					}
				</View>

				<View className=" w-full items-center justify-center">
					{
						!isAnswered &&
						<AppButton disabled={!valid || isAnswered} variant={'primary'} label={'Odpowiedz'}
								   onPress={checkAnswers} />
					}
					{
						isAnswered &&
						<AppButton variant={'tertiary'} label={'Następne pytanie'}
								   onPress={nextQuestion} />
					}
				</View>
			</View>

		</KeyboardAvoidingView>

	);
}