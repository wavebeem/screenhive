const path = require("path")
const migrate = require("./migrate")
const electron = require("electron")
const remote = electron.remote
const shell = electron.shell
const dialog = remote.dialog
const H = remote.require("./helpers")

// TODO: Try to restore folder from last used value
const state = {}

const placeholderText = "No folder selected"

function $(sel) {
  return document.querySelector(sel)
}

function $$click(sel, fn) {
  const elems = [].slice.call(document.querySelectorAll(sel))
  elems.forEach(elem => {
    elem.addEventListener("click", event => {
      event.preventDefault()
      fn(event)
    })
  })
}

function setText(elem, text) {
  elem.innerHTML = ""
  const node = document.createTextNode(text)
  elem.appendChild(node)
}

function update(folder) {
  state.folder = folder
  const mainButton = $(".MainButton")
  mainButton.disabled = !state.folder
  setText(mainButton, "Organize")
  $(".Progress").classList.add("hidden")
  const text = state.folder || placeholderText
  const folderDisplay = $(".FolderDisplay")
  folderDisplay.disabled = !state.folder
  setText(folderDisplay, text)
  folderDisplay.title = text
  folderDisplay.dataset.path = text
}

function done(n) {
  const options = {
    type: "info",
    title: "Screenhive: Success",
    message: "Successfully organized " + n + " files.",
    buttons: ["OK"]
  }
  dialog.showMessageBox(options, () => {
    shell.openItem(state.folder)
  })
}

function fail(err) {
  const options = {
    type: "error",
    title: "Screenhive: Error",
    message: err.stack,
    buttons: ["OK"]
  }
  dialog.showMessageBox(options)
}

function cleanup() {
  update(state.folder)
}

function showProgress(completed, total) {
  const percent = Math.floor(100 * completed / total)
  $(".Progress").classList.remove("hidden")
  $(".Progress > .ProgressFill").style.width = percent + "%";
}

$$click("[data-external]", event => {
  shell.openExternal(event.target.href)
})

$$click(".FolderDisplay", event => {
  shell.openItem(event.target.dataset.path)
})

$$click(".PickDir", event => {
  H.pickDir().then(update)
})

$$click(".MainButton", event => {
  const mainButton = $(".MainButton")
  mainButton.disabled = true
  setText(mainButton, "Please wait…")
  migrate(state.folder, showProgress)
    .then(done)
    .catch(fail)
    .then(cleanup)
})

update(null)
