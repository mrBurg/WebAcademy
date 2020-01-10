import { ACTION_TYPES } from './actionTypes';
import { IAction } from './../storeTypes';

interface ILogOut {
  (): IAction;
}

export const logout: ILogOut = (): IAction => ({
  type: ACTION_TYPES.LOGOUT
});
