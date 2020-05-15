import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography } from 'antd';

import PayAlert from '../../components/pay-alert/PayAlert';
import Payments from '../../components/payments/Payments';
import Settings from '../../components/settings';
import Info from '../../components/info/Info';

import './Subscription.scss';

const Subscription = ({
	store: {
		userStore: { status },
	},
}) => {
	return (
		<div className='subscription-page'>
			<Typography.Title level={1}>Подписка</Typography.Title>
			<div className='page-wrapper'>
				{status !== 'pending' ? (
					<div className='subscription-page__info'>
						<Info />
						<Payments />
						<Settings />
					</div>
				) : (
					<PayAlert />
				)}
			</div>
		</div>
	);
};

export default inject('store')(observer(Subscription));
