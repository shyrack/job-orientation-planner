import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";

type TestProps = {};

export default function Test(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer steps={[]}></ProcessContainer>
    </PageProvider>
  );
}
