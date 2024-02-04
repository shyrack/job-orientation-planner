import { Card, styled } from "@mui/material";
import React from "react";
import { ProcessDefinition } from "../../model/process/definition/ProcessDefinition";

const ProcessPanelCard = styled(Card)(({ theme }) => ({
  display: "flex",
  height: "150px",
  width: "150px"
}));

type PanelProps = {
  processDefinition: ProcessDefinition;
};

export default function Panel(props: PanelProps) {
  const { processDefinition } = props;

  const name = React.useMemo(() => processDefinition.getName(), [processDefinition.getName]);

  return <ProcessPanelCard>{name}</ProcessPanelCard>;
}
