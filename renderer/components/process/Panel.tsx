import React from "react";
import { ProcessDefinition } from "../../model/process/definition/ProcessDefinition";
import { Card } from "@mui/material";

type PanelProps = {
  processDefinition: ProcessDefinition;
};

export default function Panel(props: PanelProps) {
  return <Card></Card>;
}
