// Authors: Florian Jahn, Andre Löwen

import { ColumnDefinition, ColumnDefinitions, RowDefinition } from "./view";

export const CompanyIdColDef: ColumnDefinition<"id"> = {
  field: "id",
  headerName: "ID",
  width: 90
};

export const CompanyNameColDef: ColumnDefinition<"name"> = {
  field: "name",
  headerName: "Unternehmen",
  width: 150
};

export const CompanyFieldColDef: ColumnDefinition<"field"> = {
  field: "field",
  headerName: "Ausbildungsberufe/Studiengänge",
  width: 300
};

export const CompanyColumns: ColumnDefinitions<string> = [
  CompanyIdColDef,
  CompanyNameColDef,
  CompanyFieldColDef
];

export type CompanyRowDefinition = RowDefinition<
  [typeof CompanyIdColDef, typeof CompanyNameColDef, typeof CompanyFieldColDef]
>;
