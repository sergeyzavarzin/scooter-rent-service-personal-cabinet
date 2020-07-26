import React from 'react';
import ReactDOM from 'react-dom';
import ReactPixel from 'react-facebook-pixel';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './globals/styles/globalStyles.scss';

ReactPixel.init('229109878161274');
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
