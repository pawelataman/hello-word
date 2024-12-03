import { LANG_CODE } from "@/core/constants/common";

export interface QuizResponse {
  id: string;
  questions: QuizQuestion[];
  quizConfig: QuizConfig;
}

export interface QuizConfig {
  totalQuestions: number;
  timePerQuestion?: number;
}

export interface QuizQuestion {
  question: Word;
  answers: Word[];
}

export interface Word {
  id: number;
  categoryId: number;
  [LANG_CODE.EN]: string;
  [LANG_CODE.PL]: string;
}
