import axios from 'axios';

export const activateCard = async (maskedPan) => {
	const response = await axios.post('/payment/activate-card', { maskedPan });
	return response.data;
};
