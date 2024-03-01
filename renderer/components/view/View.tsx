import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppState } from "../../model/state/AppState";
import { ColumnDefinitions, RowDefinition } from "../../model/table/view";
import { useAppState } from "../../utils/hooks";
import { styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  width: "100%",
  backgroundcolor: "red"
}));

export type ViewDefinition<T extends ColumnDefinitions<string>> = {
  columns: T;
  rows: RowDefinition<T>;
};

type ViewProps = {
  pageSize?: number;
};

/**
 * Creates a table with given columns and data.
 * @param columns The columns of the table.
 * @param rows Data for the table. Should fit the columns definition
 * @param pageSize (Optional) Number of rows per page. Default is 10
 */
export default function View(props: ViewProps) {
  const { pageSize } = props;

  const { accessedSubState: viewName } = useAppState(
    (appState) => appState.viewName
  );

  const { accessedSubState: view } = useAppState(
    (appState) =>
      appState[viewName as unknown as keyof AppState] as ViewDefinition<
        ColumnDefinitions<string>
      >
  );

  return (
    <Box>
      <StyledDataGrid
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
      ></StyledDataGrid>
    </Box>
  );
}
