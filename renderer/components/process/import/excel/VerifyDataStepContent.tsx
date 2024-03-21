import { Button, Card, Step, StepContentProps, StepLabel, Stepper, styled } from "@mui/material";
import _ from "lodash";
import React from "react";
import { useAppState } from "../../../../utils/hooks";
import { AdvancedDataGrid } from "../../../common/data/AdvancedDataGrid";
import FlexContainer from "../../../common/flex/FlexContainer";
import FlexSpacer from "../../../common/flex/FlexSpacer";
import Typography from "../../../text/Typography";

const VerifyDataStepWrapper = styled(Card)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  flex: "1 1 fit-content",
  flexWrap: "nowrap",
  gap: theme.spacing(2),
  height: "100%",
  overflow: "hidden",
  padding: theme.spacing(2)
}));

const WorksheetStepper = styled(Stepper)({
  overflow: "hidden"
});

const WorksheetStep = styled(Step)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
});

const WorksheetStepContent = styled(FlexContainer)({
  flex: "1 1 fit-content",
  flexDirection: "column",
  overflow: "hidden"
});

const StepperButtonWrapper = styled(FlexContainer)({
  flexGrow: 0,
  flexShrink: 1
});

export default function VerifyDataStepContent(props: StepContentProps) {
  const { accessedSubState: worksheets, modifyAppState } = useAppState(
    (appState) => appState.excelFileImportProcessState.worksheets
  );
  const worksheetCount = React.useMemo(() => _.size(worksheets), [worksheets]);
  const [activeStep, setActiveStep] = React.useState(0);

  const onNextButtonClick = React.useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const onBackButtonClick = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  React.useEffect(() => {
    modifyAppState((appState) => {
      appState.excelFileImportProcessState.reviewedWorksheets = true;
    });
  }, [modifyAppState]);

  return (
    <VerifyDataStepWrapper id="test">
      <Typography variant={"h6"}>Daten in Worksheets verifizieren</Typography>
      <WorksheetStepper activeStep={activeStep} nonLinear={true} orientation={"vertical"}>
        {_.map(worksheets, (worksheet, index) => (
          <WorksheetStep
            key={`verify-data-step-${worksheet.getFilename()}-${worksheet.getName()}-${index}`}
            completed={index < activeStep}
          >
            <StepLabel>{`${worksheet.getFilename()}: ${worksheet.getName()}`}</StepLabel>
            <WorksheetStepContent sx={{ display: index === activeStep ? "flex" : "none" }}>
              <AdvancedDataGrid columns={worksheet.getColumns()} rows={worksheet.getRows()} />
            </WorksheetStepContent>
          </WorksheetStep>
        ))}
      </WorksheetStepper>
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
