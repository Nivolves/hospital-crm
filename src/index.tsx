import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './store/context';

import './index.scss';
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
