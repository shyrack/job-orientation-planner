import { IpcMainEvent, ipcMain } from "electron";

function onCreateDatabase(event: IpcMainEvent, filepath: string) {
  event.sender; // To cure es-lint shit
  console.log("filepath", filepath);
  setTimeout(() => ipcMain.emit("database-creation", false), 5000);
}

export function registerEventListeners() {
  ipcMain.on("create-database", onCreateDatabase);
}
