import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";
import { TestProcessStepDefinition } from "../../model/process/definition/step/TestProcessStepDefinition";
import View from "../../components/view/View";

type TestProps = {};

export default function Test(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer
        steps={[
          new TestProcessStepDefinition("First test process step."),
          new TestProcessStepDefinition("Second test process step."),
          new TestProcessStepDefinition("Third test process step.")
        ]}
      >
        <View viewName="student" />
      </ProcessContainer>
    </PageProvider>
  );
}
