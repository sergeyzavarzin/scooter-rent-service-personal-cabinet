import React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainPage from '../../pages/main';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import FailPayment from '../../pages/failPayment/FailPayment';
import SuccessPayment from '../../pages/successPayment/SuccessPayment';

const Router = ({
	store: {
		userStore: { isUserLogged },
	},
}) => {
	return isUserLogged ? (
		<Switch>
			<Route path={['/', '/main']} exact render={MainPage} />
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
