import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "@clerk/clerk-expo";
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
import { HttpClient } from "@/core/api/http-client";
import { ApiError } from "@/core/models/error";
import {
  CreateFlashcardRequest,
  CreateFlashcardResponse,
  FlashcardBrief,
} from "@/core/api/models/flashcard";

export const useClient = (): HttpClient => {
  const { getToken } = useAuth();
  const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });

  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Could not initialize http client");
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => {
      const { data } = response;
      return data;
    };

    const onError = function (error: AxiosError<ApiError>): Promise<ApiError> {
      if (error.response) {
        return Promise.reject({
          message: error.response.data.message,
          statusCode: error.response.status,
        });
      }

      return Promise.reject({
        message: error.message,
        statusCode: error.code,
      });
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return {
    getQuiz(numOfQuestions: number): Promise<any> {
      return request({
        url: `/quiz?numOfQuestions=${numOfQuestions}`,
        method: "GET",
      });
    },
    getDictionaryWords(
      params: GetDictionaryWordsParams,
    ): Promise<GetDictionaryWordsResponse> {
      return request({
        url: `/dictionary/words?page=${params.page}&pageSize=${params.pageSize}&ascending=${params.ascending}&language=${params.language}&search=${params.search}`,
      });
    },
    getDictionaryCategories(): Promise<GetDictionaryCategoriesResponse> {
      return request({
        url: "/dictionary/categories",
      });
    },
    getDictionaryCategoryDetails(
      id: number,
    ): Promise<GetCategoryDetailsResponse> {
      return request({
        url: `/dictionary/categories/${id}`,
      });
    },
    postCreateCategory(
      data: CreateCategoryRequest,
    ): Promise<CreateCategoryResponse> {
      return request({
        url: "/dictionary/categories",
        method: "POST",
        data,
      });
    },

    postCreateWord(data: CreateWordsRequest): Promise<DictionaryWord[]> {
      return request({
        url: "/dictionary/words",
        method: "POST",
        data,
      });
    },

    getFlashcards(): Promise<FlashcardBrief[]> {
      return request({
        url: "/flashcards",
      });
    },

    createFlashcard(
      data: CreateFlashcardRequest,
    ): Promise<CreateFlashcardResponse> {
      return request({ url: "/flashcards", method: "POST", data });
    },
  };
};
