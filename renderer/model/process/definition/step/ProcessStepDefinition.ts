import { StepContentProps, StepLabelProps, StepProps } from "@mui/material";

export abstract class ProcessStepDefinition {
  constructor(
    private label: string,
    private muiStepProps?: StepProps,
    private muiStepContentProps?: StepContentProps,
    private muiStepLabelProps?: StepLabelProps
  ) {}

  public getLabel() {
    return this.label;
  }

  public getMuiStepProps() {
    return this.muiStepProps;
  }

  public getMuiStepContentProps() {
    return this.muiStepContentProps;
  }

  public getMuiStepLabelProps() {
    return this.muiStepLabelProps;
  }

  public abstract validate(): boolean;
}
