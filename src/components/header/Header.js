import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Header.scss';

const Header = ({
	store: {
		userStore: { isUserLogged, fullName },
	},
}) => (
	<Layout.Header className='header'>
		<div className='header__wrapper'>
			<div className='header__left'>
				<Link to='/' className='header__logo'>
					Мой самокат
				</Link>
			</div>
			<div className='header__center'></div>
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

export default inject('store')(observer(Header));
