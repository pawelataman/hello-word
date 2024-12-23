import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import { QuizResponse } from '@/core/api/models/quiz';
import { HttpClient } from '@/core/api/http-client';

export const useClient = (): HttpClient => {
	const { getToken } = useAuth();
	const client = axios.create({
		baseURL: process.env.EXPO_PUBLIC_BASE_URL,
		headers: {
			Accept: 'application/json, text/plain, */*',
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
				console.error('Could not initialize http client');
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

		const onError = function(error: AxiosError) {
			return Promise.reject({
				message: error.message,
				code: error.code,
				response: error.response,
			});
		};
		console.log('run quiz');
		return client(options).then(onSuccess).catch(onError);
	};


	return {
		getQuiz(numOfQuestions: number): Promise<QuizResponse> {
			console.log('get quiz', numOfQuestions);
			return request({
				url: `/quiz?numOfQuestions=${numOfQuestions}`, method: 'GET',
			});
		},

	};
};








