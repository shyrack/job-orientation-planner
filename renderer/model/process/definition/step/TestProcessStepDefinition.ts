import { StepLabelProps, StepProps } from "@mui/material";
import { ProcessStepDefinition } from "./ProcessStepDefinition";

export class TestProcessStepDefinition extends ProcessStepDefinition {
  constructor(label: string, muiStepProps?: StepProps, muiStepLabelProps?: StepLabelProps) {
    super(label, muiStepProps, muiStepLabelProps);
  }

  public validate(): boolean {
    return false;
  }
}
