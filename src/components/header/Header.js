import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Avatar, Button, Menu } from 'antd';
import {
	UserOutlined,
	HomeOutlined,
	BellOutlined,
	CreditCardOutlined,
	SettingOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

import './Header.scss';

const Header = ({
	store: {
		userStore: { isUserLogged, fullName },
	},
	history,
}) => (
	<Layout.Header className='header'>
		<div className='header__wrapper'>
			<div className='header__left'>
				<Link to='/' className='header__logo'>
					Мой самокат
				</Link>
			</div>
			<div className='header__center'>
				{isUserLogged && (
					<Menu
						theme='dark'
						mode='horizontal'
						defaultSelectedKeys={[history.location.pathname.slice(1)]}
					>
						<Menu.Item key='main' onClick={() => history.push('main')}>
							<HomeOutlined />
							Основное
						</Menu.Item>
						<Menu.Item
							key='subscription'
							onClick={() => history.push('subscription')}
						>
							<BellOutlined />
							Подписка
						</Menu.Item>
						<Menu.Item key='payments' onClick={() => history.push('payments')}>
							<CreditCardOutlined />
							Платежи
						</Menu.Item>
						<Menu.Item key='settings' onClick={() => history.push('settings')}>
							<SettingOutlined />
							Настройки
						</Menu.Item>
						<Menu.Item key='help' onClick={() => history.push('help')}>
							<InfoCircleOutlined />
							Помощь
						</Menu.Item>
					</Menu>
				)}
			</div>
			<div className='header__right'>
				{isUserLogged && (
					<div>
						<span>{fullName}</span>
						<Avatar style={{ margin: '0 15px' }} icon={<UserOutlined />} />
						<Button
							type='danger'
							onClick={() => {
								localStorage.clear();
								window.location.href = '/login';
							}}
						>
							Выйти
						</Button>
					</div>
				)}
			</div>
		</div>
	</Layout.Header>
);

export default withRouter(inject('store')(observer(Header)));
