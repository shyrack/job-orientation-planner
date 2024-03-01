import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Paper, PaperProps, TypographyProps, styled } from "@mui/material";
import _ from "lodash";
import React from "react";
import Typography from "../../text/Typography";

const FileDropzonePaper = styled(Paper)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 0,
  gap: theme.spacing(2),
  justifyContent: "center",
  height: "100%",
  width: "100%"
}));

type FileDropzoneProps = {
  onFilesDrop: (files: Array<File>) => void;
  rootPaperProps?: PaperProps;
  rootTypographyProps?: TypographyProps;
  text: string;
  validFileTypes: Array<string>;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const { onFilesDrop, rootPaperProps, rootTypographyProps, text, validFileTypes } = props;

  const normalizedValidFileTypes = React.useMemo(
    () =>
      _.map(validFileTypes, (validFileType) => {
        return validFileType.startsWith(".") ? validFileType : "." + validFileType;
      }),
    [validFileTypes]
  );

  const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onFileDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const droppedItems = event.dataTransfer.items;
      const validItems = _.filter(droppedItems, (droppedItem) => {
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
      const validFiles = _.map(validItems, (validItem) => validItem.getAsFile()) as Array<File>;
      const validFilesCount = _.size(validFiles);

      if (validFilesCount === 0) {
        // TODO: Show warning dialog
      } else {
        onFilesDrop(validFiles);
      }
    },
    [onFilesDrop]
  );

  return (
    <FileDropzonePaper onDragOver={onDragOver} onDrop={onFileDrop}>
      <CloudUploadIcon fontSize={"large"} />
      <Typography justifyContent={"center"} variant={"h6"} {...rootTypographyProps}>
        {text}
      </Typography>
    </FileDropzonePaper>
  );
}
