import React, { useState } from 'react';
import { Button, notification, Popconfirm, Typography } from 'antd';

import { setSubscriptionStatus } from '../../globals/services/setSubscriptionStatus';

import './Settings.scss';
import { inject, observer } from 'mobx-react';

const Settings = ({
	store: {
		isMobile,
		subscriptionStore: { status, setStatus },
	},
}) => {
	const [isSubscriptionStatusLoading, setSubscriptionStatusLoading] = useState(
		false
	);
	const handleSetSubscriptionStatus = () => {
		setSubscriptionStatusLoading(true);
		setSubscriptionStatus(status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE')
			.then((newStatus) => {
				setStatus(newStatus);
				notification.open({
					message: 'Успешно.',
					description:
						status === 'ACTIVE'
							? 'Подписка отключена. В ближайшее время с вами свяжется наш менеджер.'
							: 'Ваша подписка снова активна.',
				});
			})
			.catch(() => {
				notification.open({
					message: 'Ошибка.',
					description:
						'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
				});
			})
			.finally(() => setSubscriptionStatusLoading(false));
	};
	return (
		<div className='settings'>
			<Typography.Title level={3}>Настройки</Typography.Title>
			{status === 'ACTIVE' ? (
				<Popconfirm
					okText='Да'
					cancelText='Нет'
					title='Вы уверены?'
					placement={isMobile ? 'top' : 'rightBottom'}
					onConfirm={handleSetSubscriptionStatus}
				>
					<Button
						type='primary'
						size='large'
						loading={isSubscriptionStatusLoading}
					>
						Приостановить подписку
					</Button>
				</Popconfirm>
			) : (
				<Button
					type='primary'
					size='large'
					loading={isSubscriptionStatusLoading}
					onClick={handleSetSubscriptionStatus}
				>
					Активировать подписку
				</Button>
			)}
		</div>
	);
};

export default inject('store')(observer(Settings));
