import React from 'react';
import { inject, observer } from 'mobx-react';
import { Spin, Typography } from 'antd';
import moment from 'moment';

import './Payments.scss';

const Payments = ({
	store: {
		paymentStore: { items },
	},
}) => {
	return (
		<div className='payments-page'>
			<Typography.Title level={2}>Платежи</Typography.Title>
			<div className='page-wrapper'>
				<div className='payments-page__list'>
					{items && items.length ? (
						items.map(item => (
							<div className='payment' key={item.orderNumber}>
								<div className='payment__date'>
									Дата платежа:{' '}
									<b>{moment(item.createDateTime).format('DD.MM.YYYY')}</b>
								</div>
								<div className='payment__id'>
									ID платежа в системе: <b>{item.orderNumber}</b>
								</div>
							</div>
						))
					) : (
						<Spin size='large' />
					)}
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Payments));
