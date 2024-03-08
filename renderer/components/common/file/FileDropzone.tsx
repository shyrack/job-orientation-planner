import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Paper, PaperProps, TypographyProps, lighten, styled, useTheme } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import _ from "lodash";
import React from "react";
import Typography from "../../text/Typography";

const FileDropZonePaperAnimationBorder = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  flexShrink: 0,
  padding: theme.spacing(0.5)
}));

const AnimatedFileDropZonePaperAnimationBorder = animated(FileDropZonePaperAnimationBorder);

const FileDropzonePaper = styled(Paper)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: lighten(theme.palette.background.paper, 0.1),
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 0,
  justifyContent: "center",
  gap: theme.spacing(2),
  pointerEvents: "none"
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

  const [isDragOver, setIsDragOver] = React.useState(false);
  const theme = useTheme();

  const borderGradientElementStyles = useSpring({
    from: { background: `linear-gradient(0deg, rgb(50, 200, 255) 0%, ${theme.palette.primary.main} 100%)` },
    to: { background: `linear-gradient(360deg, rgb(50, 200, 255) 0%, ${theme.palette.secondary.main} 100%)` },
    loop: true,
    delay: 0,
    pause: false,
    config: {
      duration: 2500,
      bounce: 0
    }
  });

  const [sizeMorphElementStyles, sizeMorphElementStylesApi] = useSpring(() => ({
    from: { padding: theme.spacing(0) },
    to: { padding: theme.spacing(0.5) },
    config: {
      duration: 1000
    }
  }));

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

  const onDragEnter = React.useCallback(() => {
    setIsDragOver(true);
    console.log("drag over", true);
  }, [setIsDragOver]);

  const onDragLeave = React.useCallback(() => {
    setIsDragOver(false);
    console.log("drag over", false);
  }, [setIsDragOver]);

  return (
    <AnimatedFileDropZonePaperAnimationBorder
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onFileDrop}
      style={{ ...borderGradientElementStyles, ...sizeMorphElementStyles }}
      {...rootPaperProps}
    >
      <FileDropzonePaper elevation={0}>
        <CloudUploadIcon fontSize={"large"} />
        <Typography justifyContent={"center"} variant={"h6"} {...rootTypographyProps}>
          {text}
        </Typography>
      </FileDropzonePaper>
    </AnimatedFileDropZonePaperAnimationBorder>
  );
}
