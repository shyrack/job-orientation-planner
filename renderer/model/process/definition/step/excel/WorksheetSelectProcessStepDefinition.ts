import _ from "lodash";
import ChooseWorksheetStepContent from "../../../../../components/process/import/excel/ChooseWorksheetStepContent";
import { AppState } from "../../../../state/AppState";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class WorksheetSelectProcessStepDefinition extends ProcessStepDefinition {
  private callback?: (valid: boolean, id?: string) => void;
  private valid?: boolean;

  constructor() {
    super("Worksheet auswählen");
  }

  public execute() {}

  private onAppStateUpdate(appState: AppState) {
    const updatedValidationResult = !_.isEmpty(appState.excelFileImportProcessState.worksheets);

    if (this.callback !== undefined && updatedValidationResult !== this.valid) {
      this.callback(updatedValidationResult, this.id);
      this.valid = updatedValidationResult;
    }
  }

  public validate(callback?: (valid: boolean, id?: string) => void) {
    this.callback = callback;
    AppState.instance?.subscribe(this.onAppStateUpdate.bind(this));

    return !_.isEmpty(AppState.instance?.excelFileImportProcessState.worksheets);
  }

  public getStepContentFunctionalComponent() {
    return ChooseWorksheetStepContent;
  }
}
