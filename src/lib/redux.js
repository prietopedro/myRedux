export function createStore(reducer, initialState) {
  let state = initialState;
  let subscribeCbs = [];
  return {
    getState: () =>
      state !== undefined ? state : reducer(state, { type: "" }), // THIS IS JUST SO THAT IF WE GET STATE BEFORE DISPATCHING, WE CAN HAVE AN INITIAL STATE IF IT WAS NOT PASSED DIRECTLY INTO createStore
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
