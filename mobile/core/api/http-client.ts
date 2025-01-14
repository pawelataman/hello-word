import { QuizResponse } from '@/core/api/models/quiz';
import { GetDictionaryWordsParams, GetDictionaryWordsResponse } from '@/core/api/models/dictionary';

export interface HttpClient {
	getQuiz(numOfQuestions: number): Promise<QuizResponse>;

	getDictionaryWords(params: GetDictionaryWordsParams): Promise<GetDictionaryWordsResponse>;
}
