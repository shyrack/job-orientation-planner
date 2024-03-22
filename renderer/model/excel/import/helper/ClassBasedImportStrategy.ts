import _ from "lodash";
import z from "zod";
import { Database } from "../../../../database/helper";
import { Column, choiceImportRowSchema } from "../../Worksheet";
import { ImportRow, ImportStrategy } from "../ImportStrategy";

export abstract class ClassBasedImportStrategy extends ImportStrategy {
  protected readonly parsedRow: z.infer<typeof choiceImportRowSchema>;

  constructor(row: ImportRow) {
    super(row);

    this.parsedRow = choiceImportRowSchema.parse(row);
  }

  protected calculateEntryYear() {
    const className = this.parsedRow[Column.CLASS];
    const regex = new RegExp("(\\d{2})", "gmi");
    const matches = regex.exec(className);

    if (matches && !_.isEmpty(matches)) {
      return parseInt("20" + matches[0]);
    } else {
      throw new Error(`Could not resolve class name: ${className}.`);
    }
  }

  protected async retrieveClassId() {
    const entryYear = this.calculateEntryYear();
    const className = this.parsedRow[Column.CLASS];
    const classTable = await this.electron.selectTableNew(Database.Table.CLASS);
    const classIndex = _.findIndex(
      classTable.rows as Array<any>,
      (classRow) => classRow["entry_year"] === entryYear && classRow["name"] === className.toUpperCase()
    );

    return (classTable.rows[classIndex] as any)["class_id"];
  }
}
