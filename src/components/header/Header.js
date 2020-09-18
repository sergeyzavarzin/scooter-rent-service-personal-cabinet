import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Layout, Avatar, Button, Menu, Popover } from 'antd';
import {
	BellOutlined,
	InfoCircleOutlined,
	MenuOutlined,
	CloseOutlined,
} from '@ant-design/icons';

import { logout } from '../../utils/logout';

import Logo from './img/logo-light.svg';

import './Header.scss';

const Header = ({
	store: {
		isMobile,
		isMobileApp,
		userStore: { isUserLogged, fullName, initials },
	},
	history,
}) => {
	const [selectedKey, setSelectedKey] = useState(history.location.pathname);
	const [isIsMenuVisible, setIsMenuVisible] = useState(false);

	const content = (
		<div className="header__popover">
			<Button type='primary' onClick={() => history.push('/change-password')}>
				Сменить пароль
			</Button>
			<Button type='danger' onClick={() => logout()}>
				Выйти
			</Button>
		</div>
	);

	useEffect(() => {
		const path = history.location.pathname;
		setSelectedKey(path.length ? path : 'subscription');
	}, [history.location.pathname]);

	const handleMenuClick = ({ key }) => {
		setIsMenuVisible(false);
		history.push(key);
	};

	return (
		<Layout.Header className={classNames('header', {
			'header--hidden': isMobileApp,
		})}>
			<div className='header__wrapper'>
				<div className='header__left'>
					{isUserLogged && (
						<button
							type='button'
							onClick={() => setIsMenuVisible(!isIsMenuVisible)}
							className='header__menu-toggle'
						>
							{isIsMenuVisible ? (
								<CloseOutlined style={{ fontSize: 20 }} />
							) : (
								<MenuOutlined style={{ fontSize: 20 }} />
							)}
						</button>
					)}
					<Link to='/' className='header__logo'>
						<img src={Logo} alt='Мой Самокат' className='header__logo-img' />
					</Link>
				</div>
				<div className='header__center'>
					{isUserLogged && (
						<Menu
							theme='dark'
							mode={isMobile ? 'vertical' : 'horizontal'}
							defaultSelectedKeys={[selectedKey]}
							className={classNames('header__menu', {
								'header__menu--visible': isIsMenuVisible,
							})}
						>
							<Menu.Item key='/subscription' onClick={handleMenuClick}>
								<BellOutlined />
								Подписка
							</Menu.Item>
							<Menu.Item key='/help' onClick={handleMenuClick}>
								<InfoCircleOutlined />
								Помощь и инструкции
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
