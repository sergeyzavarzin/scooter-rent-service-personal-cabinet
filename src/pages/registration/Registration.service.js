import axios from 'axios';

export const registration = async (data) => {
	try {
		const response = await axios.post('/auth/signUp', data);
		return response.data;
	} catch (error) {
		return error;
	}
};
