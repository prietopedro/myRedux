import React, { useState, useContext, useEffect } from "react";

const StoreContext = React.createContext();
export function Provider({ children, store }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComponent) => {
    return class Wrapper extends React.Component {
      static contextType = StoreContext;

      componentDidMount() {
        if (!mapStateToProps) return;
        this.unsubscribe = this.context.subscribe(() => this.forceUpdate());
      }
      componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
      }
      render() {
        let stateProps = {};
        let dispatchProps = {};

        // Do not want to invoke if it's null
        if (mapStateToProps)
          stateProps = {
            ...mapStateToProps(this.context.getState(), this.props),
          };

        // Do not want to invoke if its null, or was passed as an object
        if (typeof mapDispatchToProps === "function")
          dispatchProps = {
            ...mapDispatchToProps(this.context.dispatch, this.props),
          };
        else if (mapDispatchToProps) dispatchProps = { ...dispatchProps };

        return (
          <WrappedComponent
            {...this.props}
            {...stateProps}
            {...dispatchProps}
          />
        );
      }
    };
  };
}

function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export function useSelector(cbSelector) {
  const forceUpdate = useForceUpdate();
  const context = useContext(StoreContext);
  useEffect(() => {
    const unsubscribe = context.subscribe(() => forceUpdate());
    return unsubscribe;
  }, [forceUpdate, context]);
  return cbSelector(context.getState());
}

export function useDispatch() {
  const context = useContext(StoreContext);
  return context.dispatch;
}
