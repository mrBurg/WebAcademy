import { ACTION_TYPES } from './actionTypes';

export const getBoard = () => ({
  type: ACTION_TYPES.GET_BOARD
});

export const setBoard = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_BOARD,
  payload: data
});
