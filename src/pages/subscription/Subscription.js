import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, notification, Typography, Table, Card } from 'antd';
import moment from 'moment';

import { disableSubscription } from '../../globals/services/disableSubscription';

import './Subscription.scss';

const gridStyle = {
	width: '25%',
	textAlign: 'center',
};

const Subscription = ({
	store: {
		paymentStore: { items: payments },
		userStore: { subscriptionId },
		subscriptionStore: { getStatus, nextPaymentDate, month, status },
	},
}) => {
	const [isActivationLoading, setIsActivationLoading] = useState(false);

	const handleDisableSubscription = () => {
		setIsActivationLoading(true);
		disableSubscription()
			.then(() => {
				notification.open({
					message: 'Успешно.',
					description:
						'Подписка отключена. Вы можете активировать ее повторно в любой момент',
				});
			})
			.catch(() => {
				notification.open({
					message: 'Ошибка.',
					description:
						'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
				});
			})
			.finally(() => setIsActivationLoading(false));
	};

	const columns = [
		{
			title: '№ заказа',
			dataIndex: 'orderNumber',
			key: 'orderNumber',
			render: value => value,
			width: 100,
		},
		{
			title: 'Дата',
			dataIndex: 'createDateTime',
			key: 'createDateTime',
			render: value => moment(value).format('DD.MM.YYYY'),
			width: 150,
		},
		{
			title: 'Сумма',
			dataIndex: 'amount',
			key: 'amount',
			render: value => value / 100,
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: value => value,
		},
		{
			title: 'Карта',
			dataIndex: 'cardInfo',
			key: 'cardInfo',
			render: value => JSON.parse(value).pan,
		},
	];

	return (
		<div className='subscription-page'>
			<Typography.Title level={1}>Подписка</Typography.Title>
			<div className='page-wrapper'>
				<div className='subscription-page__info'>
					<Card
						title={<b>Информация о подписке:</b>}
						style={{ marginBottom: 30 }}
					>
						<Card.Grid style={gridStyle}>
							ID подписки: <b>{subscriptionId}</b>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							Cтатус подписки: <b>{getStatus}</b>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							Ваша подпписка активна до:{' '}
							<b>{moment(nextPaymentDate).format('DD.MM.YYYY')}</b>
						</Card.Grid>
						<Card.Grid style={gridStyle}>
							Месяц использования: <b>{month}</b>
						</Card.Grid>
						<Card.Grid
							hoverable={false}
							style={{ width: '100%', textAlign: 'center' }}
						>
							<Button
								type='primary'
								size='large'
								onClick={handleDisableSubscription}
								loading={isActivationLoading}
							>
								{status === 'ACTIVE'
									? 'Приостановить подписку'
									: 'Активировать подписку'}
							</Button>
						</Card.Grid>
					</Card>
					<Typography.Title level={3}>Информация о платежах</Typography.Title>
					<Table
						columns={columns}
						dataSource={payments}
						rowKey={record => record.orderNumber}
					/>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Subscription));
