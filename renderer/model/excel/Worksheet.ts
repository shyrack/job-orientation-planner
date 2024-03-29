import { DataGridProps } from "@mui/x-data-grid";
import _ from "lodash";
import z from "zod";
import { Database } from "../../database/helper";
import { UnionObjectValues } from "../../utils/types";
import { ClassImportStrategy } from "./import/ClassImportStrategy";
import { CompanyImportStrategy } from "./import/CompanyImportStrategy";
import { ImportStrategy } from "./import/ImportStrategy";
import { RoomImportStrategy } from "./import/RoomImportStrategy";
import { StudentImportStrategy } from "./import/StudentImportStrategy";
import { StudentPreferenceImportStrategy } from "./import/StudentPreferenceImportStrategy";

export enum Column {
  CAPACITY = "Kapazität",
  CHOICE_1 = "Wahl 1",
  CHOICE_2 = "Wahl 2",
  CHOICE_3 = "Wahl 3",
  CHOICE_4 = "Wahl 4",
  CHOICE_5 = "Wahl 5",
  CHOICE_6 = "Wahl 6",
  CLASS = "Klasse",
  COMPANY = "Unternehmen",
  COMPANY_ID = "Nr.",
  COMPANY_OCCUPATION = "Fachrichtung",
  EARLIEST_TIME = "Frühster Zeitpunkt",
  FIRST_NAME = "Vorname",
  MAX_EVENTS = "Max. Veranstaltungen",
  MAX_PARTICIPANTS = "Max. Teilnehmer",
  NAME = "Name",
  ROOM = "Raum"
}

export const choiceImportRowSchema = z.object({
  [Column.CLASS]: z.string(),
  [Column.NAME]: z.string(),
  [Column.FIRST_NAME]: z.string(),
  [Column.CHOICE_1]: z.number().int().optional(),
  [Column.CHOICE_2]: z.number().int().optional(),
  [Column.CHOICE_3]: z.number().int().optional(),
  [Column.CHOICE_4]: z.number().int().optional(),
  [Column.CHOICE_5]: z.number().int().optional(),
  [Column.CHOICE_6]: z.number().int().optional()
});

export const eventImportRowSchema = z.object({
  [Column.COMPANY_ID]: z.number().int(),
  [Column.COMPANY]: z.string(),
  [Column.COMPANY_OCCUPATION]: z.string().optional(),
  [Column.MAX_PARTICIPANTS]: z.number().int(),
  [Column.MAX_EVENTS]: z.number().int(),
  [Column.EARLIEST_TIME]: z.string()
});

export const roomImportRowSchema = z.object({
  [Column.ROOM]: z.string(),
  [Column.CAPACITY]: z.number().int()
});

export class WorksheetDatabaseColumn {
  constructor(
    private databaseTable: UnionObjectValues<typeof Database.Table>,
    private databaseTableColumn: string,
    private worksheetColumn: Column
  ) {}

  getDatabaseTable() {
    return this.databaseTable;
  }

  getDatabaseTableColumn() {
    return this.databaseTableColumn;
  }

  getWorksheetColumn() {
    return this.worksheetColumn;
  }
}

export const worksheetDatabaseColumns: Array<WorksheetDatabaseColumn> = [
  new WorksheetDatabaseColumn(Database.Table.ROOM, "student_capacity", Column.CAPACITY),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_1),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_2),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_3),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_4),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_5),
  new WorksheetDatabaseColumn(Database.Table.STUDENT_PREFERENCE, "company_id", Column.CHOICE_6),
  new WorksheetDatabaseColumn(Database.Table.CLASS, "name", Column.CLASS),
  new WorksheetDatabaseColumn(Database.Table.COMPANY, "name", Column.COMPANY),
  new WorksheetDatabaseColumn(Database.Table.COMPANY, "company_id", Column.COMPANY_ID),
  new WorksheetDatabaseColumn(Database.Table.COMPANY, "job_occupation", Column.COMPANY_OCCUPATION),
  new WorksheetDatabaseColumn(Database.Table.STUDENT, "firstname", Column.FIRST_NAME),
  new WorksheetDatabaseColumn(Database.Table.STUDENT, "lastname", Column.NAME),
  new WorksheetDatabaseColumn(Database.Table.ROOM, "name", Column.ROOM)
];

export class Worksheet {
  constructor(private filename: string, private name: string, private data: Array<string>) {}

  private executeImportStrategies(importStrategies: Array<ImportStrategy>) {
    const verifiedImportStrategyIndex = _.findIndex(importStrategies, (importStrategy) => importStrategy.verify());

    if (verifiedImportStrategyIndex !== -1) {
      const importStrategy = _.find(
        importStrategies,
        (_importStrategy, index) => index === verifiedImportStrategyIndex
      );
      const notResolvedImportStrategies = _.reject(
        importStrategies,
        (_importStrategy, index) => index === verifiedImportStrategyIndex
      );

      if (importStrategy?.resolveDependencies()) {
        importStrategy?.import();
      } else {
        throw new Error(`Dependencies for import strategy ${importStrategy?.constructor.name} could not be resolved.`);
      }

      if (_.size(notResolvedImportStrategies) > 0) {
        this.executeImportStrategies(_.clone(notResolvedImportStrategies));
      }
    }
  }

  importInDatabase() {
    _.forEach(this.data, (row) => {
      const parsedRow = Worksheet.parseRow(row);
      const strategies = [
        new ClassImportStrategy(parsedRow),
        new CompanyImportStrategy(parsedRow),
        new RoomImportStrategy(parsedRow),
        new StudentImportStrategy(parsedRow),
        new StudentPreferenceImportStrategy(parsedRow)
      ];

      this.executeImportStrategies(strategies);
    });
  }

  getFilename() {
    return this.filename;
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
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

  getDatabaseTables() {
    const databaseTables: Array<UnionObjectValues<typeof Database.Table>> = [];
    const columns = _.map(this.getColumns(), (column) => column.field);

    _.forEach(worksheetDatabaseColumns, (worksheetDatabaseColumn) => {
      if (_.includes(columns, worksheetDatabaseColumn.getWorksheetColumn())) {
        databaseTables.push(worksheetDatabaseColumn.getDatabaseTable());
      }
    });

    return databaseTables;
  }

  private static parseRow(row: any): Record<string, any> {
    if (typeof row === "string") {
      return JSON.parse(row);
    } else {
      return Object(row);
    }
  }
}
