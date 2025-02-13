import { ApiErrorCodes } from "@/core/models/error";

const API_ERROR_MESSAGES: { [key in ApiErrorCodes]: string } = {
  category_already_exists: "Kategoria juz istnieje",
  category_not_found: "Kategoria nie istnieje",
  invalid_id: "Nieprawidłowy identyfikator",
  delete_not_allowed: "Nie można usunąć",
  insufficient_word_qty: "Zbyt maly zasób słów aby stworzyć quiz",
};

export function extractApiErrorMessage(error: ApiErrorCodes): string {
  return API_ERROR_MESSAGES[error] || "Nieznany błąd";
}
