import React from "react";
import CounterAppConnect from "./CounterAppConnect";
import CounterAppHooks from "./CounterAppHooks";

class CountersApp extends React.Component {
  render() {
    return (
      <div>
        <CounterAppConnect />
        <CounterAppHooks />
        <h3>
          Counter increment for both since they are tied to the same piece of
          state
        </h3>
      </div>
    );
  }
}

export default CountersApp;
