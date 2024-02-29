import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentPreferenceIDColDef: ColumnDefinition<"preference-id"> = {
  field: "preference-id",
  headerName: "Schüler-Präferenz",
  width: 90
};

// student.surname
export const StudentPreferenceStudentSurnameColDef: ColumnDefinition<"student-surname"> =
  {
    field: "student-surname",
    headerName: "Schüler Nachname",
    width: 150
  };

// student.first-name
export const StudentPreferenceStudentFirstnameColDef: ColumnDefinition<"student-first-name"> =
  {
    field: "student-first-name",
    headerName: "Schüler Nachname",
    width: 150
  };

// student.class.classname
export const StudentPreferenceClassColDef: ColumnDefinition<"student-class"> = {
  field: "student-class",
  headerName: "Klasse",
  width: 90
};

// company.companyName
export const StudentPreferenceCompanyNameColDef: ColumnDefinition<"company-name"> =
  {
    field: "company-name",
    headerName: "Unternehmen",
    width: 150
  };

// company.companyField
export const StudentPreferenceCompanyFieldColDef: ColumnDefinition<"company-field"> =
  {
    field: "company-field",
    headerName: "Ausbildungsberufe/Studiengänge",
    width: 150
  };

export const StudentPreferencePriorityColDef: ColumnDefinition<"priority"> = {
  field: "priority",
  headerName: "Priorität",
  width: 90
};

export const SPColumns: ColumnDefinitions<string> = [
  StudentPreferenceIDColDef,
  StudentPreferenceStudentSurnameColDef,
  StudentPreferenceStudentFirstnameColDef,
  StudentPreferenceClassColDef,
  StudentPreferenceCompanyNameColDef,
  StudentPreferenceCompanyFieldColDef,
  StudentPreferencePriorityColDef
];

export type SPRowDefinition = RowDefinition<
  [
    typeof StudentPreferenceIDColDef,
    typeof StudentPreferenceStudentSurnameColDef,
    typeof StudentPreferenceStudentFirstnameColDef,
    typeof StudentPreferenceClassColDef,
    typeof StudentPreferenceCompanyNameColDef,
    typeof StudentPreferenceCompanyFieldColDef,
    typeof StudentPreferencePriorityColDef
  ]
>;
