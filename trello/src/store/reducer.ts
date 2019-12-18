export interface IAppReducerState {
  count: number;
}

const INITIAL_STATE = {
  count: 0
};

export const mainReduser = (
  state: IAppReducerState = INITIAL_STATE,
  { type, payload }: any
) => {
  switch (type) {
    case 'INCREASE_COUNT':
      return { ...state, count: state.count + payload };
    case 'DECREASE_COUNT':
      return { ...state, count: state.count + payload };
    default:
      return state;
  }
};
