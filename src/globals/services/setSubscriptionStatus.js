import axios from 'axios';

export const setSubscriptionStatus = async status => {
	const response = await axios.post('/subscription/set-status', { status });
	return response.data;
};
