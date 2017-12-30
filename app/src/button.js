const React = require("react");
const C = require("classnames");

const $ = React.createElement;

const C_SHARED = C(
  "pointer o-90",
  "ttu b",
  "bn",
  "mv2 ph2 w-100",
  "chunky-focus"
);
const C_PRIMARY = C(
  C_SHARED,
  "text-shadow white bg-green pv3 f3 br1 button-shadow"
);
const C_SECONDARY = C(
  C_SHARED,
  "text-shadow white bg-blue pv2 br1 button-shadow"
);
const C_ROUND = C(C_SHARED, "bg-light-gray pv2 br1 black");
const C_LINK = C(
  "bg-transparent dark-blue",
  "br1 ba bw1 b--blue",
  "truncate",
  "pointer o-90",
  "mv2 ph2 pv2 w-100",
  "chunky-focus"
);

const classes = {
  primary: C_PRIMARY,
  secondary: C_SECONDARY,
  link: C_LINK,
  round: C_ROUND
};

const noop = () => {};

function Button(props) {
  const {
    type = "secondary",
    disabled = false,
    onClick = noop,
    children
  } = props;
  const className = C(classes[type], disabled ? "o-30" : "glow");
  return $("button", { className, disabled, onClick }, children);
}

module.exports = Button;
