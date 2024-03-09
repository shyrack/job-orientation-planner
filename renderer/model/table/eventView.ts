// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const EventIdColumnDefinition: ColumnDefinition<"event_id"> = {
  field: "event_id",
  headerName: "ID",
  width: 90
};

export const EventNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Name",
  width: 150
};

export type EventRowDefinition = RowDefinition<[typeof EventIdColumnDefinition, typeof EventNameColumnDefinition]>;

export const EventColumns: ColumnDefinitions<string> = [EventIdColumnDefinition, EventNameColumnDefinition];
