import {QuizResponse} from "@/core/api/models/quiz";
import {useAuth} from "@clerk/clerk-expo";

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
  const {getToken} = useAuth()
  const token = await getToken()
  console.log('token',token)
  const response = await fetch(
    `http://192.168.0.28:3000/quiz?numOfQuestions=${numOfQuestions}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
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
