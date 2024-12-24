import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Language } from '@/core/models/models';
import { LANG_EN, LANG_PL } from '@/core/constants/common';
import WordOfTheDay from '@/components/home/WordOfTheDay';
import { useQuizStore } from '@/core/state/quiz.state';

interface OptionPayload {
	from: Language;
	to: Language;
}

const options = [
	{
		description: `${LANG_PL.label} - ${LANG_EN.label}`,
		payload: {
			from: LANG_PL,
			to: LANG_EN,
		} as OptionPayload,
	},
	{
		description: `${LANG_EN.label} - ${LANG_PL.label}`,
		payload: {
			from: LANG_EN,
			to: LANG_PL,
		} as OptionPayload,
	},
];

export default function() {
	const router = useRouter();
	const { reset } = useQuizStore();


	const navigateToQuiz = (params: OptionPayload): void => {
		reset();
		router.push({
			pathname: '/quiz',
			params: {
				sourceLangCode: params.from.code,
				targetLangCode: params.to.code,
			},
		});
	};


	return (
		<View className="bg-gray-200">
			<SafeAreaView>
				<View className="p-5 bg-gray-200 h-full">
					<Stack.Screen
						options={{ title: 'Rozpocznij quiz' }}
					></Stack.Screen>

					<View className="flex-row gap-2.5">
						{options.map((opt) => (
							<TouchableOpacity
								className="flex-1 h-24 bg-gray-50 rounded-lg border-b-4 border-b-green-500 justify-center items-center"
								key={opt.description}
								onPress={() => navigateToQuiz(opt.payload)}
							>
								<View>
									<Text>{opt.description}</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
					<View className="mt-5">
						<WordOfTheDay />
					</View>
					<View>

					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}
