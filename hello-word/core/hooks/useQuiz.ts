import { Word } from '@/core/api/models/quiz';
import { selectCurrentQuestion, useQuizStore } from '@/core/state/quiz.state';
import { LANG_CODE } from '@/core/constants/common';
import * as Speech from 'expo-speech';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_VOICEOVER, storage } from '@/core/constants/storage';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';

export function useQuiz() {
	const { addAnsweredQuestion, nextQuestion } = useQuizStore();
	const { getAnswerLabel } = useQuizTranslation();
	const currentQuestion = useQuizStore(selectCurrentQuestion);
	const [voiceover] = useMMKVBoolean(CONFIG_VOICEOVER, storage);


	const handleChooseAnswer = (answer: Word): void => {
		if (!currentQuestion) return;

		const isCorrect = answer.id === currentQuestion.question.id;

		addAnsweredQuestion(currentQuestion, answer, 'choose', isCorrect);

		setTimeout(() => {
			if (voiceover) {
				playbackWord(getAnswerLabel(currentQuestion.question), 1000, () => nextQuestion());
			} else {
				setTimeout(() => {
					nextQuestion();
				}, 1000);
			}
		}, 250);
	};

	const handleTypedAnswer = (answer: string): void => {
		if (!currentQuestion) return;

		const isCorrect = getAnswerLabel(currentQuestion.question) === answer;

		addAnsweredQuestion(currentQuestion, answer, 'typed', isCorrect);

		setTimeout(() => {
			if (voiceover) {
				playbackWord(getAnswerLabel(currentQuestion.question), 1000);
			} else {
				setTimeout(() => {
					nextQuestion();
				}, 5000);
			}
		}, 250);
	};

	return {
		handleChooseAnswer,
		handleTypedAnswer,
	};
}

function playbackWord(word: string, timeout: number, onDone: () => void = () => {
}): void {
	Speech.speak(word, {
		language: LANG_CODE.EN,
		rate: 0.8,
		onDone: () => {
			setTimeout(() => {
				onDone();
			}, timeout);
		},
	});
}

//https://dictionaryapi.dev/?ref=freepublicapis.com
