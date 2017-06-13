import axios from 'axios';

export const singleAPI = function(url, method, body) {
	let params, data;
	if (method.toLowerCase() === 'post') {
		data = body;
	} else {
		params = body;
	}
	axios(url, {
		method,
		data,
		params
	});
};