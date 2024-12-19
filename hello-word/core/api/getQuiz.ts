import {QuizResponse} from "@/core/api/models/quiz";
import {useAuth} from "@clerk/clerk-expo";

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
  const { getToken } = useAuth();
  const token = await getToken();
  const response = await fetch(
    `https://ataman.cloud/backend/quiz?numOfQuestions=${numOfQuestions}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here r
        "Content-Type": "application/json", // Optional
      },
    },
  );

  if (!response.ok) {
    const { message } = await response.json();
    // Handle HTTP errors
    throw new Error(
      `Failed to fetch quiz. Status: ${response.status}, Message: ${message}`,
    );
  }

  return response.json();
}
