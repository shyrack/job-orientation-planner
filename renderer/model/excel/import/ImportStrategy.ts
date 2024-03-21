import { Database } from "../../../database/helper";
import { UnionObjectValues } from "../../../utils/types";

export type ImportRow = Record<string, any>;

export abstract class ImportStrategy {
  protected readonly electron: typeof window.electron;
  protected readonly row: ImportRow;

  constructor(row: ImportRow) {
    this.electron = window.electron;
    this.row = row;
  }

  protected async createDatabaseTableRow(table: UnionObjectValues<typeof Database.Table>, row: Record<string, any>) {
    const { successfully, error } = await this.electron.createRowAsync(table, row);

    if (!successfully) {
      throw new Error(Boolean(error) ? error : `Error while creating row for table: ${table}.`);
    }
  }

  protected async createDatabaseTableRows(
    table: UnionObjectValues<typeof Database.Table>,
    rows: Array<Record<string, any>>
  ) {
    const { successfully, error } = await this.electron.createTableRows(table, rows);

    if (!successfully) {
      if (error) throw error;
      else throw new Error(`Error while creating row for table: ${table}.`);
    }
  }

  abstract import(): void;
  abstract resolveDependencies(): boolean;
  abstract verify(): boolean;
}
