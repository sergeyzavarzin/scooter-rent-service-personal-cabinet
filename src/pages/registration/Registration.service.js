import axios from 'axios';

export const registration = (data, payNow) =>
	new Promise(async (resolve, reject) => {
		const params = { payNow };
		try {
			const response = await axios.post('/auth/signUp', data, { params });
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
