import React from 'react';
import { Layout } from 'antd';

const Footer = () => (
	<Layout.Footer style={{ textAlign: 'center', fontSize: 12 }}>
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
	</Layout.Footer>
);

export default Footer;
