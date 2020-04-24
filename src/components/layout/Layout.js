import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';

import Router from '../router';
import Footer from '../footer';
import Header from '../header';
import Navigation from '../navigation';

const disableNav = true;

const AppLayout = ({
	store: {
		setIsMobile,
		userStore: { isUserLogged },
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
			<Layout style={{ minHeight: '100vh' }}>
				{!disableNav && isUserLogged && <Navigation />}
				<Layout>
					<Header />
					<Layout.Content style={{ margin: '24px 16px 0' }}>
						<div className='site-layout-background'>
							<Router />
						</div>
					</Layout.Content>
					<Footer />
				</Layout>
			</Layout>
		</div>
	);
};

export default inject('store')(observer(AppLayout));
