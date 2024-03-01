import { Home as HomeIcon } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "@mui/styled-engine";
import Box from "@mui/system/Box";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  const navItems = ["Prozesse", "Tabellen", "Credits"];

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    position: "relative",
    height: "64px",
    width: "100%",
    flexShrink: 1
  }));

  const onClick = () => {
    window.location.href = "/";
  };

  return (
    <StyledBox>
      <AppBar component="nav">
        <Toolbar>
          <IconButton onClick={onClick}>
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "5px" }}
          >
            JOP
          </Typography>
          {navItems.map((name, index) => (
            <NavbarItem
              key={`NavBar-Item-${index}`}
              name={name}
              pageId="blubber"
            />
          ))}
        </Toolbar>
      </AppBar>
    </StyledBox>
  );
}
