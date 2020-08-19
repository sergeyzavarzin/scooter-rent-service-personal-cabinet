import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Card } from 'antd';
import {
	InfoCircleOutlined,
	UserOutlined,
	WarningOutlined,
} from '@ant-design/icons';
import { getOfferLink } from '../../utils/getOfferLink';

import './Help.scss';

const MoskvaContacts = () => (
	<div>
		<p>ООО "МОЙ САМОКАТ"</p>
		<p>ИНН: 9725029780 ОГРН 1207700062976</p>
		<p>
			Адрес: 115114 г. Москва, 1-й Кожевнический пер., д. 6, стр. 1
		</p>
		<p>
			Телефон:{' '}
			<a
				href='tel:+74951468868'
				target='_blank'
				rel='noopener noreferrer'
			>
				+7 (495) 146-88-68
			</a>
			.
		</p>
		<p>
			E-mail:{' '}
			<a
				href='mailto:info@moysamokat.ru'
				target='_blank'
				rel='noopener noreferrer'
			>
				info@moysamokat.ru
			</a>
		</p>
		<p>График работы: пн-сб с 10:00 до 19:00</p>
	</div>
);

const KazanContacts = () => (
	<div>
		<p>ООО "ФОРМИ МЕНЕДЖМЕНТ"</p>
		<p>ИНН: 1616033485 ОГРН 1201600056866</p>
		<p>
			Адрес: 420111 г. Казань, улица Островского, 37
		</p>
		<p>
			Телефон:{' '}
			<a
				href='tel:+79503244103'
				target='_blank'
				rel='noopener noreferrer'
			>
				+7 (950) 324-41-03
			</a>
			.
		</p>
		<p>
			E-mail:{' '}
			<a
				href='mailto:info.kazan@moysamokat.ru'
				target='_blank'
				rel='noopener noreferrer'
			>
				info.kazan@moysamokat.ru
			</a>
		</p>
		<p>График работы: пн-сб с 10:00 до 19:00</p>
	</div>
);

const Help = (
	{
		store: {
			subscriptionStore: {
				category,
				discount,
				discountCode
			},
			userStore: {
				city,
			},
		},
	},
) => {
	const iconStyle = {
		fontSize: 30,
	};
	return (
		<div className='help-page'>
			<Typography.Title level={1}>Помощь и инструкции</Typography.Title>
			<div className='page-wrapper'>
				<div className='help-page__wrapper'>
					<div className='help-page__contacts'>
						<Typography.Title level={3}>Контакты</Typography.Title>
						{(city ==='' || city === '0') && <MoskvaContacts />}
						{city === '1' && <KazanContacts />}
					</div>
					<div className='help-page__cards'>
						<Typography.Title level={3}>Полезная информация</Typography.Title>
						<div className='help-page__cards-wrapper'>
							{category !== '4' && discount !== 1.43 && (
								<Card
									title={<InfoCircleOutlined style={iconStyle}/>}
									onClick={() =>
										window.open('https://www.moysamokat.ru/manual', '_blank')
									}
								>
									Инструкция пользователя
								</Card>
							)}
							<Card
								title={<WarningOutlined style={iconStyle}/>}
								onClick={() =>
									window.open(
										`${city === '1' ? 'https://www.moysamokat.ru/privacy-kazan' : 'https://www.moysamokat.ru/privacy-policy'}`,
										'_blank',
									)
								}
							>
								Политика конфиденциальности
							</Card>
							<Card
								title={<UserOutlined style={iconStyle}/>}
								onClick={() =>
									window.open(
										getOfferLink(
											category === '4' ? 'courier' : 'user',
											discountCode,
											city,
										),
										'_blank',
									)
								}
							>
								Пользовательское соглашение
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default inject('store')(observer(Help));
