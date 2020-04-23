import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Avatar } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';

import './Main.scss';

const Main = ({
	store: {
		userStore: { fullName },
		subscriptionStore: { getStatus, nextPaymentDate },
	},
}) => {
	return (
		<div className='main-page'>
			<Typography.Title level={1}>Основная информация</Typography.Title>
			<div className='page-wrapper'>
				<div className='main-page__user'>
					<Avatar size={64} icon={<UserOutlined />} />
					<Typography.Title level={4}>{fullName}</Typography.Title>
				</div>
				<div className='main-page__subscription'>
					<div className='main-page__subscription-status'>
						Cтатус подписки: <b>{getStatus}</b>
					</div>
					<div className='main-page__subscription-date'>
						Ваша подпписка активна до:{' '}
						<b>{moment(nextPaymentDate).format('DD.MM.YYYY')}</b>
					</div>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Main));
