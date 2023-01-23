import AsyncStorage from '@react-native-async-storage/async-storage';

import { URLAPI } from '@env'

interface ApiResponse<T> {
	data?: T;
	html?: string;
	ok: boolean;
	status: number;
	statusText: string;
	message: string;
	error: Error;
}

interface KeyValuePair {
	key: string;
	value: string;
}

export default class ApiService {

	public static host = "https://54a8-2804-431-c7f3-6d65-99c-6bad-5e45-5173.ngrok.io";
	public static headers: KeyValuePair[] = [];


	private static requestHeaders = async (needAuth: boolean): Promise<Headers> => {
		const token = await AsyncStorage.getItem("Token");
		const requestHeaders = new Headers();

		
		if (!ApiService.headers.find(x => x.key === "Content-Type")) {
			requestHeaders.set('Content-Type', 'application/json; charset=utf-8');
			requestHeaders.set('Accept', '*/*');
			requestHeaders.set('Access-Control-Allow-Origin', '*');
			requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		}
	
		if (needAuth && token) requestHeaders.set('Authorization', token);
		if (ApiService.headers) {
			ApiService.headers.map(v => {
				requestHeaders.set(v.key, v.value);
			})
			ApiService.headers.length = 0;
		}

		

		return requestHeaders;
	};
	public static addHeader = (key: string, value: string): void => {
		ApiService.headers.push({ key, value });
		
	}

	private handleError(error: Response) {
		console.log(error);
		return error.json() || 'Server error';
	}

	private static processResponse = async<T>(r: RequestInfo, o: RequestInit, needAuth: boolean): Promise<ApiResponse<T>> => {
		try {

			const fetchResult = await fetch(r, { ...o, headers: await this.requestHeaders(needAuth) });
			//console.log("fetchResult =>", fetchResult)
			const result = { ok: fetchResult.ok, status: fetchResult.status, statusText: fetchResult.statusText } as ApiResponse<T>
			//console.log("result =>", result)
			//console.log("result =>", { r, result })
			if (result.ok) {
				const resultJson = await fetchResult.json();
				result.data = resultJson;
				return result;
			}
			const resultErrorJson = await fetchResult.text();
			throw new Error(resultErrorJson);
		} catch (e: Error | unknown) {
			const resultError = { ok: false, error: e } as ApiResponse<T>;
			return resultError;
		}
	}

	static get = async <T>(endpoint: string, needAuth: boolean): Promise<ApiResponse<T>> => {
		return await this.processResponse<T>(this.host + endpoint, {}, needAuth);
	};

	static post = async <T>(endpoint: string, body: any, needAuth: boolean): Promise<ApiResponse<T>> => {
		console.log("teste", body)
		return await this.processResponse<T>(this.host + endpoint, {
			method: 'POST',
			body: JSON.stringify(body)
		}, needAuth);
	};

	static postEncoding = async <T>(endpoint: string, body: KeyValuePair[]): Promise<ApiResponse<T>> => {

		const formBody = [];
		for (let i = 0; i < body.length; i++) {
			const key = encodeURIComponent(body[i].key);
			const value = encodeURIComponent(body[i].value);
			formBody.push(key + "=" + value);
		}

		return await this.processResponse<T>(this.host + endpoint, {
			method: 'POST',
			body: formBody.join("&")
		}, false);

		//const fetchResult = await fetch(this.host + endpoint, {
		//	method: 'POST',
		//	headers: {
		//		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		//	},
		//	body: formBody.join("&")
		//})
		//const result = { ok: fetchResult.ok, status: fetchResult.status, statusText: fetchResult.statusText } as ApiResponse<T>
		////console.log("result =>", result)
		////console.log("result =>", { r, result })
		//if (result.ok) {
		//	const resultJson = await fetchResult.json();
		//	result.data = resultJson;
		//	return result;
		//}
		//return result;
	};


	static put = async <T>(endpoint: string, id: string, body: any, needAuth: boolean): Promise<ApiResponse<T>> => {
		return await this.processResponse<T>(this.host + endpoint + "/" + id, {
			method: 'PUT',
			body: JSON.stringify(body)
		}, needAuth);
	};

	static delete = async <T>(endpoint: string, id: string, needAuth: boolean): Promise<ApiResponse<T>> => {
		return await this.processResponse<T>(this.host + endpoint + "/" + id, {
			method: 'DELETE'
		}, needAuth);
	};
};


//export const NewGuid = function NewGuid() {
//	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//		var r = Math.random() * 16 | 0,
//			v = c == 'x' ? r : (r & 0x3 | 0x8);
//		return v.toString(16);
//	});
//};
