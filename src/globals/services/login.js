import axios from 'axios';

export const login = async (email, password) => {
	const response = await axios.post('/auth/signIn', { email, password });
	return response.data;
};
