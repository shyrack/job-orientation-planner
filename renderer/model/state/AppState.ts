import _ from "lodash";
import React from "react";
import companyTestData from "../../../electron-src/data/testdata/Companies.json";
import roomTestData from "../../../electron-src/data/testdata/Rooms.json";
import studentTestData from "../../../electron-src/data/testdata/Students.json";
import AppStateProvider from "../../components/provider/AppStateProvider";
import { ViewDefinition } from "../../components/view/View";
import { ICloneable } from "../../utils/ICloneable";
import * as hooks from "../../utils/hooks";
import { CompanyColumns } from "../table/companyView";
import { RoomColumns } from "../table/roomView";
import { StudentColumns } from "../table/studentView";
import { ProcessDefinition } from "../process/definition/ProcessDefinition";

/**
 * Type for a function that is given the current app's global state. Function is allowed to modify.
 *
 * @author Florian Jahn
 */
export type AppStateModifier = (appState: AppState) => void;

/**
 * Type for setState function from React's useState hook.
 *
 * @author Florian Jahn
 */
type AppStateSetStateDispatcher = React.Dispatch<
  React.SetStateAction<AppState>
>;

export type AvailableViews = "company" | "student";

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
  private static appStateDispatcher?: AppStateSetStateDispatcher;
  private static currentInstance?: AppState;

  public viewName: string;

  public company: ViewDefinition<typeof CompanyColumns> = {
    columns: CompanyColumns,
    rows: []
  };

  public student: ViewDefinition<typeof StudentColumns> = {
    columns: StudentColumns,
    rows: []
  };

  public room: ViewDefinition<typeof RoomColumns> = {
    columns: RoomColumns,
    rows: []
  };

  constructor() {
    this.viewName = "room";

    this.company.rows = companyTestData;
    this.student.rows = studentTestData;
    this.room.rows = roomTestData;
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

  public static setAppStateDispatcher(
    appStateDispatcher: AppStateSetStateDispatcher
  ) {
    AppState.appStateDispatcher = appStateDispatcher;
  }

  public static safelyAccessAppStateDispatcher() {
    if (AppState.appStateDispatcher) {
      return AppState.appStateDispatcher;
    } else {
      throw new Error("AppState's React useState dispatcher was undefined.");
    }
  }

  public static setCurrentInstance(appState: AppState) {
    AppState.currentInstance = appState;
  }

  /**
   *
   * @author Florian Jahn
   *
   * @param modifier Method for safely modifying app's global state.
   */
  public static modifyAppState(modifier: AppStateModifier) {
    const currentInstance = AppState.currentInstance;

    if (currentInstance) {
      const clonedAndModifiedInstance =
        currentInstance.cloneAndModify(modifier);
      const appStateDispatcher = AppState.safelyAccessAppStateDispatcher();

      appStateDispatcher(clonedAndModifiedInstance);
    } else {
      throw new Error("AppState's instance was undefined.");
    }
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
  state: new AppState()
});
