import axios from 'axios';

export const getPaymentStatus = async orderId => {
	const response = await axios.get('/payment/status', { params: { orderId } });
	return response.data;
};
