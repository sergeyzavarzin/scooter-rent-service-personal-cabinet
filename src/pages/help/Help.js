import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Card } from 'antd';
import {
	InfoCircleOutlined,
	UserOutlined,
	WarningOutlined,
} from '@ant-design/icons';

import './Help.scss';

const Help = ({
	store: {
		subscriptionStore: { category },
	},
}) => {
	const iconStyle = {
		fontSize: 30,
	};
	return (
		<div className='help-page'>
			<Typography.Title level={1}>Помощь</Typography.Title>
			<div className='page-wrapper'>
				<div className='help-page__wrapper'>
					<div className='help-page__contacts'>
						<Typography.Title level={3}>Контакты</Typography.Title>
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
					</div>
					<div className='help-page__cards'>
						<Typography.Title level={3}>Полезная информация</Typography.Title>
						<div className='help-page__cards-wrapper'>
							{category !== '4' && (
								<Card
									title={<InfoCircleOutlined style={iconStyle} />}
									onClick={() =>
										window.open('https://www.moysamokat.ru/manual', '_blank')
									}
								>
									Инструкция пользователя
								</Card>
							)}
							<Card
								title={<WarningOutlined style={iconStyle} />}
								onClick={() =>
									window.open(
										'https://www.moysamokat.ru/privacy-policy',
										'_blank'
									)
								}
							>
								Политика конфиденциальности
							</Card>
							<Card
								title={<UserOutlined style={iconStyle} />}
								onClick={() =>
									window.open('https://www.moysamokat.ru/oferta', '_blank')
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
