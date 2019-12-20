import { IActionHTTP, ACTION_TYPES, IRequestPayload } from './actionTypes';

export const request = (p: IRequestPayload): IActionHTTP => ({
  type: ACTION_TYPES.REQUEST,
  ...p
});
