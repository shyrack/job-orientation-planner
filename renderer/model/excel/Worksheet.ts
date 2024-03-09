import { DataGridProps } from "@mui/x-data-grid";
import _ from "lodash";

export class Worksheet {
  constructor(private filename: string, private name: string, private data: Array<string>) {}

  getFilename() {
    return this.filename;
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }

  private static parseRow(row: any): Record<string, any> {
    if (typeof row === "string") {
      return JSON.parse(row);
    } else {
      return Object(row);
    }
  }

  getColumns(): DataGridProps["columns"] {
    const columns: Array<string> = [];

    _.forEach(this.data, (row) => {
      const parsedRow = Worksheet.parseRow(row);
      const rowKeys = _.keys(parsedRow);

      _.forEach(rowKeys, (rowKey) => {
        if (!_.startsWith(rowKey, "_") && !_.includes(columns, rowKey)) {
          columns.push(rowKey);
        }
      });
    });

    return _.map(columns, (column) => ({ field: column }));
  }

  getRows() {
    return _.map(this.data, (row, index) => {
      const parsedRow = Worksheet.parseRow(row);

      if (!parsedRow["id"]) {
        return { ...parsedRow, id: `parsed-excel-row-${index}` };
      } else {
        return parsedRow;
      }
    });
  }
}
