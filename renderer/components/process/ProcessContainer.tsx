import { Stepper, StepperProps } from "@mui/material";
import React from "react";
import { ProcessDefinitionStep } from "../../model/process/definition/step/ProcessDefinitionStep";

type ProcessContainerProps = { steps: Array<ProcessDefinitionStep> } & StepperProps;

export default function ProcessContainer(props: ProcessContainerProps) {
  const { steps, ...otherProps } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  return <Stepper activeStep={activeStep} {...otherProps}></Stepper>;
}
