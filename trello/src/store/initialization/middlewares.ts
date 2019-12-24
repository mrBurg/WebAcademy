import { MiddlewareAPI } from 'redux';
import { ACTION_TYPES } from './actionTypes';
import { initEnd, initStart } from './actions';
import { subscribe } from '../../utils';
import { readToken } from './../oauth';

const initMiddlewareWorker = ({ action, dispatch, next }: any) => {
  next(action);
  dispatch(initStart());
  dispatch(readToken());
  dispatch(initEnd());
};

const initMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.INIT, initMiddlewareWorker)(next, middlewareAPI);

export const initMiddlewares = [initMiddleware];
