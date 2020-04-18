import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

import { getPaymentStatus } from '../../globals/services/getPaymentStatus';

const FailPayment = () => {
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
		<div>Loading...</div>
	) : (
		<div>Не удалось произвести платеж: {status}</div>
	);
};

export default FailPayment;
