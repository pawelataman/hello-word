import { create } from 'zustand/react';
import { Language, QuestionStatus, QuizStatus } from '@/core/models/models';
import { QuizResponse } from '@/core/api/models/quiz';

type State = {
	quizData: QuizResponse | null,
	quizLanguage: Language | null,
	answeredQuestions: {
		questionId: number,
		userAnswerId: number,
		correctAnswerId: number
	}[],
	questionIndex: number,
	currentQuestionStatus: QuestionStatus

};
type Actions = {
	initializeQuiz: (quiz: QuizResponse, quizLanguage: Language) => void,
	addAnsweredQuestion: (questionId: number, userAnswerId: number, correctAnswerId: number) => void;
	nextQuestion: () => void,
	reset: () => void;
};


type QuizState = State & Actions

const INITIAL_STATE: State = {
	quizLanguage: null,
	quizData: null,
	answeredQuestions: [],
	questionIndex: 0,
	currentQuestionStatus: 'notAnswered',
};

export const useQuizStore = create<QuizState>((set) => ({
	...INITIAL_STATE,
	addAnsweredQuestion: (questionId: number, userAnswerId: number, correctAnswerId: number) =>
		set((state) => ({
			...state,
			answeredQuestions: [...state.answeredQuestions, { questionId, userAnswerId, correctAnswerId }],
			currentQuestionStatus: 'answered',
		})),
	nextQuestion: () => set(state => ({
		...state,
		questionIndex: state.questionIndex + 1,
		currentQuestionStatus: 'notAnswered',
	})),
	initializeQuiz: (quiz: QuizResponse, quizLanguage: Language) => set(() => ({
		...INITIAL_STATE,
		quizData: quiz,
		quizLanguage,
	})),
	reset: () => {
		return set({ ...INITIAL_STATE });
	},
}));


// COMPUTED VALUES
export const selectCurrentQuestion = (state: State) => {
	const questions = state.quizData?.questions;
	const currentQuestionIndex = state.questionIndex;

	return questions ? questions[currentQuestionIndex] : null;
};

export const selectNumOfQuestions = (state: State) => {
	return state.quizData?.questions.length || 0;
};

export const selectQuizStatus: (state: State) => QuizStatus | null = (state: State) => {
	const currentQuestionIndex = state.questionIndex;
	const numOfQuestions = state.quizData?.questions.length;

	if (!Boolean(numOfQuestions)) return null;

	return currentQuestionIndex > numOfQuestions! - 1 ? 'finished' : 'ongoing';

};





