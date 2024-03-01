import ProcessContainer from "../../../components/process/ProcessContainer";
import PageProvider from "../../../components/provider/PageProvider";
import { FileSelectProcessStepDefinition } from "../../../model/process/definition/step/excel/FileSelectProcessStepDefinition";

type ExcelFileImportProcessProps = {};

export default function ExcelFileImportProcess(props: ExcelFileImportProcessProps) {
  return (
    <PageProvider>
      <ProcessContainer steps={[new FileSelectProcessStepDefinition()]} />
    </PageProvider>
  );
}
