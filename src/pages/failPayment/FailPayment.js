import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { notification, Typography, Spin, Button } from 'antd';

import { getPaymentStatus } from '../../globals/services/getPaymentStatus';

const FailPayment = ({ history: { push } }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState(null);

	const getOrderStatus = async () => {
		setIsLoading(true);
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const paymentStatus = await getPaymentStatus(urlParams.get('orderId'));
			setStatus(paymentStatus.actionCodeDescription);
		} catch (e) {
			notification.open({
				message: 'Ошибка.',
				description:
					'Попробуйте перезагрузить страницу или повторите запрос позднее',
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOrderStatus();
	}, []);

	return isLoading ? (
		<Spin size='large' />
	) : (
		<>
			<Typography.Title level={1} style={{ textAlign: 'center' }}>
				Не удалось произвести платеж
			</Typography.Title>
			<div style={{ textAlign: 'center' }}>
				{status && <p>{status}</p>}
				<Button size='large' type='link' onClick={() => push('/')}>
					Вернуться на гланую
				</Button>
			</div>
		</>
	);
};

export default withRouter(FailPayment);
