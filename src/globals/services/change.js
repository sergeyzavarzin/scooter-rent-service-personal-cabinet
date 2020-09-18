import axios from 'axios';

export const change = async (hash, password) => {
	const data = { hash, password };
	const response = await axios.post('/auth/change-password', data);
	return response.data;
};

export const changeUserPassword = async (password, oldPassword) => {
	const data = { password, oldPassword };
	const response = await axios.post('/auth/change-user-password', data);
	return response.data;
};
