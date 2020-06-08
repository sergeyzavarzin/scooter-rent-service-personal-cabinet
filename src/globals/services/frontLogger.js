import axios from 'axios';

const frontLogger = (message) =>
	new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/logger/log', { message });
			resolve(response.data);
		} catch (e) {
			reject(e);
		}
	});

export default frontLogger;
