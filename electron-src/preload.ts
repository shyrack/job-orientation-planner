// eslint-disable @typescript-eslint/no-namespace
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

function createRow(
  callback: (event: IpcRendererEvent, successfullyCreated: boolean, error: any) => void,
  tableName: Table,
  obj: any
) {
  const lowerCaseTableName = _.toLower(tableName);
  ipcRenderer.send(`create-${lowerCaseTableName}`, obj);
  ipcRenderer.once(`${lowerCaseTableName}-creation`, (event, successfullyCreated, error) => {
    if (!!error) {
      console.log(`Error creating row in ${tableName}. Retrying in 5 seconds...`);
    } else {
      callback(event, successfullyCreated, error);
    }
  });
}

function createRowAsync(tableName: Table, obj: any) {
  return new Promise<{ successfully: boolean; error: any }>((resolve) => {
    function onCreateRowCallback(_event: IpcRendererEvent, successfullyCreated: boolean, error: any) {
      resolve({ error: error, successfully: successfullyCreated });
    }

    createRow(onCreateRowCallback, tableName, obj);
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

function executeOperation<T>(channel: string, responseChannel: string, param: any) {
  const operationId = _.uniqueId();

  return new Promise<T>((resolve) => {
    const onResponse = (_event: IpcRendererEvent, responseOperationId: string, result: T) => {
      if (operationId === responseOperationId) {
        ipcRenderer.removeListener(responseChannel, onResponse);
        resolve(result);
      }
    };

    ipcRenderer.on(responseChannel, onResponse);
    ipcRenderer.send(channel, operationId, param);
  });
}

function selectTableNew(table: Table) {
  return executeOperation<{ error: Error | null; rows: Array<unknown> }>("retrieve-table", "table-retrieved", table);
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
