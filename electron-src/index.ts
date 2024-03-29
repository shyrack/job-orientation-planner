// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, IpcMainEvent, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { registerEventListeners } from "./database/database";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
      sandbox: false
    }
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true
      });

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadURL(url);

  ipcMain.on("database-filepath-provided", (event, filePath) => {
    event.preventDefault();
    console.log("filePath:", filePath);
  });
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

registerEventListeners();

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
