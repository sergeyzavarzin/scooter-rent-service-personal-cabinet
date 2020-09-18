import React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../../pages/login';
import Registration from '../../pages/registration';
import FailPayment from '../../pages/failPayment';
import SuccessPayment from '../../pages/successPayment';
import Subscription from '../../pages/subscription';
import Help from '../../pages/help';
import Forgot from '../../pages/forgot';
import ChangePassword from '../../pages/changePassword/ChangePassword';

const Router = ({
	store: {
		userStore: { isUserLogged },
	},
}) => {	
	return isUserLogged ? (
		<Switch>
			<Route path={['/', '/subscription']} exact component={Subscription} />
			<Route path='/help' exact component={Help} />
			<Route path='/successPayment' exact component={SuccessPayment} />
			<Route path='/failPayment' exact component={FailPayment} />
			<Route path='/change-password' exact component={ChangePassword} />
			<Redirect to='/' />
		</Switch>
	) : (
		<Switch>
			<Route path={['/', '/login']} exact component={Login} />
			<Route path='/forgot' exact component={Forgot} />
			<Route path='/change-password' exact component={ChangePassword} />
			<Route path='/registration/:category?' exact component={Registration} />
			<Route path='/failPayment' exact component={FailPayment} />
			<Route path='/successPayment' exact component={SuccessPayment} />
			<Redirect to='/' />
		</Switch>
	);
};

export default inject('store')(observer(Router));
