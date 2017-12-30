const React = require("react");

const Package = require("../../package.json");
const Button = require("../button");
const Link = require("../link");

const $ = React.createElement;
const homePage = "https://screenhive.net";
const myPage = "https://mockbrian.com";

function About(props) {
  const { setRoute } = props;

  function goBack() {
    setRoute("start");
  }

  return $(
    "div",
    {},
    $("div", {}, $(Button, { type: "round", onClick: goBack }, "Back")),
    $(
      "p",
      {},
      "Follow the ",
      $(Link, { url: homePage }, "Steam setup instructions"),
      " to create a screenshot folder before using this app."
    ),
    $("p", { className: "b" }, `${Package.productName} ${Package.version}`),
    $("p", {}, "Copyright © 2018 ", $(Link, { url: myPage }, "Brian Mock"))
  );
}

module.exports = About;
