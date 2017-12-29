const { app, BrowserWindow } = require("electron");

const package = require("../package.json");

let mainWindow = undefined;
const DEBUG = true;
const width = DEBUG ? 1280 : 400;
const height = DEBUG ? 800 : 500;

const options = {
  width,
  height,
  minWidth: width,
  minHeight: height,
  show: false,
  useContentSize: true
};

function createWindow() {
  mainWindow = new BrowserWindow(options);
  mainWindow.setMenu(null);
  mainWindow.loadURL("file://" + __dirname + "/../index.html");
  mainWindow.setTitle(package.productName + " " + package.version);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
  if (DEBUG) {
    mainWindow.webContents.openDevTools();
  }
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
