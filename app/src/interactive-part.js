const ReactRedux = require("react-redux")
const React = require("react")
const Conf = require("./conf")
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
    H.openFile(folder)
  }

  function start() {
    dispatch({
      type: "Update",
      key: "isWorking",
      value: true
    })
    migrate(folder)
      .then(done)
      .catch(fail)
      .then(cleanup)
  }

  function done() {
    dispatch({
      type: "Update",
      key: "isWorking",
      value: false
    })
    dispatch({
      type: "Update",
      key: "isDone",
      value: true,
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

  function viewScreenshots() {
    dispatch({
      type: "Update",
      key: "isDone",
      value: false,
    })
    openFolder()
  }

  const dispatch = props.dispatch
  const state = props.state
  const folder = state.folder || null
  const isWorking = state.isWorking
  const isDone = state.isDone

  const doneScreen =
    $("div", {},
      $("button", {className: "MainButton ButtonOuter", onClick: viewScreenshots},
        $("div", {className: "ButtonInner"}, `View screenshots`)
      )
    )

  const startScreen =
    $("div", {},
      $("button", {className: "SecondaryButton ButtonOuter", onClick: pickDir},
        $("div", {className: "ButtonInner"},
          `Choose screenshot folder`
        )
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
          className: "MainButton ButtonOuter",
          disabled: !folder || isWorking,
          onClick: start
        },
        $("div", {className: "ButtonInner"},
          isWorking ? `Please wait…` : `Organize`
        )
      )
    )

  const spinner =
    $("div", {className: "tc"},
      $("div", {className: "Spinner dib"})
    )

  return $("div", {className: "Flex-1-1"},
    isDone ? doneScreen : null,
    isWorking ? spinner : null,
    !isWorking && !isDone ? startScreen : null
  )
}

module.exports = ReactRedux.connect()(InteractivePart)
