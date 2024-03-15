// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentAppointmentIdColumnDefinition: ColumnDefinition<"studentAppointment_id"> = {
  field: "studentAppointment_id",
  headerName: "ID",
  width: 90
};

export const StudentAppointmentStudentIdColumnDefinition: ColumnDefinition<"student_id"> = {
  field: "student_id",
  headerName: "Student",
  width: 150
};

export const StudentAppointmentTimeslotIdColumnDefinition: ColumnDefinition<"timeslot_id"> = {
  field: "timeslot_id",
  headerName: "Timeslot",
  width: 300
};

export type StudentAppointmentRowDefinition = RowDefinition<
  [
    typeof StudentAppointmentIdColumnDefinition,
    typeof StudentAppointmentStudentIdColumnDefinition,
    typeof StudentAppointmentTimeslotIdColumnDefinition
  ]
>;

export const StudentAppointmentColumns: ColumnDefinitions<string> = [
  StudentAppointmentIdColumnDefinition,
  StudentAppointmentStudentIdColumnDefinition,
  StudentAppointmentTimeslotIdColumnDefinition
];
