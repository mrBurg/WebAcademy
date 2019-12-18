import { ACTION_TYPES } from './actionTypes';

export interface IAppReducerState {
  count: number;
}

const INITIAL_STATE = {
  count: 0
};

export default (
  state: IAppReducerState = INITIAL_STATE,
  { type, payload }: any
) => {
  switch (type) {
    case ACTION_TYPES.INCREASE_COUNT:
      return { ...state, count: state.count + payload };
    case ACTION_TYPES.DECREASE_COUNT:
      return { ...state, count: state.count - payload };
    default:
      return state;
  }
};
