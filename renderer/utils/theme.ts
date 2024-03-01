import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    text: {
      primary: "#fff",
      secondary: "#999",
      disabled: "#777"
    },
    secondary: {
      main: "#0ff",
      light: "#0f0",
      dark: "#0ff"
    },
    mode: "dark"
  },
  shape: {
    borderRadius: 20
  }
});
