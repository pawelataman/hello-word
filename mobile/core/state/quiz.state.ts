import { create } from 'zustand/react';
import { Language, QuestionStatus, QuizAnswerType, QuizMode, QuizStatus } from '@/core/models/models';
import { QuizQuestion, QuizResponse, Word } from '@/core/api/models/quiz';

type State = {
	quizData: QuizResponse | null,
	quizLanguage: Language | null,
	quizMode: QuizMode
	answeredQuestions: {
		question: QuizQuestion
		type: QuizAnswerType
		userAnswer: Word | string,
		isCorrect: boolean
	}[],
	questionIndex: number,
	currentQuestionStatus: QuestionStatus,
	answeringEnabled: boolean

};
type Actions = {
	initializeQuiz: (quiz: QuizResponse, quizLanguage: Language, mode: QuizMode) => void,
	addAnsweredQuestion: (question: QuizQuestion, userAnswer: Word | string, type: QuizAnswerType, isCorrect: boolean) => void;
	nextQuestion: () => void,
	setAnsweringEnabled: (answeringEnabled: boolean) => void,
	reset: () => void;
};

type QuizState = State & Actions

const INITIAL_STATE: State = {
	quizLanguage: null,
	quizData: null,
	quizMode: 'none',
	answeredQuestions: [],
	questionIndex: 0,
	currentQuestionStatus: 'notAnswered',
	answeringEnabled: true,
};

export const useQuizStore = create<QuizState>((set) => ({
	...INITIAL_STATE,
	addAnsweredQuestion: (question: QuizQuestion, userAnswer: Word | string, type: QuizAnswerType, isCorrect: boolean) =>
		set((state) => ({
			...state,
			answeredQuestions: [...state.answeredQuestions, { question, userAnswer, type, isCorrect }],
			currentQuestionStatus: 'answered',
		})),
	nextQuestion: () => set(state => ({
		...state,
		questionIndex: state.questionIndex + 1,
		currentQuestionStatus: 'notAnswered',
	})),
	initializeQuiz: (quiz: QuizResponse, quizLanguage: Language, mode: QuizMode) => set(() => ({
		...INITIAL_STATE,
		quizData: quiz,
		quizLanguage,
		quizMode: mode,
	})),
	setAnsweringEnabled: (answeringEnabled: boolean) => set((state: State) => ({ ...state, answeringEnabled })),
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





