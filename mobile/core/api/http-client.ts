import { QuizResponse } from '@/core/api/models/quiz';

export interface HttpClient {
	getQuiz(numOfQuestions: number): Promise<QuizResponse>;
}
