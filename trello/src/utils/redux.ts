export type TWorker<T extends { type: string }> = (
  action: T,
  next: any,
  dispatch?: any,
  getState?: () => any
) => void;

export const subscribe = <T extends { type: string }>(
  actionType: string | Array<string>,
  worker: TWorker<T>
) => (next: any, dispatch?: any, getState?: () => any) => (action: T) => {
  const isWatchedAction: boolean =
    typeof actionType !== 'string'
      ? actionType.indexOf(action.type) !== -1
      : actionType === action.type;

  if (isWatchedAction) {
    worker(action, next, dispatch, getState);
  } else {
    next(action);
  }
  console.info(action, isWatchedAction);
};

/*
import { MiddlewareAPI } from 'redux';

export type TWorker<T extends { type: string }> = (
  action: T,
  next: any,
  dispatch?: any,
  getState?: () => any
) => void;

export const subscribe = <T extends { type: string }>(
  actionType: string | Array<string>,
  worker: TWorker<T>
) => (next: any, { dispatch, getState }: MiddlewareAPI) => (action: T) => {
  const isWatchedAction: boolean =
    typeof actionType !== 'string'
      ? actionType.indexOf(action.type) !== -1
      : actionType === action.type;
  if (isWatchedAction) {
    worker(action, next, dispatch, getState);
  } else {
    next(action);
  }
};
*/
