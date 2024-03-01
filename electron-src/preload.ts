/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

function createDatabase(callback: (event: IpcRendererEvent, successfullyCreated: boolean) => void, filepath: string) {
  ipcRenderer.send("create-database", filepath);
  ipcRenderer.on("database-creation", callback);
}

const electronApi = { createDatabase };

export type electronApi = typeof electronApi;

contextBridge.exposeInMainWorld("electron", electronApi);
