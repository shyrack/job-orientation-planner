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

  const [dragOvers, setDragOvers] = React.useState(0);
  const theme = useTheme();

  const borderGradientElementStyles = useSpring({
    from: {
      background: `linear-gradient(0deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`
    },
    to: {
      background: `linear-gradient(360deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`
    },
    loop: true,
    pause: false,
    config: {
      duration: 2500,
      bounce: 0
    }
  });

  const sizeMorphElementStyles = useSpring({
    from: { padding: theme.spacing(0) },
    to: { padding: dragOvers > 0 ? theme.spacing(0.5) : theme.spacing(0) },
    config: {
      duration: 250
    }
  });

  const springStyles = React.useMemo(
    () => ({ ...borderGradientElementStyles, ...sizeMorphElementStyles }),
    [borderGradientElementStyles, sizeMorphElementStyles]
  );

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

  const onDragEnter = React.useCallback(
    (event: DragEvent) => {
      if (event.relatedTarget === null) {
        setDragOvers(dragOvers + 1);
      }
    },
    [dragOvers, setDragOvers]
  );

  const onDragLeave = React.useCallback(
    (event: DragEvent) => {
      if (event.relatedTarget === null) {
        setDragOvers(dragOvers - 1);
      }
    },
    [dragOvers, setDragOvers]
  );

  React.useEffect(() => {
    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);

    return () => {
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
    };
  }, [onDragEnter, onDragLeave]);

  return (
    <AnimatedFileDropZonePaperAnimationBorder
      onDragOver={onDragOver}
      onDrop={onFileDrop}
      style={springStyles}
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
