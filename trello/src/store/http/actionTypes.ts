import { IAction } from './../storeTypes';

export interface IRequestPayload<P = any> {
  path: string;
  onSuccess?: (p?: P) => void;
  onError?: (e?: any) => void;
  method?: string;
}

export enum ACTION_TYPES {
  REQUEST = '@@HTTP/REQUEST',
  SUCCESS = '@@HTTP/SUCCESS',
  ERROR = '@@HTTP/ERROR'
}

export interface IActionHTTP<P = any>
  extends IAction<ACTION_TYPES>,
    IRequestPayload<P> {}
