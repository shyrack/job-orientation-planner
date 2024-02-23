// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const CompanyIdColumnDefinition: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const CompanyNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Unternehmen",
  width: 150
};

export const CompanyFieldColumnDefinition: ColumnDefinition<"field"> = {
  field: "field",
  headerName: "Ausbildungsberufe/Studiengänge",
  width: 300
};

export const CompanyColumns: ColumnDefinitions<string> = [
  CompanyIdColumnDefinition,
  CompanyNameColumnDefinition,
  CompanyFieldColumnDefinition
];

export type CompanyRowDefinition = RowDefinition<
  [
    typeof CompanyIdColumnDefinition,
    typeof CompanyNameColumnDefinition,
    typeof CompanyFieldColumnDefinition
  ]
>;
