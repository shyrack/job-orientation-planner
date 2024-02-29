import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const TimeslotIDColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

// room.roomnumber
export const TimeslotRoomColDef: ColumnDefinition<"room"> = {
  field: "room",
  headerName: "Raum",
  width: 90
};

// company.name
export const TimeslotCompanyColDef: ColumnDefinition<"company"> = {
  field: "company",
  headerName: "Unternehmen",
  width: 150
};

// Is this needed?
// event.eventname
export const TimeslotEventColDef: ColumnDefinition<"event"> = {
  field: "event",
  headerName: "Event",
  width: 150
};

export const TimeslotStartColDef: ColumnDefinition<"start"> = {
  field: "start",
  headerName: "Startzeit",
  width: 90
};

export const TimeslotEndColDef: ColumnDefinition<"end"> = {
  field: "end",
  headerName: "Endzeit",
  width: 90
};

export const TimeslotColumns: ColumnDefinitions<string> = [
  TimeslotIDColDef,
  TimeslotRoomColDef,
  TimeslotCompanyColDef,
  TimeslotEventColDef,
  TimeslotStartColDef,
  TimeslotEndColDef
];

export type TimeslotRows = RowDefinition<
  [
    typeof TimeslotIDColDef,
    typeof TimeslotRoomColDef,
    typeof TimeslotCompanyColDef,
    typeof TimeslotEventColDef,
    typeof TimeslotStartColDef,
    typeof TimeslotEndColDef
  ]
>;
