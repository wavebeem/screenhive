const React = require("react");

const Button = require("./button");
const migrate = require("./migrate");
const H = require("./helpers");

const $ = React.createElement;

function InteractivePart(props) {
  const { setFolder, setRoute } = props;
  const { folder, route } = props.state;

  function pickDir() {
    H.pickDir().then(setFolder);
  }

  function openFolder() {
    H.openFile(folder);
  }

  function start() {
    setRoute("working");
    migrate(folder)
      .then(done)
      .catch(fail);
  }

  function done() {
    setRoute("done");
  }

  function fail(err) {
    cleanup();
    process.stdout.write(err.stack + "\n");
    const options = {
      type: "error",
      title: "Screenhive: Error",
      message: err.stack,
      buttons: ["OK"]
    };
    H.showMessageBox(options, () => {});
  }

  function cleanup() {
    setRoute("start");
  }

  function viewScreenshots() {
    cleanup();
    openFolder();
  }

  const doneScreen = $(
    "div",
    {},
    $(Button, { type: "primary", onClick: viewScreenshots }, "View screenshots")
  );

  const folderPicker = $(
    "div",
    {},
    $(
      Button,
      { type: "secondary", onClick: pickDir },
      "Choose screenshot folder"
    ),
    $(
      Button,
      {
        type: "link",
        disabled: !folder,
        onClick: openFolder
      },
      folder || "No folder selected"
    )
  );

  const mainButton = $(
    Button,
    {
      type: "primary",
      disabled: !folder || route === "working",
      onClick: start
    },
    route === "working" ? "Please wait…" : "Organize"
  );

  const startScreen = $("div", {}, folderPicker, folder ? mainButton : null);

  const spinner = $(
    "div",
    { className: "tc" },
    $("div", { className: "Spinner dib" })
  );

  return $(
    "div",
    { className: "flex-auto" },
    route === "start" ? startScreen : null,
    route === "working" ? spinner : null,
    route === "done" ? doneScreen : null
  );
}

module.exports = InteractivePart;
