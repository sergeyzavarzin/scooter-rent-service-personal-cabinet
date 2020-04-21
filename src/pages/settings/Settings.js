import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Button, notification } from 'antd';

import { disableSubscription } from '../../globals/services/disableSubscription';

import './Settings.scss';

const Settings = ({
	store: {
		subscriptionStore: { status },
	},
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const handleDisableSubscription = () => {
		setIsLoading(true);
		disableSubscription()
			.then(result => {
				notification.open({
					message: 'Успешно.',
					description:
						'Подписка отключена. Вы можете активировать ее повторно в любой момент',
				});
			})
			.catch(error => {
				notification.open({
					message: 'Ошибка.',
					description:
						'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
				});
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<div className='settings-page'>
			<Typography.Title level={2}>Настройки</Typography.Title>
			<div className='page-wrapper'>
				<div className='settings-page__wrapper'>
					<Button
						type='primary'
						size='large'
						onClick={handleDisableSubscription}
						loading={isLoading}
					>
						{status === 'ACTIVE'
							? 'Приостановить подписку'
							: 'Активировать подписку'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Settings));
