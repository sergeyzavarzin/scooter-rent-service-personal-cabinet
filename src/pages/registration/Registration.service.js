import axios from 'axios';
import { notification } from 'antd';
import { login } from '../../globals/services/login';
import frontLogger from '../../globals/services/frontLogger';

export const registration = (data, payNow) =>
	new Promise(async (resolve, reject) => {
		const params = { payNow };
		try {
			const response = await axios.post('/auth/signUp', data, { params });
			const { formUrl = null } = response.data;
			if (payNow && formUrl) {
				notification.open({
					message: 'Успешно!',
					description: 'Сейчас вы будете перенаправлены на форму оплаты.',
				});
				setTimeout(() => {
					window.location.href = formUrl;
				}, 2500);
			} else {
				notification.open({
					message: 'Успешно!',
					description:
						'Сейчас вас автоматически перенаправит в личный кабинет. Вы можете оплатить заказ внутри личного кабинета в любой момент.',
				});
				setTimeout(async () => {
					await login(data.email, data.password)
					window.location.href = '/';
				}, 2500);
			}
			resolve(response.data);
		} catch (error) {
			await frontLogger(`
				ERROR: ${JSON.stringify(error)}
				DATA: ${JSON.stringify(data)}
			`);
			reject(error);
		}
	});
