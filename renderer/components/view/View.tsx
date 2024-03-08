import {
  Button,
  Container,
  Dialog,
  Grid,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AppState } from "../../model/state/AppState";
import { ColumnDefinitions, RowDefinition } from "../../model/table/view";
import { useAppState } from "../../utils/hooks";
import Form from "../form/Form";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "90%"
}));

const StyledButton = styled(Button)({
  marginRight: "8px"
});

type FormData = {
  field: string;
  label: string;
  value: string | number;
  hidden: boolean;
};

export type ViewDefinition<T extends ColumnDefinitions<string>> = {
  columns: T;
  rows: RowDefinition<T>;
};

export default function View() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any>>({
    field: "",
    label: "",
    value: ""
  });
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const { accessedSubState: view, modifyAppState } = useAppState(
    (appState) =>
      appState[
        appState.viewName as unknown as keyof AppState
      ] as ViewDefinition<ColumnDefinitions<string>>
  );

  useEffect(() => {
    // Update formData when the view changes
    const updatedFormData = view.columns.map((column) => ({
      field: column.field,
      label: column.headerName,
      value: "",
      hidden: column.hideInForm
    }));
    setFormData(updatedFormData);
    console.log(formData);
  }, [view]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Process the form data (submit to backend, update state, etc.)
    console.log("Form submitted with data:", formData);
    modifyAppState((appState) => {
      (
        appState[
          appState.viewName as unknown as keyof AppState
        ] as ViewDefinition<ColumnDefinitions<string>>
      ).rows.push(formData);
    });

    // Optionally, you can reset the form data and close the dialog
    setFormData([]);
    setShowDialog(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData: FormData[]) =>
      prevFormData.map((fieldData: FormData) =>
        fieldData.field === name ? { ...fieldData, value } : fieldData
      )
    );
  };

  const handleCreate = () => {
    const updatedFormData = view.columns.map((column) => ({
      field: column.field,
      label: column.headerName,
      value: "",
      hidden: column.hideInForm
    }));

    setFormData(updatedFormData);
    setFormMode("create");
    setShowDialog(true);
  };

  const handleEdit = () => {
    const updatedFormData = view.columns.map((column) => ({
      field: column.field,
      label: column.headerName,
      value: selectedRow[column.field],
      hidden: column.hideInForm
    }));

    setFormData(updatedFormData);
    setFormMode("edit");
    setShowDialog(true);
  };

  const handleDelete = () => {
    console.log("DELETED", selectedRow);
  };

  return (
    <StyledBox>
      <Button
        sx={{ mb: 1 }}
        onClick={() => setCheckboxSelection(!checkboxSelection)}
      >
        Mehrfachauswahl
      </Button>
      <DataGrid
        columns={view.columns as unknown as GridColDef[]}
        rows={view.rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={(ids) => {
          view.rows.forEach((row) => {
            if (row.id === ids[0]) {
              setSelectedRow(row);
              return;
            }
          });
        }}
      ></DataGrid>
      <Dialog open={showDialog}>
        <Container>
          <Box>
            <Typography variant="h4">Schüler hinzufügen</Typography>
          </Box>
          <Form onSubmit={handleSubmit}>
            {formData.map(({ field, label, value, hidden }) => {
              console.log(field, label, value, hidden);
              return (
                <Grid
                  item
                  xs={12}
                  key={field}
                  style={{ display: hidden ? "none" : "block" }}
                >
                  <TextField
                    fullWidth
                    name={field}
                    label={label}
                    value={value}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <StyledButton
                onClick={() => {
                  setShowDialog(false);
                }}
                type="button"
                variant="contained"
                color="error"
              >
                Abbrechen
              </StyledButton>
              <StyledButton type="submit" variant="contained" color="primary">
                Bestätigen
              </StyledButton>
            </Grid>
          </Form>
        </Container>
      </Dialog>
      <Button onClick={handleCreate}>Benutzer hinzufügen</Button>
      <Button onClick={handleEdit}>Bearbeiten</Button>
      <Button onClick={handleDelete}>Löschen</Button>
    </StyledBox>
  );
}
