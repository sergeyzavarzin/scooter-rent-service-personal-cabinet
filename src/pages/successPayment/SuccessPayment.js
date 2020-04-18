import React, { useEffect, useState } from 'react';
import { getPaymentStatus } from '../../globals/services/getPaymentStatus';
import { notification } from 'antd';

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
		<div>Loading...</div>
	) : (
		<div>Оплата прошла успешно: {status}</div>
	);
};

export default SuccessPayment;
