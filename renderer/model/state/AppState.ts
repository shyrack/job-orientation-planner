import _ from "lodash";
import React from "react";
import AppStateProvider from "../../components/provider/AppStateProvider";
import pupilView from "../../components/view/definitions/PupilView";
import { ICloneable } from "../../utils/ICloneable";
import * as hooks from "../../utils/hooks";

/**
 * Type for a function that is given the current app's global state. Function is allowed to modify.
 *
 * @author Florian Jahn
 */
export type AppStateModifier = (appState: AppState) => void;

/**
 * A class for defining and implementing app's global state. The classes instance is accessible in React functional components via {@link hooks.useAppState}.
 * Outside React functional components the AppState's instance is accessible via static access method.
 *
 * @author Florian Jahn, Andre Löwen
 *
 * @example // Basic usage of AppState's instance in React functional component.
 * const { accessedSubState, modifyAppState } = useAppState((appState) => appState.accessedSubState);
 *
 * @see {@link https://react.dev/}
 */
export class AppState implements ICloneable<AppState> {
  public name: string;

  public currentView = pupilView;

  constructor() {
    this.name = "bla";
  }

  /**
   * Method for creating a new instance of app's global state. This is necessary for usage of React's useState hook.
   * It makes use of lodash's cloneDeep function.
   *
   * @author Florian Jahn
   *
   * @returns Deep cloned instance of current app's global state.
   *
   * @see {@link https://lodash.com/docs/}
   */
  public clone(): AppState {
    return _.cloneDeep(this);
  }

  /**
   * Method for creating a new instance of app's global state with {@link AppState.clone} and modifying it with a given method.
   *
   * @author Florian Jahn
   *
   * @example appState.cloneAndModify((appState) => { appState.doSomething = "something" });
   *
   * @param modifier Method for safely modifying app's global state.
   * @returns Deep cloned and modified instance of current app's global state.
   */
  public cloneAndModify(modifier: AppStateModifier) {
    const clonedInstance = this.clone();
    modifier(clonedInstance);

    return clonedInstance;
  }
}

/**
 * The React context given to the {@link AppStateProvider} for making app's global state
 * accessible in React functional components via {@link hooks.useAppState}.
 *
 * @author Florian Jahn
 *
 * @see {@link AppStateProvider}
 * @see {@link https://react.dev/}
 */
export const AppStateContext = React.createContext({
  state: new AppState(),
  setState: ((state?: AppState) => {
    throw new Error("Not yet implemented.");
  }) as React.Dispatch<React.SetStateAction<AppState>>
});
