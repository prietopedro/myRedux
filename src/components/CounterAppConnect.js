import React from "react";
import { connect } from "../lib/react-redux";

export class CounterAppConnect extends React.Component {
  render() {
    return (
      <div>
        <h1>Counter App With Connect</h1>
        <div>{this.props.counter}</div>

        <button onClick={this.props.increment}>increment</button>
        <button onClick={this.props.decrement}>decrement</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.value,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: "counter/incremented" }),
    decrement: () => dispatch({ type: "counter/decremented" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CounterAppConnect);
