import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";
import { ViewTestProcessStepDefinition } from "../../model/process/definition/step/ViewTestProcessStepDefinition";

type TestProps = {};

export default function TestViewProcess(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer
        steps={[
          new ViewTestProcessStepDefinition("student", "Schüler"),
          new ViewTestProcessStepDefinition("company", "Unternehmen"),
          new ViewTestProcessStepDefinition("room", "Räume")
        ]}
      />
    </PageProvider>
  );
}
