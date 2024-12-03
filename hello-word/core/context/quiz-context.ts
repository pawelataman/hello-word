import { createContext } from "react";
import { Quiz } from "@/core/models/models";
import { QUIZ_INITIAL } from "@/core/constants/quiz";

export const QuizContext = createContext<Quiz>(QUIZ_INITIAL);
