/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import _ from "lodash";
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

function selectTableNew(tableName: string) {
  return new Promise<{ successfully: boolean; data: Array<any> }>((resolve) => {
    const selectTableOperationId = _.uniqueId();

    const selectTableCallback = (
      _ignore: IpcRendererEvent,
      operationId: string,
      successfully: boolean,
      data: Array<any>
    ) => {
      if (selectTableOperationId === operationId) {
        ipcRenderer.removeListener("select-table", selectTableCallback);
        resolve({ successfully, data });
      }
    };

    ipcRenderer.on("table-selection", selectTableCallback);
    ipcRenderer.send("select-table", tableName);
  });
}

function createRow(
  callback: (event: IpcRendererEvent, successfullyCreated: boolean, error: any) => void,
  tableName: Table,
  obj: any,
  retries: number = 3
) {
  const lowerCaseTableName = _.toLower(tableName);

  ipcRenderer.send(`create-${lowerCaseTableName}`, obj);
  ipcRenderer.once(`${lowerCaseTableName}-creation`, (event, successfullyCreated, error) => {
    if (error && retries > 0) {
      console.log(`Error creating row in ${tableName}. Retrying in 5 seconds...`);
      setTimeout(() => createRow(callback, tableName, obj, retries - 1), 5000);
    } else {
      callback(event, successfullyCreated, error);
    }
  });
}

function createRowAsync(tableName: Table, obj: any, retries: number = 3) {
  return new Promise<{ successfully: boolean; error: any }>((resolve) => {
    function onCreateRowCallback(_event: IpcRendererEvent, successfullyCreated: boolean, error: any) {
      resolve({ error: error, successfully: successfullyCreated });
    }

    createRow(onCreateRowCallback, tableName, obj, retries);
  });
}

function createTableRows(table: Table, rows: Array<Record<string, any>>) {
  return new Promise<{ successfully: boolean; error: Error | null }>((resolve) => {
    const rowCreationOperationId = _.uniqueId();

    const rowCreationsCallback = (
      _ignore: IpcRendererEvent,
      operationId: string,
      successfully: boolean,
      error: Error | null
    ) => {
      if (rowCreationOperationId === operationId) {
        ipcRenderer.removeListener("row-creations", rowCreationsCallback);
        resolve({ successfully, error });
      }
    };

    ipcRenderer.on("row-creations", rowCreationsCallback);
    ipcRenderer.send("create-table-rows", table, rows, rowCreationOperationId);
  });
}

const electronApi = {
  createDatabase,
  createRow,
  createRowAsync,
  createTableRows,
  selectDatabase,
  selectTable,
  selectTableNew,
  testDatabase
};

export type electronApi = typeof electronApi;

contextBridge.exposeInMainWorld("electron", electronApi);
