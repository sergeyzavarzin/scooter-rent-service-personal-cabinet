import React from 'react';
import { Layout } from 'antd';

const MoskvaInfo = () => (
	<>
		ООО "МОЙ САМОКАТ" © 2020 <br />
		E-mail:{' '}
		<a
			href='mailto:info@moysamokat.ru'
			target='_blank'
			rel='noopener noreferrer'
		>
			info@moysamokat.ru
		</a>{' '}
		<br />
		Телефон:{' '}
		<a href='tel:+74951468868' target='_blank' rel='noopener noreferrer'>
			+7 (495) 146-88-68
		</a>
		<br />
		Адрес: 115114 г. Москва, 1-й Кожевнический пер., д. 6, стр. 1
	</>
);

const KazanInfo = () => (
	<>
		ООО "ПРОФИ ФОТО"<br />
		E-mail:{' '}
		<a
			href='mailto:info.kazan@moysamokat.ru'
			target='_blank'
			rel='noopener noreferrer'
		>
			info.kazan@moysamokat.ru
		</a>{' '}
		<br />
		Телефон:{' '}
		<a href='tel:+79503244103' target='_blank' rel='noopener noreferrer'>
			+7 (950) 324-41-03
		</a>
		<br />
		Адрес 420111 г. Казань, улица Островского, 37
	</>
);

const Footer = ({ city }) => (
	<Layout.Footer style={{ textAlign: 'center', fontSize: 12 }}>
		{(city ==='' || city === '0') && <MoskvaInfo />}
		{city === '1' && <KazanInfo />}
	</Layout.Footer>
);

export default Footer;
