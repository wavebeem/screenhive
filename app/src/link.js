const React = require("react");

const H = require("./helpers");

const $ = React.createElement;

function Link(props) {
  const { url, children } = props;
  function onClick(event) {
    event.preventDefault();
    H.openUrl(url);
  }
  const className = "pointer link o-80 glow dark-blue b--black-30 b bb";
  return $("a", { className, onClick, href: url }, children);
}

module.exports = Link;
