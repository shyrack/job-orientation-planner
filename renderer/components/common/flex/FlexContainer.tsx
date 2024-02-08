import { styled } from "@mui/material";

export default styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  flexShrink: 0,
  flexWrap: "wrap",
  gap: theme.spacing(2),
  padding: theme.spacing(2)
}));
