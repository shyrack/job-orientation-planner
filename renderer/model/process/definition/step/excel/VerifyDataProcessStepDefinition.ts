import VerifyDataStepContent from "../../../../../components/process/import/excel/VerifyDataStepContent";
import { AppState } from "../../../../state/AppState";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class VerifyDataProcessStepDefinition extends ProcessStepDefinition {
  private callback?: (valid: boolean, id?: string) => void;
  private valid?: boolean;

  constructor() {
    super("Daten verifizieren");
  }

  private onAppStateUpdate(appState: AppState) {
    const updatedValidationResult = appState.excelFileImportProcessState.reviewedWorksheets ?? false;

    if (this.callback !== undefined && updatedValidationResult !== this.valid) {
      this.callback(updatedValidationResult, this.id);
      this.valid = updatedValidationResult;
    }
  }

  public validate(callback?: (valid: boolean, id?: string) => void) {
    this.callback = callback;
    AppState.instance?.subscribe(this.onAppStateUpdate.bind(this), true);

    return AppState.instance?.excelFileImportProcessState.reviewedWorksheets ?? false;
  }

  public execute() {}

  public getStepContentFunctionalComponent() {
    return VerifyDataStepContent;
  }
}
