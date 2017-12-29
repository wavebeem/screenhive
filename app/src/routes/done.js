const React = require("react");

const Button = require("../button");
const H = require("../helpers");

const $ = React.createElement;

function Done(props) {
  const { setRoute } = props;
  const { folder } = props.state;

  function viewScreenshots() {
    setRoute("start");
    H.openFile(folder);
  }

  return $(
    "div",
    {},
    $(Button, { type: "primary", onClick: viewScreenshots }, "View screenshots")
  );
}

module.exports = Done;
