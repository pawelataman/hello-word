import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Language } from '@/core/models/models';
import WordOfTheDay from '@/components/home/WordOfTheDay';
import { LANG_EN, LANG_PL } from '@/core/constants/common';
import PL from '@/assets/images/icons/PL.svg';
import EN from '@/assets/images/icons/GB.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useQuizStore } from '@/core/state/quiz.state';

interface QuizOptions {
	language: Language,
}


export default function() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { reset } = useQuizStore();

	const navigateToQuiz = (quizOptions: QuizOptions): void => {
		queryClient.clear(); // clear queryClient cache
		reset(); // reset quiz store

		router.push({
			pathname: '/quiz',
			params: {
				language: quizOptions.language.code,
			},
		});
	};

	const langOptions = [{ lang: LANG_PL, icon: <PL width={64} height={48} /> }, {
		lang: LANG_EN,
		icon: <EN width={64} height={48} />,
	}];

	return (
		<View className="bg-gray-200">
			<SafeAreaView>
				<View className="p-5 bg-gray-200 h-full">
					<Stack.Screen
						options={{ title: 'Zacznij quiz!' }}
					></Stack.Screen>

					<View className="flex-row gap-6">
						{langOptions.map(opt => (
							<TouchableOpacity
								className=" flex-1 gap-2 p-4 items-center bg-gray-50  rounded-2xl relative"
								key={opt.lang.code}
								onPress={() => navigateToQuiz({ language: opt.lang })}
							>
								<View>
									{opt.icon}
								</View>
								<View>
									<Text className={'font-semibold text-center'}>Przetłumacz na</Text>
									<Text className={'font-semibold text-center'}>{opt.lang.label}</Text>
								</View>
							</TouchableOpacity>))}
					</View>

					<View className="mt-5">
						<WordOfTheDay />
					</View>
					<View className="mt-5">
						
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}
