import z from "zod";
import { Database } from "../../../database/helper";
import { Column, eventImportRowSchema } from "../Worksheet";
import { ImportRow, ImportStrategy } from "./ImportStrategy";

export class CompanyImportStrategy extends ImportStrategy {
  protected readonly parsedRow: z.infer<typeof eventImportRowSchema>;

  constructor(row: ImportRow) {
    super(row);

    this.parsedRow = eventImportRowSchema.parse(row);
  }

  async import() {
    const {
      [Column.EARLIEST_TIME]: earliestTime,
      [Column.COMPANY_ID]: id,
      [Column.COMPANY]: name,
      [Column.COMPANY_OCCUPATION]: occupation,
    } = this.parsedRow;

    await super.createDatabaseTableRow(Database.Table.COMPANY, {
      company_id: id,
      name,
      job_occupation: occupation,
      timeslot_start: earliestTime,
    });
  }

  resolveDependencies() {
    return true;
  }

  verify() {
    return true;
  }
}
