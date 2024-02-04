import { Typography } from "@mui/material";
import PageProvider from "../components/provider/PageProvider";
import { ImportExcelProcessDefinition } from "../model/process/definition/ImportExcelProcessDefinition";
import Panel from "../components/process/Panel";

const testProcessDef = new ImportExcelProcessDefinition("Import excel file");

type IndexPageProps = {};

export default function IndexPage(props: IndexPageProps) {
  return (
    <PageProvider>
      <Typography color="textPrimary" variant="h5">
        Processes:
      </Typography>
      <Panel processDefinition={testProcessDef}></Panel>
    </PageProvider>
  );
}
