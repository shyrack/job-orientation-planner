import React from "react";
import * as AppStateFile from "../model/state/AppState";
import { AppState, AppStateContext } from "../model/state/AppState";

/**
 * A React hook for accessing the apps global state from all functional components.
 *
 * @author Florian Jahn
 *
 * @example // Basic usage of useAppState hook and accessing part of app's global state.
 * const { accessedSubState: someStuff, modifyAppState } = useAppState((appState) => appState.someStuff);
 *
 * @example // Basic modifying of app's global state by using the returned modifyAppState function.
 * modifyAppState((appState) => { appState.someStuff = "Some new stuff"; });
 *
 * @param accessor A function that is given the app's global state and returns part of it.
 * @returns An object containing the returned sub state of the accessor and a modifying method for safely changing app's global state.
 *
 * @see {@link AppStateFile.AppState}
 * @see {@link https://react.dev/}
 */
export function useAppState<T>(accessor: (appState: AppState) => T) {
  const { state: appState } = React.useContext(AppStateContext);
  const [accessedSubState, setAccessedSubState] = React.useState(accessor(appState));

  React.useEffect(() => {
    setAccessedSubState(accessor(appState));
  }, [accessor, appState, setAccessedSubState]);

  const modifyAppState = React.useCallback(AppState.modifyAppState, []);

  return { accessedSubState, modifyAppState };
}
