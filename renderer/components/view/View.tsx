import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppState } from "../../utils/hooks";
import { Box } from "@mui/system";

export default function View() {
  const { accessedSubState: state, modifyAppState } = useAppState(
    (appState) => appState.currentView
  );

  const { columns, rows } = state;

  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      ></DataGrid>
    </Box>
  );
}
