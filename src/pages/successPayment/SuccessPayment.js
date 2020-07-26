import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { notification, Spin, Typography, Button } from 'antd';
import ReactPixel from 'react-facebook-pixel';

import { getPaymentStatus } from '../../globals/services/getPaymentStatus';
import { activateCardByOrder } from '../../globals/services/activateCard';

const SuccessPayment = ({
	store: {
		userStore: { isUserLogged },
	},
	history: { push },
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState(null);
	const [activated, setActivated] = useState(null);

	const getOrderStatus = async () => {
		setIsLoading(true);
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const orderId = urlParams.get('orderId');
			const paymentStatus = await getPaymentStatus(orderId);
			if (isUserLogged) {
				const activateResult = await activateCardByOrder(orderId);
				setActivated(activateResult);
			}
			setStatus(paymentStatus.status);
		} catch (e) {
			notification.open({
				message: 'Ошибка.',
				description:
					'Попробуйте перезагрузить страницу или повторите запрос позднее.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOrderStatus();
		ReactPixel.pageView(); 
	}, []);

	return isLoading ? (
		<Spin size='large' />
	) : (
		<>
			<Typography.Title level={1} style={{ textAlign: 'center' }}>
				Платеж произведен успешно
			</Typography.Title>
			{activated === true && <Typography.Title level={2} style={{ textAlign: 'center' }}>
				Новая карта активирована
			</Typography.Title>}
			{activated === false && <Typography.Title level={2} style={{ textAlign: 'center' }}>
				Карта не была активирована. Активируйте ее в Личном Кабинете
			</Typography.Title>}
			<div style={{ textAlign: 'center' }}>
				{status && <p>{status}</p>}
				<Button size='large' type='link' onClick={() => push('/')}>
					Войти в личный кабинет
				</Button>
			</div>
		</>
	);
};

export default withRouter(inject('store')(observer(SuccessPayment)));
