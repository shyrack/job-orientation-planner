import { Paper, PaperProps } from "@mui/material";
import React from "react";
import _ from "lodash";

type FileDropzoneProps = {
  rootPaperProps: PaperProps;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const { rootPaperProps } = props;

  const onFileDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedItems = event.dataTransfer.items;
    const droppedItemsCount = _.size(droppedItems);
  }, []);

  return <Paper {...rootPaperProps} onDrop={onFileDrop}></Paper>;
}
