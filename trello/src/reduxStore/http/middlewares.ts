import { MiddlewareAPI } from 'redux';
import { IActionHTTP, ACTION_TYPES } from './actionTypes';
import { TWorker, subscribe, makeURL } from './../../utils';

// let makeURL = (path: string) => REACT_APP_API_DOMAIN + path;

export const requestMiddlewareWorker: TWorker<IActionHTTP> = async ({
  action,
  next
}: any) => {
  const { path, onSuccess, onError, method = 'GET' } = action;

  const options: any = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
    }
  };

  const response = await fetch(makeURL(path), options);

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
