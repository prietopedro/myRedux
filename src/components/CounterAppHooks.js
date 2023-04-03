import { useDispatch, useSelector } from "../lib/react-redux";

function CounterAppHooks() {
  const counter = useSelector((state) => state.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter App With Hooks</h1>
      <div>{counter}</div>

      <button onClick={() => dispatch({ type: "counter/incremented" })}>
        increment
      </button>
      <button onClick={() => dispatch({ type: "counter/decremented" })}>
        decrement
      </button>
    </div>
  );
}

export default CounterAppHooks;
