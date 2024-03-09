import Button from "@mui/material/Button";
import React from "react";

type NavbarItemProps = {
  name: string;
  pageId: string;
  onItemClick: (pageId: string) => void;
};

export default function NavbarItem(props: NavbarItemProps) {
  const { name, onItemClick, pageId } = props;

  const handleClick = React.useCallback(() => {
    onItemClick(pageId);
  }, [onItemClick, pageId]);

  return (
    <Button color={"primary"} onClick={handleClick}>
      {name}
    </Button>
  );
}
