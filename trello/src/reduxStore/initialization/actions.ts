import { ACTION_TYPES } from './actionTypes';

export const initApp = () => ({
  type: ACTION_TYPES.INIT
});

export const initStart = () => ({
  type: ACTION_TYPES.START
});

export const initEnd = () => ({
  type: ACTION_TYPES.END
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
