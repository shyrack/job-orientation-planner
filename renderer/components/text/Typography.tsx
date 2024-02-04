import { Typography as MuiTypography, TypographyProps as MuiTypographyProps, styled } from "@mui/material";

const FlexTypography = styled(MuiTypography)(({ theme }) => ({
  display: "flex",
  flexGrow: 0,
  flexShrink: 1,
  height: "fit-content",
  width: "100%"
}));

export default function Typography(props: MuiTypographyProps) {
  return <FlexTypography {...props} />;
}
