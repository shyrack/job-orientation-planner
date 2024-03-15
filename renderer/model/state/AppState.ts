import _ from "lodash";
import React from "react";
import AppStateProvider from "../../components/provider/AppStateProvider";
import { ViewDefinition } from "../../components/view/View";
import { ICloneable } from "../../utils/ICloneable";
import * as hooks from "../../utils/hooks";
import { ClassColumns } from "../table/classView";
import { CompanyColumns } from "../table/companyView";
import { EventColumns } from "../table/eventView";
import { RoomColumns } from "../table/roomView";
import { SchedulerColumns } from "../table/schedulerView";
import { StudentAppointmentColumns } from "../table/studentAppointmentView";
import { StudentPreferenceColumns } from "../table/studentPreferenceView";
import { StudentColumns } from "../table/studentView";
import { TimeslotColumns } from "../table/timeslotView";
import { ExcelFileImportProcessState } from "./ExcelFileImportProcessState";
/**
 * Type for a function that is given the current app's global state. Function is allowed to modify.
 *
 * @author Florian Jahn
 */
export type AppStateModifier = (appState: AppState) => void;
export type AppStateListener = AppStateModifier;

/**
 * Type for setState function from React's useState hook.
 *
 * @author Florian Jahn
 */
type AppStateSetStateDispatcher = React.Dispatch<React.SetStateAction<AppState>>;

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

  private listeners: Array<AppStateListener>;

  //TODO: @Florian help dbPath
  public dbPath: string;
  public viewName: string;

  public class: ViewDefinition<typeof ClassColumns> = {
    columns: ClassColumns,
    rows: []
  };

  public company: ViewDefinition<typeof CompanyColumns> = {
    columns: CompanyColumns,
    rows: []
  };

  public event: ViewDefinition<typeof EventColumns> = {
    columns: EventColumns,
    rows: []
  };

  public room: ViewDefinition<typeof RoomColumns> = {
    columns: EventColumns,
    rows: []
  };

  public scheduler: ViewDefinition<typeof SchedulerColumns> = {
    columns: RoomColumns,
    rows: []
  };

  public studentAppointment: ViewDefinition<typeof StudentAppointmentColumns> = {
    columns: RoomColumns,
    rows: []
  };

  public studentPreference: ViewDefinition<typeof StudentPreferenceColumns> = {
    columns: RoomColumns,
    rows: []
  };

  public student: ViewDefinition<typeof StudentColumns> = {
    columns: StudentColumns,
    rows: []
  };

  public timeslot: ViewDefinition<typeof TimeslotColumns> = {
    columns: StudentColumns,
    rows: []
  };

  public excelFileImportProcessState: ExcelFileImportProcessState;

  constructor() {
    this.dbPath = "";
    this.viewName = "room";

    this.listeners = [];

    //TODO: @Flo eigentlich besser wenn das OnDemand ausgeführt wird, Aktualisierung auch interessant
    //TODO: @Flo selectData return Undefined?
    //this.class.rows = selectData("Class");
    //this.company.rows = selectData("Company");
    //this.event.rows = selectData("Event");
    //this.room.rows = selectData("Room");
    //this.scheduler.rows = selectData("Scheduler");
    //this.studentAppointment.rows = selectData("StudentAppointment");
    //this.studentPreference.rows = selectData("StudentPreference");
    //this.student.rows = selectData("Student");
    //this.timeslot.rows = selectData("Timeslot");
    //console.log(selectData("Student"));

    // const classData: ClassData = {
    //   name: ["Class Name"],
    //   entry_year: [2024]
    // };

    // const companyData: CompanyData = {
    //   name: ["Company Name", "Yeas"],
    //   job_occupation: ["Job Occupation", "Test"],
    //   timeslot_start: ["08:00", "08:00"],
    //   timeslot_end: ["16:00", "12:00"]
    // };

    // const eventData: EventData = {
    //   name: ["Event Name", "test"]
    // };

    // try {
    //   window.electron.createRow(
    //     (event, successfullyCreated) => {
    //       console.log("Class", successfullyCreated);
    //     },
    //     "Class",
    //     classData
    //   );

    //   window.electron.createRow(
    //     (event, successfullyCreated) => {
    //       console.log("Company", successfullyCreated);
    //     },
    //     "Company",
    //     companyData
    //   );

    //   window.electron.createRow(
    //     (event, successfullyCreated) => {
    //       console.log("Event", eventData);
    //     },
    //     "Event",
    //     eventData
    //   );
    // } catch (error) {
    //   console.error(error);
    // }

    this.excelFileImportProcessState = new ExcelFileImportProcessState();
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

    _.forEach(clonedInstance.listeners, (listener) => {
      listener(clonedInstance);
    });

    return clonedInstance;
  }

  public static setAppStateDispatcher(appStateDispatcher: AppStateSetStateDispatcher) {
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

  public static get instance() {
    return AppState.currentInstance;
  }

  public subscribe(listener: AppStateListener, initialExecute?: boolean) {
    const isAlreadySubscribed = _.includes(this.listeners, listener);

    if (!isAlreadySubscribed) {
      this.listeners.push(listener);
    }

    if (initialExecute && !isAlreadySubscribed) {
      listener(this);
    }
  }

  public unsubscribe(listener: AppStateListener) {
    const index = _.findIndex(this.listeners, (listenerComparison) => listenerComparison === listener);

    if (index !== -1) {
      _.remove(this.listeners, (_listener, listenerIndex) => listenerIndex === index);
    }
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
      const clonedAndModifiedInstance = currentInstance.cloneAndModify(modifier);
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

function selectData(tableName: string): any {
  try {
    window.electron.selectTable((event, successfullySelected, obj) => {
      console.log(obj);
      return obj;
    }, tableName);
  } catch (error) {
    console.error(error);
  }
}
