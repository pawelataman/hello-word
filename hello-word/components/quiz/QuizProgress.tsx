import { Text, useWindowDimensions, View } from 'react-native';
import { useMemo } from 'react';
import { selectNumOfQuestions, useQuizStore } from '@/core/state/quiz.state';

export default function() {
	const { width } = useWindowDimensions();
	const { answeredQuestions } = useQuizStore();
	const numOfQuestions = useQuizStore(selectNumOfQuestions);

	const segmentWidth = useMemo(() => {
		if (numOfQuestions === 0) return 0;
		return width / numOfQuestions - 10;
	}, [width, numOfQuestions]);

	const { correct, incorrect } = useMemo(() => {
			return answeredQuestions.reduce((acc, curr) => {

				if (curr.correctAnswerId === curr.userAnswerId) {
					return { ...acc, correct: acc.correct + 1 };
				}
				return { ...acc, incorrect: acc.incorrect + 1 };
			}, { correct: 0, incorrect: 0 });
		}, [answeredQuestions])

	;

	const segments = new Array(numOfQuestions).fill(0).map((val, index) => index);

	const getColor = (index: number): string => {
		const answeredQuestion = answeredQuestions[index];
		if (!answeredQuestion) return 'bg-gray-300';


		const { correctAnswerId, userAnswerId } = answeredQuestion;
		switch (correctAnswerId === userAnswerId) {
			case true:
				return 'bg-green-500';
			case false:
				return 'bg-red-500';
		}
	};

	if (numOfQuestions === 0) return;

	return (
		<View className="mt-10 mx-5 gap-8">
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
			<View className="self-end flex-row gap-2">
				<View className="py-2 px-2 bg-gray-100 rounded-md">
					<View className=" flex-row gap-4 justify-between">
						<Text className="text-green-500 font-medium">Dobre</Text>
						<Text className="text-green-500 font-bold">{correct}</Text>
					</View>
				</View>
				<View className="py-2 px-2  bg-gray-100 rounded-md">
					<View className="flex-row  gap-4 justify-between">
						<Text className="text-red-500 font-medium">Złe</Text>
						<Text className="text-red-500 font-bold">{incorrect}</Text>
					</View>
				</View>
			</View>

		</View>
	);
}
