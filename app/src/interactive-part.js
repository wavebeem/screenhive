const ReactRedux = require("react-redux")
const React = require("react")
const C = require("classnames")
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

  const sharedButtonClass = C(
    "pointer text-shadow mv2 br1 b ph2 ttu ba white w-100 chunky-focus"
  )

  const primaryButtonClass = C(
    "bg-green b--white-30 pv3 f3",
    sharedButtonClass
  )

  const secondaryButtonClass = C(
    "bg-blue b--white-20 pv2",
    sharedButtonClass
  )

  const outlineButtonClass = C(
    "pointer br1 bg-transparent white bn mv2 ph2 white w-100 chunky-focus",
    "truncate"
  )

  const doneScreen =
    $("div", {},
      $("button", {className: primaryButtonClass, onClick: viewScreenshots},
        `View screenshots`
      )
    )

  const folderPicker =
    $("div", {},
      $("button", {className: secondaryButtonClass, onClick: pickDir},
          `Choose screenshot folder`
      ),
      $("button",
        {
          className: outlineButtonClass,
          disabled: !folder,
          onClick: openFolder
        },
        $("span", {className: "pointer bb b--white-60"},
          folder || "No folder selected"
        )
      )
    )

  const mainButton =
    $("button",
      {
        className: primaryButtonClass,
        disabled: !folder || screen === "working",
        onClick: start
      },
      screen === "working"
        ? `Please wait…`
        : `Organize`
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

  return $("div", {className: "flex-auto"},
    screen === "start" ? startScreen : null,
    screen === "working" ? spinner : null,
    screen === "done" ? doneScreen : null
  )
}

module.exports = ReactRedux.connect()(InteractivePart)
