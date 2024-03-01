import { Button } from "@mui/material";
import React from "react";
import { ProcessStepFunctionalComponentProps } from "../../../../model/process/definition/step/ProcessStepDefinition";

export default function ChooseFileStepContent(props: ProcessStepFunctionalComponentProps) {
  const onX = React.useCallback(() => {
    window.electron.createDatabase((event, successfullyCreated) => {
      console.log("successfully created", successfullyCreated);
    }, "~/test.db");
  }, []);

  return <Button onClick={onX}>Test</Button>;
}
