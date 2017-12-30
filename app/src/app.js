const React = require("react");

const Start = require("./routes/start");
const Working = require("./routes/working");
const Done = require("./routes/done");
const About = require("./routes/about");

const $ = React.createElement;

const routeMap = {
  start: Start,
  working: Working,
  done: Done,
  about: About
};

function pickRoute(props) {
  const { route } = props.state;
  if (routeMap.hasOwnProperty(route)) {
    return $(routeMap[route], props);
  }
  return $("div", null, `Invalid route "${route}"`);
}

function App(props) {
  return $("div", { className: "flex-auto" }, pickRoute(props));
}

module.exports = App;
