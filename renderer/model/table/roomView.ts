// Authors: Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const RoomNumberViewColDef: ColumnDefinition<"room-number"> = {
  field: "room-number",
  headerName: "Raumnummer",
  width: 90
};

export const RoomMaxTimeSlotColDef: ColumnDefinition<"max-time-slot"> = {
  field: "max-time-slot",
  headerName: "Maximaler Zeitblock",
  width: 90
};

export const RoomCapacityViewColDef: ColumnDefinition<"capacity"> = {
  field: "capacity",
  headerName: "Kapazität",
  width: 90
};

export const RoomColumns: ColumnDefinitions<string> = [
  RoomNumberViewColDef,
  RoomMaxTimeSlotColDef,
  RoomCapacityViewColDef
];

export type RoomRowDefinition = RowDefinition<
  [
    typeof RoomNumberViewColDef,
    typeof RoomMaxTimeSlotColDef,
    typeof RoomCapacityViewColDef
  ]
>;
