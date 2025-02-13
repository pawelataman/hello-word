import { LANG_CODE } from "@/core/constants/common";

export interface Language {
  code: LANG_CODE;
  label: string;
}

export type QuizStatus = "finished" | "ongoing";
export type QuestionStatus = "answered" | "notAnswered";
export type HighlightMode = "correct" | "incorrect" | "idle";
export type QuizMode = "hearing" | "writing" | "reading" | "none";
export type QuizAnswerType = "choose" | "typed";

export interface QuizConfig {
  availableModes: QuizMode[];
  playbackQuestion: boolean;
}

export interface CreateWord {
  en: string;
  pl: string;
  id: string;
}
