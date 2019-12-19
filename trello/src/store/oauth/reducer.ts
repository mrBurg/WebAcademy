import { ACTION_TYPES } from './actionTypes';

export interface IOauthState {
  token: string;
}

const INITIAL_STATE: IOauthState = {
  token: ''
};

export default (state: IOauthState = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
