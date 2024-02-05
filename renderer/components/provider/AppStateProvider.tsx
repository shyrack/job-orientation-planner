import React from "react";
import { AppState, AppStateContext } from "../../model/state/AppState";

type AppStateProviderProps = {
  children?: React.ReactNode;
};

export default function AppStateProvider(props: AppStateProviderProps) {
  const { children } = props;

  return <AppStateContext.Provider value={new AppState()}>{children}</AppStateContext.Provider>;
}
