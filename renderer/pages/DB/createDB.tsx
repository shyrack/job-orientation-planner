
import Panel from "../../components/process/Panel";
import Typography from "../../components/text/Typography";
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import PageProvider from "../../components/provider/PageProvider";
import { darken } from "@mui/material/styles";
import { AppState } from "../../model/state/AppState";

type IndexPageProps = {};

function createDatabase(dbPath: string) {
  console.log("execute create");
  try {
    window.electron.createDatabase((event, successfullyCreated,error) => {
      if(successfullyCreated){
        console.log(`DB creation on "${dbPath}" ${successfullyCreated}`);
      }
      else{
        console.log(`DB creation on "${dbPath}" ${successfullyCreated}`);
        console.log(error)
      }
    }, dbPath);
  } catch (error) {
    console.error(error);
  }
}
export default function DbIndexPage(props: IndexPageProps) {
  const [path, setPath] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPath(file.path);
    }
  };

  const handleCreateDatabase = () => {
    AppState.modifyAppState((appState) => {
      appState.dbPath = path;
    });
    createDatabase(path);
  };

  // Determine if the Create Database button should be disabled
  const isCreateButtonDisabled = path.trim() === '';

  return (
    <PageProvider>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Create Database:
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ marginBottom: 2 }}>
          Database Setup
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
          Enter the path for the database file:
        </Typography>
        <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileInputChange} />
        <label htmlFor="file-input">
          <Button variant="outlined" fullWidth component="span">
            Choose File
          </Button>
        </label>
        <TextField
          id="db-path"
          label="Database Path"
          variant="outlined"
          fullWidth
          value={path}
          onChange={handleInputChange}
          sx={{ my: 2 }}
        />
        <Button onClick={handleCreateDatabase} variant="contained" fullWidth sx={{ marginBottom: 2 }} disabled={isCreateButtonDisabled}>
          Create Database
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
    </PageProvider>
  );
}
