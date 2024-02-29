import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const ClassIdColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "Klassen-ID",
  width: 90
};

export const ClassNameColDef: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Name",
  width: 150
};

export const ClassColumns: ColumnDefinitions<string> = [
  ClassIdColDef,
  ClassNameColDef
];

export type ClassRowDefinition = RowDefinition<
  [typeof ClassIdColDef, typeof ClassNameColDef]
>;
