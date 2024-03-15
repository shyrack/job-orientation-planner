import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";
import { TestProcessDefinition } from "../../model/process/definition/TestProcessDefinition";
import { ViewTestProcessStepDefinition } from "../../model/process/definition/step/ViewTestProcessStepDefinition";

type TestProps = {};

export default function TestViewProcess(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer
        definition={new TestProcessDefinition()}
        steps={[
          new ViewTestProcessStepDefinition("student", "Schüler"),
          new ViewTestProcessStepDefinition("company", "Unternehmen"),
          new ViewTestProcessStepDefinition("room", "Räume")
        ]}
      />
    </PageProvider>
  );
}
