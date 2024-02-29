// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentIDColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const StudentClassColDef: ColumnDefinition<"class"> = {
  field: "class",
  headerName: "Klasse",
  width: 150
};

export const StudentNameViewColDef: ColumnDefinition<"surname"> = {
  field: "surname",
  headerName: "Name",
  width: 150
};

export const StudentFirstNameViewColDef: ColumnDefinition<"firstName"> = {
  field: "firstName",
  headerName: "Vorname",
  width: 150
};

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
