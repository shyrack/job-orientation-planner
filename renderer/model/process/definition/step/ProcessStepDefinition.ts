import { StepLabelProps, StepProps } from "@mui/material";
import React from "react";
import { Nullable } from "../../../../utils/types";

export type ProcessStepFunctionalComponentProps = {};

export abstract class ProcessStepDefinition {
  protected id?: string;

  constructor(private label: string, private muiStepProps?: StepProps, private muiStepLabelProps?: StepLabelProps) {}

  public getLabel() {
    return this.label;
  }

  public getMuiStepProps() {
    return this.muiStepProps;
  }

  public getMuiStepLabelProps() {
    return this.muiStepLabelProps;
  }

  public setId(id: string) {
    this.id = id;
  }

  public abstract validate(callback?: (valid: boolean, id?: string) => void): boolean;
  public abstract getStepContentFunctionalComponent(): (
    props: ProcessStepFunctionalComponentProps
  ) => Nullable<React.JSX.Element>;
  public abstract execute(): void;
}
