import ProcessContainer from "../../../components/process/ProcessContainer";
import PageProvider from "../../../components/provider/PageProvider";
import { FileSelectProcessStepDefinition } from "../../../model/process/definition/step/excel/FileSelectProcessStepDefinition";
import { WorksheetSelectProcessStepDefinition } from "../../../model/process/definition/step/excel/WorksheetSelectProcessStepDefinition";

type ExcelFileImportProcessProps = {};

export default function ExcelFileImportProcess(props: ExcelFileImportProcessProps) {
  return (
    <PageProvider>
      <ProcessContainer steps={[new FileSelectProcessStepDefinition(), new WorksheetSelectProcessStepDefinition()]} />
    </PageProvider>
  );
}