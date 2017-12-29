const React = require("react");

const H = require("./helpers");

const $ = React.createElement;

function Link(props) {
  const { url, children } = props;
  function onClick(event) {
    event.preventDefault();
    H.openUrl(url);
  }
  const className = "pointer link white b--white-60 bb";
  return $("a", { className, onClick, url }, children);
}

module.exports = Link;
