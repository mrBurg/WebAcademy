import { ACTION_TYPES } from './actionTypes';
// import { request } from '../http';
import { setToLocalStorage, getFromLocalStorage, subscribe } from '../../utils';
import { MiddlewareAPI } from 'redux';

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';
const { REACT_APP_KEY } = process.env;

const oauthMiddlewareWorker = ({ action, next }: any) => {
  setToLocalStorage(TOKEN_STORAGE_KEY, action.payload);
  /* setTimeout(() => {
    dispatch(
      request({
        path:
          'https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/movies',
        onSuccess: (data: any) => {
          console.info('SUCCESS', data);
        }
      })
    );
  }, 0); */
  next(action);
};

const oauthMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.SET_TOKEN, oauthMiddlewareWorker)(next, middlewareAPI);

const readTokenWorker = ({ action, next, dispatch, getState }: any) => {
  let { oauth } = getState();

  if (oauth.token) return;

  const token = getFromLocalStorage(TOKEN_STORAGE_KEY);

  console.info(token);

  // if (!token) return this.navigateTo(URLS.LOGIN);

  // const url = `https://api.trello.com/1/members/me
  // 		?key=${REACT_APP_KEY}
  // 		&token=${token}`.replace(/[\s\n]/g, '');

  // const response = await fetch(url);

  // let { ok, status } = response;

  // if (ok && status === 200) {
  //   const userProfile = await response.json();

  //   this.setState({ userProfile, token });

  //   return this.navigateTo(URLS.DASH_BOARD);
  // }

  // try {
  //   throw new ReferenceError('Token expired');
  // } catch (error) {
  //   console.info(error);
  // }

  // this.navigateTo(URLS.LOGIN);

  next(action);
};

const readTokenMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, middlewareAPI);

export const oauthMiddlewares = [oauthMiddleware, readTokenMiddleware];
