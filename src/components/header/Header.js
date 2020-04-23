import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Avatar, Button, Menu, Popover } from 'antd';
import {
	UserOutlined,
	HomeOutlined,
	BellOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';

import Logo from './img/logo-light.svg';

import './Header.scss';

const Header = ({
	store: {
		userStore: { isUserLogged, fullName, initials },
	},
	history,
}) => {
	const content = (
		<>
			<Button
				type='danger'
				onClick={() => {
					localStorage.clear();
					window.location.href = '/login';
				}}
			>
				Выйти
			</Button>
		</>
	);
	return (
		<Layout.Header className='header'>
			<div className='header__wrapper'>
				<div className='header__left'>
					<Link to='/' className='header__logo'>
						<img src={Logo} alt='Мой Самокат' className='header__logo-img' />
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
							<Popover
								placement='bottomRight'
								content={content}
								title={fullName}
							>
								<Avatar>{initials}</Avatar>
							</Popover>
						</div>
					)}
				</div>
			</div>
		</Layout.Header>
	);
};

export default withRouter(inject('store')(observer(Header)));
