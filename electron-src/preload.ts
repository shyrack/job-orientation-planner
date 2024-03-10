/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { Table } from "./database/database";

// Create DB
function createDatabase(
  callback: (event: IpcRendererEvent, successfullyCreated: boolean, error: any) => void,
  filepath: string
) {
  console.log("create-database");
  ipcRenderer.send("create-database", filepath);
  ipcRenderer.on("database-creation", callback);
}

// Select DB
function selectDatabase(
  callback: (event: IpcRendererEvent, successfullySelected: boolean, error: any) => void,
  filepath: string
) {
  console.log("test-database-connection");
  ipcRenderer.send("test-database-connection", filepath);
  ipcRenderer.on("connection-database-test", callback);
}

function testDatabase(
  callback: (event: IpcRendererEvent, successfullyConnected: boolean, obj: any) => void,
  filepath: string
) {
  ipcRenderer.once("database-connection-test", callback);
  ipcRenderer.send("test-database-connection", filepath);
}

function selectTable(
  callback: (event: IpcRendererEvent, successfullySelected: boolean, error: any) => void,
  tableName: string,
  retries: number = 3
) {
  ipcRenderer.send("select-table", tableName);
  ipcRenderer.once("table-selection", (event, successfullySelected, error) => {
    if (error && retries > 0) {
      console.log(`Error selecting table ${tableName}. Retrying in 5 seconds...`);
      setTimeout(() => selectTable(callback, tableName, retries - 1), 5000);
    } else {
      callback(event, successfullySelected, error);
    }
  });
}

function createRow(
  callback: (event: IpcRendererEvent, successfullyCreated: boolean, error: any) => void,
  tableName: string,
  obj: any,
  retries: number = 3
) {
  ipcRenderer.send(`create-${tableName.toLowerCase()}`, obj);
  ipcRenderer.once(`${tableName.toLowerCase()}-creation`, (event, successfullyCreated, error) => {
    if (error && retries > 0) {
      console.log(`Error creating row in ${tableName}. Retrying in 5 seconds...`);
      setTimeout(() => createRow(callback, tableName, obj, retries - 1), 5000);
    } else {
      callback(event, successfullyCreated, error);
    }
  });
}

const electronApi = {
  createDatabase,
  createRow,
  selectDatabase,
  selectTable,
  database_tables: Table,
  testDatabase
};

export type electronApi = typeof electronApi;

contextBridge.exposeInMainWorld("electron", electronApi);
