import Panel from "../components/process/Panel";
import PageProvider from "../components/provider/PageProvider";
import Typography from "../components/text/Typography";
import { TestProcessDefinition } from "../model/process/definition/TestProcessDefinition";

const testProcessDef = new TestProcessDefinition();

type IndexPageProps = {};

export default function IndexPage(props: IndexPageProps) {
  return (
    <PageProvider>
      <Typography variant="h5" sx={(theme) => ({ margin: theme.spacing(2) })}>
        Processes:
      </Typography>
      <Panel processDefinition={testProcessDef}></Panel>
    </PageProvider>
  );
}
