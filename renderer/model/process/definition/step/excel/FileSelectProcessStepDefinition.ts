import ChooseFileStepContent from "../../../../../components/process/import/excel/ChooseFileStepContent";
import { ProcessStepDefinition } from "../ProcessStepDefinition";

export class FileSelectProcessStepDefinition extends ProcessStepDefinition {
  constructor() {
    super("Wähle Dateien aus");
  }

  public validate() {
    return false;
  }

  public getStepContentFunctionalComponent() {
    return ChooseFileStepContent;
  }

  public execute() {}
}
