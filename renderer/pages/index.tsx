import FlexContainer from "../components/common/flex/FlexContainer";
import Panel from "../components/process/Panel";
import PageProvider from "../components/provider/PageProvider";
import Typography from "../components/text/Typography";
import { ExcelFileImportProcessDefinition } from "../model/process/definition/ExcelFileImportProcessDefinition";
import { TestProcessDefinition } from "../model/process/definition/TestProcessDefinition";
import { ViewTestProcessDefinition } from "../model/process/definition/ViewTestProcessDefinition";

const testProcessDef = new TestProcessDefinition();
const viewTestProcessDef = new ViewTestProcessDefinition();
const excelImportProcessDef = new ExcelFileImportProcessDefinition();

type IndexPageProps = {};

export default function IndexPage(props: IndexPageProps) {
  return (
    <PageProvider>
      <Typography variant="h5" sx={(theme) => ({ margin: theme.spacing(2) })}>
        Processes:
      </Typography>
<FlexContainer>
        <Panel processDefinition={testProcessDef} />
        <Panel processDefinition={viewTestProcessDef} />
        <Panel processDefinition={excelImportProcessDef} />
</FlexContainer>
    </PageProvider>
  );
}
