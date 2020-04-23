import React, { useEffect, useState } from 'react';
import { notification, Spin, Typography } from 'antd';

import { getPaymentStatus } from '../../globals/services/getPaymentStatus';

const SuccessPayment = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState(null);

	const getOrderStatus = async () => {
		setIsLoading(true);
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const paymentStatus = await getPaymentStatus(urlParams.get('orderId'));
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
	}, []);

	return isLoading ? (
		<Spin size='large' />
	) : (
		<>
			<Typography.Title level={1}>Платеж произведен успешно</Typography.Title>
			{status && <p>{status}</p>}
		</>
	);
};

export default SuccessPayment;
