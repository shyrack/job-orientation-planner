// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const TimeslotIdColumnDefinition: ColumnDefinition<"timeslot_id"> = {
  field: "timeslot_id",
  headerName: "ID",
  width: 90
};

export const TimeslotRoomIdColumnDefinition: ColumnDefinition<"room_id"> = {
  field: "room_id",
  headerName: "Room",
  width: 150
};

export const TimeslotCompanyIdColumnDefinition: ColumnDefinition<"company_id"> = {
  field: "company_id",
  headerName: "Company",
  width: 300
};

export const TimeslotEventIdColumnDefinition: ColumnDefinition<"event_id"> = {
  field: "event_id",
  headerName: "Event",
  width: 300
};

export const TimeslotScheduleIdColumnDefinition: ColumnDefinition<"schedule_id"> = {
  field: "schedule_id",
  headerName: "Schedule",
  width: 300
};

export type TimeslotRowDefinition = RowDefinition<
  [
    typeof TimeslotIdColumnDefinition,
    typeof TimeslotRoomIdColumnDefinition,
    typeof TimeslotCompanyIdColumnDefinition,
    typeof TimeslotEventIdColumnDefinition,
    typeof TimeslotScheduleIdColumnDefinition
  ]
>;

export const TimeslotColumns: ColumnDefinitions<string> = [
  TimeslotIdColumnDefinition,
  TimeslotRoomIdColumnDefinition,
  TimeslotCompanyIdColumnDefinition,
  TimeslotEventIdColumnDefinition,
  TimeslotScheduleIdColumnDefinition
];
