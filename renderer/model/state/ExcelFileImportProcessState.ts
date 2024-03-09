import { Worksheet } from "../excel/Worksheet";

export class ExcelFileImportProcessState {
  public excelFiles: Array<File>;
  public worksheets: Array<Worksheet>;

  constructor() {
    this.excelFiles = [];
    this.worksheets = [];
  }
}
