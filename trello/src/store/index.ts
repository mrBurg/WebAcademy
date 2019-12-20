import { combineReducers, createStore, applyMiddleware } from 'redux';

import counter, { ICountState, counterMiddleware } from './counter';
import oauth, { IOauthState, oauthMiddlewares } from './oauth';
import { logoutMiddleware } from './logout';
import http, { IHTTPState, httpMiddlewares } from './http';

export interface IAppState {
  counter: ICountState;
  oauth: IOauthState;
  http: IHTTPState;
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

export default function configureStore() {
  // history: History,
  // initialState: IAppState
  const rootReducer = combineReducers<IAppState>({
    counter,
    oauth,
    http
  });

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(
      applyMiddleware(
        counterMiddleware,
        logoutMiddleware,
        ...oauthMiddlewares,
        ...httpMiddlewares
      )
    )
  );
}

export * from './counter';
export * from './oauth';
export * from './logout';
