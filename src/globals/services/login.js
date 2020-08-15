import axios from 'axios';

export const login = (email, password) =>
	new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/auth/signIn', { email, password });
			localStorage.setItem('token', response.data.accessToken);
			localStorage.setItem(
				'userInfo',
				JSON.stringify({
					email: response.data.email,
					phone: response.data.phone,
					lastName: response.data.lastName,
					firstName: response.data.firstName,
					patronymic: response.data.patronymic,
					subscriptionId: response.data.subscriptionId,
					registrationDate: response.data.registrationDate,
					city: response.data.city,
				})
			);
			resolve(response.data);
		} catch (e) {
			reject(e);
		}
	});
