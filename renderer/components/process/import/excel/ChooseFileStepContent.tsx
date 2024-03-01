import React from "react";
import { ProcessStepFunctionalComponentProps } from "../../../../model/process/definition/step/ProcessStepDefinition";
import FileDropzone from "../../../common/file/FileDropzone";

export default function ChooseFileStepContent(props: ProcessStepFunctionalComponentProps) {
  const onFilesDrop = React.useCallback((files: Array<File>) => {}, []);

  return <FileDropzone onFilesDrop={onFilesDrop} text={"Drag and drop Excel files here"} validFileTypes={["xlsx"]} />;
}
