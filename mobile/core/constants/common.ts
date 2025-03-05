import { Language } from "@/core/models/models";

export enum LanguageCode {
  EN = "en",
  PL = "pl",
}

export const LANG_EN: Language = {
  code: LanguageCode.EN,
  label: "Angielski",
} as const;

export const LANG_PL: Language = {
  code: LanguageCode.PL,
  label: "Polski",
} as const;

export const LANG_DATA = {
  [LanguageCode.PL]: LANG_PL,
  [LanguageCode.EN]: LANG_EN,
};

export const QUIZ_LANGUAGES: Language[] = [LANG_PL, LANG_EN];
