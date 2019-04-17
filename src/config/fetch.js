import { baseUrl } from './env'
import { getCookie } from '@/common/js/cookie';

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	/**
	 * 返回结果状态码
		1001: 成功
		1002: DB错误
		1003: 参数错误
		1004: 服务异常
		1005: 逻辑处理异常
		1006: 服务器内部错误
		1007: 查询失败
		1008: 密码错误
		1009: 邮件发送失败
	*/

	if (type === 'GET') {
		let dataStr = ''; // 数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
    }


	const accessToken = getCookie('token');
	let param = {
		mode: 'cors',
		headers: {
			'content-type': 'application/json'
		}
	};
	if (accessToken) {
		param['access_token'] = accessToken;
	}

	if (type === 'POST') {
		param = Object.assign(param, {
			method: 'post',
			body: JSON.stringify(data)
		})
	}

	try {
		const response = await fetch(url, param);
		const responseJson = await response.json();
		if (responseJson.success) {
			if (responseJson.page) {
				return {
					data: responseJson.data,
					page: responseJson.page
				};
			}
			return responseJson.data;
		}
		else {
			throw new Error(`Opps! Error occured. Error url: ${url}. Error code: ${responseJson.code}. Error msssage: ${responseJson.message}`);
		}
	} catch (error) {
		throw new Error(error);
	}
}