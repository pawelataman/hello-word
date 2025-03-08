export type ApiErrorCodes =
  | "category_already_exists"
  | "category_not_found"
  | "invalid_id"
  | "delete_not_allowed"
  | "insufficient_word_qty"
  | "flashcard_already_exists";

export interface ApiError {
  message: string | { [key: string]: string };
  statusCode: number;
}
