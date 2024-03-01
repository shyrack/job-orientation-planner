import { Paper, PaperProps } from "@mui/material";
import _ from "lodash";
import React from "react";

type FileDropzoneProps = {
  rootPaperProps: PaperProps;
  validFileTypes: Array<string>;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const { rootPaperProps, validFileTypes } = props;

  const normalizedValidFileTypes = React.useMemo(
    () =>
      _.map(validFileTypes, (validFileType) => {
        return validFileType.startsWith(".") ? validFileType : "." + validFileType;
      }),
    [validFileTypes]
  );

  const onFileDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedItems = event.dataTransfer.items;
    const validFiles = _.filter(droppedItems, (droppedItem) => {
      if (droppedItem.kind === "file") {
        const droppedFile = droppedItem.getAsFile();
        const droppedFileName = droppedFile?.name;

        return _.some(normalizedValidFileTypes, (normalizedValidFileType) =>
          droppedFileName?.endsWith(normalizedValidFileType)
        );
      } else {
        return false;
      }
    });
  }, []);

  return <Paper {...rootPaperProps} onDrop={onFileDrop}></Paper>;
}
