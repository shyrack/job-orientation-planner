import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material";

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


const theme = createTheme({
  palette: {
    text: {
      primary: prefersDarkMode ? "#fff" : "#000",
      secondary: "#999",
      disabled: "#777"
    },
    secondary: {
      light: "#8958c6",
      main: "#743eb6",
      dark: "#613498"
    },
    mode: prefersDarkMode ? "dark" : "light"
  },
  shape: {
    borderRadius: 20
  }
});

export default theme;
