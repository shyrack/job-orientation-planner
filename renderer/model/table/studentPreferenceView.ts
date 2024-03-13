// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentPreferenceIdViewColumnDefinition: ColumnDefinition<"studentPreference_id"> = {
  field: "studentPreference_id",
  headerName: "ID",
  width: 90
};

export const StudentPreferenceStudentIdColumnDefinition: ColumnDefinition<"student_id"> = {
  field: "student_id",
  headerName: "Student",
  width: 150
};

export const StudentPreferenceCompanyIdViewColumnDefinition: ColumnDefinition<"company_id"> = {
  field: "company_id",
  headerName: "Company",
  width: 150
};

export const StudentPreferenceEventIdViewColumnDefinition: ColumnDefinition<"event_id"> = {
  field: "event_id",
  headerName: "Event",
  width: 150
};

export const StudentPreferencePriorityViewColumnDefinition: ColumnDefinition<"priority"> = {
  field: "priority",
  headerName: "Priorität",
  width: 150
};

export const StudentPreferenceColumns: ColumnDefinitions<string> = [
  StudentPreferenceIdViewColumnDefinition,
  StudentPreferenceStudentIdColumnDefinition,
  StudentPreferenceCompanyIdViewColumnDefinition,
  StudentPreferenceEventIdViewColumnDefinition,
  StudentPreferencePriorityViewColumnDefinition
];

export type StudentPreferenceRowDefinition = RowDefinition<
  [
    typeof StudentPreferenceIdViewColumnDefinition,
    typeof StudentPreferenceStudentIdColumnDefinition,
    typeof StudentPreferenceCompanyIdViewColumnDefinition,
    typeof StudentPreferenceEventIdViewColumnDefinition,
    typeof StudentPreferencePriorityViewColumnDefinition
  ]
>;
