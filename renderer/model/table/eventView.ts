import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const EventIDColDef = createColumnDefinition("id", "ID", 90);

export const EventNameColDef = createColumnDefinition("name", "Eventname", 150);

export const EventColumns: ColumnDefinitions<string> = [
  EventIDColDef,
  EventNameColDef
];

export type EventRowDefinition = RowDefinition<
  [typeof EventIDColDef, typeof EventNameColDef]
>;
