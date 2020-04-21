import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography } from 'antd';
import moment from 'moment';

import './Subscription.scss';

const Subscription = ({
	store: {
		userStore: { subscriptionId },
		subscriptionStore: { getStatus, nextPaymentDate, month },
	},
}) => {
	return (
		<div className='subscription-page'>
			<Typography.Title level={2}>Подписка</Typography.Title>
			<div className='page-wrapper'>
				<div className='subscription-page__info'>
					<div className='subscription-page__month'>
						ID подписки: <b>{subscriptionId}</b>
					</div>
					<div className='subscription-page__status'>
						Cтатус подписки: <b>{getStatus}</b>
					</div>
					<div className='subscription-page__date'>
						Ваша подпписка активна до:{' '}
						<b>{moment(nextPaymentDate).format('DD.MM.YYYY')}</b>
					</div>
					<div className='subscription-page__month'>
						Месяц использования: <b>{month}</b>
					</div>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Subscription));
