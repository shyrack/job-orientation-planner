import React from "react";
import { AppState, AppStateContext } from "../../model/state/AppState";

type AppStateProviderProps = {
  children?: React.ReactNode;
};

export default function AppStateProvider(props: AppStateProviderProps) {
  const { children } = props;
  const [appState, setAppState] = React.useState(new AppState());

  return (
    <AppStateContext.Provider value={{ state: appState, setState: setAppState }}>{children}</AppStateContext.Provider>
  );
}
