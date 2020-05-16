import React, { useState } from 'react';
import { Button, Table, Typography } from 'antd';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { CreditCardOutlined } from '@ant-design/icons';

import Cards from '../cards/Cards';

import './Payments.scss';

const Payments = ({
	store: {
		isMobile,
		paymentStore: {
			items: payments,
			getStatus: getPaymentStatus,
			isLoading: isPaymentsDataLoading,
		},
	},
}) => {
	const [modalVisible, setModalVisible] = useState(false);

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
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
			render: (value) => value,
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
		<div>
			<div className='subscription__title'>
				<Typography.Title level={3}>Информация о платежах</Typography.Title>
				<Button
					icon={<CreditCardOutlined />}
					type='primary'
					onClick={() => setModalVisible(true)}
				>
					Карты
				</Button>
			</div>
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
			<Cards isVisible={modalVisible} setIsVisible={setModalVisible} />
		</div>
	);
};

export default inject('store')(observer(Payments));
