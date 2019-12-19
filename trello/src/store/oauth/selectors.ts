import { IAppState } from './..';

export const getToke = (state: IAppState): string => state.oauth.token;
