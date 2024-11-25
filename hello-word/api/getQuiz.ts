import { QuizResponse } from "@/api/models/quiz";

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const quiz = await fetch(
          `http://192.168.0.218:3000/quiz?numOfQuestions=${numOfQuestions}`,
        ).then((res) => res.json());

        resolve(quiz);
      } catch (e) {
        reject(e);
      }
    }, 5000);
  });
}
