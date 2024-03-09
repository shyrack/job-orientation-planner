import VerifyDataStepContent from "../../../../../components/process/import/excel/VerifyDataStepContent";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class VerifyDataProcessStepDefinition extends ProcessStepDefinition {
  constructor() {
    super("Daten verifizieren");
  }

  public validate() {
    return false;
  }

  public execute() {}

  public getStepContentFunctionalComponent() {
    return VerifyDataStepContent;
  }
}
