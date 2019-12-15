interface IAppState {
  count: number;
}

const INITIAL_STATE = {
  count: 0
};

export const mainReducer = (state: IAppState) => {
  return state;
};
