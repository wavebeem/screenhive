const electron = require("electron")
const dialog = electron.dialog

const properties = ["openDirectory"]

function pickDir() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({properties}, files => {
      if (files) {
        resolve(files[0])
      } else {
        reject(new Error("no file selected"))
      }
    })
  })
}

exports.pickDir = pickDir
