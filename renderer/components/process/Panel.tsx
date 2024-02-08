import { TableRows as TableRowsIcon } from "@mui/icons-material";
import { Card, lighten, styled } from "@mui/material";
import React from "react";
import { ProcessDefinition } from "../../model/process/definition/ProcessDefinition";
import Typography from "../text/Typography";

const ProcessPanelCard = styled(Card)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  height: "175px",
  justifyContent: "center",
  width: "175px",
  "&:hover": {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
    cursor: "pointer"
  }
}));

type PanelProps = {
  processDefinition: ProcessDefinition;
};

export default function Panel(props: PanelProps) {
  const { processDefinition } = props;

  const name = React.useMemo(() => processDefinition.getName(), [processDefinition]);
  const url = React.useMemo(() => processDefinition.getUrl(), [processDefinition]);

  const onClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    window.location.href = url;
  }, []);

  return (
    <ProcessPanelCard onClick={onClick}>
      <TableRowsIcon sx={{ fontSize: "75px" }} />
      <Typography justifyContent="center" variant="h6">
        {name}
      </Typography>
    </ProcessPanelCard>
  );
}
