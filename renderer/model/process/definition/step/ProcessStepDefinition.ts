import { StepLabelProps, StepProps } from "@mui/material";
import React from "react";
import { Nullable } from "../../../../utils/types";

export type ProcessStepFunctionalComponentProps = {};

export abstract class ProcessStepDefinition {
  constructor(
    private label: string,
    private muiStepProps?: StepProps,
    private muiStepLabelProps?: StepLabelProps
  ) {}

  public getLabel() {
    return this.label;
  }

  public getMuiStepProps() {
    return this.muiStepProps;
  }

  public getMuiStepLabelProps() {
    return this.muiStepLabelProps;
  }

  public abstract validate(): boolean;
  public abstract getStepContentFunctionalComponent(): (
    props: ProcessStepFunctionalComponentProps
  ) => Nullable<React.JSX.Element>;
  public abstract execute(): void;
}
