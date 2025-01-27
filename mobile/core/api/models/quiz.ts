import { LANG_CODE } from '@/core/constants/common';

export interface QuizResponse {
	id: string;
	questions: QuizQuestion[];
}

export interface QuizQuestion {
	id: number;
	question: Word;
	answers: Word[];
}

export interface Word {
	id: number;
	[LANG_CODE.EN]: string;
	[LANG_CODE.PL]: string;
}
