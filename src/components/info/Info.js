import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

const Info = ({
	store: {
		isMobile,
		userStore: { subscriptionId },
		subscriptionStore: { getStatus, nextPaymentDate, month, scooterInfo },
	},
}) => {
	const topGridStyle = {
		width: isMobile ? '100%' : '25%',
		textAlign: 'center',
	};

	const midGridStyle = {
		width: isMobile ? '100%' : '33%',
		textAlign: 'center',
	};

	return (
		<Card title={<b>Информация о подписке:</b>} style={{ marginBottom: 30 }}>
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
					Информация о самокате будет доступна после согласования доставки с
					менеждером.
				</Card.Grid>
			)}
		</Card>
	);
};

export default inject('store')(observer(Info));
