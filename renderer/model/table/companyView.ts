// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const CompanyIdColumnDefinition: ColumnDefinition<"company_id"> = {
  field: "company_id",
  headerName: "ID",
  width: 90
};

export const CompanyNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Unternehmen",
  width: 150
};

export const CompanyJobOccupationColumnDefinition: ColumnDefinition<"job_occupation"> = {
  field: "job_occupation",
  headerName: "Ausbildungsberufe/Studiengänge",
  width: 300
};

export const CompanyTimeStartColumnDefinition: ColumnDefinition<"company_start"> = {
  field: "company_start",
  headerName: "Verfügbarkeit Beginn",
  width: 150
};

export const CompanyTimeEndColumnDefinition: ColumnDefinition<"company_end"> = {
  field: "company_end",
  headerName: "Verfügbarkeit Ende",
  width: 150
};

export type CompanyRowDefinition = RowDefinition<
  [
    typeof CompanyIdColumnDefinition,
    typeof CompanyNameColumnDefinition,
    typeof CompanyJobOccupationColumnDefinition,
    typeof CompanyTimeStartColumnDefinition,
    typeof CompanyTimeEndColumnDefinition
  ]
>;

export const CompanyColumns: ColumnDefinitions<string> = [
  CompanyIdColumnDefinition,
  CompanyNameColumnDefinition,
  CompanyJobOccupationColumnDefinition,
  CompanyTimeStartColumnDefinition,
  CompanyTimeEndColumnDefinition
];
