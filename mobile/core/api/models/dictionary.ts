import { LANG_CODE } from "@/core/constants/common";

export interface GetDictionaryWordsParams {
  pageSize: number;
  page: number;
  ascending: boolean;
  language: LANG_CODE.PL | LANG_CODE.EN;
  search: string;
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
  [LANG_CODE.EN]: string;
  [LANG_CODE.PL]: string;
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
  [LANG_CODE.PL]: string;
  [LANG_CODE.EN]: string;
}

export interface CreateWordsRequest {
  words: CreateDictionaryWord[];
}
