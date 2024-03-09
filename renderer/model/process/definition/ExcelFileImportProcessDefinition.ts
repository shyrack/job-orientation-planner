import { ProcessDefinition } from "./ProcessDefinition";

export class ExcelFileImportProcessDefinition extends ProcessDefinition {
  constructor() {
    super("Excel File Import", "/process/excel/import");
  }

  public execute() {}
}
