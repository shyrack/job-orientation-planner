/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

function createDatabase(
  callback: (
    event: IpcRendererEvent,
    successfullyCreated: boolean,
    error: any
  ) => void,
  filepath: string
) {
  console.log("create-database");
  ipcRenderer.send("create-database", filepath);
  ipcRenderer.on("database-creation", callback);
}

function selectDatabase(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    error: any
  ) => void,
  filepath: string
) {
  console.log("test-database-connection");
  ipcRenderer.send("test-database-connection", filepath);
  ipcRenderer.on("connection-database-test", callback);
}

function testDatabase(
  callback: (
    event: IpcRendererEvent,
    successfullyConnected: boolean,
    obj: any
  ) => void,
  filepath: string
) {
  ipcRenderer.once("database-connection-test", callback);
  ipcRenderer.send("test-database-connection", filepath);
}

function selectTable(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("select-table", tableName);
  ipcRenderer.once("table-selection", callback);
}

const electronApi = {
  createDatabase,
  selectTable,
  selectDatabase,
  testDatabase,
};

export type electronApi = typeof electronApi;

contextBridge.exposeInMainWorld("electron", electronApi);
