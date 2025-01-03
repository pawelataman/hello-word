import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import { useSegmentAnswer } from '@/core/hooks/useSegmentAnswer';
import { LANG_CODE } from '@/core/constants/common';
import QuizWritableAnswerSegment from '@/components/quiz/QuizWritableAnswerSegment';
import { useMemo } from 'react';
import AppButton from '@/components/ui/AppButton';

interface QuizWritableAnswerProps {
	answer: Word,
	onSubmit: (ans: Word) => void
}

export default function({ answer, onSubmit }: QuizWritableAnswerProps) {
	answer = {
		[LANG_CODE.EN]: 'hfsdfeg sdw',
		id: 1,
		[LANG_CODE.PL]: 'klasa grupowa',
		categoryId: 2,
	};

	const { segments } = useSegmentAnswer(answer);

	const segmentAnswers = useMemo(() => {
		return segments.map(() => '', []);
	}, [segments]);

	const onSegmentChange = (value: string, index: number) => {
		segmentAnswers[index] = value;
	};

	const checkAnswers = () => {
		console.log(segmentAnswers.join(' '));
	};

	return (
		<View className="w-full flex-1 justify-between">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={150}
			>
				<View className=" gap-x-8 flex-row flex-wrap justify-center">
					{
						segments.map((segment, index) => <View className="flex-row" key={index}>
							<QuizWritableAnswerSegment index={index} segment={segment} onChange={onSegmentChange} />
						</View>)
					}
				</View>
			</KeyboardAvoidingView>

			<View className=" w-full flex-1 justify-center">
				<AppButton disabled variant={'primary'} label={'Odpowiedz'} onPress={checkAnswers} />
			</View>
		</View>
	);
}