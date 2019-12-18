import { Middleware, MiddlewareAPI } from 'redux';
import { ACTION_TYPES } from './actionTypes';

const asyncTimeout = async (fn: any, ms: number = 1000): Promise<void> => {
  setTimeout(() => {
    Promise.resolve(fn());
  }, ms);
};

export const logger: Middleware = (middlewareAPI: MiddlewareAPI) => (
  next: any
) => {
  // const { dispatch, getState } = middlewareAPI;
  return async (action: any) => {
    switch (action.type) {
      case ACTION_TYPES.INCREASE_COUNT:
        await asyncTimeout(() => {
          console.info(action.type);
          next(action);
        }, 2000);
        break;
      default:
        next(action);
    }
  };
};
