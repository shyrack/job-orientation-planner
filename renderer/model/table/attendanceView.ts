import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const AttendanceIdColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "Teilnahme-ID"
};

export const AttendanceTimeslotRoomColDef: ColumnDefinition<"timeslot-room"> = {
  field: "timeslot-room",
  headerName: "Raum",
  width: 90
};

export const AttendanceTimeslotTimeColDef: ColumnDefinition<"timeslot-start"> =
  {
    field: "timeslot-start",
    headerName: "Startzeit",
    width: 90
  };

export const AttendanceStudentSurnameColDef: ColumnDefinition<"student-surname"> =
  {
    field: "student-surname",
    headerName: "Nachname",
    width: 150
  };

export const AttendanceStudentFirstNameColDef: ColumnDefinition<"student-first-name"> =
  {
    field: "student-first-name",
    headerName: "Vorname",
    width: 150
  };

export const AttendanceStudentClassColDef: ColumnDefinition<"student-class"> = {
  field: "student-class",
  headerName: "Klasse",
  width: 90
};

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
