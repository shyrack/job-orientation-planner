// Authors: Florian Jahn, Andre Löwen

import {
  ColumnDefinition,
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const StudentIDColDef = createColumnDefinition("id", "ID", 90);

export const StudentClassColDef = createColumnDefinition(
  "class",
  "Klasse",
  150
);

export const StudentNameViewColDef = createColumnDefinition(
  "surname",
  "Name",
  150
);

export const StudentFirstNameViewColDef = createColumnDefinition(
  "firstName",
  "Vorname",
  150
);

export const StudentColumns: ColumnDefinitions<string> = [
  StudentIDColDef,
  StudentClassColDef,
  StudentNameViewColDef,
  StudentFirstNameViewColDef
];

export type StudentRowDefinition = RowDefinition<
  [
    typeof StudentIDColDef,
    typeof StudentClassColDef,
    typeof StudentNameViewColDef,
    typeof StudentFirstNameViewColDef
  ]
>;
