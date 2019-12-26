import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import init, { initMiddlewares } from './initialization';
import oauth, { IOauthState, oauthMiddlewares } from './oauth';
import http, { IHTTPState, httpMiddlewares } from './http';
import { logoutMiddleware } from './logout';

export interface IAppState {
  oauth: IOauthState;
  http: IHTTPState;
  router: any;
  init: any;
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
    init,
    oauth,
    http,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        ...initMiddlewares,
        ...oauthMiddlewares,
        ...httpMiddlewares,
        logoutMiddleware
      )
    )
  );
}

export * from './oauth';
export * from './logout';
