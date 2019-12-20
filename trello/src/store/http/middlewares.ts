import uuid from 'uuid/v4';

import { IActionHTTP, ACTION_TYPES } from './actionTypes';
import { Worker, subscribe } from './../../utils';

export const requestWorker: Worker<IActionHTTP> = async (
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

const requestMiddleware = ({ dispatch, getState }: any) => (next: any) =>
  subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, dispatch, getState);

export const httpMiddlewares = [requestMiddleware];
