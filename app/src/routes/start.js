const React = require("react");

const Button = require("../button");
const H = require("../helpers");
const migrate = require("../migrate");

const $ = React.createElement;

function Start(props) {
  const { setFolder, setRoute } = props;
  const { folder } = props.state;

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
    setRoute("start");
    process.stdout.write(err.stack + "\n");
    const options = {
      type: "error",
      title: "Screenhive: Error",
      message: err.stack,
      buttons: ["OK"]
    };
    H.showMessageBox(options, () => {});
  }

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
      disabled: !folder,
      onClick: start
    },
    "Organize"
  );

  return $("div", {}, folderPicker, folder ? mainButton : null);
}

module.exports = Start;
