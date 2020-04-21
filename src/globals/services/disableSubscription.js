import axios from 'axios';

export const disableSubscription = async subscriptionId => {
	const response = await axios.post('/subscription/disable');
	return response.data;
};
