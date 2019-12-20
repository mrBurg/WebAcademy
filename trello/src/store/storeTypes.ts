export interface IAction<T, P = any> {
  type: T;
  payload?: P;
}
