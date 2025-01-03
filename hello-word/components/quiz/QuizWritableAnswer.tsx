import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import { useSegmentAnswer } from '@/core/hooks/useSegmentAnswer';
import QuizWritableAnswerSegment from '@/components/quiz/QuizWritableAnswerSegment';
import { useMemo, useState } from 'react';
import AppButton from '@/components/ui/AppButton';
import { LANG_CODE } from '@/core/constants/common';

interface QuizWritableAnswerProps {
	answer: Word,
	onSubmit: (ans: Word) => void
}

export default function({ answer, onSubmit }: QuizWritableAnswerProps) {

	const [valid, setIsValid] = useState<boolean>(false);
	answer = {
		[LANG_CODE.EN]: 'accountability',
		id: 1,
		[LANG_CODE.PL]: 'rozliczalnosc',
		categoryId: 2,
	};

	const { segments, checkIsFilled } = useSegmentAnswer(answer);

	const segmentAnswers = useMemo(() => {
		return segments.map(() => '', []);
	}, [segments]);

	const onSegmentChange = (value: string, index: number) => {
		segmentAnswers[index] = value;
		setIsValid(checkIsFilled(segmentAnswers));
	};


	const checkAnswers = () => {
		console.log(segmentAnswers.join(' '));
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


				<View className=" w-full px-4 justify-center">
					<AppButton disabled={!valid} variant={'primary'} label={'Odpowiedz'} onPress={checkAnswers} />
				</View>
			</View>

		</KeyboardAvoidingView>

	);
}