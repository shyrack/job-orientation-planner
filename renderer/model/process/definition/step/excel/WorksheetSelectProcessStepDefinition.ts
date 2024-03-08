import { JSX } from "react";
import { Nullable } from "../../../../../utils/types";
import { ProcessStepDefinition, ProcessStepFunctionalComponentProps } from "../ProcessStepDefinition";
import ChooseWorksheetStepContent from "../../../../../components/process/import/excel/ChooseWorksheetStepContent";

export class WorksheetSelectProcessStepDefinition extends ProcessStepDefinition {
  constructor() {
    super("Select Worksheet");
  }

  public execute(): void {
    throw new Error("Method not implemented.");
  }

  public validate(): boolean {
    throw new Error("Method not implemented.");
  }

  public getStepContentFunctionalComponent(): (props: ProcessStepFunctionalComponentProps) => Nullable<JSX.Element> {
    return ChooseWorksheetStepContent;
  }
}
