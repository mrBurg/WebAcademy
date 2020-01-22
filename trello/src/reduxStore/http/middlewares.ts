import { MiddlewareAPI } from 'redux';
import { IActionHTTP, ACTION_TYPES } from './actionTypes';
import { TWorker, subscribe, makeURL } from './../../utils';
import { getTokenData } from '../oauth';

export const requestMiddlewareWorker: TWorker<IActionHTTP> = async ({
  action,
  next,
  getState
}: any) => {
  const { path, onSuccess, onError, method = 'GET', authRequired } = action;

  const appState = getState();
  const token = getTokenData(appState);

  const options: any = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
    }
  };

  const response = await fetch(makeURL(path, authRequired, token), options);

  let { ok, status } = response;

  if (ok && status === 200) {
    let data = await response.json();

    onSuccess({ data });
  } else {
    try {
      throw new ReferenceError('Request Failed');
    } catch (error) {
      console.info(error);
      onError(error);
    }
  }
};

const requestMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.REQUEST, requestMiddlewareWorker)(next, middlewareAPI);

export const httpMiddlewares = [requestMiddleware];
