import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";
import { TestProcessDefinition } from "../../model/process/definition/TestProcessDefinition";
import { TestProcessStepDefinition } from "../../model/process/definition/step/TestProcessStepDefinition";

type TestProps = {};

export default function Test(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer
        definition={new TestProcessDefinition()}
        steps={[
          new TestProcessStepDefinition("First test process step."),
          new TestProcessStepDefinition("Second test process step."),
          new TestProcessStepDefinition("Third test process step.")
        ]}
      />
    </PageProvider>
  );
}
