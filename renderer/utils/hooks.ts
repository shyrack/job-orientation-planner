import React from "react";
import { AppState, AppStateContext } from "../model/state/AppState";

export function useAppState<T>(accessor: (appState: AppState) => T) {
  const appState = React.useContext(AppStateContext);
  const [subState, setSubState] = React.useState(accessor(appState));

  React.useEffect(() => {
    setSubState(accessor(appState));
  }, [appState]);

  return subState;
}
