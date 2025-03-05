import { LanguageCode } from "@/core/constants/common";

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
  [LanguageCode.EN]: string;
  [LanguageCode.PL]: string;
}

export interface GetQuizFromFlashcardsRequest {
  flashcardsIds: number[];
}
