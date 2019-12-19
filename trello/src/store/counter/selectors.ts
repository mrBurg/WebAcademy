import { IAppState } from './..';

export const getCount = (state: IAppState): number => state.counter.count;
