import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';

import Router from '../router';
import Footer from '../footer';
import Header from '../header';
import Navigation from '../navigation';

import './Layout.scss';
import classNames from "classnames";

const disableNav = true;

const AppLayout = ({
	store: {
		setIsMobile,
		isMobileApp,
		userStore: { isUserLogged, city },
		globalCity,
	},
}) => {
	useEffect(() => {
		window.addEventListener('resize', setIsMobile);
		return () => {
			window.removeEventListener('resize', setIsMobile);
		};
	}, [setIsMobile]);
	return (
		<div className='app'>
			<Layout className='layout'>
				{!disableNav && isUserLogged && <Navigation />}
				<Layout>
					<Header />
					<Layout.Content className={classNames('layout__content', {
						'mobile-app-margin': isMobileApp,
					})}>
						<div className='site-layout-background'>
							<Router />
						</div>
					</Layout.Content>
					<Footer city={isUserLogged ? city: globalCity} />
				</Layout>
			</Layout>
		</div>
	);
};

export default inject('store')(observer(AppLayout));
