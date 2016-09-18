const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null
const width = 400
const height = 550
const debug = false

const options = {
  minWidth: width,
  minHeight: height,
  width,
  height,

  show: false,
  useContentSize: true,
}

function createWindow() {
  mainWindow = new BrowserWindow(options)
  mainWindow.setMenu(null)
  mainWindow.loadURL("file://" + __dirname + "/../index.html")
  mainWindow.once("ready-to-show", () => { mainWindow.show() })
  mainWindow.on("closed", () => { mainWindow = null })
  if (debug) {
    mainWindow.webContents.openDevTools()
  }
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
