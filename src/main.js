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
  $(".MainButton").disabled = !state.folder
  const text = state.folder || placeholderText
  const elem = $(".FolderDisplay")
  elem.disabled = !state.folder
  setText(elem, text)
  elem.title = text
  elem.dataset.path = text
}

function done(n) {
  window.alert("Successfully organized " + n + " files", "Screenhive")
  shell.openItem(state.folder)
}

function fail(err) {
  window.alert("An error occurred:\n\n" + err.stack, "Screenhive")
}

function cleanup() {
  update(state.folder)
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
  $(".MainButton").disabled = true
  migrate(state.folder)
    .then(done)
    .catch(fail)
    .then(cleanup)
})

update(null)
