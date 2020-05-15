import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { CATEGORIES } from '../../constants/subscriptionCatetories';

import './PayAlert.scss';

const PayAlert = ({
	store: {
		userStore: { email, subscriptionId, contactId },
		subscriptionStore: { category, discount },
	},
}) => {
	const [isInitialPaymentLoading, setIsInitialPaymentLoading] = useState(false);

	const handleInitialPayment = async () => {
		setIsInitialPaymentLoading(true);
		axios
			.post('/payment/initial-payment', {
				dealId: subscriptionId,
				clientId: contactId,
				category,
				discount,
				email,
			})
			.then((response) => {
				if (response.data.formUrl) {
					localStorage.clear();
					notification.open({
						message: 'Успешно!',
						description: 'Сейчас вы будете перенаправлены на форму оплаты.',
					});
					setTimeout(() => {
						window.location.href = response.data.formUrl;
					}, 4000);
				}
			})
			.catch((err) => err)
			.finally(() => setIsInitialPaymentLoading(false));
	};
	return (
		<div className='pay-alert'>
			{category === CATEGORIES.B2C ? (
				<p className='pay-alert__text'>
					Мы&nbsp;получили Вашу заявку и&nbsp;свяжемся с&nbsp;Вами
					в&nbsp;ближайшее время для согласования доставки. Вы&nbsp;можете
					оплатить подписку сейчас и&nbsp;получить бесплатную доставку.
					Вы&nbsp;также можете произвести оплату из&nbsp;личного кабинета при
					получении самоката.
				</p>
			) : (
				<p className='pay-alert__text'>
					Чтобы получить самокат и&nbsp;начать пользоваться личным кабинетом
					необходимо оплатить подписку.
				</p>
			)}
			<Button
				size='large'
				type='primary'
				onClick={handleInitialPayment}
				loading={isInitialPaymentLoading}
			>
				Оплатить подписку
			</Button>
		</div>
	);
};

export default inject('store')(observer(PayAlert));
