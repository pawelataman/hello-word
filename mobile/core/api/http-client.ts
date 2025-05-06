import {
  GetQuizFromFlashcardsRequest,
  QuizResponse,
} from "@/core/api/models/quiz";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CreateWordsRequest,
  DictionaryWord,
  GetCategoryDetailsResponse,
  GetDictionaryCategoriesResponse,
  GetDictionaryWordsParams,
  GetDictionaryWordsResponse,
  UpdateWordRequest,
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
  getQuiz(): Promise<QuizResponse>;
  getQuizFromFlashcards(
    data: GetQuizFromFlashcardsRequest
  ): Promise<QuizResponse>;

  getDictionaryWords(
    params: GetDictionaryWordsParams
  ): Promise<GetDictionaryWordsResponse>;

  getDictionaryCategories(): Promise<GetDictionaryCategoriesResponse>;

  getDictionaryCategoryDetails(id: number): Promise<GetCategoryDetailsResponse>;

  postCreateCategory(
    data: CreateCategoryRequest
  ): Promise<CreateCategoryResponse>;

  postCreateWord(data: CreateWordsRequest): Promise<DictionaryWord[]>;

  getFlashcards(): Promise<FlashcardBrief[]>;

  createFlashcard(
    data: CreateFlashcardRequest
  ): Promise<CreateFlashcardResponse>;

  getFlashcardDetails(id: number): Promise<FlashcardDetailsResponse>;

  updateFlashcard(
    data: UpdateFlashcardRequest
  ): Promise<UpdateFlashcardResponse>;

  deleteFlashcard(id: number): Promise<void>;
  deleteWord(id: number): Promise<void>;
  updateWord(id: number, data: UpdateWordRequest): Promise<void> ;
  }
