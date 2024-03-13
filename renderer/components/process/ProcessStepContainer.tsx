import { styled } from "@mui/material";
import React from "react";
import { ProcessStepDefinition } from "../../model/process/definition/step/ProcessStepDefinition";
import FlexContainer from "../common/flex/FlexContainer";

type ProcessStepContainerProps = {
  activeStep: number;
  steps: Array<ProcessStepDefinition>;
};

const ProcessStep = styled(FlexContainer)({
  flexShrink: 1,
  overflow: "hidden"
});

export default function ProcessStepContainer(props: ProcessStepContainerProps) {
  const { activeStep, steps } = props;

  const currentStep = React.useMemo(() => steps[activeStep], [activeStep, steps]);
  const CurrentStepComponent = React.useMemo(() => currentStep.getStepContentFunctionalComponent(), [currentStep]);

  React.useEffect(() => {
    currentStep.execute();
  }, [currentStep]);

  return (
    <ProcessStep>
      <CurrentStepComponent />
    </ProcessStep>
  );
}
