import { createStore } from "../lib/redux";

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export let store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));

// store.dispatch({ type: "counter/incremented" }); //1
// // {value: 1}
// store.dispatch({ type: "counter/incremented" }); //2
// // {value: 2}
// store.dispatch({ type: "counter/decremented" }); //1
// // {value: 1}
