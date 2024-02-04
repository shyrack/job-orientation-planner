import { ThemeProvider, styled } from "@mui/material";
import React from "react";
import Theme from "../../utils/theme";

const PageBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100vh",
  width: "100vw"
}));

type PageProviderProps = {
  children?: React.ReactNode;
};

export default function PageProvider(props: PageProviderProps) {
  const { children } = props;

  return (
    <ThemeProvider theme={Theme}>
      <PageBackground>{children}</PageBackground>
    </ThemeProvider>
  );
}
