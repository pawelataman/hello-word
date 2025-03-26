import { create } from "zustand/react";
import {
  QuestionStatus,
  QuizAnswerType,
  QuizMode,
  QuizStatus,
} from "@/core/models/models";
import { QuizQuestion, QuizResponse, Word } from "@/core/api/models/quiz";
import { LanguageCode } from "@/core/constants/common";

type State = {
  quizMetadata: {
    language: LanguageCode;
    mode: QuizMode;
    flashcardsIds?: number[];
  };
  quizData: QuizResponse | null;
  quizRunData: {
    answeredQuestions: {
      question: QuizQuestion;
      type: QuizAnswerType;
      userAnswer: Word | string;
      isCorrect: boolean;
    }[];
    questionIndex: number;
    currentQuestionStatus: QuestionStatus;
    answeringEnabled: boolean;
  };
};
type Actions = {
  initializeQuiz: (quiz: QuizResponse) => void;
  addAnsweredQuestion: (
    question: QuizQuestion,
    userAnswer: Word | string,
    type: QuizAnswerType,
    isCorrect: boolean,
  ) => void;
  nextQuestion: () => void;
  setAnsweringEnabled: (answeringEnabled: boolean) => void;
  setQuizMetadata: (metadata: {
    mode: QuizMode;
    language: LanguageCode;
    flashcardsIds?: number[];
  }) => void;
  restartQuiz: () => void;
};

type QuizState = State & Actions;

const INITIAL_STATE: State = {
  quizMetadata: {
    flashcardsIds: [],
    mode: "none",
    language: LanguageCode.PL,
  },
  quizData: null,
  quizRunData: {
    answeredQuestions: [],
    questionIndex: 0,
    currentQuestionStatus: "notAnswered",
    answeringEnabled: true,
  },
};

export const useQuizStore = create<QuizState>((set) => ({
  ...INITIAL_STATE,
  addAnsweredQuestion: (
    question: QuizQuestion,
    userAnswer: Word | string,
    type: QuizAnswerType,
    isCorrect: boolean,
  ) =>
    set(
      (state): State => ({
        ...state,
        quizRunData: {
          ...state.quizRunData,
          answeredQuestions: [
            ...state.quizRunData.answeredQuestions,
            { question, userAnswer, type, isCorrect },
          ],
          currentQuestionStatus: "answered",
        },
      }),
    ),
  nextQuestion: () =>
    set(
      (state): State => ({
        ...state,
        quizRunData: {
          ...state.quizRunData,
          questionIndex: state.quizRunData.questionIndex + 1,
          currentQuestionStatus: "notAnswered",
        },
      }),
    ),
  initializeQuiz: (quiz: QuizResponse) =>
    set(
      (state): State => ({
        ...state,
        quizRunData: INITIAL_STATE.quizRunData,
        quizData: quiz,
      }),
    ),
  setAnsweringEnabled: (answeringEnabled: boolean) =>
    set(
      (state: State): State => ({
        ...state,
        quizRunData: { ...state.quizRunData, answeringEnabled },
      }),
    ),
  setQuizMetadata: (metadata: {
    mode: QuizMode;
    language: LanguageCode;
    flashcardsIds?: number[];
  }) => set((state: State): State => ({ ...state, quizMetadata: metadata })),
  restartQuiz: () => {
    return set((state: State) => ({
      ...INITIAL_STATE,
      quizMetadata: state.quizMetadata,
    }));
  },
}));

// COMPUTED VALUES
export const selectCurrentQuestion = (state: State) => {
  const questions = state.quizData?.questions;
  const currentQuestionIndex = state.quizRunData.questionIndex;

  return questions ? questions[currentQuestionIndex] : null;
};

export const selectNumOfQuestions = (state: State) => {
  return state.quizData?.questions.length || 0;
};

export const selectQuizStatus: (state: State) => QuizStatus | null = (
  state: State,
) => {
  const currentQuestionIndex = state.quizRunData.questionIndex;
  const numOfQuestions = state.quizData?.questions.length;

  if (!Boolean(numOfQuestions)) return null;

  return currentQuestionIndex > numOfQuestions! - 1 ? "finished" : "ongoing";
};
