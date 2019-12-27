import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import init, { initMiddlewares } from './initialization';
import oauth, { IOauthState, oauthMiddlewares } from './oauth';
import http, { IHTTPState, httpMiddlewares } from './http';
import { logoutMiddleware } from './logout';
import dashboard, { dashBoardMiddlewares } from './dashboard';

export interface IAppState {
  router: any;
  http: IHTTPState;
  init: any;
  oauth: IOauthState;
  dashboard: any;
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

export const history = createBrowserHistory();

export default function configureStore() {
  // history: History,
  // initialState: IAppState
  const rootReducer = combineReducers<IAppState>({
    router: connectRouter(history),
    init,
    oauth,
    http,
    dashboard
  });

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        logoutMiddleware,
        ...initMiddlewares,
        ...oauthMiddlewares,
        ...httpMiddlewares,
        ...dashBoardMiddlewares
      )
    )
  );
}

export * from './oauth';
export * from './logout';
export * from './dashboard';
