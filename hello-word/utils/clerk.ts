import { AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES } from "@/core/constants/auth";

export function extractClerkErrorMessage(error?: any): string {
  const DEFAULT_ERROR_MSG = "Niespodziewany błąd.";
  if (error && "clerkError" in error && error.clerkError) {
    const [firstError] = error.errors;
    return (
      AUTH_ERROR_MESSAGES[firstError.code as AUTH_ERROR_CODES] ||
      DEFAULT_ERROR_MSG
    );
  }
  return DEFAULT_ERROR_MSG;
}
