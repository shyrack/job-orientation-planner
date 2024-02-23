// Authors: Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const RoomIdViewColumnDefinition: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const RoomNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Name",
  width: 150
};

export const RoomCapacityViewColumnDefinition: ColumnDefinition<"capacity"> = {
  field: "capacity",
  headerName: "Kapazität",
  width: 90
};

export const RoomColumns: ColumnDefinitions<string> = [
  RoomIdViewColumnDefinition,
  RoomNameColumnDefinition,
  RoomCapacityViewColumnDefinition
];

export type RoomRowDefinition = RowDefinition<
  [
    typeof RoomIdViewColumnDefinition,
    typeof RoomNameColumnDefinition,
    typeof RoomCapacityViewColumnDefinition
  ]
>;
