// Authors: Andre Löwen

import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const RoomIDColDef = createColumnDefinition("id", "ID", 90, true);

export const RoomNumberColDef = createColumnDefinition(
  "room-number",
  "Raumnummer",
  150
);

export const RoomCapacityViewColDef = createColumnDefinition(
  "capacity",
  "Kapazität",
  150
);

export const RoomColumns: ColumnDefinitions<string> = [
  RoomIDColDef,
  RoomNumberColDef,
  RoomCapacityViewColDef
];

export type RoomRowDefinition = RowDefinition<
  [typeof RoomIDColDef, typeof RoomNumberColDef, typeof RoomCapacityViewColDef]
>;
