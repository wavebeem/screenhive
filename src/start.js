const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null
const width = 350
const height = 284 + 22

function createWindow() {
  mainWindow = new BrowserWindow({width, height})
  mainWindow.loadURL(`file://${__dirname}/../assets/index.html`)
  // mainWindow.webContents.openDevTools()
  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

function maybeQuit() {
  if (process.platform !== "darwin") {
    app.quit()
  }
}

function activate() {
  if (mainWindow === null) {
    createWindow()
  }
}

app.on("ready", createWindow)
app.on("window-all-closed", maybeQuit)
app.on("activate", activate)
