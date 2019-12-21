import { combineReducers, createStore, applyMiddleware } from 'redux';

import { initMiddlewares } from './initialization';
import oauth, { IOauthState, oauthMiddlewares } from './oauth';
import counter, { ICountState, counterMiddleware } from './counter';
import http, { IHTTPState, httpMiddlewares } from './http';
import { logoutMiddleware } from './logout';

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
        ...initMiddlewares,
        ...oauthMiddlewares,
        ...httpMiddlewares,
        logoutMiddleware
      )
    )
  );
}

export * from './counter';
export * from './oauth';
export * from './logout';
