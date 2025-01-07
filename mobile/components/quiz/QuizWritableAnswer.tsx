import { View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import { useSegmentAnswer } from '@/core/hooks/useSegmentAnswer';
import { useMemo, useState } from 'react';
import { useQuizStore } from '@/core/state/quiz.state';
import QuizWritableAnswerSegment from '@/components/quiz/QuizWritableAnswerSegment';
import AppButton from '@/components/ui/AppButton';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_AUTO_NEXT_QUESTION, storage } from '@/core/constants/storage';

interface QuizWritableAnswerProps {
	answer: Word,
	submitAnswer: (answer: string) => void
}

export default function({ answer, submitAnswer }: QuizWritableAnswerProps) {

	const { currentQuestionStatus, nextQuestion } = useQuizStore();
	const [valid, setIsValid] = useState<boolean>(false);
	const { segments, checkIsFilled } = useSegmentAnswer(answer);
	const isAnswered = useMemo(() => currentQuestionStatus === 'answered', [currentQuestionStatus]);
	const [autoNextQuestion] = useMMKVBoolean(CONFIG_AUTO_NEXT_QUESTION, storage);

	const segmentAnswers = useMemo(() => {
		return segments.map(() => '', []);
	}, [segments]);

	const onSegmentChange = (value: string, index: number) => {
		segmentAnswers[index] = value;
		setIsValid(checkIsFilled(segmentAnswers));
	};

	const handleAnswer = () => {
		const answer = segmentAnswers.join(' ');
		submitAnswer(answer);
	};

	return <View className="gap-12 items-center">
		<View className="gap-x-8 flex-row flex-wrap justify-center">
			{
				segments.map((segment, index) => <View className="flex-row" key={index}>
					<QuizWritableAnswerSegment index={index} segment={segment} onChange={onSegmentChange} />
				</View>)
			}
		</View>
		<View className="w-full items-center justify-center">
			{
				!isAnswered &&
				<AppButton disabled={!valid || isAnswered} variant={'primary'} label={'Odpowiedz'}
						   onPress={handleAnswer} />
			}
			{
				isAnswered && !autoNextQuestion &&
				<AppButton variant={'tertiary'} label={'Następne pytanie'}
						   onPress={nextQuestion} />
			}
		</View>
	</View>;
}