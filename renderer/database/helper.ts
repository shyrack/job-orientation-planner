import _ from "lodash";
import { Worksheet } from "../model/excel/Worksheet";

export namespace Database {
  export const Table = window.electron.DatabaseTables;

  export function importWorksheet(worksheet: Worksheet) {
    const columns = worksheet.getColumns();
    const rows = worksheet.getRows();

    _.forEach(rows, (row) => {});
  }
}
