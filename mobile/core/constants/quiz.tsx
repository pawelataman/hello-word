import { LanguageCode } from "@/core/constants/common";
import { QuizConfig, QuizMode } from "@/core/models/models";
import { ReactNode } from "react";
import { BookOpenText, Ear, Keyboard } from "phosphor-react-native";
import { COLORS } from "@/core/constants/tailwind-colors";

export const QUIZ_CONFIG: { [p in LanguageCode]: QuizConfig } = {
  [LanguageCode.EN]: {
    availableModes: ["reading", "writing"],
    playbackQuestion: false,
  },
  [LanguageCode.PL]: {
    availableModes: ["reading", "hearing"],
    playbackQuestion: true,
  },
};

export const NEXT_QUESTION_TIMEOUT = 2000;
export const MIN_WORDS_QTY = 10;
export const SPECIAL_CHARACTERS = ["'", "`", "-", "—"];

export const ICON_FOR_MODE: {
  [p in QuizMode]: { label: string; icon: ReactNode };
} = {
  hearing: {
    icon: <Ear color={COLORS.gray["500"]} size={48} weight={"regular"} />,
    label: "Słuchanie",
  },
  reading: {
    icon: (
      <BookOpenText color={COLORS.gray["500"]} size={48} weight={"regular"} />
    ),
    label: "Czytanie",
  },
  writing: {
    icon: <Keyboard color={COLORS.gray["500"]} size={48} weight={"regular"} />,
    label: "Pisanie",
  },
  none: { label: "Żaden", icon: null },
};
