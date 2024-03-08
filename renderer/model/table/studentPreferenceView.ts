import {
  ColumnDefinition,
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const StudentPreferenceIDColDef = createColumnDefinition(
  "preference-id",
  "Schüler-Präferenz",
  90,
  true
);

export const StudentPreferenceStudentSurnameColDef = createColumnDefinition(
  "student-surname",
  "Schüler Nachname",
  150
);

export const StudentPreferenceStudentFirstnameColDef = createColumnDefinition(
  "student-first-name",
  "Schüler Vorname",
  150
);

export const StudentPreferenceClassColDef = createColumnDefinition(
  "student-class",
  "Klasse",
  90
);

export const StudentPreferenceCompanyNameColDef = createColumnDefinition(
  "company-name",
  "Unternehmen",
  150
);

export const StudentPreferenceCompanyFieldColDef = createColumnDefinition(
  "company-field",
  "Ausbildungsberufe/Studiengänge",
  150
);

export const StudentPreferencePriorityColDef = createColumnDefinition(
  "priority",
  "Priorität",
  90
);

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
