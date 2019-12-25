import { ACTION_TYPES } from './actionTypes';

interface IAction {
  type: string;
  payload: any;
}

export interface IOauthState {
  token?: string;
}

const INITIAL_STATE: IOauthState = {};

export default (
  state: IOauthState = INITIAL_STATE,
  { type, payload }: IAction
) => {
  switch (type) {
    case ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };
    case ACTION_TYPES.REMOVE_TOKEN:
      return INITIAL_STATE;
    default:
      return state;
  }
};
