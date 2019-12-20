import { IAction } from './../storeTypes';
import { ACTION_TYPES } from './actionTypes';
import { request } from '../http';
import { setToLocalStorage } from '../../utils';

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';

const oauthMiddleware = ({ dispatch }: any) => (next: any) => (
  action: IAction<ACTION_TYPES>
) => {
  if (action.type === ACTION_TYPES.SET_TOKEN) {
    setToLocalStorage(TOKEN_STORAGE_KEY, action.payload);
    console.info(request, dispatch);
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
  }
  next(action);
};

export const oauthMiddlewares = [oauthMiddleware];

// const { REACT_APP_KEY } = process.env;

/* private async getToken() {
    if (this.state.token) return;

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY);

    if (!token) return this.navigateTo(URLS.LOGIN);

    const url = `https://api.trello.com/1/members/me
			?key=${REACT_APP_KEY}
			&token=${token}`.replace(/[\s\n]/g, '');

    const response = await fetch(url);

    let { ok, status } = response;

    if (ok && status === 200) {
      const userProfile = await response.json();

      this.setState({ userProfile, token });

      return this.navigateTo(URLS.DASH_BOARD);
    }

    try {
      throw new ReferenceError('Token expired');
    } catch (error) {
      console.info(error);
    }

    this.navigateTo(URLS.LOGIN);
  } */

/* private get isLoggedIn(): boolean {
    return !!this.state.token;
  } */

/* private logout = (): void => {
		removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

		this.setState(INITIAL_STATE);
		this.navigateTo(URLS.LOGIN);
	}; */

/* private navigateTo(url: URLS) {
    this.props.history.push(url);
  } */
