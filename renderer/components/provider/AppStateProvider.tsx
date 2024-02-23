import React from "react";
import { AppState, AppStateContext } from "../../model/state/AppState";

type AppStateProviderProps = {
  children?: React.ReactNode;
};

export default function AppStateProvider(props: AppStateProviderProps) {
  const { children } = props;
  const [appState, setAppState] = React.useState(new AppState());

  React.useEffect(() => {
    AppState.setCurrentInstance(appState);
    AppState.setAppStateDispatcher(setAppState);
  }, [appState, setAppState]);

  return <AppStateContext.Provider value={{ state: appState }}>{children}</AppStateContext.Provider>;
}
