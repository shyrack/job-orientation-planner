// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const StudentIdViewColumnDefinition: ColumnDefinition<"student_id"> = {
  field: "student_id",
  headerName: "ID",
  width: 90,
};

export const StudentClassIdColumnDefinition: ColumnDefinition<"class_id"> = {
  field: "class_id",
  headerName: "Klasse",
  width: 150,
};

export const StudentFirstNameViewColumnDefinition: ColumnDefinition<"firstName"> =
  {
    field: "firstName",
    headerName: "Vorname",
    width: 150,
  };

export const StudentLastNameViewColumnDefinition: ColumnDefinition<"lastname"> =
  {
    field: "lastname",
    headerName: "Name",
    width: 150,
  };

export const StudentColumns: ColumnDefinitions<string> = [
  StudentIdViewColumnDefinition,
  StudentClassIdColumnDefinition,
  StudentFirstNameViewColumnDefinition,
  StudentLastNameViewColumnDefinition,
];

export type StudentRowDefinition = RowDefinition<
  [
    typeof StudentIdViewColumnDefinition,
    typeof StudentClassIdColumnDefinition,
    typeof StudentFirstNameViewColumnDefinition,
    typeof StudentLastNameViewColumnDefinition
  ]
>;
