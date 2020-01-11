import { ACTION_TYPES } from './actionTypes';

/* export */ interface InitState {
  sessionId?: string;
  boards?: Array<any>;
}

const INITIAL_STATE: InitState = {
  boards: []
};

export default (state: InitState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.GET_BOARD:
      return INITIAL_STATE;
    case ACTION_TYPES.SET_BOARD:
      return { ...state, boards: [...action.payload] };
    default:
      return state;
  }
};
