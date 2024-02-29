// Authors: Andre Löwen

import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const RoomNumberViewColDef = createColumnDefinition(
  "room-number",
  "Raumnummer",
  90
);

export const RoomMaxTimeSlotColDef = createColumnDefinition(
  "max-time-slot",
  "Maximaler Zeitblock",
  90
);

export const RoomCapacityViewColDef = createColumnDefinition(
  "capacity",
  "Kapazität",
  90
);

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
