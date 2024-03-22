import z from "zod";
import { Database } from "../../../database/helper";
import { Column, roomImportRowSchema } from "../Worksheet";
import { ImportRow, ImportStrategy } from "./ImportStrategy";

export class RoomImportStrategy extends ImportStrategy {
  protected readonly parsedRow: z.infer<typeof roomImportRowSchema>;

  constructor(row: ImportRow) {
    super(row);

    this.parsedRow = roomImportRowSchema.parse(row);
  }

  async import() {
    const { [Column.ROOM]: name, [Column.CAPACITY]: student_capacity } = this.parsedRow;

    await super.createDatabaseTableRow(Database.Table.ROOM, {
      name,
      student_capacity
    });
  }

  resolveDependencies() {
    return true;
  }

  verify() {
    return true;
  }
}
