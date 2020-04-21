import React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainPage from '../../pages/main';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import FailPayment from '../../pages/failPayment';
import SuccessPayment from '../../pages/successPayment';
import Settings from '../../pages/settings';
import Payments from '../../pages/payments';
import Subscription from '../../pages/subscription';
import Help from '../../pages/help';

const Router = ({
	store: {
		userStore: { isUserLogged },
	},
}) => {
	return isUserLogged ? (
		<Switch>
			<Route path={['/', '/main']} exact component={MainPage} />
			<Route path='/subscription' exact component={Subscription} />
			<Route path='/payments' exact component={Payments} />
			<Route path='/settings' exact component={Settings} />
			<Route path='/help' exact component={Help} />
			<Redirect to='/' />
		</Switch>
	) : (
		<Switch>
			<Route path={['/', '/login']} exact component={Login} />
			<Route path='/registration' exact component={Registration} />
			<Route path='/failPayment' exact component={FailPayment} />
			<Route path='/successPayment' exact component={SuccessPayment} />
			<Redirect to='/' />
		</Switch>
	);
};

export default inject('store')(observer(Router));
