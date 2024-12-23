import { QuizResponse } from '@/core/api/models/quiz';
import { request } from '@/core/api/client';

export async function getQuiz(numOfQuestions: number): Promise<QuizResponse> {
	return request({
		url: `/quiz?numOfQuestions=${numOfQuestions}`, method: 'GET',
	});

}
