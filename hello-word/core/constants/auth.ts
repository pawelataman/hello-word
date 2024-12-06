export const EMAIL_PATTERN =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export enum AUTH_ERROR_CODES {
  FORM_PASSWORD_LENGTH_TOO_SHORT = "form_password_length_too_short",
  FORM_PASSWORD_INCORRECT = "form_password_incorrect",
  FORM_IDENTIFIER_NOT_FOUND = "form_identifier_not_found",
  FORM_IDENTIFIER_EXISTS = "form_identifier_exists",
  AUTH_TOO_MANY_REQUESTS = "too_many_requests",
  FORM_CODE_INCORRECT = "form_code_incorrect",
  FORM_PARAM_FORMAT_INVALID = "form_param_format_invalid",
}

export const AUTH_ERROR_MESSAGES: { [key in AUTH_ERROR_CODES]: string } = {
  [AUTH_ERROR_CODES.FORM_IDENTIFIER_EXISTS]: "Konto juz istnieje.",
  [AUTH_ERROR_CODES.FORM_IDENTIFIER_NOT_FOUND]: "Konto nie istnieje.",
  [AUTH_ERROR_CODES.FORM_PASSWORD_INCORRECT]: "Niepoprawne hasło.",
  [AUTH_ERROR_CODES.FORM_PASSWORD_LENGTH_TOO_SHORT]: "Zbyt krótkie hasło.",
  [AUTH_ERROR_CODES.AUTH_TOO_MANY_REQUESTS]:
    "Zbyt wiele rządań. Spróbuj ponownie później.",
  [AUTH_ERROR_CODES.FORM_CODE_INCORRECT]: "Niepoprawny kod weryfikacyjny.",
  [AUTH_ERROR_CODES.FORM_PARAM_FORMAT_INVALID]: "Niepoprawny format pola.",
};
