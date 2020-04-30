import axios from 'axios';

export const forgot = async (email) => {
	const response = await axios.post('/auth/forgot', { email });
	return response.data;
};
