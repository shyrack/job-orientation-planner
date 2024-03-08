import { Button, Step, StepLabel, Stepper, StepperProps, Tooltip, styled } from "@mui/material";
import _ from "lodash";
import React from "react";
import { ProcessStepDefinition } from "../../model/process/definition/step/ProcessStepDefinition";
import FlexContainer from "../common/flex/FlexContainer";
import FlexSpacer from "../common/flex/FlexSpacer";
import ProcessStepContainer from "./ProcessStepContainer";

const ProcessContainerWrapper = styled(FlexContainer)({
  flexDirection: "column"
});

const StepperButtonWrapper = styled(FlexContainer)({
  flexGrow: 0,
  flexShrink: 1
});

const ProcessContainerStepper = styled(Stepper)({
  display: "flex",
  flexGrow: 0,
  flexShrink: 1,
  flexWrap: "wrap"
});

type ProcessContainerProps = { steps: Array<ProcessStepDefinition> } & StepperProps;

export default function ProcessContainer(props: ProcessContainerProps) {
  const { steps, ...otherProps } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const stepCount = React.useMemo(() => _.size(steps), [steps]);
  const isFirstStep = React.useMemo(() => activeStep === 0, [activeStep]);
  const isLastStep = React.useMemo(() => activeStep + 1 === stepCount, [activeStep, stepCount]);
  const isEveryStepValid = React.useMemo(() => _.every(steps, (step) => step.validate()), [steps]);

  const onNextButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setActiveStep(activeStep + 1);
    },
    [activeStep, setActiveStep]
  );

  const onBackButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setActiveStep(activeStep - 1);
    },
    [activeStep, setActiveStep]
  );

  const onFinishButtonClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {}, []);

  return (
    <ProcessContainerWrapper>
      <ProcessContainerStepper activeStep={activeStep} nonLinear={true} {...otherProps}>
        {_.map(steps, (step, stepIndex) => {
          const stepProps = step.getMuiStepProps();
          const labelProps = step.getMuiStepLabelProps();
          const label = step.getLabel();
          const isValid = step.validate();

          return (
            <Step key={`${label}-${stepIndex}`} completed={isValid} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </ProcessContainerStepper>
      <ProcessStepContainer activeStep={activeStep} steps={steps} />
      <StepperButtonWrapper>
        <Tooltip title={isFirstStep ? "Keine vorherigen Schritte" : ""}>
          <span>
            <Button disabled={isFirstStep} onClick={onBackButtonClick}>
              Zurück
            </Button>
          </span>
        </Tooltip>
        <FlexSpacer />
        {isLastStep ? (
          <Tooltip title={!isEveryStepValid ? "Nicht abgeschlossene Schritte übrig" : ""}>
            <span>
              <Button disabled={!isEveryStepValid} onClick={onFinishButtonClick}>
                Abschließen
              </Button>
            </span>
          </Tooltip>
        ) : (
          <Button onClick={onNextButtonClick}>Weiter</Button>
        )}
      </StepperButtonWrapper>
    </ProcessContainerWrapper>
  );
}
