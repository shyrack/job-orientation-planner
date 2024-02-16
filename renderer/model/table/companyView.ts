// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const CompanyIdColumnDefinition: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const CompanyNameColumnDefinition: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Company Name",
  width: 300
};

export const CompanyColumns: ColumnDefinitions<string> = [
  CompanyIdColumnDefinition,
  CompanyNameColumnDefinition
];

export type CompanyRowDefinition = RowDefinition<
  [typeof CompanyIdColumnDefinition, typeof CompanyNameColumnDefinition]
>;
