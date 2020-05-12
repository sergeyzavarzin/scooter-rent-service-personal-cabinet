import axios from 'axios';

export const registration = async (data, payNow) => {
	const params = { payNow };
	try {
		const response = await axios.post('/auth/signUp', data, { params });
		return response.data;
	} catch (error) {
		return error;
	}
};
