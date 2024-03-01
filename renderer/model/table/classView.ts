import {
  ColumnDefinition,
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const ClassIdColDef = createColumnDefinition("id", "Klassen-ID", 90);

export const ClassNameColDef = createColumnDefinition("name", "Name", 150);

export const ClassColumns: ColumnDefinitions<string> = [
  ClassIdColDef,
  ClassNameColDef
];

export type ClassRowDefinition = RowDefinition<
  [typeof ClassIdColDef, typeof ClassNameColDef]
>;
