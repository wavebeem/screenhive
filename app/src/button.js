const React = require("react");
const C = require("classnames");

const $ = React.createElement;

const C_SHARED = C(
  "pointer",
  "text-shadow white ttu b",
  "br1 ba",
  "mv2 ph2 w-100",
  "chunky-focus"
);
const C_PRIMARY = C("bg-green b--white-30 pv3 f3", C_SHARED);
const C_SECONDARY = C("bg-blue b--white-20 pv2", C_SHARED);
const C_LINK = C(
  "bg-transparent white",
  "br1 bn",
  "truncate",
  "pointer",
  "mv2 ph2 w-100",
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
  const text =
    type === "link"
      ? $("span", { className: "pointer bb b--white-60" }, children)
      : children;
  return $("button", { className, disabled, onClick }, text);
}

module.exports = Button;
