import { create } from 'zustand/react';
import { Language } from '@/core/models/models';

type State = {
	quizLanguage: Language | null,
	questionsTotal: number;
	answeredQuestions: boolean[];
};
type Actions = {
	setQuizLanguage: (language: Language) => void;
	addAnsweredQuestion: (correct: boolean) => void;
	setQuestionsTotal: (total: number) => void;
	reset: () => void;
};

type QuizState = State & Actions;

const INITIAL_STATE: State = {
	quizLanguage: null,
	questionsTotal: 0,
	answeredQuestions: [],
};

export const useQuizStore = create<QuizState>((set) => ({
	...INITIAL_STATE,
	setQuizLanguage: (language: Language) =>
		set((state) => ({
			...state,
			quizLanguage: language,
		})),
	addAnsweredQuestion: (correct: boolean) =>
		set((state) => ({
			...state,
			answeredQuestions: [...state.answeredQuestions, correct],
		})),
	setQuestionsTotal: (total: number) =>
		set((state) => ({ ...state, questionsTotal: total })),
	reset: () => {
		return set({ ...INITIAL_STATE });
	},
}));
