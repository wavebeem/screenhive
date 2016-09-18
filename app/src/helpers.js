const electron = require("electron")
const shell = electron.shell
const remote = electron.remote

const properties = ["openDirectory"]

function pickDir() {
  return new Promise(resolve => {
    remote.dialog.showOpenDialog({properties}, files => {
      if (files) {
        resolve(files[0])
      } else {
        throw new Error("no file selected")
      }
    })
  })
}

function openUrl(url) {
  return shell.openItem(url)
}

function showMessageBox(options, cb) {
  cb = cb || (() => {})
  return remote.dialog.showMessageBox(options, cb)
}

exports.pickDir = pickDir
exports.openUrl = openUrl
exports.showMessageBox = showMessageBox
