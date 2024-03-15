import ChooseWorksheetStepContent from "../../../../../components/process/import/excel/ChooseWorksheetStepContent";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class WorksheetSelectProcessStepDefinition extends ProcessStepDefinition {
  constructor() {
    super("Worksheet auswählen");
  }

  public execute() {}

  public validate() {
    return false;
  }

  public getStepContentFunctionalComponent() {
    return ChooseWorksheetStepContent;
  }
}
