import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import loginCSS from './login.css';
import styles from './index.css';

// import registerServiceWorker from './registerServiceWorker';

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app'));

// registerServiceWorker();
