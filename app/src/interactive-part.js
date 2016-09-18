const ReactRedux = require("react-redux")
const React = require("react")
const Conf = require("./conf")
const ProgressBar = require("./progress-bar")
const migrate = require("./migrate")
const H = require("./helpers")
const $ = React.createElement

function InteractivePart(props) {
  function pickDir() {
    H.pickDir().then(folder => {
      dispatch({
        type: "Update",
        key: "folder",
        value: folder
      })
      Conf.write({folder})
    })
  }

  function openFolder() {
    H.openUrl(folder)
  }

  function start() {
    dispatch({
      type: "Update",
      key: "isWorking",
      value: true
    })
    migrate(folder, updateProgress)
      .then(done)
      .catch(fail)
      .then(cleanup)
  }

  function done(n) {
    const options = {
      type: "info",
      title: "Screenhive: Success",
      message: "Successfully organized " + n + " files.",
      buttons: ["OK"]
    }
    H.showMessageBox(options, () => {
      H.openUrl(state.folder)
    })
  }

  function fail(err) {
    process.stdout.write(err.stack + "\n")
    const options = {
      type: "error",
      title: "Screenhive: Error",
      message: err.stack,
      buttons: ["OK"]
    }
    H.showMessageBox(options, () => {})
  }

  function cleanup() {
    dispatch({
      type: "Update",
      key: "isWorking",
      value: false
    })
  }

  function updateProgress(completed, total) {
    const percent = Math.floor(100 * completed / total)
    dispatch({
      type: "Update",
      key: "progress",
      value: percent
    })
  }

  const dispatch = props.dispatch
  const state = props.state
  const folder = state.folder || null
  const isWorking = state.isWorking
  const hidden = !isWorking
  const progress = state.progress

  return $("div", {className: "Flex-1-1"},
    $("button", {className: "PickDir", onClick: pickDir},
      `Choose screenshot folder`
    ),
    $("button",
      {
        className: "FolderDisplay Info",
        disabled: !folder,
        onClick: openFolder
      },
      folder || "No folder selected"
    ),
    $("button",
      {
        className: "MainButton",
        disabled: !folder || isWorking,
        onClick: start
      },
      isWorking ? `Please wait…` : `Organize`
    ),
    $(ProgressBar, {hidden, progress})
  )
}

module.exports = ReactRedux.connect()(InteractivePart)
