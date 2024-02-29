import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const EventIDColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const EventNameColDef: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Eventname",
  width: 150
};

export const EventColumns: ColumnDefinitions<string> = [
  EventIDColDef,
  EventNameColDef
];

export type EventRowDefinition = RowDefinition<
  [typeof EventIDColDef, typeof EventNameColDef]
>;
