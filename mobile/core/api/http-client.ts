import { QuizResponse } from "@/core/api/models/quiz";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CreateWordsRequest,
  DictionaryWord,
  GetCategoryDetailsResponse,
  GetDictionaryCategoriesResponse,
  GetDictionaryWordsParams,
  GetDictionaryWordsResponse,
} from "@/core/api/models/dictionary";

export interface HttpClient {
  getQuiz(numOfQuestions: number): Promise<QuizResponse>;

  getDictionaryWords(
    params: GetDictionaryWordsParams,
  ): Promise<GetDictionaryWordsResponse>;

  getDictionaryCategories(): Promise<GetDictionaryCategoriesResponse>;

  getDictionaryCategoryDetails(id: number): Promise<GetCategoryDetailsResponse>;

  postCreateCategory(
    data: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse>;

  postCreateWord(data: CreateWordsRequest): Promise<DictionaryWord[]>;
}
