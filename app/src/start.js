const { app, BrowserWindow } = require("electron");

const Package = require("../package.json");

let mainWindow = undefined;
const DEBUG = false;
const width = 420;
const height = 420;

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
  mainWindow.loadURL(`file://${__dirname}/../index.html`);
  mainWindow.setTitle(Package.productName);
  mainWindow.once("ready-to-show", () => {
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
