const React = require("react");
const C = require("classnames");

const H = require("./helpers");

const $ = React.createElement;

function Link(props) {
  const { url, children } = props;
  function onClick(event) {
    event.preventDefault();
    H.openUrl(url);
  }
  const className = C(
    "pointer link b",
    "blue hover-dark-blue",
    "b--black-30 bb"
  );
  return $("a", { className, onClick, href: url }, children);
}

module.exports = Link;
