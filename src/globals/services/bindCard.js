import axios from 'axios';

export const bindCard = async () => {
	const response = await axios.get('/payment/bind-card');
	return response.data;
};
