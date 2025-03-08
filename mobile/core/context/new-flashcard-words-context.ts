import { createContext } from "react";
import { NewFlashcardWords } from "@/core/hooks/useNewFlashcardWords";

export const NewFlashcardWordsContext = createContext<NewFlashcardWords | null>(
  null,
);
