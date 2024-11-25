import { create } from "zustand/react";
import { Language } from "@/models/models";

interface QuizState {
  quizLanguages: {
    source: Language | null;
    target: Language | null;
  };
  setQuizLanguages: (source: Language, target: Language) => void;
  numOfQuestions: number;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizLanguages: {
    source: null,
    target: null,
  },
  numOfQuestions: 10,
  setQuizLanguages: (source: Language, target: Language) =>
    set((state) => ({
      ...state,
      quizLanguages: {
        source,
        target,
      },
    })),
  setNumOfQuestions: (numOfQuestions: number) => {
    return set((state) => ({ ...state, numOfQuestions }));
  },
}));
