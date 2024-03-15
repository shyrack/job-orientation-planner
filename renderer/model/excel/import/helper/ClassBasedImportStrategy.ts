import _ from "lodash";
import z from "zod";
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
    const regex = /^[A-Za-z]{2,3}\d{2}\d+$/;
    const match = className.match(regex);

    if (_.isArray(match) && _.size(match) > 2) {
      return parseInt("20" + match[1]);
    } else {
      throw new Error(`Could not resolve class name: ${className}.`);
    }
  }

  protected async retrieveClassId() {
    const entryYear = this.calculateEntryYear();
    const className = this.parsedRow[Column.CLASS];

    const classTable = await this.electron.selectTableNew("Class");
    const classIndex = _.findIndex(
      classTable.data,
      (classRow) => classRow["entry_year"] === entryYear && classRow["name"] === className
    );
    return classTable.data[classIndex]["class_id"];
  }
}
