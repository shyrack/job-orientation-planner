/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

// Create DB
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

// Select DB
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

// SELECT * FROM ..
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

// Create Row for Tables:

function CreateClass(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-class", tableName);
  ipcRenderer.once("table-creation", callback);
}

function CreateCompany(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-company", tableName);
  ipcRenderer.once("company-creation", callback);
}

function CreateEvent(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-event", tableName);
  ipcRenderer.once("event-creation", callback);
}

function CreateRoom(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-room", tableName);
  ipcRenderer.once("room-creation", callback);
}

function CreateScheduler(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-scheduler", tableName);
  ipcRenderer.once("scheduler-creation", callback);
}

function CreateStudent(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-student", tableName);
  ipcRenderer.once("student-creation", callback);
}

function CreateStudentAppointment(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-appointment", tableName);
  ipcRenderer.once("appointment-creation", callback);
}

function CreateStudentPreference(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-studentpreference", tableName);
  ipcRenderer.once("studentpreference-creation", callback);
}

function CreateTimeslot(
  callback: (
    event: IpcRendererEvent,
    successfullySelected: boolean,
    obj: any
  ) => void,
  tableName: string
) {
  ipcRenderer.send("create-timeslot", tableName);
  ipcRenderer.once("timeslot-creation", callback);
}

const electronApi = {
  createDatabase,
  selectTable,
  selectDatabase,
  testDatabase,
};

export type electronApi = typeof electronApi;

contextBridge.exposeInMainWorld("electron", electronApi);
