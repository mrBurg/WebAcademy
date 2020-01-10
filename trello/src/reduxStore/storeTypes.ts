export interface IAction<T = string, P = any> {
  type: T;
  payload?: P;
}

export interface INext {
  (action: IAction): void;
}
