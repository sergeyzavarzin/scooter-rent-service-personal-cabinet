import axios from 'axios';

export const registration = async data => {
	const response = await axios.post('/auth/signUp', data);
	return response.data;
};
