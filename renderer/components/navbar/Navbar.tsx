import { Home as HomeIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, styled } from "@mui/material";
import React from "react";
import FlexContainer from "../common/flex/FlexContainer";
import Typography from "../text/Typography";
import NavbarItem from "./NavbarItem";

const navItems = [
  { name: "Prozesse", pageId: "/" },
  { name: "Tabellen", pageId: "/Table/tables" },
  { name: "TestPrint", pageId: "/Table/viewPrint" },
  { name: "Database Setup", pageId: "/DB/db_index" },
  { name: "Credits", pageId: "/" }
];

const StyledBox = styled(Box)({
  display: "flex",
  flex: "0 0 fit-content",
  width: "100%"
});

const StyledAppBar = styled(AppBar)({
  position: "inherit"
});

const NavigationItems = styled(FlexContainer)(({ theme }) => ({
  flexWrap: "nowrap",
  gap: theme.spacing(1)
}));

export default function Navbar() {
  const onClick = React.useCallback(() => {
    window.location.href = "/";
  }, []);

  const onItemClick = React.useCallback((location: string) => {
    window.location.href = location;
  }, []);

  return (
    <StyledBox>
      <StyledAppBar>
        <Toolbar>
          <IconButton onClick={onClick}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ display: { xs: "none", sm: "block" }, marginRight: "5px" }}>
            Job Orientation Booster
          </Typography>
          <NavigationItems>
            {navItems.map((item, index) => (
              <NavbarItem
                key={`NavBar-Item-${index}`}
                name={item.name}
                onItemClick={onItemClick}
                pageId={item.pageId}
              />
            ))}
          </NavigationItems>
        </Toolbar>
      </StyledAppBar>
    </StyledBox>
  );
}
