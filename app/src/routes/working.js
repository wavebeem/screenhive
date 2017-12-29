const React = require("react");

const $ = React.createElement;

function Working(/* props */) {
  return $("div", { className: "tc" }, $("div", { className: "Spinner dib" }));
}

module.exports = Working;
