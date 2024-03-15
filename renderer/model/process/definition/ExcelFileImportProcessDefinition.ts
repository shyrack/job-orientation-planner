import _ from "lodash";
import { AppState } from "../../state/AppState";
import { ProcessDefinition } from "./ProcessDefinition";

export class ExcelFileImportProcessDefinition extends ProcessDefinition {
  constructor() {
    super("Excel File Import", "/process/excel/import");
  }

  execute() {}

  onProcessFinished() {
    const excelProcessState = AppState.instance?.excelFileImportProcessState;
    const worksheets = excelProcessState?.worksheets;

    if (_.isArray(worksheets)) {
      _.forEach(worksheets, (worksheet) => {
        worksheet.importInDatabase();
      });
    }
  }
}
