import uuid from 'uuid/v4';

import { IActionHTTP /* ACTION_TYPES */ } from './actionTypes';
import { TWorker /* , subscribe */ } from './../../utils';
import { MiddlewareAPI } from 'redux';

export const requestWorker: TWorker<IActionHTTP> = async (
  action: IActionHTTP
) => {
  const requestId = uuid();
  const { path, onSuccess, method = 'GET' } = action;

  const options: any = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
    }
  };

  const response = await fetch(path, options);

  if (response.status >= 400) console.log('ERROR:');

  const data = await response.json();

  onSuccess!({ data, requestId, method });
};

// const requestMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
// subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, middlewareAPI);

const requestMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) => (
  action: any
) => {
  next(action);
};

export const httpMiddlewares = [requestMiddleware];
