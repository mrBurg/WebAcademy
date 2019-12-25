import { ACTION_TYPES } from './actionTypes';

export const getToken = () => ({
  type: ACTION_TYPES.GET_TOKEN
});

export const setToken = (token: string) => ({
  type: ACTION_TYPES.SET_TOKEN,
  payload: token
});

export const readToken = () => ({
  type: ACTION_TYPES.READ_TOKEN
});

export const removeToken = () => ({
  type: ACTION_TYPES.REMOVE_TOKEN,
  payload: true
});
