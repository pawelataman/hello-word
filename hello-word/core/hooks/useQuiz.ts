import { QuizHook } from '@/core/models/models';
import { Word } from '@/core/api/models/quiz';
import { selectCurrentQuestion, useQuizStore } from '@/core/state/quiz.state';
import { LANG_CODE } from '@/core/constants/common';
import * as Speech from 'expo-speech';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_VOICEOVER, storage } from '@/core/constants/storage';

export function useQuiz(): QuizHook {
	const { addAnsweredQuestion, nextQuestion } = useQuizStore();
	const currentQuestion = useQuizStore(selectCurrentQuestion);
	const [voiceover] = useMMKVBoolean(CONFIG_VOICEOVER, storage);


	const handleAnswer = (answer: Word) => {
		if (!currentQuestion) return;

		addAnsweredQuestion(currentQuestion.id, answer.id, currentQuestion.question.id);


		setTimeout(() => {
			if (voiceover) {
				playbackWord(currentQuestion.question[LANG_CODE.EN], () => nextQuestion());
			} else {
				setTimeout(() => {
					nextQuestion();
				}, 1000);
			}
		}, 250);

	};
	return {
		handleAnswer,
	};
}

function playbackWord(word: string, onDone: () => void): void {
	Speech.speak(word, {
		language: LANG_CODE.EN,
		rate: 0.8,
		onDone: () => {
			setTimeout(() => {
				onDone();
			}, 1000);
		},
	});
}

//https://dictionaryapi.dev/?ref=freepublicapis.com
