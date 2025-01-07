import { Word } from '@/core/api/models/quiz';
import { selectCurrentQuestion, selectNumOfQuestions, useQuizStore } from '@/core/state/quiz.state';
import { LANG_CODE } from '@/core/constants/common';
import * as Speech from 'expo-speech';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_AUTO_NEXT_QUESTION, CONFIG_VOICEOVER, storage } from '@/core/constants/storage';
import { useQuizTranslation } from '@/core/hooks/useQuizTranslation';
import { NEXT_QUESTION_TIMEOUT } from '@/core/constants/quiz';


export function useQuiz() {
	const { addAnsweredQuestion, nextQuestion, quizLanguage, questionIndex } = useQuizStore();
	const numOfQuestions = useQuizStore(selectNumOfQuestions);
	const { getAnswerLabel } = useQuizTranslation();
	const currentQuestion = useQuizStore(selectCurrentQuestion);
	const [voiceover] = useMMKVBoolean(CONFIG_VOICEOVER, storage);
	const [autoNextQuestion] = useMMKVBoolean(CONFIG_AUTO_NEXT_QUESTION, storage);

	const handleChooseAnswer = (answer: Word): void => {
		if (!currentQuestion) return;

		const isCorrect = answer.id === currentQuestion.question.id;

		addAnsweredQuestion(currentQuestion, answer, 'choose', isCorrect);

		const word = currentQuestion.question[LANG_CODE.EN];
		if (voiceover) {
			playbackWord(word, () => invokeNextQuestion());
		} else {
			invokeNextQuestion();
		}
	};

	const handleTypedAnswer = (answer: string): void => {
		if (!currentQuestion) return;

		const isCorrect = getAnswerLabel(currentQuestion.question) === answer;

		addAnsweredQuestion(currentQuestion, answer, 'typed', isCorrect);

		setTimeout(() => {
			if (voiceover) {
				playbackWord(getAnswerLabel(currentQuestion.question), () => invokeNextQuestion());
			} else {
				invokeNextQuestion();
			}
		}, 250);
	};


	function invokeNextQuestion(immediate: boolean = false) {
		if (immediate) {
			nextQuestion();
		} else {
			setTimeout(() => {
				nextQuestion();
			}, NEXT_QUESTION_TIMEOUT);
		}
	}

	return {
		handleChooseAnswer,
		handleTypedAnswer,
	};
}

function playbackWord(word: string, onDone: () => void = () => {
}): void {

	const beforePlaybackDelay = 250;
	const afterPlaybackDelay = 1000;
	setTimeout(() => {
		Speech.speak(word, {
			language: LANG_CODE.EN,
			rate: 0.8,
			onDone: () => {
				setTimeout(() => {
					onDone();
				}, afterPlaybackDelay);
			},
		});
	}, beforePlaybackDelay);

}


//https://dictionaryapi.dev/?ref=freepublicapis.com
