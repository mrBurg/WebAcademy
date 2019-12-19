import { ACTION_TYPES } from './actionTypes';

export const setToken = (token: string) => ({
  type: ACTION_TYPES.SET_TOKEN,
  payload: token
});
