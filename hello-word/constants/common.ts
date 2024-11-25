import { Language } from "@/models/models";

export enum LANG_CODE {
  EN = "en",
  PL = "pl",
}

export const LANG_EN: Language = {
  code: LANG_CODE.EN,
  label: "Angielski",
} as const;

export const LANG_PL: Language = {
  code: LANG_CODE.PL,
  label: "Polski",
} as const;

export const QUIZ_LANGUAGES: Language[] = [LANG_PL, LANG_EN];
