import { MiddlewareAPI } from 'redux';

import { removeToken } from './../oauth/actions';
import { ACTION_TYPES } from './actionTypes';
import { INext, IAction } from './../storeTypes';
import { clearLocalStorage } from '../../utils';

export const logoutMiddleware = ({ dispatch }: MiddlewareAPI) => (
  next: INext
) => (action: IAction) => {
  next(action);

  if (action.type === ACTION_TYPES.LOGOUT) {
    clearLocalStorage();

    dispatch(removeToken());
  }
};
