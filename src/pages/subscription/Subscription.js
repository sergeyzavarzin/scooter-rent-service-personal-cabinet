import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
	Button,
	notification,
	Typography,
	Table,
	Card,
	Popconfirm,
} from 'antd';
import moment from 'moment';

import { setSubscriptionStatus } from '../../globals/services/setSubscriptionStatus';

import './Subscription.scss';

const Subscription = ({
	store: {
		isMobile,
		paymentStore: {
			items: payments,
			getStatus: getPaymentStatus,
			isLoading: isPaymentsDataLoading,
		},
		userStore: { subscriptionId },
		subscriptionStore: {
			getStatus,
			nextPaymentDate,
			month,
			status,
			setStatus,
			scooterInfo,
		},
	},
}) => {
	const [isSubscriptionStatusLoading, setSubscriptionStatusLoading] = useState(
		false
	);

	const topGridStyle = {
		width: isMobile ? '100%' : '25%',
		textAlign: 'center',
	};

	const midGridStyle = {
		width: isMobile ? '100%' : '33%',
		textAlign: 'center',
	};

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

	const columns = [
		{
			title: '№ заказа',
			dataIndex: 'orderNumber',
			key: 'orderNumber',
			render: (value) => value,
			width: 100,
		},
		{
			title: 'Дата',
			dataIndex: 'createDateTime',
			key: 'createDateTime',
			render: (value) => moment(value).format('DD.MM.YYYY'),
			width: 150,
		},
		{
			title: 'Сумма',
			dataIndex: 'amount',
			key: 'amount',
			render: (value) => value / 100,
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: (value) => getPaymentStatus(value),
		},
		{
			title: 'Карта',
			dataIndex: 'cardInfo',
			key: 'cardInfo',
			render: (value) => JSON.parse(value).pan,
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
						<Card.Grid style={topGridStyle}>
							ID подписки: <br /> <b>{subscriptionId}</b>
						</Card.Grid>
						<Card.Grid style={topGridStyle}>
							Cтатус подписки: <br /> <b>{getStatus}</b>
						</Card.Grid>
						<Card.Grid style={topGridStyle}>
							Ваша подпписка активна до: <br />
							<b>{moment(nextPaymentDate).format('DD.MM.YYYY')}</b>
						</Card.Grid>
						<Card.Grid style={topGridStyle}>
							Месяц использования: <br /> <b>{month}</b>
						</Card.Grid>
						{scooterInfo ? (
							<>
								<Card.Grid style={midGridStyle}>
									ID самоката: <br /> <b>{scooterInfo.id}</b>
								</Card.Grid>
								<Card.Grid style={midGridStyle}>
									Модель самоката: <br /> <b>{scooterInfo.name}</b>
								</Card.Grid>
								<Card.Grid style={midGridStyle}>
									Цвет самоката: <br />{' '}
									<b className='capitalize'>{scooterInfo.color}</b>
								</Card.Grid>
							</>
						) : (
							<Card.Grid style={{ width: '100%', textAlign: 'center' }}>
								Информация о самокате будет доступна после согласования доставки
								с менеждером.
							</Card.Grid>
						)}
					</Card>
					<Typography.Title level={3}>Информация о платежах</Typography.Title>
					<Table
						columns={columns}
						dataSource={payments}
						rowKey={(record) => record.orderNumber}
						loading={isPaymentsDataLoading}
						scroll={{
							x: isMobile ? 1000 : null,
							y: isMobile ? 300 : null,
						}}
					/>
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
			</div>
		</div>
	);
};

export default inject('store')(observer(Subscription));
