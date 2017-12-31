const React = require("react");

const $ = React.createElement;

function Working(/* props */) {
  return $(
    "div",
    { className: "center min-h-100 flex flex-column justify-center pb5" },
    $("p", { className: "tc ff3 b" }, "Processing…"),
    $("div", { className: "Spinner green dib" })
  );
}

module.exports = Working;
