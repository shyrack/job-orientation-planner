import { Database } from "../../../database/helper";
import { Column } from "../Worksheet";
import { ClassBasedImportStrategy } from "./helper/ClassBasedImportStrategy";

export class ClassImportStrategy extends ClassBasedImportStrategy {
  async import() {
    const { Klasse: studentClass } = this.parsedRow;
    const entryYear = super.calculateEntryYear();

    await super.createDatabaseTableRow(Database.Table.CLASS, {
      entry_year: entryYear,
      name: studentClass
    });
  }

  resolveDependencies() {
    return true;
  }

  verify() {
    return Boolean(this.row[Column.CLASS]);
  }
}
