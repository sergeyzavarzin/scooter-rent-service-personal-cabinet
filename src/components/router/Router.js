import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainPage from '../../pages/main';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact render={MainPage} />
    </Switch>
  )
};

export default Router
