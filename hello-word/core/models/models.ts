import { Word } from '@/core/api/models/quiz';
import { LANG_CODE } from '@/core/constants/common';

export interface Language {
	code: LANG_CODE;
	label: string;
}

export type QuizStatus = 'finished' | 'ongoing';
export type QuestionStatus = 'answered' | 'notAnswered'
export type HighlightMode = 'correct' | 'incorrect' | 'idle';
export type QuizMode = 'hearing' | 'writing' | 'reading'

export interface QuizHook {
	handleAnswer: (answer: Word) => void;
}

export interface QuizConfig {
	availableModes: QuizMode[];
	playbackQuestion: boolean;

}
