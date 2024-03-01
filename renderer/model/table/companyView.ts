// Authors: Florian Jahn, Andre Löwen

import {
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const CompanyIdColDef = createColumnDefinition("id", "ID", 90);

export const CompanyNameColDef = createColumnDefinition(
  "name",
  "Unternehmen",
  300
);

export const CompanyFieldColDef = createColumnDefinition(
  "field",
  "Ausbildungsberufe/Studiengang",
  300
);

export const CompanyColumns: ColumnDefinitions<string> = [
  CompanyIdColDef,
  CompanyNameColDef,
  CompanyFieldColDef
];

export type CompanyRowDefinition = RowDefinition<
  [typeof CompanyIdColDef, typeof CompanyNameColDef, typeof CompanyFieldColDef]
>;
