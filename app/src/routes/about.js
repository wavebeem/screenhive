const React = require("react");

const Package = require("../../package.json");
const Button = require("../button");
const Link = require("../link");

const $ = React.createElement;
const homePage = "https://screenhive.net";
const myPage = "https://mockbrian.com";
const githubPage = "https://github.com/wavebeem/screenhive";

function About(props) {
  const { setRoute } = props;

  function goBack() {
    setRoute("start");
  }

  return $(
    "div",
    { className: "min-h-100 flex flex-column" },
    $("div", {}, $(Button, { type: "subtle", onClick: goBack }, "Back")),
    $(
      "p",
      { className: "mb0 f3 b mt1 mb0" },
      `${Package.productName} ${Package.version}`
    ),
    $(
      "div",
      { className: "flex-auto lh-copy f6" },
      $(
        "p",
        {},
        "Download the latest version or read documentation on the ",
        $(Link, { url: homePage }, "Screenhive homepage"),
        "."
      ),
      $(
        "p",
        {},
        "The source code is available on GitHub at ",
        $(Link, { url: githubPage }, "wavebeem/screenhive"),
        "."
      )
    ),
    $(
      "p",
      { className: "tc mb1 f6 mid-gray" },
      "Copyright © 2018 ",
      $(Link, { url: myPage }, "Brian Mock")
    )
  );
}

module.exports = About;
