import { LanguageCode } from "@/core/constants/common";

export interface GetDictionaryWordsParams {
  pageSize: number;
  page: number;
  ascending: boolean;
  language: LanguageCode.PL | LanguageCode.EN;
  search: string;
  usersOnly: boolean;
}

export interface GetDictionaryWordsResponse {
  records: DictionaryWord[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface GetDictionaryCategoriesResponse {
  categories: DictionaryCategory[];
}

export interface DictionaryWord {
  id: number;
  [LanguageCode.EN]: string;
  [LanguageCode.PL]: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DictionaryCategory {
  id: number;
  categoryName: string;
  words: DictionaryWord[];
}

export interface GetCategoryDetailsResponse {
  id: number;
  categoryName: string;
  words: DictionaryWord[];
}

export interface CreateCategoryRequest {
  categoryName: string;
}

export interface CreateCategoryResponse {
  id: number;
  categoryName: string;
  userId: string;
}

export interface CreateDictionaryWord {
  [LanguageCode.PL]: string;
  [LanguageCode.EN]: string;
}

export interface CreateWordsRequest {
  words: CreateDictionaryWord[];
}

export interface UpdateWordRequest  {
  [LanguageCode.EN]: string;
  [LanguageCode.PL]: string;
}
