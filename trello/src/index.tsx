import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';

import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
