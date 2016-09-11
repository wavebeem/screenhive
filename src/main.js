const path = require("path")
const migrate = require("./migrate")
const electron = require("electron")
const remote = electron.remote
const shell = electron.shell
const H = remote.require("./helpers")

// TODO: Try to restore folder from last used value
const state = {}

const placeholderText = "No folder selected"

function $(sel) {
  return document.querySelector(sel)
}

function setText(elem, text) {
  elem.innerHTML = ""
  const node = document.createTextNode(text)
  elem.appendChild(node)
}

function update(folder) {
  state.folder = folder
  $(".MainButton").disabled = !state.folder
  const text = state.folder || placeholderText
  const elem = $(".FolderDisplay")
  elem.disabled = !state.folder
  setText(elem, text)
  elem.title = text
  elem.dataset.path = text
}

function done(n) {
  window.alert("Successfully organized " + n + " files")
  shell.openItem(state.folder)
}

function fail(err) {
  window.alert("An error occurred:\n\n" + err.stack)
}

$(".FolderDisplay").addEventListener("click", event => {
  shell.openItem(event.target.dataset.path)
})

$(".PickDir").addEventListener("click", event => {
  H.pickDir().then(update)
})

$(".MainButton").addEventListener("click", event => {
  migrate(state.folder)
    .then(done)
    .catch(fail)
})

update(null)
