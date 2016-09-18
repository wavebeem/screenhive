const React = require("react")
const $ = React.createElement

function ProgressBar(props) {
  const hidden = props.hidden
  const width = props.progress + "%"
  const className = [
    "Progress",
    hidden ? "hidden" : ""
  ].join(" ")
  return $("div", {className},
    $("div", {className: "ProgressFill", style: {width}})
  )
}

module.exports = ProgressBar
