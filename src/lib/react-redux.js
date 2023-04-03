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
        this.unsubscribe = this.context.subscribe(() => this.forceUpdate());
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(this.context.getState())}
            {...mapDispatchToProps(this.context.dispatch)}
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
