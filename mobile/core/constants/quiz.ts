import { LANG_CODE } from '@/core/constants/common';
import { QuizConfig } from '@/core/models/models';

export const QUIZ_CONFIG: { [p in LANG_CODE]: QuizConfig } = {
	[LANG_CODE.EN]: {
		availableModes: ['reading', 'writing'],
		playbackQuestion: false,
	},
	[LANG_CODE.PL]: {
		availableModes: ['reading', 'hearing'],
		playbackQuestion: true,
	},
};