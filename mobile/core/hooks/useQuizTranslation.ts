import { useQuizStore } from '@/core/state/quiz.state';
import { Word } from '@/core/api/models/quiz';
import { LANG_CODE, LANG_EN, LANG_PL } from '@/core/constants/common';

export function useQuizTranslation() {
	const { quizLanguage } = useQuizStore();

	const getQuestionLabel = (word: Word): string => {
		if (quizLanguage?.code === LANG_EN.code) {
			return word[LANG_PL.code];
		} else if (quizLanguage?.code === LANG_CODE.PL) {
			return word[LANG_EN.code];
		}
		return 'Unknown translation';
	};

	const getAnswerLabel = (word: Word): string => {
		return word[quizLanguage?.code!] || 'Unknown translation';
	};

	return {
		getQuestionLabel,
		getAnswerLabel,
	};
}
