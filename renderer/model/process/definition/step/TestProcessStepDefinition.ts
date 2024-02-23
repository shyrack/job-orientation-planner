import { StepLabelProps, StepProps } from "@mui/material";
import ChooseFileStepContent from "../../../../components/process/import/excel/ChooseFileStepContent";
import { ProcessStepDefinition } from "./ProcessStepDefinition";

export class TestProcessStepDefinition extends ProcessStepDefinition {
  constructor(label: string, muiStepProps?: StepProps, muiStepLabelProps?: StepLabelProps) {
    super(label, muiStepProps, muiStepLabelProps);
  }

  public getStepContentFunctionalComponent() {
    return ChooseFileStepContent;
  }

  public validate(): boolean {
    return false;
  }

  public execute() {}
}
