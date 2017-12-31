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
      { className: "mb0 f3 b" },
      `${Package.productName} ${Package.version}`
    ),
    $(
      "div",
      { className: "flex-auto" },
      $(
        "p",
        {},
        "Follow the ",
        $(Link, { url: homePage }, "Steam setup instructions"),
        " to create a screenshot folder before using this app."
      ),
      $(
        "p",
        {},
        "GitHub: ",
        $(Link, { url: githubPage }, "wavebeem/screenhive")
      )
    ),
    $(
      "p",
      { className: "tc" },
      "Copyright © 2018 ",
      $(Link, { url: myPage }, "Brian Mock")
    )
  );
}

module.exports = About;
