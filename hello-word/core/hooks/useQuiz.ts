import { QuizHook } from '@/core/models/models';
import { Word } from '@/core/api/models/quiz';
import { selectCurrentQuestion, useQuizStore } from '@/core/state/quiz.state';
import { LANG_CODE } from '@/core/constants/common';
import * as Speech from 'expo-speech';

export function useQuiz(): QuizHook {
	const { addAnsweredQuestion, nextQuestion } = useQuizStore();
	const currentQuestion = useQuizStore(selectCurrentQuestion);


	const handleAnswer = (answer: Word) => {
		if (!currentQuestion) return;

		addAnsweredQuestion(currentQuestion.id, answer.id, currentQuestion.question.id);

		setTimeout(() => {
			playbackWord(currentQuestion.question[LANG_CODE.EN], () => nextQuestion());
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
