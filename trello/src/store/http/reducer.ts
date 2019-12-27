import { IActionHTTP, ACTION_TYPES } from './actionTypes';

export interface IHTTPState {}

const INITIAL_STATE: IHTTPState = {};

export default (
  state: IHTTPState = INITIAL_STATE,
  { type, ...payload }: IActionHTTP
) => {
  switch (type) {
    case ACTION_TYPES.REQUEST:
      return { ...state, ...payload };
    default:
      return state;
  }
};
