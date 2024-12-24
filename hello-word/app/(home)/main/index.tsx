import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Language } from '@/core/models/models';
import WordOfTheDay from '@/components/home/WordOfTheDay';
import { useQuizStore } from '@/core/state/quiz.state';
import { LANG_EN, LANG_PL } from '@/core/constants/common';

interface QuizOptions {
	language: Language,
}


export default function() {
	const router = useRouter();
	const { reset } = useQuizStore();


	const navigateToQuiz = (quizOptions: QuizOptions): void => {
		reset();
		router.push({
			pathname: '/quiz',
			params: {
				language: quizOptions.language.code,
			},
		});
	};


	return (
		<View className="bg-gray-200">
			<SafeAreaView>
				<View className="p-5 bg-gray-200 h-full">
					<Stack.Screen
						options={{ title: 'Hello Word' }}
					></Stack.Screen>

					<View className="flex-row gap-2.5">
						<TouchableOpacity
							className="bg-gray-100 rounded-lg relative "
							onPress={() => navigateToQuiz({ language: LANG_EN })}
						>
							<View>
								<Text>Przetłumacz na {LANG_EN.label}</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							className="bg-gray-100 rounded-lg relative "
							onPress={() => navigateToQuiz({ language: LANG_PL })}
						>
							<View>
								<Text>Przetłumacz na {LANG_PL.label}</Text>
							</View>
						</TouchableOpacity>

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
