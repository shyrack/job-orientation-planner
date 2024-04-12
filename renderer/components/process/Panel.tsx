import { TableRows as TableRowsIcon } from "@mui/icons-material";
import { Card, lighten, styled, useTheme } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { ProcessDefinition } from "../../model/process/definition/ProcessDefinition";
import Typography from "../text/Typography";

const ProcessPanelCard = styled(Card)(({ theme }) => ({
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  height: "175px",
  justifyContent: "center",
  width: "175px",
  "&:hover": {
    cursor: "pointer"
  }
}));

const AnimatedProcessPanelCard = animated(ProcessPanelCard);

type PanelProps = {
  processDefinition: ProcessDefinition;
};

export default function Panel(props: PanelProps) {
  const { processDefinition } = props;

  const [isPointerOver, setIsPointerOver] = React.useState(false);

  const theme = useTheme();
  const panelAnimationStyle = useSpring({
    backgroundColor: isPointerOver ? lighten(theme.palette.background.paper, 0.1) : theme.palette.background.paper,
    config: {
      friction: 50,
      mass: 5,
      tension: 1000
    },
    scale: isPointerOver ? 1.075 : 1.0
  });

  const name = React.useMemo(() => processDefinition.getName(), [processDefinition]);
  const url = React.useMemo(() => processDefinition.getUrl(), [processDefinition]);

  const onPointerEnter = React.useCallback(() => {
    setIsPointerOver(true);
  }, [setIsPointerOver]);

  const onPointerLeave = React.useCallback(() => {
    setIsPointerOver(false);
  }, [setIsPointerOver]);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (processDefinition.getIsRouter()) {
        window.location.href = url;
      }
      processDefinition.execute();
    },
    [processDefinition]
  );

  return (
    <AnimatedProcessPanelCard
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={panelAnimationStyle}
    >
      <TableRowsIcon sx={{ fontSize: "75px" }} />
      <Typography justifyContent="center" variant="h6">
        {name}
      </Typography>
    </AnimatedProcessPanelCard>
  );
}
