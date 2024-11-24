import { QuizResponse } from "@/api/models/quiz";

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
  let res = await fetch(
    `http://192.168.0.218:3000/quiz?numOfQuestions=${numOfQuestions}`,
  );
  return await res.json();
}
