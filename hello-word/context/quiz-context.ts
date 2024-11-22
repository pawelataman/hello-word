import { createContext } from "react";
import { Quiz } from "@/models/models";
import { QUIZ_INITIAL } from "@/constants/quiz";

export const QuizContext = createContext<Quiz>(QUIZ_INITIAL);
