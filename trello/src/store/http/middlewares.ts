import { MiddlewareAPI } from 'redux';
import uuid from 'uuid/v4';

import { IActionHTTP /* ACTION_TYPES */, ACTION_TYPES } from './actionTypes';
import { TWorker, subscribe } from './../../utils';

const { REACT_APP_API_DOMAIN } = process.env;

let makeURL = (path: string) => REACT_APP_API_DOMAIN + path;

export const requestMiddlewareWorker: TWorker<IActionHTTP> = async ({
  action,
  next
}: any) => {
  next(action);
  const requestId = uuid();
  const { path, onSuccess, onError, method = 'GET' } = action;

  const options: any = {
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

    onSuccess({ data, requestId, method });
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
