import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, notification, Typography, Card, Popconfirm } from 'antd';
import moment from 'moment';
import { CreditCardOutlined } from '@ant-design/icons';

import Payments from '../../components/payments/Payments';
import Cards from '../../components/cards/Cards';

import { setSubscriptionStatus } from '../../globals/services/setSubscriptionStatus';

import './Subscription.scss';
import axios from 'axios';

const Subscription = ({
	store: {
		isMobile,
		userStore: { email, subscriptionId, contactId, status: userStatus },
		subscriptionStore: {
			getStatus,
			nextPaymentDate,
			month,
			status,
			setStatus,
			scooterInfo,
			category,
			discount,
		},
	},
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [isInitialPaymentLoading, setIsInitialPaymentLoading] = useState(false);
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

	const doInitialPayment = () => {
		handleInitialPayment().then((response) => {
			const { formUrl = null } = response;
			if (formUrl) {
				notification.open({
					message: 'Успешно!',
					description: 'Сейчас вы будете перенаправлены на форму оплаты.',
				});
				setTimeout(() => {
					window.location.href = formUrl;
				}, 4000);
			}
		});
	};

	const handleInitialPayment = async () => {
		setIsInitialPaymentLoading(true);
		try {
			const data = {
				dealId: subscriptionId,
				clientId: contactId,
				category,
				discount,
				email,
			};
			const response = await axios.post('/payment/initial-payment', data);
			return response.data;
		} catch (err) {
			throw new Error(err);
		} finally {
			setIsInitialPaymentLoading(false);
		}
	};

	return (
		<div className='subscription-page'>
			<Typography.Title level={1}>Подписка</Typography.Title>
			<div className='page-wrapper'>
				{userStatus !== 'pending' ? (
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
								Ваша подписка активна до: <br />
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
									Информация о самокате будет доступна после согласования
									доставки с менеждером.
								</Card.Grid>
							)}
						</Card>
						<div className='subscription__title'>
							<Typography.Title level={3}>
								Информация о платежах
							</Typography.Title>
							<Button
								icon={<CreditCardOutlined />}
								type='primary'
								onClick={() => setModalVisible(true)}
							>
								Карты
							</Button>
						</div>
						<Payments />
						<Cards isVisible={modalVisible} setIsVisible={setModalVisible} />
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
				) : (
					<div className='subscription__pay-alert'>
						<p>
							Чтобы получить самокат и начать пользоваться личным кабинетом
							необходимо оплатить подписку.
						</p>
						<Button
							size='large'
							type='primary'
							onClick={doInitialPayment}
							loading={isInitialPaymentLoading}
						>
							Оплатить подписку
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default inject('store')(observer(Subscription));
