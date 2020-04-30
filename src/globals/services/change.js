import axios from 'axios';

export const change = async (hash, password) => {
	const data = { hash, password };
	const response = await axios.post('/auth/change-password', data);
	return response.data;
};
