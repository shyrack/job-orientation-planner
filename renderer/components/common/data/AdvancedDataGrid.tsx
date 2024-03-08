import { DataGrid, DataGridProps } from "@mui/x-data-grid";

type AdvancedDataGridProps = DataGridProps;

export function AdvancedDataGrid(props: AdvancedDataGridProps) {
  return <DataGrid {...props} />;
}
