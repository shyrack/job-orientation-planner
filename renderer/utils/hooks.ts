import React from "react";
import { AppState, AppStateContext, AppStateModifier } from "../model/state/AppState";

export function useAppState<T>(accessor: (appState: AppState) => T) {
  const { setState, state: appState } = React.useContext(AppStateContext);
  const [accessedSubState, setAccessedSubState] = React.useState(accessor(appState));

  React.useEffect(() => {
    setAccessedSubState(accessor(appState));
  }, [accessor, appState, setAccessedSubState]);

  const modifyAppState = React.useCallback(
    (modifier: AppStateModifier) => {
      const clonedAppState = appState.cloneAndModify(modifier);
      setState(clonedAppState);
    },
    [appState, setState]
  );

  return { accessedSubState, modifyAppState };
}
