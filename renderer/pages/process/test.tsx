import ProcessContainer from "../../components/process/ProcessContainer";
import PageProvider from "../../components/provider/PageProvider";
import Typography from "../../components/text/Typography";

type TestProps = {};

export default function Test(props: TestProps) {
  return (
    <PageProvider>
      <ProcessContainer></ProcessContainer>
    </PageProvider>
  );
}
