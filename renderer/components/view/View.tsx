import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppState, AvailableViews } from "../../model/state/AppState";
import { ColumnDefinitions, RowDefinition } from "../../model/table/view";
import { useAppState } from "../../utils/hooks";

export type ViewDefinition<T extends ColumnDefinitions<string>> = {
  columns: T;
  rows: RowDefinition<T>;
};

type ViewProps = {
  viewName: AvailableViews;
  pageSize?: number;
};

/**
 * Creates a table with given columns and data.
 * @param columns The columns of the table.
 * @param rows Data for the table. Should fit the columns definition
 * @param pageSize (Optional) Number of rows per page. Default is 10
 */
export default function View(props: ViewProps) {
  const { pageSize, viewName } = props;

  const { accessedSubState: view, modifyAppState } = useAppState(
    (appState) =>
      appState[viewName as unknown as keyof AppState] as ViewDefinition<
        ColumnDefinitions<string>
      >
  );

  return (
    <Box>
      <DataGrid
        columns={view.columns as unknown as GridColDef[]}
        rows={view.rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize ?? 10
            }
          }
        }}
        checkboxSelection
        disableRowSelectionOnClick
      ></DataGrid>
    </Box>
  );
}
