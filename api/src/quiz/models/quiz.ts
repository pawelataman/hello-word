import { IsInt, IsOptional, IsPositive, Max } from "class-validator";
import { Type } from "class-transformer";

export interface QuizResponse {
  id: string;
  questions: QuizQuestion[];
  quizConfig: QuizConfig;
}

export class QuizQuery {
  @IsOptional()
  @Type(() => Number) // Convert the query param to a number
  @IsInt({ message: "Number of questions must be an integer" })
  @IsPositive({ message: "Number of questions must be a positive number" })
  @Max(50, { message: "Number of questions cannot exceed 50" })
  numOfQuestions: number = 10;
}

export interface QuizConfig {
  totalQuestions: number;
  timePerQuestion?: number;
}

export interface QuizQuestion {
  id: number;
  question: Word;
  answers: Word[];
}

export interface Word {
  id: number;
  categoryId: number;
  en: string;
  pl: string;
}
