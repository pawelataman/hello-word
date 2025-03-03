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
import {
  CreateFlashcardRequest,
  CreateFlashcardResponse,
  FlashcardBrief,
  FlashcardDetailsResponse,
  UpdateFlashcardRequest,
  UpdateFlashcardResponse,
} from "@/core/api/models/flashcard";

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

  getFlashcards(): Promise<FlashcardBrief[]>;

  createFlashcard(
    data: CreateFlashcardRequest,
  ): Promise<CreateFlashcardResponse>;

  getFlashcardDetails(id: number): Promise<FlashcardDetailsResponse>;

  updateFlashcard(
    data: UpdateFlashcardRequest,
  ): Promise<UpdateFlashcardResponse>;
}
