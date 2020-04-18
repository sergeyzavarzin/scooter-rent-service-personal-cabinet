import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';

import appStore from '../../stores';
import Layout from '../layout';

import './App.scss';

const store = appStore.create({});

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout />
			</Router>
		</Provider>
	);
};

export default App;
