import { MiddlewareAPI } from 'redux';
import { ACTION_TYPES } from './actionTypes';
import { subscribe } from '../../utils';
import { request } from '../http';
// import { push } from 'connected-react-router';
// import { URLS } from '../../components/Routes';
import { setBoard } from './actions';

const { REACT_APP_KEY } = process.env;

const dashboardMiddlewareWorker = ({
  dispatch,
  next,
  action,
  getState
}: any) => {
  next(action);

  let { token } = getState().oauth;

  const url = `/1/members/me/boards
    ?token=${token}
    &key=${REACT_APP_KEY}`.replace(/[\s\n]/g, '');

  dispatch(
    request({
      path: url,
      onSuccess({ data }) {
        dispatch(setBoard(data));
      },
      onError(error) {
        console.info(error);
        // dispatch(push(URLS.LOGIN));
      }
    })
  );
};

const dashboardMiddleware = (middlewareAPI: MiddlewareAPI) => (next: any) =>
  subscribe(ACTION_TYPES.GET_BOARD, dashboardMiddlewareWorker)(
    next,
    middlewareAPI
  );

export const dashBoardMiddlewares = [dashboardMiddleware];
