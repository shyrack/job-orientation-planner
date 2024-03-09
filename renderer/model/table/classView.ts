// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const ClassIdColumnDefinition: ColumnDefinition<"class_id"> = {
  field: "class_id",
  headerName: "ID",
  width: 90
};

export const ClassNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Name",
  width: 150
};

export const ClassEntryYearColumnDefinition: ColumnDefinition<"entry_year"> = {
  field: "entry_year",
  headerName: "EinschulungsJahr",
  width: 300
};

export type ClassRowDefinition = RowDefinition<
  [typeof ClassIdColumnDefinition, typeof ClassNameColumnDefinition, typeof ClassEntryYearColumnDefinition]
>;

export const ClassColumns: ColumnDefinitions<string> = [
  ClassIdColumnDefinition,
  ClassNameColumnDefinition,
  ClassEntryYearColumnDefinition
];
