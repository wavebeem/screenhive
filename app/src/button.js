const React = require("react");
const C = require("classnames");

const $ = React.createElement;

const C_SHARED = C(
  "pointer glow o-90",
  "text-shadow white ttu b",
  "br1 bn",
  "mv2 ph2 w-100",
  "chunky-focus",
  "button-shadow"
);
const C_PRIMARY = C("bg-green pv3 f3", C_SHARED);
const C_SECONDARY = C("bg-blue pv2", C_SHARED);
const C_LINK = C(
  "bg-transparent blue",
  "br1 ba bw1 b--blue",
  "truncate",
  "pointer glow o-90",
  "mv2 ph2 pv2 w-100",
  "chunky-focus"
);

const classes = {
  primary: C_PRIMARY,
  secondary: C_SECONDARY,
  link: C_LINK
};

const noop = () => {};

function Button(props) {
  const {
    type = "secondary",
    disabled = false,
    onClick = noop,
    children
  } = props;
  const className = classes[type];
  return $("button", { className, disabled, onClick }, children);
}

module.exports = Button;
