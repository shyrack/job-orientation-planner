import { ThemeProvider, styled } from "@mui/material";
import React from "react";
import theme from "../../utils/theme";
import Navbar from "../navbar/Navbar";

const PageBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  overflow: "hidden"
}));

type PageProviderProps = {
  children?: React.ReactNode;
};

export default function PageProvider(props: PageProviderProps) {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <PageBackground>
        <Navbar />
        {children}
      </PageBackground>
    </ThemeProvider>
  );
}
2;
