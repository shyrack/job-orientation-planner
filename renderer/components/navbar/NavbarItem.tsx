import React from "react";
import Button from "@mui/material/Button";

type Props = {
  name: string;
  pageId: string;
  onItemClick: (pageId: string) => void;
};

export default function NavbarItem({ name, pageId, onItemClick }: Props) {
  const handleClick = () => {
    onItemClick(pageId);
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      {name}
    </Button>
  );
}
