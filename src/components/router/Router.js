import React from 'react';
import {inject, observer} from 'mobx-react';
import {Switch, Route, Redirect} from 'react-router-dom';

import MainPage from '../../pages/main';
import Login from '../../pages/login';
import Registration from '../../pages/registration';

const Router = ({store: {userStore: {isUserLogged}}}) => {
  return isUserLogged ? (
    <Switch>
      <Route path={['/', '/main']} exact render={MainPage}/>
      <Redirect to='/'/>
    </Switch>
  ) : (
    <Switch>
      <Route path={['/', '/login']} exact component={Login}/>
      <Route path='/registration' exact component={Registration}/>
      <Redirect to='/'/>
    </Switch>
  )
};

export default inject('store')(observer(Router));
