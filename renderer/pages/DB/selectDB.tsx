import Typography from "../../components/text/Typography";
import React, { useState } from "react";
import {Button, TextField } from "@mui/material";
import PageProvider from "../../components/provider/PageProvider";
import { AppState } from "../../model/state/AppState";

type IndexPageProps = {};

function selectDatabase(dbPath: string) {
  console.log("execute create");
  try {
    window.electron.selectDatabase((event, successfullySelected, obj) => {
      console.log(`DB selection on "${dbPath}" ${successfullySelected}`);
      console.log(obj);
    }, dbPath);
  } catch (error) {
    console.error(error);
  }
}

export default function DbIndexPage(props: IndexPageProps) {
  const [path, setPath] = useState("");

  //TODO: FLorian Help
  //useEffect(() => {
  //  const appStateInstance = new AppState();
  //  setPath(appStateInstance.dbPath);
  //  console.log(appStateInstance.dbPath)
  //}, []); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPath(file.path);
    }
  };

  const handleSelectDatabase = () => {
    AppState.modifyAppState((appState) => {
      console.log("moddifying appState.dbPath to " + path);
      appState.dbPath = path;
    });
    selectDatabase(path);

    console.log("moddifying appState.dbPath to " + path);
  };

  const isSelectButtonDisabled = path.trim() === "";

  return (
    <PageProvider>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Select Database:
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ marginBottom: 2 }}
      >
        Database Setup
      </Typography>
      <Typography
        variant="body1"
        align="center"
        gutterBottom
        sx={{ marginBottom: 2 }}
      >
        Enter the path for the database file:
      </Typography>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        content={path}
      />
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
      <Button
        onClick={handleSelectDatabase}
        variant="contained"
        fullWidth
        sx={{ marginBottom: 2 }}
        disabled={isSelectButtonDisabled}
      >
        Select Database
      </Button>
    </PageProvider>
  );
}
