import { Text, useWindowDimensions, View } from 'react-native';
import { useMemo } from 'react';
import { selectNumOfQuestions, useQuizStore } from '@/core/state/quiz.state';

export default function() {
	const { width } = useWindowDimensions();
	const { answeredQuestions, questionIndex } = useQuizStore();
	const numOfQuestions = useQuizStore(selectNumOfQuestions);

	const segmentWidth = useMemo(() => {
		if (numOfQuestions === 0) return 0;
		return width / numOfQuestions - 10;
	}, [width, numOfQuestions]);

	const { correct, incorrect } = useMemo(() => {
		return answeredQuestions.reduce((acc, curr) => {

			if (curr.isCorrect) {
				return { ...acc, correct: acc.correct + 1 };
			}
			return { ...acc, incorrect: acc.incorrect + 1 };
		}, { correct: 0, incorrect: 0 });
	}, [answeredQuestions]);

	const segments = new Array(numOfQuestions).fill(0).map((val, index) => index);

	const getColor = (index: number): string => {
		const answeredQuestion = answeredQuestions[index];
		if (!answeredQuestion) return 'bg-gray-300';


		const { isCorrect } = answeredQuestion;
		switch (isCorrect) {
			case true:
				return 'bg-green-500';
			case false:
				return 'bg-red-500';
		}
	};

	if (numOfQuestions === 0) return;

	return (
		<View className="mt-2 mx-5 gap-8">
			<View className="h-2 flex-row justify-between">
				{segments.map((val) => {
					return (
						<View
							key={val}
							style={{ width: segmentWidth }}
							className={`bg-gray-300 h-full rounded-2xl ${getColor(val)}`}
						></View>
					);
				})}
			</View>
			<View className="flex-row justify-between gap-2">
				<View className="py-2 px-2 bg-gray-100 rounded-md">
					<View className=" flex-row gap-4 justify-between">
						<Text
							className="text-black text-lg font-semibold">Pytanie {questionIndex + 1} z {numOfQuestions}</Text>
					</View>
				</View>
				<View className="py-2 px-2  bg-gray-100 rounded-md">
					<View className=" flex-row gap-4 justify-between">
						<Text className="text-green-500 text-lg font-semibold">Punkty {correct}</Text>
					</View>
				</View>
			</View>

		</View>
	);
}
