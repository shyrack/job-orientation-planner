import { Worksheet } from "../excel/Worksheet";

export class ExcelFileImportProcessState {
  public excelFiles: Array<File>;
  public worksheets: Array<Worksheet>;
  public reviewedWorksheets: boolean;

  constructor() {
    this.excelFiles = [];
    this.worksheets = [];
    this.reviewedWorksheets = false;
  }
}
