import { combineReducers, createStore, applyMiddleware } from 'redux';

import counterReducer, { IAppReducerState } from './counter';

export interface IAppState {
  counter: IAppReducerState;
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

export default function configureStore() {
  // history: History,
  // initialState: IAppState
  const rootReducer = combineReducers<IAppReducerState>(counterReducer);

  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware())
  );
}

export * from './counter';
