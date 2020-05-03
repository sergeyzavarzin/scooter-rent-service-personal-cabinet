import axios from 'axios';

export const removeCard = async (maskedPan) => {
	const response = await axios.post('/payment/remove-card', { maskedPan });
	return response.data;
};
