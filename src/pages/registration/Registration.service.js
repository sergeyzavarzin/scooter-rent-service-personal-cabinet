import axios from 'axios';

export const registration = async (data) =>
	axios
		.post('/auth/signUp', data)
		.then((response) => response)
		.catch((error) => error);
