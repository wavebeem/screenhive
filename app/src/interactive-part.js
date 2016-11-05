const ReactRedux = require("react-redux")
const React = require("react")
const Conf = require("./conf")
const migrate = require("./migrate")
const H = require("./helpers")
const $ = React.createElement

function InteractivePart(props) {
  function update(key, value) {
    dispatch({type: "Update", key, value})
  }

  function pickDir() {
    H.pickDir().then(folder => {
      update("folder", folder)
      Conf.write({folder})
    })
  }

  function openFolder() {
    H.openFile(folder)
  }

  function start() {
    update("screen", "working")
    migrate(folder)
      .then(done)
      .catch(fail)
  }

  function done() {
    update("screen", "done")
  }

  function fail(err) {
    cleanup()
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
    update("screen", "start")
  }

  function viewScreenshots() {
    cleanup()
    openFolder()
  }

  const dispatch = props.dispatch
  const state = props.state
  const folder = state.folder || null
  const screen = state.screen

  const doneScreen =
    $("div", {},
      $("button", {className: "MainButton ButtonOuter", onClick: viewScreenshots},
        $("div", {className: "ButtonInner"}, `View screenshots`)
      )
    )

  const folderPicker =
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
      )
    )

  const mainButton =
    $("button",
      {
        className: "MainButton ButtonOuter",
        disabled: !folder || screen === "working",
        onClick: start
      },
      $("div", {className: "ButtonInner"},
        screen === "working" ? `Please wait…` : `Organize`
      )
    )

  const startScreen =
    $("div", {},
      folderPicker,
      folder ? mainButton : null
    )

  const spinner =
    $("div", {className: "tc"},
      $("div", {className: "Spinner dib"})
    )

  return $("div", {className: "Flex-1-1"},
    screen === "start" ? startScreen : null,
    screen === "working" ? spinner : null,
    screen === "done" ? doneScreen : null
  )
}

module.exports = ReactRedux.connect()(InteractivePart)
