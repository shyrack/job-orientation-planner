import React from "react";
import { ProcessStepDefinition } from "../../model/process/definition/step/ProcessStepDefinition";
import FlexContainer from "../common/flex/FlexContainer";

type ProcessStepContainerProps = { activeStep: number; steps: Array<ProcessStepDefinition> };

export default function ProcessStepContainer(props: ProcessStepContainerProps) {
  const { activeStep, steps } = props;

  const currentStep = React.useMemo(() => steps[activeStep], [activeStep, steps]);
  const CurrentStepComponent = React.useMemo(() => currentStep.getStepContentFunctionalComponent(), [currentStep]);

  return (
    <FlexContainer>
      <CurrentStepComponent />
    </FlexContainer>
  );
}
