import { LANG_CODE } from '@/core/constants/common';

export interface GetDictionaryWordsParams {
	pageSize: number;
	page: number;
	ascending: boolean;
	language: LANG_CODE.PL | LANG_CODE.EN;
}

export interface GetDictionaryWordsResponse {
	records: DictionaryWord[],
	page: number,
	pageSize: number,
	totalPages: number,
	totalRecords: number
}

export interface GetDictionaryCategoriesResponse {
	categories: DictionaryCategory[];
}

export interface DictionaryWord {
	id: number,
	[LANG_CODE.EN]: string;
	[LANG_CODE.PL]: string;
	category: {
		id: number,
		categoryName: string
	}
}

export interface DictionaryCategory {
	id: number,
	categoryName: string
}