import { QuizHook } from '@/core/models/models';
import { Word } from '@/core/api/models/quiz';
import { selectCurrentQuestion, useQuizStore } from '@/core/state/quiz.state';
import * as Speech from 'expo-speech';
import { LANG_CODE } from '@/core/constants/common';

export function useQuiz(): QuizHook {
	const { addAnsweredQuestion, nextQuestion } = useQuizStore();
	const currentQuestion = useQuizStore(selectCurrentQuestion);


	const handleAnswer = (answer: Word) => {
		if (!currentQuestion) return;

		addAnsweredQuestion(currentQuestion.id, answer.id, currentQuestion.question.id);

		Speech.speak(currentQuestion.question[LANG_CODE.EN], {
			language: LANG_CODE.EN,
			rate: 0.8,
			onDone: () => {
				setTimeout(() => {
					nextQuestion();
				}, 1000);
			},
		});

	};

	return {
		handleAnswer,
	};
}

//https://dictionaryapi.dev/?ref=freepublicapis.com
