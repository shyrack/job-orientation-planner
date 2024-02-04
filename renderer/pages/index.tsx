import { Typography } from "@mui/material";
import PageProvider from "../components/PageProvider";

type IndexPageProps = {};

export default function IndexPage(props: IndexPageProps) {
  return (
    <PageProvider>
      <Typography color="textPrimary" variant="h5">
        Processes:
      </Typography>
    </PageProvider>
  );
}
