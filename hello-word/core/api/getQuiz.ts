import { QuizResponse } from "@/core/api/models/quiz";

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
  const response = await fetch(
    `http://192.168.0.109:3000/quiz?numOfQuestions=${numOfQuestions}`,
  );

  if (!response.ok) {
    // Handle HTTP errors
    throw new Error(
      `Failed to fetch quiz. Status: ${response.status}, Message: ${response.statusText}`,
    );
  }

  return response.json();
}
