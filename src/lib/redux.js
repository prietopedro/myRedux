export function createStore(reducer, initialState) {
  let state = initialState || reducer(undefined, { type: "" });
  let subscribeCbs = [];
  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      subscribeCbs.forEach((curr) => curr());
    },
    subscribe: (callback) => {
      subscribeCbs.push(callback);
      return () => subscribeCbs.filter((curr) => curr !== callback);
    },
  };
}
