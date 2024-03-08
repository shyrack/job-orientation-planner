// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const SchedulerIdColumnDefinition: ColumnDefinition<"scheduler_id"> = {
  field: "scheduler_id",
  headerName: "ID",
  width: 90,
};

export const SchedulerTimeslotStartColumnDefinition: ColumnDefinition<"timeslot_start"> =
  {
    field: "timeslot_start",
    headerName: "Termin Start",
    width: 150,
  };

export const SchedulerTimeslotEndColumnDefinition: ColumnDefinition<"timeslot_end"> =
  {
    field: "timeslot_end",
    headerName: "Termin Ende",
    width: 300,
  };

export type SchedulerRowDefinition = RowDefinition<
  [
    typeof SchedulerIdColumnDefinition,
    typeof SchedulerTimeslotStartColumnDefinition,
    typeof SchedulerTimeslotEndColumnDefinition
  ]
>;

export const SchedulerColumns: ColumnDefinitions<string> = [
  SchedulerIdColumnDefinition,
  SchedulerTimeslotStartColumnDefinition,
  SchedulerTimeslotEndColumnDefinition,
];
