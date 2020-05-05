import axios from 'axios';

export const getColors = async () => {
	const response = await axios.get('/crm/store-status');
	return response.data.colors;
};
