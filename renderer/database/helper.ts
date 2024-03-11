import _ from "lodash";
import { Worksheet } from "../model/excel/Worksheet";

export namespace Database {
  export enum Table {
    CLASS = "Class",
    COMPANY = "Company",
    EVENT = "Event",
    ROOM = "Room",
    SCHEDULER = "Scheduler",
    STUDENT = "Student",
    STUDENT_APPOINTMENT = "StudentAppointment",
    STUDENT_PREFERENCE = "StudentPreference",
    TIME_SLOT = "Timeslot"
  }

  export function importWorksheet(worksheet: Worksheet) {
    const columns = worksheet.getColumns();
    const rows = worksheet.getRows();

    _.forEach(rows, (row) => {});
  }
}
