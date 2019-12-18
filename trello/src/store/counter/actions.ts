import { ACTION_TYPES } from './actionTypes';

export const increaseCount = () => ({
  type: ACTION_TYPES.INCREASE_COUNT,
  payload: 1
});

export const decreaseCount = () => ({
  type: ACTION_TYPES.DECREASE_COUNT,
  payload: 1
});
