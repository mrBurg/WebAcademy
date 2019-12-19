import { combineReducers, createStore, applyMiddleware } from 'redux';

import counter, { ICountState, loggerMiddleware } from './counter';
import oauth, { IOauthState, middlewares } from './oauth';

export interface IAppState {
  counter: ICountState;
  oauth: IOauthState;
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
    oauth
  });

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(loggerMiddleware, ...middlewares))
  );
}

export * from './counter';
