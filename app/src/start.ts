import { app, BrowserWindow } from "electron";

import * as Package from "../package.json";

let mainWindow: BrowserWindow | undefined = undefined;
const DEBUG = false;
const width = 420;
const height = 480;

function createWindow() {
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    show: false,
    useContentSize: true
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/../index.html`);
  mainWindow.setTitle(Package.productName);
  mainWindow.once("ready-to-show", () => {
    if (!mainWindow) {
      return;
    }
    mainWindow.show();
    if (DEBUG) {
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

function maybeQuit() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function activate() {
  if (!mainWindow) {
    createWindow();
  }
}

app.on("ready", createWindow);
app.on("window-all-closed", maybeQuit);
app.on("activate", activate);
