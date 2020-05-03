import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

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
	);
};

export default inject('store')(observer(Payments));
