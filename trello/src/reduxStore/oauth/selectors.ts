import { IAppState } from './..';

export const getTokenData = (state: IAppState): string => state.oauth.token;
export const isAuthenticated = (state: IAppState): boolean =>
  !!state.oauth.token;
