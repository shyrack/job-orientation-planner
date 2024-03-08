import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const AttendanceIdColDef = createColumnDefinition(
  "id",
  "Teilnahme-ID",
  150,
  true
);

export const AttendanceTimeslotRoomColDef = createColumnDefinition(
  "timeslot-room",
  "Raum",
  90
);

export const AttendanceTimeslotTimeColDef = createColumnDefinition(
  "timeslot-start",
  "Startzeit",
  90
);

export const AttendanceStudentSurnameColDef = createColumnDefinition(
  "student-surname",
  "Nachname",
  150
);

export const AttendanceStudentFirstNameColDef = createColumnDefinition(
  "student-first-name",
  "Vorname",
  150
);

export const AttendanceStudentClassColDef = createColumnDefinition(
  "student-class",
  "Klasse",
  90
);

export const AttendanceColumns: ColumnDefinitions<string> = [
  AttendanceIdColDef,
  AttendanceTimeslotRoomColDef,
  AttendanceTimeslotTimeColDef,
  AttendanceStudentSurnameColDef,
  AttendanceStudentFirstNameColDef,
  AttendanceStudentClassColDef
];

export type AttendanceRowDefinition = RowDefinition<
  [
    typeof AttendanceIdColDef,
    typeof AttendanceTimeslotRoomColDef,
    typeof AttendanceTimeslotTimeColDef,
    typeof AttendanceStudentSurnameColDef,
    typeof AttendanceStudentFirstNameColDef,
    typeof AttendanceStudentClassColDef
  ]
>;
