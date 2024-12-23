import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const client = (() => {
	return axios.create({
		baseURL: process.env.EXPO_PUBLIC_BASE_URL,
		headers: {
			Accept: 'application/json, text/plain, */*',
		},
	});
})();


export function configureInterceptors({ tokenCb }: { tokenCb: Promise<string | null> }): void {
	client.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			const token = await tokenCb;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		},
	);
}

export const request = async (options: AxiosRequestConfig) => {
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

	return client(options).then(onSuccess).catch(onError);
};