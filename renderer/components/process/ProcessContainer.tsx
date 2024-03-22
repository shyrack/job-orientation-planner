import { Button, Step, StepLabel, Stepper, StepperProps, Tooltip, styled } from "@mui/material";
import _ from "lodash";
import React from "react";
import { ProcessDefinition } from "../../model/process/definition/ProcessDefinition";
import { ProcessStepDefinition } from "../../model/process/definition/step/ProcessStepDefinition";
import FlexContainer from "../common/flex/FlexContainer";
import FlexSpacer from "../common/flex/FlexSpacer";
import ProcessStepContainer from "./ProcessStepContainer";

const ProcessContainerWrapper = styled(FlexContainer)({
  boxSizing: "border-box",
  flex: "1 0 0",
  flexDirection: "column",
  flexWrap: "nowrap",
  overflow: "hidden"
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

type ProcessContainerProps = { definition: ProcessDefinition; steps: Array<ProcessStepDefinition> } & StepperProps;

export default function ProcessContainer(props: ProcessContainerProps) {
  const { definition, steps, ...otherProps } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [validationMap, setValidationMap] = React.useState<Record<string, boolean>>({});

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

  const onFinishButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      definition.onProcessFinished();
    },
    [definition]
  );

  const onValidationChange = React.useCallback(
    (valid: boolean, id?: string) => {
      if (id && validationMap[id] !== valid) {
        setValidationMap({ ...validationMap, id: valid });
      }
    },
    [setValidationMap, validationMap]
  );

  return (
    <ProcessContainerWrapper>
      <ProcessContainerStepper activeStep={activeStep} nonLinear={true} {...otherProps}>
        {_.map(steps, (step, stepIndex) => {
          const stepId = _.uniqueId();
          const stepProps = step.getMuiStepProps();
          const labelProps = step.getMuiStepLabelProps();
          const label = step.getLabel();

          step.setId(stepId);

          const isValid = step.validate(onValidationChange);

          return (
            <Step key={`${label}-${stepIndex}`} completed={validationMap[stepId] || isValid} {...stepProps}>
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
              <Button disabled={false} onClick={onFinishButtonClick}>
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
