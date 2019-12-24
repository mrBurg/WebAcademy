import { MiddlewareAPI } from 'redux';
import { push, getHash } from 'connected-react-router';

import { setToLocalStorage, getFromLocalStorage, subscribe } from '../../utils';
import { ACTION_TYPES } from './actionTypes';
import { setToken } from './actions';
import { URLS } from '../../components/Routes';

const { REACT_APP_KEY } = process.env;

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';

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

  const url = `https://api.trello.com/1/tokens/${token}
    ?token=${token}
    &key=${REACT_APP_KEY}`.replace(/[\s\n]/g, '');

  const response = await fetch(url);

  let { ok, status } = response;

  if (ok && status === 200) {
    let data = await response.json();

    setToLocalStorage(TOKEN_STORAGE_KEY, action.payload);

    dispatch(push(URLS.DASH_BOARD));
  } else {
    try {
      throw new ReferenceError('Token expired');
    } catch (error) {
      console.info(error);
      dispatch(push(URLS.LOGIN));
    }
  }
};

const setTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.SET_TOKEN, setTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

const readTokenMiddlewareWorker = async ({ action, next, dispatch }: any) => {
  next(action);

  let savedToken = getFromLocalStorage(TOKEN_STORAGE_KEY) || '';

  console.info(savedToken);
  if (savedToken) return;
  // dispatch(setToken(savedToken));

  /* let { payload: token } = action;

  const url = `https://api.trello.com/1/tokens/${token}
    ?token=${token}
    &key=${REACT_APP_KEY}`.replace(/[\s\n]/g, '');

  const response = await fetch(url);

  let { ok, status } = response;

  if (ok && status === 200) {
    let data = await response.json();

    setToLocalStorage(TOKEN_STORAGE_KEY, action.payload);

    dispatch(push(URLS.DASH_BOARD));
  } else {
    try {
      throw new ReferenceError('Token expired');
    } catch (error) {
      console.info(error);
      dispatch(push(URLS.LOGIN));
    }
  } */

  /* const url = `https://api.trello.com/1/members/me
    ?key=${REACT_APP_KEY}
    &token=${token}`.replace(/[\s\n]/g, ''); */

  // let savedToken = getFromLocalStorage(TOKEN_STORAGE_KEY);
};

const readTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.READ_TOKEN, readTokenMiddlewareWorker)(
    next,
    middlewareAPI
  );

export const oauthMiddlewares = [
  getTokenMiddleware,
  setTokenMiddleware,
  readTokenMiddleware
];
