import _ from "lodash";
import ChooseFileStepContent from "../../../../../components/process/import/excel/ChooseFileStepContent";
import { AppState } from "../../../../state/AppState";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class FileSelectProcessStepDefinition extends ProcessStepDefinition {
  private callback?: (valid: boolean, id?: string) => void;
  private valid?: boolean;

  constructor() {
    super("Dateien auswählen");
  }

  private onAppStateUpdate(appState: AppState) {
    const updatedValidationResult = !_.isEmpty(appState.excelFileImportProcessState.excelFiles);

    if (this.callback !== undefined && updatedValidationResult !== this.valid) {
      this.callback(updatedValidationResult, this.id);
      this.valid = updatedValidationResult;
    }
  }

  public validate(callback?: (valid: boolean, id?: string) => void) {
    this.callback = callback;
    AppState.instance?.subscribe(this.onAppStateUpdate.bind(this), true);

    return !_.isEmpty(AppState.instance?.excelFileImportProcessState.excelFiles);
  }

  public getStepContentFunctionalComponent() {
    return ChooseFileStepContent;
  }

  public execute() {}
}
