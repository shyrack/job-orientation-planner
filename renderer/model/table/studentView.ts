// Authors: Florian Jahn, Andre Löwen

import { TroubleshootOutlined } from "@mui/icons-material";
import {
  ColumnDefinition,
  ColumnDefinitions,
  RowDefinition,
  createColumnDefinition
} from "./view";

export const StudentIDColDef = createColumnDefinition("id", "ID", 90, true);

export const StudentClassColDef = createColumnDefinition(
  "class",
  "Klasse",
  150
);

export const StudentNameViewColDef = createColumnDefinition(
  "surname",
  "Name",
  150
);

export const StudentFirstNameViewColDef = createColumnDefinition(
  "firstName",
  "Vorname",
  150
);

export const StudentColumns: ColumnDefinitions<string> = [
  StudentIDColDef,
  StudentFirstNameViewColDef,
  StudentNameViewColDef,
  StudentClassColDef
];

export type StudentRowDefinition = RowDefinition<
  [
    typeof StudentIDColDef,
    typeof StudentFirstNameViewColDef,
    typeof StudentNameViewColDef,
    typeof StudentClassColDef
  ]
>;
