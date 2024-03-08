import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const TimeslotIDColDef = createColumnDefinition("id", "ID", 90, true);

export const TimeslotRoomColDef = createColumnDefinition("room", "Raum", 90);

export const TimeslotCompanyColDef = createColumnDefinition(
  "company",
  "Unternehmen",
  150
);

export const TimeslotEventColDef = createColumnDefinition(
  "event.eventname",
  "Event",
  150
);

// export const TimeslotStartColDef = createColumnDefinition(
//   "start",
//   "Startzeit",
//   90
// );

export const TimeslotEndColDef = createColumnDefinition("end", "Endzeit", 90);

export const TimeslotColumns: ColumnDefinitions<string> = [
  TimeslotIDColDef,
  TimeslotRoomColDef,
  TimeslotCompanyColDef,
  TimeslotEventColDef
  // TimeslotStartColDef,
  // TimeslotEndColDef
];

export type TimeslotRows = RowDefinition<
  [
    typeof TimeslotIDColDef,
    typeof TimeslotRoomColDef,
    typeof TimeslotCompanyColDef,
    typeof TimeslotEventColDef
    // typeof TimeslotStartColDef,
    // typeof TimeslotEndColDef
  ]
>;
