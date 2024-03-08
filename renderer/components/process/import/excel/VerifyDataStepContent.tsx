import { Button, Step, StepContent, StepContentProps, StepLabel, Stepper, styled } from "@mui/material";
import _ from "lodash";
import React from "react";
import { useAppState } from "../../../../utils/hooks";
import FlexContainer from "../../../common/flex/FlexContainer";
import FlexSpacer from "../../../common/flex/FlexSpacer";

const VerifyDataStepWrapper = styled(FlexContainer)({
  flexDirection: "column"
});

const StepperButtonWrapper = styled(FlexContainer)({
  flexGrow: 0,
  flexShrink: 1
});

const ButtonStepperSpacer = styled(FlexSpacer)({
  flexGrow: 1
});

export default function VerifyDataStepContent(props: StepContentProps) {
  const { accessedSubState: worksheets } = useAppState((appState) => appState.excelFileImportProcessState.worksheets);
  const worksheetCount = React.useMemo(() => _.size(worksheets), [worksheets]);
  const [activeStep, setActiveStep] = React.useState(0);

  const onNextButtonClick = React.useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const onBackButtonClick = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  return (
    <VerifyDataStepWrapper>
      <Stepper activeStep={activeStep} nonLinear={true} orientation={"vertical"}>
        {_.map(worksheets, (worksheet, index) => (
          <Step
            key={`verify-data-step-${worksheet.getFilename()}-${worksheet.getName()}-${index}`}
            completed={index < activeStep}
          >
            <StepLabel>{`${worksheet.getFilename()}: ${worksheet.getName()}`}</StepLabel>
            <StepContent>
              <div>Some very important step content stuff</div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <ButtonStepperSpacer />
      <StepperButtonWrapper>
        <Button disabled={activeStep === 0} onClick={onBackButtonClick}>
          Zurück
        </Button>
        <FlexSpacer />
        <Button disabled={activeStep + 1 === worksheetCount} onClick={onNextButtonClick}>
          Weiter
        </Button>
      </StepperButtonWrapper>
    </VerifyDataStepWrapper>
  );
}
