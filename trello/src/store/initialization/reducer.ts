import uuid from 'uuid/v4';

import { ACTION_TYPES } from './actionTypes';

export interface InitState {
  sessionId?: string;
}

const INITIAL_STATE: InitState = {};

export default (state: InitState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.START:
      return {};
    case ACTION_TYPES.END:
      return {
        sessionId: uuid()
      };
    default:
      return state;
  }
};
