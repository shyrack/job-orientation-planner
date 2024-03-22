import Button from "@mui/material/Button";
import React from "react";
import { useTheme } from "@mui/material";

type NavbarItemProps = {
  name: string;
  pageId: string;
  onItemClick: (pageId: string) => void;
};

export default function NavbarItem(props: NavbarItemProps) {
  const { name, onItemClick, pageId } = props;
  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "primary" : "secondary";

  const handleClick = React.useCallback(() => {
    onItemClick(pageId);
  }, [onItemClick, pageId]);

  return (
    <Button color={color} onClick={handleClick}>
      {name}
    </Button>
  );
}
