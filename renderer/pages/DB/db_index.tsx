import FlexContainer from "../../components/common/flex/FlexContainer";
import Panel from "../../components/process/Panel";
import PageProvider from "../../components/provider/PageProvider";
import Typography from "../../components/text/Typography";
import { CreateDBDefinition } from "../../model/process/definition/DB/CreateDBDefinition";
import { SelectDBDefinition } from "../../model/process/definition/DB/SelectDBDefinition";

const createDB = new CreateDBDefinition();
const selectDB = new SelectDBDefinition();

type IndexPageProps = {};

export default function DbIndexPage(props: IndexPageProps) {
  return (
    <PageProvider>
      <Typography variant="h5" sx={(theme) => ({ margin: theme.spacing(2) })}>
        Database Action:
      </Typography>
      <FlexContainer>
      <Panel processDefinition={createDB} />
      <Panel processDefinition={selectDB} />
      </FlexContainer>
    </PageProvider>
  );
}
