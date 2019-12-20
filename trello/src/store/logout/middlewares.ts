import { removeToken } from './../oauth/actions';
import { ACTION_TYPES } from './actionTypes';

export const logoutMiddleware = () => (next: any) => (action: any) => {
  if (action.type === ACTION_TYPES.LOGOUT) {
    next(removeToken());
  }
  next(action);
};
