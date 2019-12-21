import { MiddlewareAPI } from 'redux';
import { ACTION_TYPES } from './actionTypes';
import { initEnd, initStart } from './actions';
import { subscribe } from '../../utils';
import { IAction } from '../storeTypes';
import { readToken } from './../oauth';

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';

/* const initMiddlewareWorker = ({ action, dispatch, next }: any) => {
  // dispatch(initStart());
  // dispatch(readToken());
  // dispatch(initEnd());
  // next(action);
}; */

const initMiddlewareWorker = ({ dispatch }: any) => (next: any) => (
  action: IAction<ACTION_TYPES>
) => {
  console.info(action.type);
  dispatch(initStart());
  dispatch(readToken());
  dispatch(initEnd());

  next(action);
};

/* const initMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.INIT, initMiddlewareWorker)(next, dispatch); */
const initMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.INIT, initMiddlewareWorker)(next, dispatch);

/* const initMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.INIT, initMiddlewareWorker)(next, middlewareAPI);*/

export const initMiddlewares = [initMiddleware];
