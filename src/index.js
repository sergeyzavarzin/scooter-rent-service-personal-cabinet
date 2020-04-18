import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './globals/settings/axios';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
