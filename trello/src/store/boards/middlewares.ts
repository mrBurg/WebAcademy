import { MiddlewareAPI } from 'redux';
import { ACTION_TYPES } from './actionTypes';
import { subscribe } from '../../utils';

const dashboardMiddlewareWorker = ({ dispatch, next, action }: any) => {
  next(action);
};

const dashboardMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.GET_BOARD, dashboardMiddlewareWorker)(
    next,
    middlewareAPI
  );

export const dashBoardMiddlewares = [dashboardMiddleware];
