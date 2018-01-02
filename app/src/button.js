const React = require("react");
const C = require("classnames");

const $ = React.createElement;

const C_SHARED = C(
  "bg-animate",
  "ttu b",
  "bn br1",
  "mv1 ph2 w-100",
  "chunky-focus"
);
const C_PRIMARY = C(C_SHARED, "white bg-green pv3 f3");
const C_SECONDARY = C(C_SHARED, "white bg-blue pv2");
const C_SUBTLE = C(C_SHARED, "bg-light-gray black pv2");
const C_OUTLINE = C(
  "bg-transparent bg-animate blue",
  "br1 ba b--blue",
  "truncate",
  "mv1 ph2 pv2 w-100",
  "chunky-focus"
);

const classes = {
  primary: C_PRIMARY,
  secondary: C_SECONDARY,
  outline: C_OUTLINE,
  subtle: C_SUBTLE
};

const noop = () => {};

function Button(props) {
  const {
    type = "secondary",
    disabled = false,
    onClick = noop,
    children
  } = props;
  const disC = "o-30";
  const regC = {
    "pointer hover-bg-dark-green": type === "primary",
    "pointer hover-bg-dark-blue": type === "secondary",
    "pointer hover-bg-washed-blue": type === "outline",
    "pointer hover-bg-moon-gray": type === "subtle"
  };
  const className = C(classes[type], disabled ? disC : regC);
  return $("button", { className, disabled, onClick }, children);
}

module.exports = Button;
