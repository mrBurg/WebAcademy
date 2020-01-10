import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as MobxProvider } from 'mobx-react';
import { ConnectedRouter } from 'connected-react-router';
import { stores } from './mobxStores';

import './index.scss';

import { App } from './components/App';
import configureStore, { history } from './reduxStore';

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <MobxProvider {...stores}>
        <App />
      </MobxProvider>
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('root')
);
