import React, { useEffect, useState } from 'react';
import { Button, Modal, notification, Popconfirm, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import {
	CheckOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

import { bindCard } from '../../globals/services/bindCard';
import { removeCard } from '../../globals/services/removeCard';

import './Cards.scss';
import { activateCard } from '../../globals/services/activateCard';

const { confirm } = Modal;

const Cards = ({
	store: {
		isMobile,
		cardStore: { cards, isLoading: isCardsDataLoading, setActiveCard },
	},
}) => {
	const columns = [
		{
			title: 'Активность',
			dataIndex: 'isActive',
			key: 'isActive',
			render: (value) => value && <CheckOutlined twoToneColor='#52c41a' />,
			width: 100,
		},
		{
			title: 'Карта',
			dataIndex: 'maskedPan',
			key: 'maskedPan',
			render: (value) => value,
		},
		{
			title: 'Срок действия',
			dataIndex: 'expiryDate',
			key: 'expiryDate',
			render: (value) => value,
		},
		{
			title: 'Действия',
			render: (value, record) => (
				<div className='cards__actions'>
					<Button
						disabled={record.isActive}
						onClick={() => handleActivateCard(record.maskedPan)}
					>
						Активировать
					</Button>
					{cards.length > 1 && (
						<Popconfirm
							okText='Да'
							cancelText='Нет'
							title='Вы уверены?'
							placement={isMobile ? 'top' : 'rightBottom'}
							onConfirm={() => handleRemoveCard(record.maskedPan)}
						>
							<Button icon={<DeleteOutlined />} type='danger'>
								Удалить
							</Button>
						</Popconfirm>
					)}
				</div>
			),
		},
	];

	const handleRemoveCard = (maskedPan) => {
		removeCard(maskedPan)
			.then((result) => result)
			.catch(() => {
				notification.open({
					message: 'Ошибка.',
					description:
						'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
				});
			});
	};

	const handleActivateCard = (maskedPan) => {
		activateCard(maskedPan)
			.then((result) => {
				if (typeof result === 'boolean' && result) {
					setActiveCard(maskedPan);
				}
			})
			.catch(() => {
				notification.open({
					message: 'Ошибка.',
					description:
						'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
				});
			});
	};

	const showConfirm = async () => {
		confirm({
			title: 'Привязать новую карту',
			icon: <InfoCircleOutlined />,
			content: 'Для проверки с карты будет списана незначительная сумма.',
			cancelText: 'Отмена',
			okText: 'Подтвердить',
			onOk() {
				bindCard()
					.then((result) => {
						window.location.href = result.formUrl;
					})
					.catch(() => {
						notification.open({
							message: 'Ошибка.',
							description:
								'Не удалсь выполнить операцию. Попробуйте повторить ваш запрос позднее.',
						});
					});
			},
		});
	};

	return (
		<div className='cards'>
			<Table
				columns={columns}
				dataSource={cards}
				rowKey={(record) => record.maskedPan}
				loading={isCardsDataLoading}
				scroll={{
					x: isMobile ? 1000 : null,
					y: isMobile ? 300 : null,
				}}
			/>
			<Button type='primary' size='large' onClick={showConfirm}>
				Привязать новую карту
			</Button>
		</div>
	);
};

export default inject('store')(observer(Cards));
