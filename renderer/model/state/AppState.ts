import _ from "lodash";
import React from "react";
import { ICloneable } from "../../utils/ICloneable";
import pupilView from "../../components/view/definitions/PupilView";

export type AppStateModifier = (appState: AppState) => void;

export class AppState implements ICloneable<AppState> {
  public name: string;

  public currentView = pupilView;

  constructor() {
    this.name = "bla";
  }

  public clone(): AppState {
    return _.cloneDeep(this);
  }

  public cloneAndModify(modifier: AppStateModifier) {
    const clonedInstance = this.clone();
    modifier(clonedInstance);

    return clonedInstance;
  }
}

export const AppStateContext = React.createContext({
  state: new AppState(),
  setState: ((state?: AppState) => {
    throw new Error("Not yet implemented.");
  }) as React.Dispatch<React.SetStateAction<AppState>>,
});
