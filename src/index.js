import React from 'react';
import ReactDOM from 'react-dom';
import ReactPixel from 'react-facebook-pixel';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './globals/styles/globalStyles.scss';

export const Pixels = [
  '229109878161274',
  '896131960877927'
];

ReactPixel.init(Pixels[0]); //  Moskva
ReactPixel.init(Pixels[1]); //  Kazan
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
