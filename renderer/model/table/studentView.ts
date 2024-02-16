// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentIdViewColumnDefinition: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const StudentClassColumnDefinition: ColumnDefinition<"class"> = {
  field: "class",
  headerName: "Klasse",
  width: 150
};

export const StudentNameViewColumnDefinition: ColumnDefinition<"surname"> = {
  field: "surname",
  headerName: "Name",
  width: 150
};

export const StudentFirstNameViewColumnDefinition: ColumnDefinition<"firstName"> =
  {
    field: "firstName",
    headerName: "Vorname",
    width: 150
  };

export const StudentColumns: ColumnDefinitions<string> = [
  StudentIdViewColumnDefinition,
  StudentClassColumnDefinition,
  StudentNameViewColumnDefinition,
  StudentFirstNameViewColumnDefinition
];

export type StudentRowDefinition = RowDefinition<
  [
    typeof StudentIdViewColumnDefinition,
    typeof StudentClassColumnDefinition,
    typeof StudentNameViewColumnDefinition,
    typeof StudentFirstNameViewColumnDefinition
  ]
>;
