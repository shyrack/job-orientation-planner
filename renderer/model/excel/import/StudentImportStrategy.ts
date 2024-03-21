import { Database } from "../../../database/helper";
import { Column } from "../Worksheet";
import { ClassBasedImportStrategy } from "./helper/ClassBasedImportStrategy";

export class StudentImportStrategy extends ClassBasedImportStrategy {
  async import() {
    const { Name: name, Vorname: firstName } = this.parsedRow;
    const classId = await super.retrieveClassId();

    await super.createDatabaseTableRow(Database.Table.STUDENT, {
      class_id: classId,
      firstname: firstName,
      lastname: name
    });
  }

  resolveDependencies() {
    return true;
  }

  verify() {
    return Boolean(this.row[Column.CLASS]) && Boolean(this.row[Column.FIRST_NAME]) && Boolean(this.row[Column.NAME]);
  }
}
