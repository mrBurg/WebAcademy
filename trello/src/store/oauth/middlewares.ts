import { MiddlewareAPI } from 'redux';
import { push, getHash } from 'connected-react-router';

import {
  setToLocalStorage,
  getFromLocalStorage,
  subscribe,
  clearLocalStorage
} from '../../utils';
import { ACTION_TYPES } from './actionTypes';
import { setToken } from './actions';
import { URLS } from '../../components/Routes';
import { request } from '../http';

const { REACT_APP_NAME, REACT_APP_KEY } = process.env;

const TOKEN_STORAGE_KEY = REACT_APP_NAME!;

const getTokenMiddlewareWorker = ({
  action,
  next,
  dispatch,
  getState
}: any) => {
  next(action);

  let state = getState();
  let hashToken = getHash(state).split('=')[1];

  if (hashToken) {
    dispatch(setToken(hashToken));
  }
};

const getTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.GET_TOKEN, getTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

const setTokenMiddlewareWorker = async ({ action, next, dispatch }: any) => {
  next(action);

  let { payload: token } = action;

  const url = `/1/tokens/${token}
    ?token=${token}
    &key=${REACT_APP_KEY}`.replace(/[\s\n]/g, '');

  dispatch(
    request({
      path: url,
      onSuccess({ data, requestId, method }) {
        dispatch(push(URLS.DASH_BOARD));

        setToLocalStorage(TOKEN_STORAGE_KEY, action.payload);
      },
      onError(error) {
        dispatch(push(URLS.LOGIN));
      }
    })
  );
};

const setTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.SET_TOKEN, setTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

const readTokenMiddlewareWorker = async ({
  action,
  next,
  dispatch,
  getState
}: any) => {
  next(action);

  let { oauth } = getState();

  if (oauth.token) return;

  let savedToken = getFromLocalStorage(TOKEN_STORAGE_KEY) || '';

  if (savedToken) dispatch(setToken(savedToken));
};

const readTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.READ_TOKEN, readTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

const removeTokenMiddlewareWorker = async ({
  action,
  next,
  dispatch,
  getState
}: any) => {
  next(action);

  clearLocalStorage();
};

const removeTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.REMOVE_TOKEN, removeTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

export const oauthMiddlewares = [
  getTokenMiddleware,
  setTokenMiddleware,
  readTokenMiddleware,
  removeTokenMiddleware
];
